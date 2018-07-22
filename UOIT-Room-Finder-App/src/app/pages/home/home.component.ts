import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRequest } from '../../core/models/table-request';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { Class } from '../../models/class';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Location } from '@angular/common';
import {finalize, takeWhile} from 'rxjs/operators';

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
    refresh: true,
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
    routeData.classes.classes.forEach(c => {
      if (c.type === 'Laboratory') {
        c.isLab = true;
      }
      this._classes.push(c);
    });
    this.tableRequest.data = this._classes;
    this.update++;

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
   * Refresh and update table
   */
  refreshTable() {
    console.log('refresh');
    this._hService.getWithoutParam().pipe(takeWhile(() => this._alive),
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
   * Navigate back to summary
   */
  goBack() {
    this._router.navigate(['/app/home']);
  }

}
