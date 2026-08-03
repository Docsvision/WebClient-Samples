using Microsoft.Extensions.Configuration;
using NUnit.Framework;

namespace OpenBao.Tests;

/*
 Для запуска тестов нужно в переменных окружения добавить две переменные:
 - Test__OpenBao__Url - указать URL OpenBao хранилища секретов
 - Test__OpenBao__Token - указать токен доступа к OpenBao хранилищу секретов
 
 также можно в OpenBao.Tests создать файл local.runsettings со следующим содержимым:

 <?xml version="1.0" encoding="utf-8"?>
<RunSettings>
  <RunConfiguration>
    <EnvironmentVariables>
      <Test__OpenBao__Url>http://your-server-here.company.com:8200</Test__OpenBao__Url>
      <Test__OpenBao__Token>your-token-here</Test__OpenBao__Token>
    </EnvironmentVariables >
  </RunConfiguration>
</RunSettings>

*/


[TestFixture]
public class OpenBaoConnectorTests
{
    // Тестовые секреты пишем с этим префиксом пути, чтобы очистить
    private const string TestPathBase = "integration-test";
    private const string TestPrefix = "integration-prefix";

    private OpenBaoSecretStorageConnector _connector = null!;

    [OneTimeSetUp]
    public void SetUp()
    {
        var url = Environment.GetEnvironmentVariable("Test__OpenBao__Url");
        var token = Environment.GetEnvironmentVariable("Test__OpenBao__Token");

        if (string.IsNullOrWhiteSpace(url) || string.IsNullOrWhiteSpace(token))
            Assert.Ignore("Переменные окружения Test__OpenBao__Url и Test__OpenBao__Token не заданы. Тесты пропущены.");
        
        var settings = new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .Build()
            .GetSection("Test:OpenBao")
            .Get<Dictionary<string, string>>()!;

        settings["PathPrefix"] = TestPrefix;
        _connector = new OpenBaoSecretStorageConnector();
        _connector.Initialize(settings);
    }

    [OneTimeTearDown]
    public void TearDown()
    {
        foreach (var suffix in new[] { "write-read", "overwrite", "delete" })
        {
            try { _connector.DeleteValue(_connector.BuildPath($"{TestPathBase}/{suffix}")); }
            catch { /* ignored */ }
        }
    }

    [Test]
    public void TestConnection_ValidCredentials_DoesNotThrow()
    {
        Assert.DoesNotThrow(new Action(() => _connector.TestConnection()));
    }

    [Test]
    public void BuildPath_WithPrefix_PrependsPrefixToPath()
    {
        var path = _connector.BuildPath($"{TestPathBase}/some-attribute");

        // Путь должен содержать оба сегмента и префикс пути
        Assert.That(path, Does.Contain(TestPathBase));
        Assert.That(path, Does.Contain("some-attribute"));
        Assert.That(path, Does.Contain(TestPrefix));
    }

    [Test]
    public void WriteValue_ThenGetValue_ReturnsOriginalValue()
    {
        var path = _connector.BuildPath($"{TestPathBase}/write-read");
        const string expected = "secret-value-123";

        _connector.WriteValue(path, expected);
        var actual = _connector.GetValue(path);

        Assert.That(actual, Is.EqualTo(expected));
    }

    [Test]
    public void WriteValue_OverwriteExisting_ReturnsNewValue()
    {
        var path = _connector.BuildPath($"{TestPathBase}/overwrite");

        _connector.WriteValue(path, "orig");
        _connector.WriteValue(path, "new");

        Assert.That(_connector.GetValue(path), Is.EqualTo("new"));
    }

    [Test]
    public void DeleteValue_AfterWrite_GetValueThrows()
    {
        var path = _connector.BuildPath($"{TestPathBase}/delete");
        _connector.WriteValue(path, "deleted");

        _connector.DeleteValue(path);

        Assert.That(new Func<string>(() => _connector.GetValue(path)), Throws.InstanceOf<Exception>());
    }

    [Test]
    public void WriteValue_EmptyString_RoundTripsCorrectly()
    {
        var path = _connector.BuildPath($"{TestPathBase}/write-read");

        _connector.WriteValue(path, string.Empty);

        Assert.That(_connector.GetValue(path), Is.EqualTo(string.Empty));
    }
}
