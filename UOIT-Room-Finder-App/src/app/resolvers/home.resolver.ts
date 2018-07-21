import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { Class } from '../models/class';
import * as moment from 'moment';

/**
 * Home Page resolver. Gets initial data for the home page table
 */
@Injectable()
export class HomeResolver implements Resolve<Observable<Class[]>> {
  /**
   * Constructor.
   * @param {HomeService} _hService
   */
  constructor(private _hService: HomeService) {
  }

  /**
   * Gets empty classes from service.
   * @param {ActivatedRouteSnapshot} route
   * @returns {any}
   */
  resolve(route: ActivatedRouteSnapshot) {
    return this._hService.getByParam('2018-07-16', '', '', '');
  }
}
// moment().format('YYYY-MM-DD')