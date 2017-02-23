import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgModel, Validator } from '@angular/forms';

@Directive({
  selector: '[validateSameAs]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SameAsValidatorDirective, multi: true }],
})
export class SameAsValidatorDirective implements Validator {
  @Input() validateSameAs: NgModel;

  validate(control: AbstractControl): { [key: string]: any } {
    return control.value !== this.validateSameAs.value
      ? { sameAs: true }
      : null
      ;
  }
}
