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
import { finalize, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-future-class',
  templateUrl: './future-class.component.html',
  styleUrls: ['./future-class.component.css']
})
export class FutureClassComponent implements OnInit, OnDestroy {

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

  _room: String;

  /**
   * Used to update table details structure
   * @type {number}
   */
  update = 0;

  /**
   * Data to be sent to the table
   */
  tableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Code', key: 'code', width: 175, align: 'center'},
      {name: 'Course', key: 'title', width: 175, align: 'center'},
      {name: 'Duration', key: 'duration', width: 200, align: 'center'}
    ],
    data: [],
    refresh: false,
    offsetHeight: 0
  };

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
    if (!routeData.classes) {
      this._cService.error('500', 'Classes could not be retrieved');
    }
  }

  ngOnInit() {
    const routeData = this._route.snapshot.data;
    console.log(routeData);

    /* Classes */
    if (routeData.classes.classes.length > 0) {
      routeData.classes.classes.forEach(c => {
        c.duration = moment(c.start_time, 'HH:mm:ss').format('hh:mm A') + ' - ' + moment(c.end_time, 'HH:mm:ss').format('hh:mm A');
        this._classes.push(c);
      });
    }
    if (this._classes.length > 0) {
      this._room = 'Classes coming up for  ' + this._classes[0].room;
    } else {
      this._room = 'No more classes coming up';
    }

    console.log(this._room);

    this.tableRequest.data = this._classes;
    this.update++;

    this._locationSubscription = this._location.subscribe(e => this.goBack());
    this._buildPage(routeData);
  }

  /**
   * Builds the page when loaded
   * @param routeData
   */
  private _buildPage(routeData: any) {
    // Add Code
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
   * Navigate back to summary
   */
  goBack() {
    this._router.navigate(['']);
  }

}
