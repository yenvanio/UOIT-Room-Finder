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
export class FutureClassResolver implements Resolve<Observable<Class[]>> {
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
    const room = route.paramMap.get('room');
    const date = route.paramMap.get('date') || moment().format('YYYY-MM-DD');
    const start_time = route.paramMap.get('start_time') || moment().format('HH:mm:ss');
    return this._hService.getFutureClasses(room, date, start_time);
  }
}
