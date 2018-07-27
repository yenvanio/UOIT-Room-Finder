import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRequest } from '../../core/models/table-request';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { Class } from '../../models/class';
import { Room } from '../../models/room';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../core/validators';
import { finalize, takeWhile } from 'rxjs/operators';

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
  private _Mclasses: Class[] = [];
  private _Tclasses: Class[] = [];
  private _Wclasses: Class[] = [];
  private _Rclasses: Class[] = [];
  private _Fclasses: Class[] = [];

  /**
   * Used to hold location change subscription
   */
  private _locationSubscription: ISubscription;

  /** To unsubscribe from observables. */
  private _alive = true;

  private _rooms: Room[] = [];
  filteredRooms: Room[] = [];

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
      {name: 'Monday', key: 'time', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250,
  };
  TtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Tuesday', key: 'time', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  WtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Wednesday', key: 'time', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  RtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Thursday', key: 'time', width: 200, align: 'center'},
      {name: 'Type', key: 'type', width: 300, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 250
  };
  FtableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Friday', key: 'time', width: 200, align: 'center'},
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
    private _location: Location) {
      // Checking to see if resolver delivered data correctly
      const routeData = this._route.snapshot.data;
      if (!routeData.rooms) {
        this._cService.error('500', 'Rooms could not be retrieved');
      }
    }

  ngOnInit() {
    const routeData = this._route.snapshot.data;
    console.log(routeData);

    if (routeData.rooms.rooms.length > 0) {
      /* Rooms */
      routeData.rooms.rooms.forEach(c => {
        this._rooms.push(c);
      });
    }
    this._handleRoomFiltering();
    this._locationSubscription = this._location.subscribe(e => this.goBack());
    this._buildPage(routeData);
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
   * Filters the room list
   * @private
   */
  private _handleRoomFiltering() {
    this.form.get('room').valueChanges.pipe(takeWhile(() => this._alive)).subscribe(val => {
      const str = val.toLowerCase().split(' ').join('');
      this.filteredRooms = this._rooms.filter(a => a.room.toLowerCase().includes(str));
      console.log(this.filteredRooms);
    });
  }

  search() {
    const room = this.form.get('room').value;
    this._hService.getRoomSchedule(room).pipe(takeWhile(() => this._alive),
    finalize(() => {
      this.MtableRequest.data = this._Mclasses;
      this.TtableRequest.data = this._Tclasses;
      this.WtableRequest.data = this._Wclasses;
      this.RtableRequest.data = this._Rclasses;
      this.FtableRequest.data = this._Fclasses;
      this.update++;
    })).subscribe(
      result => {
        this.emptyArrays();
        result['classes'].forEach(c => {
          c.time = moment(c.start_time, 'HH:mm:ss').format('hh:mm A') + ' - ' + moment(c.end_time, 'HH:mm:ss').format('hh:mm A');
          if (c.start_date !== c.end_date) {
            c.type = 'Every Week';
          } else {
            c.type = 'Only on ' + moment(c.start_date).format('MMM Do YY');
          }
          if (c.day === 'M') {
            this._Mclasses.push(c);
          } else if (c.day === 'T') {
            this._Tclasses.push(c);
          } else if (c.day === 'W') {
            this._Wclasses.push(c);
          } else if (c.day === 'R') {
            this._Rclasses.push(c);
          } else if (c.day === 'F') {
            this._Fclasses.push(c);
          }
        });
      });
  }

  emptyArrays() {
    this._Mclasses = [];
    this._Tclasses = [];
    this._Wclasses = [];
    this._Rclasses = [];
    this._Fclasses = [];
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
    this._router.navigate(['']);
  }

  /**
   * Whether the user can search or not.
   * @returns {boolean}
   */
  get cantSearch() {
    return this.form.invalid;
  }
}
