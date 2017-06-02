using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace CustomLibrary.ObjectModel.Mapping
{
    /// <summary>
    /// Custom library mapper factory
    /// </summary>
    public sealed class CustomLibraryMapperFactory : ObjectMapperFactory
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CustomLibraryMapperFactory"/> class
        /// </summary>
        /// <param name="context">Object context</param>
        public CustomLibraryMapperFactory(ObjectContext context)
            : base(context)
        {
            RegisterObjectMapper(typeof(CustomDirectory), typeof(CustomDirectoryMapper));
            RegisterObjectMapper(typeof(MainInfo), typeof(MainInfoMapper));
        }
    }

}
