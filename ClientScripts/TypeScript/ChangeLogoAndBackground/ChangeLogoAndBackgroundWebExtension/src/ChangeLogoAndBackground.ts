import { IRouteHandler, AFTER_STANDARD_HANDLERS } from "@docsvision/webclient/System/IRouteHandler";
import { RouteType } from "@docsvision/webclient/System/RouteType";
import { RouteHandleResult } from "@docsvision/webclient/System/RouteHandleResult";
import { StandardRoutes } from "@docsvision/webclient/System/StandardRoutes";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { $LayoutManager } from "@docsvision/webclient/System/$LayoutManager";
import { WebFrameCompanyLogo } from "@docsvision/webclient/Platform/WebFrameCompanyLogo";
import { LogoType } from "@docsvision/webclient/Platform/$CompanyLogo";

const ROOT_LAYOUT_NAME = "root";
const LOGO_CONTROL_NAME = "webFrameCompanyLogo";

/**
 * Добавление пользовательских стилей на страницу в зависимости от её адреса
 */
export class ApplyStylesHandler implements IRouteHandler<any> {
	static readonly THEME_CLASS = 'custom-theme-sample';
	public name = "ApplyStylesHandler";
	public order = AFTER_STANDARD_HANDLERS;

	constructor(private services: $LayoutManager) {	
	}

	async prepareRouteMount?(routeData: unknown, routeType: RouteType): Promise<RouteHandleResult> {
		if (routeType !== undefined) {
			// Скрываем заголовок, чтобы избежать мерцания во время работы стандартных хандлеров
			this.updateLogoOpacity(0);
		}
	}

	async mountRoute(data: unknown, routeType: RouteType): Promise<RouteHandleResult> {
		if (routeType !== undefined) {
			var availableRoutes = [StandardRoutes.Dashboard, StandardRoutes.Folder, StandardRoutes.FolderPage];
			if (availableRoutes.indexOf(routeType) !== -1) {
				$('body').addClass(ApplyStylesHandler.THEME_CLASS);
			} else {
				$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
			}

			if (routeType == StandardRoutes.Dashboard) {
				const rootLayout = this.services.layoutManager.getLayout(ROOT_LAYOUT_NAME);
				const logo = rootLayout.controls.get<WebFrameCompanyLogo>(LOGO_CONTROL_NAME);
				logo.params.alwaysShow = false;
				logo.params.logoText = "Моя компания";
				logo.params.typeOfLogo = LogoType.Text;
			}
			
			this.updateLogoOpacity(1);
		}
	}

	async unmountRoute(data: any, routeType: RouteType): Promise<any> {
		$('body').removeClass(ApplyStylesHandler.THEME_CLASS);
	}

	private updateLogoOpacity(opacity: number) {
		let rootLayout = this.services.layoutManager.getLayout(ROOT_LAYOUT_NAME);
		rootLayout.controls.get<LayoutControl>(LOGO_CONTROL_NAME).params.customCssStyle = { opacity };
	}
}



