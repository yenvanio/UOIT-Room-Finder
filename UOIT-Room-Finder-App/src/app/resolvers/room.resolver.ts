import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { Room } from '../models/room';

/**
 * Home Page resolver. Gets initial data for the home page table
 */
@Injectable()
export class RoomResolver implements Resolve<Observable<Room[]>> {
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
    return this._hService.getRooms();
  }
}
