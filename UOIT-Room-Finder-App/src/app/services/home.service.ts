import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../core/constants';
import { Class } from '../models/class';

@Injectable()
export class HomeService {

  /**
   * Constructor
   * @param {HttpClient} _http
   * @param _translateService
   */
  constructor(private _http: HttpClient) { }

  getByParam(date: String, start_time: String, end_time: String): Observable<Class[]> {
    let apiURL = `${API_URL}/classes`;
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
    return this._http.get<Class[]>(`${API_URL}/classes`);
  }

  getRoomSchedule(room: String): Observable<Class[]> {
    let apiURL = `${API_URL}/roomSchedule`;
    if (room) {
      apiURL += `?room=${room}`;
    }
    return this._http.get<Class[]>(apiURL);
  }

}
