declare module textArea {
    interface TextAreaAutosize {
        //(): any;
        //(element: Array<HTMLElement>, options?: any);
        //autosize(element: any, options?: any): any;
        //(el: Element): void;
        //(el: NodeList): void;
        //(el: Element, options: any): void;
        //(el: NodeList, options: any): void;
        //(el: JQuery): void;
        //update(el: NodeList): void;
        //destroy(el: NodeList): void;
        autosize(el: Element): void;
    }
}

declare module 'textArea' {
    var textArea: textArea.TextAreaAutosize;
    export = textArea;
}