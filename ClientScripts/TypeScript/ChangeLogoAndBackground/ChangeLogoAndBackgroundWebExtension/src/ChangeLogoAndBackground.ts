import { IRouteHandler, AFTER_STANDARD_HANDLERS } from "@docsvision/webclient/System/IRouteHandler";
import { RouteType } from "@docsvision/webclient/System/RouteType";
import { RouteHandleResult } from "@docsvision/webclient/System/RouteHandleResult";
import { StandardRoutes } from "@docsvision/webclient/System/StandardRoutes";
import { Helpers } from "@docsvision/webclient/Legacy/Utils";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";

const ROOT_LAYOUT_NAME = "root";
const LOGO_CONTROL_NAME = "webFrameCompanyLogo";

/**
 * Добавление пользовательских стилей на страницу в зависимости от её адреса
 */
export class ApplyStylesHandler implements IRouteHandler<any> {
	static readonly THEME_CLASS = 'custom-theme-sample';
	public name = "ApplyStylesHandler";
	public order = AFTER_STANDARD_HANDLERS;

	async prepareRouteMount?(routeData: unknown, routeType: RouteType): Promise<RouteHandleResult> {
		if (routeType !== undefined) {
			// Скрываем заголовок, чтобы избежать мерцания во время работы стандартных хандлеров
			this.updateLogoOpacity(0);
		}
	}

	async mountRoute(data: unknown, routeType: RouteType): Promise<RouteHandleResult> {
		if (routeType !== undefined) {
			var availableRoutes = [StandardRoutes.Dashboard, StandardRoutes.Folder];
			if (availableRoutes.indexOf(routeType) !== -1) {
				$('body').addClass(ApplyStylesHandler.THEME_CLASS);
			} else {
				$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
			}

			if (routeType == StandardRoutes.Dashboard) {
				Helpers.UpdateCaption("Моя компания");
			}
			
			this.updateLogoOpacity(1);
		}
	}

	async unmountRoute(data: any, routeType: RouteType): Promise<any> {
		$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
	}

	private updateLogoOpacity(opacity: number) {
		let rootLayout = layoutManager.getLayout(ROOT_LAYOUT_NAME);
		rootLayout.controls.get<LayoutControl>(LOGO_CONTROL_NAME).params.customCssStyle = { opacity };
	}
}



