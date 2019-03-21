import { trigger } from "@angular/animations";

import { Platform } from "../providers/platform";

import { IosTranstion } from "./transition/ios-transition";
import { MdTranstion } from "./transition/md-transition";

const direction = "forward";
const transitions = Platform.is("ios") ? IosTranstion : MdTranstion;

export const RouterTransition = trigger(
  "routerTransition",
  transitions[direction]
);
