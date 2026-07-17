using DocsVision.Settings.Client.Secrets;
using VaultSharp;
using VaultSharp.V1.AuthMethods.Token;

namespace OpenBao;

/// <summary>
/// Реализация <see cref="ISecretStorageConnector"/> для OpenBao/HashiCorp Vault с движком KV v2.
/// </summary>
/// <remarks>
/// Настройки передаются через <see cref="Initialize"/>. Данная версия поддерживает только аутентификацию
///   по токену.
/// В Initialize.settings ожидаются обязательные
///  - Url - адрес сервера OpenBao (вида http://your-server-here.com:8200);
///  - Token - токен для аутентификации.
/// Также могут быть переданы необязательные:
///  - MountPath - название движка секрета/Secrets Engines. По умолчанию используется движок "secret";
///  - PathPrefix - префикс пути к секрету. По умолчанию пустой.
/// </remarks>
public class OpenBaoSecretStorageConnector : ISecretStorageConnector
{
    private const string SettingUrl = "Url";
    private const string SettingToken = "Token";
    private const string SettingMountPath = "MountPath";
    private const string SettingPathPrefix = "PathPrefix";
    private const string DefaultMountPath = "secret";

    // OpenBao также как и Сервис настроек, оперирует путями и атрибутами. Но в ISecretStorageConnector
    //  не предусмотрено (специально) знание об атрибутах.
    // Поэтому, чтобы не выделять из переданного пути название атрибута, всегда считаем, что работаем
    //   с атрибутом "value". По факту это ничего не изменяет (просто путь состоит из пути и атрибута):
    //   /Configuration/../Password.
    private const string SecretDataKey = "value";

    private VaultClient? client;
    private string mountPath = DefaultMountPath;
    private string? pathPrefix;

    /// <inheritdoc/>
    public void Initialize(IReadOnlyDictionary<string, string> settings)
    {
        if (!settings.TryGetValue(SettingUrl, out var url) || string.IsNullOrWhiteSpace(url))
            throw new InvalidOperationException($"OpenBao connector requires '{SettingUrl}' setting.");

        if (!settings.TryGetValue(SettingToken, out var token) || string.IsNullOrWhiteSpace(token))
            throw new InvalidOperationException($"OpenBao connector requires '{SettingToken}' setting.");

        if (settings.TryGetValue(SettingMountPath, out var mPath) && !string.IsNullOrWhiteSpace(mPath))
            mountPath = mPath;

        if (settings.TryGetValue(SettingPathPrefix, out var pPrefix) && !string.IsNullOrWhiteSpace(pPrefix))
            pathPrefix = pPrefix.Trim('/');

        // В этой версии поддерживаем только токенную аутентификацию, но по факту библиотека поддерживает
        //  другие методы аутентификации (например, логин/пароль, имена сертификатов и т.д.). Т.о. в будущем можно
        //  будет поддержать и другие методы аутентификации, просто передавая новые данные в settings.
        var authMethod = new TokenAuthMethodInfo(token);
        client = new VaultClient(new VaultClientSettings(url, authMethod));
    }

    /// <inheritdoc/>
    public void TestConnection()
    {
        EnsureInitialized();
        
        // Метод LookupSelf проверяет и доступность сервера, и валидность токена одновременно.
        client!.V1.Auth.Token.LookupSelfAsync().GetAwaiter().GetResult();
    }

    /// <inheritdoc/>
    public string BuildPath(string path)
    {
        if (string.IsNullOrEmpty(path))
            throw new ArgumentException("Secret path must not be empty.", nameof(path));

        return pathPrefix is null ? path : $"{pathPrefix}/{path}";
    }

    /// <inheritdoc/>
    public string GetValue(string secretPath)
    {
        EnsureInitialized();

        var secret = client!.V1.Secrets.KeyValue.V2
            .ReadSecretAsync(secretPath, mountPoint: mountPath)
            .GetAwaiter().GetResult();

        if (secret?.Data?.Data == null || !secret.Data.Data.TryGetValue(SecretDataKey, out var raw))
            throw new InvalidOperationException($"Secret '{secretPath}' does not contain key '{SecretDataKey}'.");

        return raw?.ToString() ?? string.Empty;
    }

    /// <inheritdoc/>
    public void WriteValue(string secretPath, string value)
    {
        EnsureInitialized();

        var data = new Dictionary<string, object> { [SecretDataKey] = value };
        client!.V1.Secrets.KeyValue.V2
            .WriteSecretAsync(secretPath, data, mountPoint: mountPath)
            .GetAwaiter().GetResult();
    }

    /// <inheritdoc/>
    public void DeleteValue(string secretPath)
    {
        EnsureInitialized();

        // Метод DeleteMetadata удаляет секрет полностью вместе со всеми версиями,
        //   в отличие от DeleteLatest (мягкое удаление только последней версии).
        client!.V1.Secrets.KeyValue.V2
            .DeleteMetadataAsync(secretPath, mountPath)
            .GetAwaiter().GetResult();
    }

    private void EnsureInitialized()
    {
        if (client is null)
            throw new InvalidOperationException(
                $"{nameof(OpenBaoSecretStorageConnector)} is not initialized. Call {nameof(Initialize)} first.");
    }
}
