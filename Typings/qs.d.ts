// Type definitions for qs 6.5.0
// Project: https://github.com/ljharb/qs
// Definitions by: Roman Korneev <https://github.com/RWander>
//                 Leon Yu <https://github.com/leonyu>
//                 Belinda Teh <https://github.com/tehbelinda>
//                 Melvin Lee <https://github.com/zyml>
//                 Arturs Vonda <https://github.com/artursvonda>
//                 Carlos Bonetti <https://github.com/CarlosBonetti>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace qs {
    export interface IStringifyOptions {
        delimiter?: string;
        strictNullHandling?: boolean;
        skipNulls?: boolean;
        encode?: boolean;
        encoder?: (str: string) => any;
        filter?: Array<string | number> | ((prefix: string, value: any) => any);
        arrayFormat?: 'indices' | 'brackets' | 'repeat';
        indices?: boolean;
        sort?: (a: any, b: any) => number;
        serializeDate?: (d: Date) => string;
        format?: 'RFC1738' | 'RFC3986';
        encodeValuesOnly?: boolean;
        addQueryPrefix?: boolean;
        allowDots?: boolean;
    }

    export interface IParseOptions {
        delimiter?: string | RegExp;
        depth?: number;
        decoder?: (str: string) => any;
        arrayLimit?: number;
        parseArrays?: boolean;
        allowDots?: boolean;
        plainObjects?: boolean;
        allowPrototypes?: boolean;
        parameterLimit?: number;
        strictNullHandling?: boolean;
        ignoreQueryPrefix?: boolean;
    }

    export function stringify(obj: any, options?: IStringifyOptions): string;
    export function parse(str: string, options?: IParseOptions): any;
}