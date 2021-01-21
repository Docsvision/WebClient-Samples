import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { Tab } from "@docsvision/webclient/Platform/Tab";
import { control, LayoutControlsAccessor } from "@docsvision/webclient/System/LayoutControlsAccessor";
import { Address } from "@docsvision/webclient/BackOffice/Address";

/** Класс для доступа к элементам управления разметки. */
export class NewContractLayout extends LayoutControlsAccessor {
    @control INN: TextBox;
    /** Local company name */
    @control name: TextBox;
    /** Full company name */
    @control fullName: TextBox;
    /** Local Address */
    @control address: Address;

    /** Bank details */
    @control bank: TextArea;
    /** Расчётный счет  */
    @control operatingAccount: TextBox;
    /** БИК */
    @control BIK: TextBox;
    /** Корреспондентский счет */ 
    @control correspondentAccount: TextBox;
    /** ОКПО */ 
    @control OKPO: TextBox;
    /** ОКВЭД */ 
    @control OKVED: TextBox;
    /** КПП */ 
    @control KPP: TextBox;

    /** Сайт компании */ 
    @control webSite: TextBox;
    /** Телефон */ 
    @control phone: TextBox;
    /** e-mail */ 
    @control email: TextBox;
}