import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validateEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }],
})
export class EmailValidatorDirective implements Validator {
  // https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
  // tslint:disable-next-line:max-line-length
  private validEmailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  validate(control: AbstractControl): { [key: string]: any } {
    return !this.validEmailRe.test(control.value)
      ? { email: true }
      : null
      ;
  }
}
