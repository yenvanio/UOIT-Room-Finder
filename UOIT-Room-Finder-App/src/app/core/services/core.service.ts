import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class CoreService {

  /**
   * Constructor.
   * @param {Router} _router
   */
  constructor(private _router: Router) { }

  /**
   * Navigates to the error page to show message
   * @param {number | string} code
   * @param {string} message
   */
  error(code: number | string, message: string) {
    this._router.navigate(['/error', {code: code, message: message}]);
  }
}
