import { FormGroup, AbstractControl, ValidatorFn } from "@angular/forms";
import { HelperDate } from "./date";

export namespace HelperValidators {
  export function contains(array: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !array.includes(control.value) ? { valid: false } : null;
    };
  }

  export function passwordMatch(g: FormGroup) {
    return g.get("password").value === g.get("passwordConfirm").value
      ? null
      : { mismatch: true };
  }

  export function birthdate(g: FormGroup) {
    const birthdate = HelperDate.composeBirthdate(g);

    return HelperDate.isValid(birthdate)
      ? null
      : { valid: false, value: birthdate };
  }
}
