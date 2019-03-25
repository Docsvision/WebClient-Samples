import { IRouteHandler } from "@docsvision/webclient/System/IRouteHandler";
import { RouteType } from "@docsvision/webclient/System/RouteType";
import { RouteHandleResult } from "@docsvision/webclient/System/RouteHandleResult";
import { StandardRoutes } from "@docsvision/webclient/System/StandardRoutes";

/**
 * Будьте вниматательны, используя JQuery для любых модификации элементов на странице, 
 * т.к. в будущих версиях это может быть не совместимо с системой
 */

/**
 * Изменение текста логотипа
 * @param title Новый логотип
 */
const changeTitle = (title: string) => $('#company-logo > span').text(title);
changeTitle('Моя компания');


/**
 * Добавление пользовательских стилей на страницу в зависимости от её адреса
 */
export class ApplyStylesHandler implements IRouteHandler<any> {
	static readonly THEME_CLASS = 'custom-theme-sample';
	public name = "ApplyStylesHandler";

	async mountRoute(data: any, routeType: RouteType): JQueryDeferred<RouteHandleResult> {
		var availableRoutes = [StandardRoutes.Dashboard, StandardRoutes.Folder];

		if (availableRoutes.indexOf(routeType) !== -1) {
			$('body').addClass(ApplyStylesHandler.THEME_CLASS);
		} else {
			$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
		}
	}

	async unmountRoute(data: any, routeType: RouteType): JQueryDeferred<any> {
		$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
	}
}



