import React from 'react';
import { windowWithLoginExtensionManager, ILoginPlugin, ILoginExtensionManager, LoginEvents } from '@docsvision/webclient/Account';
import { LoginView } from '@docsvision/webclient/Account/LoginContainer';
import { LoginLogic } from '@docsvision/webclient/Account/LoginLogic';
import "index.scss"

const loginExtensionManager: ILoginExtensionManager = (window as windowWithLoginExtensionManager).loginExtensionManager;
// Заменяем текст
loginExtensionManager.setResources({ Login_AdminMail: 'admin@docsvision.com' });
if (loginExtensionManager.currentLocale === 'ru') {
    loginExtensionManager.setResources({ Login_Greeting: 'Приветствуем,' });
} else {
    loginExtensionManager.setResources({ Login_Greeting: 'Hello,' });
}

const plugin: ILoginPlugin = {
    order: 1,
    eventName: "LogicEventConstructor",
    fn: (data) => {
        // do something
    },
    name: 'myPlugin',
};
const plugin2: ILoginPlugin = {
    order: 2,
    eventName: "EventContainerUseEffect",
    fn: (data) => {
        // do something
    },
    name: 'myPlugin2',
};

/* добавляем события */
loginExtensionManager.addPlugin(plugin);
loginExtensionManager.addPlugins([plugin2]);

// меняем компоненты представления
loginExtensionManager.onSetupView = function (view: LoginView): LoginView {
    // заменяем элемент
    view.logo = React.memo((logic: LoginLogic): React.ReactElement => {
        return <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' className="my-custom-logo" />;
    });

    // точки расширения
    view.authBoxBefore = (logic: LoginLogic): React.ReactElement => null;
    view.authBoxAfter = (logic: LoginLogic): React.ReactElement => null;
    view.formBefore = (logic: LoginLogic): React.ReactElement => null;
    view.formAfter = (logic: LoginLogic): React.ReactElement => <a href="#" className="my-custom-element" >Забыли пароль?</a>;
    view.providersBefore = (logic: LoginLogic): React.ReactElement => null;
    view.providersAfter = (logic: LoginLogic): React.ReactElement => null;
    return view;
};
