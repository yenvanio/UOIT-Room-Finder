import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRequest } from '../../core/models/table-request';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { Class } from '../../models/class';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../core/validators';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.css']
})
export class SearchRoomComponent implements OnInit, OnDestroy {
    /**
   * Classes
   * @type {Class[]}
   */
  private _classes: Class[] = [];

  /**
   * Used to hold location change subscription
   */
  private _locationSubscription: ISubscription;

  /** To unsubscribe from observables. */
  private _alive = true;

  /**
   * Used to update table details structure
   * @type {number}
   */
  update = 0;

  /**
   * Data to be sent to the table
   */
  MtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Monday', key: 'M', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250,
  };
  TtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Tuesday', key: 'T', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  WtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Wednesday', key: 'W', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  RtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Thursday', key: 'R', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  FtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Friday', key: 'F', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };

  /**
   * Form
   * @type {FormGroup}
   */
  form: FormGroup = new FormGroup({
    /*General*/
    room: new FormControl('', [CustomValidators.required]),
  });

  /**
   * Constructor
   * @param {HomeService} _hService
   * @param {CoreService} _cService
   * @param {ActivatedRoute} _route
   * @param {Router} _router
   * @param {Location} _location
   */
  constructor(
    private _hService: HomeService,
    private _cService: CoreService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location) { }

  ngOnInit() {
    this._locationSubscription = this._location.subscribe(e => this.goBack());
  }

  /**
   * On Destroy. End subscriptions.
   */
  ngOnDestroy() {
    this._alive = false;
    if (this._locationSubscription) {
      this._locationSubscription.unsubscribe();
    }
  }

  /**
   * Builds the page when loaded
   * @param routeData
   */
  private _buildPage(routeData: any) {
    // Add Code
  }

  /**
   * Refresh and update table
   */
  refreshTable() {
    console.log('refresh');
    this._hService.getWithoutParam();
  }

  /**
   * Display more information about a row from the table
   */
  goToDetails(ev: any) {
    console.log(ev);
  }

  /**
   * Gets errors for any form control
   * @param {string} controlName
   * @returns {string}
   */
  getError(controlName: string): string {
    return this.form.get(controlName).errors && this.form.get(controlName).errors[Object.keys(this.form.get(controlName).errors)[0]];
  }

  /**
   * Navigate back to summary
   */
  goBack() {
    this._router.navigate(['/app/home']);
  }
}
