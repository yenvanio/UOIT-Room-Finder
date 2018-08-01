import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRequest } from '../../core/models/table-request';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core/services/core.service';
import { Class } from '../../models/class';
import { Room, MapLocation } from '../../models/room';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { finalize, takeWhile } from 'rxjs/operators';
import {} from '@types/googlemaps';

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
  _classes: Class[] = [];

  google: any;
  map: any;

  /**
   * Used to hold location change subscription
   */
  private _locationSubscription: ISubscription;

  /** To unsubscribe from observables. */
  private _alive = true;

  _room = new Room();

  _headerText: String;

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
    offsetHeight: 200,
    widthPercent: 50
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
    if (!routeData.classes || !routeData.map) {
      this._cService.error('500', 'Data could not be retrieved');
    }
  }

  ngOnInit() {
    const routeData = this._route.snapshot.data;
    console.log(routeData);

    this._room = routeData.map.details[0];

    /* Classes */
    if (routeData.classes.classes.length > 0) {
      routeData.classes.classes.forEach(c => {
        c.duration = moment(c.start_time, 'HH:mm:ss').format('hh:mm A') + ' - ' + moment(c.end_time, 'HH:mm:ss').format('hh:mm A');
        this._classes.push(c);
      });
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
    this.getLocations();
    this.initMap();
  }

  getLocations() {
    const loc_arr = this._room.location.split(';');
    const locations: MapLocation[] = [];
    loc_arr.forEach(l => {
      const latlng_arr = l.split(',');
      const loc = new MapLocation();
      loc.lat = parseFloat(latlng_arr[0]);
      loc.lng = parseFloat(latlng_arr[1]);
      locations.push(loc);
    });
    this._room.locations = locations;
  }

  initMap() {
    // The location of building
    this._room.locations.forEach(l => {
      const location = {lat: l.lat, lng: l.lng};
      // The map, centered at Uluru
      const map = new google.maps.Map(
          document.getElementById('map'), {zoom: 17, center: location});
      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({position: location, map: map, title: this._room.building + ': ' + this._room.room});
    });
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
