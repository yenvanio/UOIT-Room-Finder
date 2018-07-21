import { AbstractControl } from '@angular/forms';

/**
 * All custom validators live here.
 */
export class CustomValidators {
  /**
   * Field is required.
   * @param {AbstractControl} control
   * @returns {{required: string}}
   */
  static required(control: AbstractControl) {
    return control.value === '' || !control.value ? {required: 'Field cannot be empty!'} : null;
  }
}
