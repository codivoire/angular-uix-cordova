import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";

import { NetworkService } from "../services/network.service";
import { ConnectionStatus } from "../models/core";

@Injectable({
  providedIn: "root"
})
export class NetworkGuard implements CanActivate {
  constructor(private networkService: NetworkService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const disconnected =
      this.networkService.getStatus() === ConnectionStatus.Offline;

    this.networkService.emitGuard(disconnected);

    return disconnected ? false : true;
  }
}
