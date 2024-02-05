
import { app } from "@docsvision/webclient/App";
import { ApplyStylesHandler } from "./ChangeLogoAndBackground";
import { Router } from "@docsvision/webclient/System/Router";
import { StandardRoutes } from "@docsvision/webclient/System/StandardRoutes";

// Данный файл является входной точкой для сборки расширения.
// Он должен прямо или косвенно импортировать все другие файлы скриптов.

// Регистрируем обработчик, который будет применять новые стили при открытии любой страницы ЛК
Router.RouterInitialization.subscribe((router: Router) => {
	router.addHandler(StandardRoutes.AllRoutes, new ApplyStylesHandler(app));
});