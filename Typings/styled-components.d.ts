/// <reference path="react/react.d.ts" />
/// <reference path="react/react-dom.d.ts" />
/// <reference path="react/react-addons-create-fragment.d.ts" />
/// <reference path="react/react-addons-css-transition-group.d.ts" />
/// <reference path="react/react-addons-linked-state-mixin.d.ts" />
/// <reference path="react/react-addons-perf.d.ts" />
/// <reference path="react/react-addons-pure-render-mixin.d.ts" />
/// <reference path="react/react-addons-test-utils.d.ts" />
/// <reference path="react/react-addons-transition-group.d.ts" />
/// <reference path="react/react-addons-update.d.ts" />
/// <reference path="tags.d.ts" />

declare namespace styled {
    type Component<P> = React.ComponentClass<P> | React.StatelessComponent<P>;

    export interface ThemeProps<T> {
        theme: T;
    }

    export type ThemedStyledProps<P, T> = P & ThemeProps<T>;
    export type StyledProps<P> = ThemedStyledProps<P, any>;

    export type ThemedOuterStyledProps<P, T> = P & {
        theme?: T;
        innerRef?: (instance: any) => void;
    };
    export type OuterStyledProps<P> = ThemedOuterStyledProps<P, any>;

    export type Interpolation<P> = FlattenInterpolation<P> | ReadonlyArray<FlattenInterpolation<P> | ReadonlyArray<FlattenInterpolation<P>>>;
    export type FlattenInterpolation<P> = InterpolationValue | InterpolationFunction<P>;
    export type InterpolationValue = string | number | StyledComponentClass<any, any, any>;
    export type SimpleInterpolation = InterpolationValue | ReadonlyArray<InterpolationValue | ReadonlyArray<InterpolationValue>>;
    export interface InterpolationFunction<P> {
        (props: P): Interpolation<P>;
    }

    type Attrs<P, A extends Partial<P>, T> = {
        [K in keyof A]: ((props: ThemedStyledProps<P, T>) => A[K]) | A[K];
    };

    export interface StyledComponentClass<P, T, O> extends React.ComponentClass<ThemedOuterStyledProps<O, T>> { // O = P
        extend: ThemedStyledFunction<P, T, O>;

        withComponent<K extends keyof HTMLTags>(tag: K): StyledComponentClass<React.HTMLProps<HTMLTags[K]>, T, O>;
        withComponent<K extends keyof SVGTags>(tag: K): StyledComponentClass<React.SVGAttributes, T, O>;
        withComponent(element: React.ComponentClass<P>): StyledComponentClass<P, T, O>;
    }

    export interface ThemedStyledFunction<P, T, O> {
        (strings: TemplateStringsArray, ...interpolations: Interpolation<ThemedStyledProps<P, T>>[]): StyledComponentClass<P, T, O>;
        <U>(strings: TemplateStringsArray, ...interpolations: Interpolation<ThemedStyledProps<P & U, T>>[]): StyledComponentClass<P & U, T, O & U>;
        attrs<U, A extends Partial<P & U>>(attrs: Attrs<P & U, A, T>): ThemedStyledFunction<P & A & U, T, O & U>;
    }

    export type StyledFunction<P> = ThemedStyledFunction<P, any, P>;

    export type ThemedHtmlStyledFunction<E, T> = ThemedStyledFunction<React.HTMLProps<E>, T, React.HTMLProps<E>>;
    export type HtmlStyledFunction<E> = ThemedHtmlStyledFunction<E, any>;

    export type ThemedSvgStyledFunction<E extends SVGElement, T> = ThemedStyledFunction<React.SVGAttributes, T, React.SVGAttributes>;
    export type SvgStyledFunction<E extends SVGElement> = ThemedSvgStyledFunction<E, any>;

    type ThemedStyledComponentFactoriesHTML<T> = {
        [K in keyof HTMLTags]: ThemedHtmlStyledFunction<HTMLTags[K], T>;
    };

    type ThemedStyledComponentFactoriesSVG<T> = {
        [K in keyof SVGTags]: ThemedSvgStyledFunction<SVGTags[K], T>;
    };

    type ThemedStyledComponentFactories<T> = ThemedStyledComponentFactoriesHTML<T> & ThemedStyledComponentFactoriesSVG<T>;

    export interface ThemedBaseStyledInterface<T> extends ThemedStyledComponentFactories<T> {
        <P extends { theme?: T; }>(component: Component<P>): ThemedStyledFunction<P, T, WithOptionalTheme<P, T>>;
        <P>(component: Component<P>): ThemedStyledFunction<P, T, P>;
    }
    export type BaseStyledInterface = ThemedBaseStyledInterface<any>;

    export type ThemedStyledInterface<T> = ThemedBaseStyledInterface<T>;
    export type StyledInterface = ThemedStyledInterface<any>;

    export interface ThemeProviderProps<T> {
        theme?: T | ((theme: T) => T);
    }
    export type ThemeProviderComponent<T> = React.ComponentClass<ThemeProviderProps<T>>;

    export interface ThemedCssFunction<T> {
        (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): InterpolationValue[];
        <P>(strings: TemplateStringsArray, ...interpolations: Interpolation<ThemedStyledProps<P, T>>[]): FlattenInterpolation<ThemedStyledProps<P, T>>[];
    }

    // Helper type operators
    type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];
    type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
    type WithOptionalTheme<P extends { theme?: T; }, T> = Omit<P, "theme"> & { theme?: T; };

    export interface ThemedStyledComponentsModule<T> {
        default: ThemedStyledInterface<T>;

        css: ThemedCssFunction<T>;
        keyframes(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): string;
        injectGlobal(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): void;
        withTheme<P extends { theme?: T; }>(component: Component<P>): React.ComponentClass<WithOptionalTheme<P, T>>;

        ThemeProvider: ThemeProviderComponent<T>;
    }
    
    export const styled: StyledInterface;

    export const css: ThemedCssFunction<any>;
    export function withTheme<P extends { theme?: T; }, T>(component: Component<P>): React.ComponentClass<WithOptionalTheme<P, T>>;

    export function keyframes(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): string;
    export function injectGlobal(strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): void;

    export const ThemeProvider: ThemeProviderComponent<object>;

    interface StylesheetComponentProps {
        sheet: ServerStyleSheet;
    }

    export class StyleSheetManager extends React.Component<StylesheetComponentProps, {}> { }

    export class ServerStyleSheet {
        collectStyles(tree: React.ReactNode): React.ReactElement<StylesheetComponentProps>;

        getStyleTags(): string;
        getStyleElement(): React.ReactElement<{}>[];
    }
}