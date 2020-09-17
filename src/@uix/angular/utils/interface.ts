import { Subject, Subscription } from "rxjs";

export type BackButtonEvent = CustomEvent<BackButtonEventDetail>;

export interface BackButtonEventDetail {
  register(priority: number, handler: () => Promise<any> | void): void;
}

export interface BackButtonEmitter extends Subject<BackButtonEventDetail> {
  subscribeWithPriority(
    priority: number,
    callback: () => Promise<any> | void
  ): Subscription;
}

export interface UixSetupConfig {
  platformBuild?: string;
  pageTransition?: any;
}
