namespace LicenseCheckServerExtension.Services
{
    /// <summary>
    /// Представляет собой интерфейс сервиса для проверки лицензии
    /// </summary>
    public interface ILicenseCheckService
    {
        /// <summary>
        /// Проверить признак лицензии
        /// </summary>
        bool CheckFeature();
    }
}