import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../core/constants';
import * as moment from 'moment';
import { Class } from '../models/class';

@Injectable()
export class HomeService {

  /**
   * Constructor
   * @param {HttpClient} _http
   * @param _translateService
   */
  constructor(private _http: HttpClient) { }

  getByParam(date: String, start_time: String, end_time: String, building: String): Observable<Class[]> {
    let apiURL = `${API_URL}/classes?date=${date}`;
    if (start_time) {
      apiURL += `&start_time=${start_time}`;
    }
    if (end_time) {
      apiURL += `&end_time=${end_time}`;
    }
    if (building) {
      apiURL += `&building=${building}`;
    }

    return this._http.get<Class[]>(apiURL);
  }

}
