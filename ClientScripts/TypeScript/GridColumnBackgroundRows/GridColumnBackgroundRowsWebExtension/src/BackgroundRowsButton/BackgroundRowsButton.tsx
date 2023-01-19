import { ICellData } from "@docsvision/web/components/table/interfaces";
import { getRowLoaded } from "@docsvision/web/components/table/plugins/lazy-loading";
import { ICompositionPluginProps } from "@docsvision/web/core/composition";
import React, { useState, ChangeEvent, PropsWithChildren } from "react";
import { $BackgroundRows } from "../$BackgroundRows";

export interface IBackgroundRowsButton extends PropsWithChildren<ICompositionPluginProps<"TableCell", ICellData, $BackgroundRows>> {
}

/** Предоставляет возможность отобразить палитру цветов */
export function BackgroundRowsButton (props: IBackgroundRowsButton) {
    const { services: { backgroundRows }, data: { row } } = props.composition;

    // Исходный цвет: белый.
    const [ color, setColor ] = useState( backgroundRows.$rows.getState()[row.entityId] ?? "#ffffff" );

    const changeColor = (ev: ChangeEvent<HTMLInputElement>) => {
        // Обновляем хранилище
        backgroundRows.setBackground({ id: row.entityId, color: ev.target.value });
        // Обновляем локальное стостояние input с type=color.
        setColor(ev.target.value);
    };

    const click = (ev: React.MouseEvent) => {
        // Прекращает дальнейшую передачу текущего события.
        ev.stopPropagation();
    };

    // Если строка ещё не загружена, то ничего не показываем.
    if (!getRowLoaded(row).loaded) {
        return <></>
    }
    
    return (
        <input 
            className="background-rows__button"
            type="color" 
            value={color} 
            onClick={click} 
            onChange={changeColor} />
    )
};