using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace CustomLibrary.ObjectModel.Mapping
{
    /// <summary>
    /// Кастомная библиотека для фабрики мапперов
    /// </summary>
    public sealed class CustomLibraryMapperFactory : ObjectMapperFactory
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomLibraryMapperFactory"/>
        /// </summary>
        /// <param name="context">Контекст объекта</param>
        public CustomLibraryMapperFactory(ObjectContext context)
            : base(context)
        {
            RegisterObjectMapper(typeof(CustomDirectory), typeof(CustomDirectoryMapper));
            RegisterObjectMapper(typeof(MainInfo), typeof(MainInfoMapper));
        }
    }

}
