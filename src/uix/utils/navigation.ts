import { trigger } from "@angular/animations";

import { Platform } from "../providers/platform";

import { IosTranstion } from "./transition/ios-transition";
import { MdTranstion } from "./transition/md-transition";

export const RouterTransition = trigger(
  "routerTransition",
  Platform.is("ios") ? IosTranstion : MdTranstion
);
