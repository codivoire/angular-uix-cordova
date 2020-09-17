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
    const birthdate = composeBirthdate(g);

    return HelperDate.isValid(birthdate)
      ? null
      : { valid: false, value: birthdate };
  }

  export function email(g: AbstractControl) {
    let result = { valid: false };

    if (
      String(g.value).match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") !==
      null
    ) {
      result = null;
    }

    return result;
  }

  export function equalTo(s1: string, s2: string) {
    return (g: FormGroup): { [key: string]: boolean } | null => {
      return g.controls[s1].value !== g.controls[s2].value
        ? { valid: false }
        : null;
    };
  }

  function composeBirthdate(g: AbstractControl): string {
    let d = g.get("day").value;
    let m = g.get("month").value;
    const y = g.get("year").value;

    d = d <= 9 ? "0" + d : d;
    m = m <= 9 ? "0" + m : m;

    const bd = y + "-" + m + "-" + d;

    return bd;
  }
}
