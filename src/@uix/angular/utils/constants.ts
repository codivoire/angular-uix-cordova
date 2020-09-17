import { HelperDevice } from "../helpers/device";
import { IosTranstion } from "../animations/ios-transition";
import { MdTranstion } from "../animations/md-transition";

// const TRANSITION = HelperDevice.is("ios") ? IosTranstion : MdTranstion;

export const UIX_PLATFORMS = {
  ANDROID: "android",
  IOS: "ios"
};

export const UIX_PAGE = { TRANSITION: MdTranstion };
