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
import { finalize, takeWhile } from 'rxjs/operators';
import {TIME_DROPDOWN} from '../../core/constants';

@Component({
  selector: 'app-search-time',
  templateUrl: './search-time.component.html',
  styleUrls: ['./search-time.component.css']
})
export class SearchTimeComponent implements OnInit, OnDestroy {
    /**
   * Classes
   * @type {Class[]}
   */
  private _classes: Class[] = [];

  private timeSelect = TIME_DROPDOWN;

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
  tableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Room', key: 'room', width: 200, align: 'center'},
      {name: 'Building', key: 'building', width: 300, align: 'center'},
      {name: '', key: 'isLab', width: 150, align: 'center',
        icon: {
          title: 'Lab Room: Might be Locked!',
          class: 'material-icons',
          icon: 'warning',
          key: 'warning'
        }
      },
    ],
    data: [],
    refresh: false,
    offsetHeight: 50
  };

  /**
   * Form
   * @type {FormGroup}
   */
  form: FormGroup = new FormGroup({
    /*General*/
    date: new FormControl(moment(), [CustomValidators.required]),
    start_time: new FormControl(),
    end_time: new FormControl(),
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

  search() {
    const date = this.form.get('date').value.format('YYYY-MM-DD') || moment().format('YYYY-MM-DD');
    const start_time = this.form.get('start_time').value || moment().format('HH:mm:ss');
    const end_time = this.form.get('end_time').value || moment(date + ' ' + start_time).add(1, 'hours').format('HH:mm:ss');
    this._hService.getByParam(date, start_time, end_time).pipe(takeWhile(() => this._alive),
    finalize(() => {
      console.log(this._classes);
      this.tableRequest.data = this._classes;
      this.update++;
    })).subscribe(
      result => {
        result.classes.forEach(c => {
          if (c.type === 'Laboratory') {
            c.isLab = true;
          }
        });
        this._classes = result.classes;
      });
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

  /**
   * Whether the user can search or not.
   * @returns {boolean}
   */
  get cantSearch() {
    const date = moment().format('YYYY-MM-DD');
    console.log(moment(date + ' ' + this.form.get('start_time').value));
    console.log(moment(date + ' ' + this.form.get('end_time').value));
    return this.form.invalid ||
      Date.parse('01/01/2011 ' + this.form.get('start_time').value) >= Date.parse('01/01/2011 ' + this.form.get('end_time').value);
  }

}

