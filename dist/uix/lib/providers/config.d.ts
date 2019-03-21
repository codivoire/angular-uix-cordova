import { InjectionToken } from "@angular/core";
export declare class Config {
    get(key: keyof UIXconfig, fallback?: any): any;
    getBoolean(key: keyof UIXconfig, fallback?: boolean): boolean;
    getNumber(key: keyof UIXconfig, fallback?: number): number;
    set(key: keyof UIXconfig, value?: any): void;
}
export interface UIXconfig {
    id: string;
    name: string;
    version: string;
}
export declare const ConfigToken: InjectionToken<any>;
