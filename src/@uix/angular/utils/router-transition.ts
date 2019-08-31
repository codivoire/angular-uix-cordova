import { trigger } from "@angular/animations";

import Helpers from "../helpers/core";

import { IosTranstion } from "../animations/ios-transition";
import { MdTranstion } from "../animations/md-transition";

const transition = Helpers.Device.is("ios") ? IosTranstion : MdTranstion;

export const RouterTransition = trigger("routerTransition", transition);
