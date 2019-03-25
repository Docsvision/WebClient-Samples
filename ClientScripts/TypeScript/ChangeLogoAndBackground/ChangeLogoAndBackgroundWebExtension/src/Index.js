define(["require", "exports", "./ChangeLogoAndBackground", "@docsvision/webclient/System/Router", "@docsvision/webclient/System/StandardRoutes"], function (require, exports, ChangeLogoAndBackground_1, Router_1, StandardRoutes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Router_1.Router.RouterInitialization.subscribe(function (sammy) {
        sammy.addHandler(StandardRoutes_1.StandardRoutes.AllRoutes, new ChangeLogoAndBackground_1.ApplyStylesHandler());
    });
});
