﻿using DocsVision.Platform.WebClient;
using $safeprojectname$.Feature1.Models;
using System;

namespace $safeprojectname$.Feature1
{
    /// <summary>
    /// Интерфейс сервиса обработки запросов для некоторой функциональности.
    /// </summary>
    public interface IFeature1Service
    {
        /// <summary>
        /// Интерфейс метода обработки запроса.
        /// </summary>
        Action1Response Action1(SessionContext sessionContext, Action1Request request);
    }
}
