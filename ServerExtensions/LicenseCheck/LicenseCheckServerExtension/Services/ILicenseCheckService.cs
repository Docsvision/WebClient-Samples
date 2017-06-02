namespace LicenseCheckServerExtension.Services
{
    /// <summary>
    /// Represents license checking service contract
    /// </summary>
    public interface ILicenseCheckService
    {
        /// <summary>
        /// Checks license feature
        /// </summary>
        bool CheckFeature();
    }
}