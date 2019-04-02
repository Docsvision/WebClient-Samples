import ReactDOM from "react-dom";
import { Layout } from "@docsvision/webclient/System/Layout";
import { AdaptiveMenuBarComponent } from "./AdaptiveMenuBarComponent";
import React from "react";

let container = null;
let menuOpened = false;

function onCloseMenu() {
    menuOpened = false;
    renderMenu();
}

export function showAdaptiveMenuBar(sender: Layout) {
    let senderNode = ReactDOM.findDOMNode(sender);
    if (!senderNode.contains(container)) {
        container = document.createElement("div");
        container.className = "container";
        senderNode.appendChild(container);
    }
    menuOpened = !menuOpened;

    //событие нажатия на кнопку срабатывает и для react компонента, 
    //поэтому необходимо дождаться окончания события прежде чем рэндерить компонент
    setTimeout(() => { 
        return renderMenu(); 
    });
}

function renderMenu() {
    ReactDOM.render(<AdaptiveMenuBarComponent visible={menuOpened} onClose={onCloseMenu}/>, container);
}


