import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRequest } from '../../core/models/table-request';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { Class } from '../../models/class';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { finalize, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
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

  /** Used to countdown for class availability and the display text */
  _countDownTimer;
  _countDownTimerText;

  /**
   * Data to be sent to the table
   */
  tableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Room', key: 'room', width: 200, align: 'center'},
      {name: 'Building', key: 'building', width: 300, align: 'center'},
      {name: '', key: 'lab', width: 50, align: 'left',
        icon: {
          title: 'Lab Room: Might be Locked!',
          class: 'material-icons',
          icon: 'warning',
          key: 'warning'
        }
      },
    ],
    data: [],
    refresh: true,
    offsetHeight: 0,
    widthPercent: 100
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

    if (routeData.classes.classes.length > 0) {
      this._startCountDown();
      /* Classes */
      routeData.classes.classes.forEach(c => {
        if (c.isLab === 'Laboratory') {
          c.lab = true;
        }
        this._classes.push(c);
      });
    } else {
      this._endCountDown();
    }
    this.tableRequest.data = this._classes;
    this.update++;

    this._locationSubscription = this._location.subscribe(e => this.goBack());
    this._buildPage(routeData);
  }

  /**
   * On Destroy. End subscriptions.
   */
  ngOnDestroy() {
    clearInterval(this._countDownTimer);
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
   * Shows a 60min countdown interval for the currently open classes
   */
  private _startCountDown() {
    // Set the date we're counting down to
    const date = moment().format('YYYY-MM-DD');
    const start_time = moment().format('hh:mm A');
    const end_time =  moment(date + ' ' + start_time).add(1, 'hours').format('hh:mm A');
    this._countDownTimerText = 'Rooms open from ' + start_time + ' - ' + end_time;
  }

  private _endCountDown() {
    this._countDownTimerText = 'No Open Rooms';
  }

  /**
   * Refresh and update table
   */
  refreshTable() {
    this._countDownTimerText = '';
    console.log('refresh');
    this._hService.getWithoutParam().pipe(takeWhile(() => this._alive),
    finalize(() => {
      console.log(this._classes);
      this.tableRequest.data = this._classes;
      this.update++;
    })).subscribe(
      result => {
        result['classes'].forEach(c => {
          if (c.isLab === 'Laboratory') {
            c.lab = true;
          }
        });
        this._classes = result['classes'];
      });
    if (this._classes.length > 0) {
      this._startCountDown();
    } else {
      this._endCountDown();
    }
  }

  /**
   * Display more information about a row from the table
   */
  goToDetails(ev: any) {
    console.log(ev);
    const queryData = {
      room: ev.room,
      building: ev.building,
      start_time: ev.location
    };
    this._router.navigate(['search/future', queryData]);
  }

  /**
   * Navigate back to summary
   */
  goBack() {
    this._router.navigate(['']);
  }

}
