import { Subject } from "rxjs";

export const readQueryParam = (url: string, key: string) => {
  key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
  const results = regex.exec(url);
  return results ? decodeURIComponent(results[1].replace(/\+/g, " ")) : null;
};

export const proxyEvent = <T>(
  emitter: Subject<T>,
  el: EventTarget,
  eventName: string
) => {
  if (el as any) {
    el.addEventListener(eventName, (ev: Event | undefined | null) => {
      // ?? cordova might emit "null" events
      emitter.next(ev != null ? ((ev as any).detail as T) : undefined);
    });
  }
};
