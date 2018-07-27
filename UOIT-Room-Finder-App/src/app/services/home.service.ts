import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PROD_API_URL } from '../core/constants';
import { Class } from '../models/class';
import { Room } from '../models/room';

@Injectable()
export class HomeService {

  /**
   * Constructor
   * @param {HttpClient} _http
   * @param _translateService
   */
  constructor(private _http: HttpClient) { }

  getByParam(date: String, start_time: String, end_time: String): Observable<Class[]> {
    let apiURL = `${PROD_API_URL}/class/all`;
    if (date) {
      apiURL += `?date=${date}`;
    }
    if (start_time) {
      apiURL += `&start_time=${start_time}`;
    }
    if (end_time) {
      apiURL += `&end_time=${end_time}`;
    }
    return this._http.get<Class[]>(apiURL);
  }

  getWithoutParam(): Observable<Class[]> {
    return this._http.get<Class[]>(`${PROD_API_URL}/class/all`);
  }

  getRoomSchedule(room: String): Observable<Class[]> {
    let apiURL = `${PROD_API_URL}/room/schedule`;
    if (room) {
      apiURL += `?room=${room}`;
    }
    return this._http.get<Class[]>(apiURL);
  }

  getFutureClasses(room: String, date: String, start_time: String): Observable<Class[]> {
    let apiURL = `${PROD_API_URL}/class/future`;
    if (room) {
      apiURL += `?room=${room}`;
    }
    if (date) {
      apiURL += `&date=${date}`;
    }
    if (start_time) {
      apiURL += `&start_time=${start_time}`;
    }
    return this._http.get<Class[]>(apiURL);
  }

  getRooms() {
    const apiURL = `${PROD_API_URL}/room/all`;
    return this._http.get<Room[]>(apiURL);
  }

}
