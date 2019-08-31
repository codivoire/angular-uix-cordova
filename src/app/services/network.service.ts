import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Subject, Observable } from "rxjs";

import { Network } from "@ionic-native/network/ngx";

import { ConnectionStatus } from "../models/core";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  private status: Subject<ConnectionStatus>;
  private guard: Subject<boolean>;

  constructor(private network: Network, private plt: Platform) {
    this.status = new Subject();
    this.guard = new Subject();

    this.plt.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        this.status.next(ConnectionStatus.Offline);
      });

      this.network.onConnect().subscribe(() => {
        this.status.next(ConnectionStatus.Online);
      });
    });
  }

  onChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  onEmitGuard(): Observable<boolean> {
    return this.guard.asObservable();
  }

  emitGuard(token) {
    this.guard.next(token);
  }

  getStatus(): ConnectionStatus {
    return this.getState();
  }

  isOnline() {
    return this.getStatus() === ConnectionStatus.Online;
  }

  isOffline() {
    return this.getStatus() === ConnectionStatus.Offline;
  }

  private getState() {
    const status =
      this.network.type !== "none"
        ? ConnectionStatus.Online
        : ConnectionStatus.Offline;

    return status;
  }
}
