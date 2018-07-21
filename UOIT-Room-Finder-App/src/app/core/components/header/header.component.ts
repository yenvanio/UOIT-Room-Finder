import { Component, OnInit } from '@angular/core';
import { HeaderRequest } from '../../models/header-request';
import { Router } from '@angular/router';

/**
  * Header (Banner) at the top of the page indicating the current semester via an image
  */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    /**
   * Data to be sent to the page header
   */
  data: HeaderRequest = {
    title: 'UOIT Room Finder',
    searchTypes: [
      {
        title: 'Home',
        class: 'material-icons',
        icon: 'home',
        key: 'home'
      },
      {
        title: 'Search by Time',
        class: 'material-icons',
        icon: 'access_time',
        key: 'time'
      },
      {
        title: 'Search by Room',
        class: 'material-icons',
        icon: 'meeting_room',
        key: 'room'
      },
      {
        title: 'Help',
        class: 'material-icons',
        icon: 'help_outline',
        key: 'help'
      }
    ]
  };

  /**
   * Constructor
   * @param {Router} _router
   */
  constructor(private _router: Router) { }

  ngOnInit() { }

  /**
   * Emits data back to the parent component
   * @param {String} type
   */
  private buttonClick(type) {
    console.log(type);
    if (type === 'home') {
      this.goToHome();
    } else if (type === 'time') {
      this.goToTime();
    } else if (type === 'room') {
      this.goToRoom();
    } else if (type === 'building') {
      this.goToBuilding();
    } else if (type === 'help') {
      this.goToHelp();
    }
  }
  /**
   * Functions for the event emitters from the page header component
   */

  goToHome() {
    this._router.navigate(['/app/home']);
  }

  /** Search By Time */
  goToTime() {
    this._router.navigate(['/app/search/time']);
  }

  /** Search By Room */
  goToRoom() {
    this._router.navigate(['/app/search/room']);
  }

  /** Search By Building */
  goToBuilding() {
    this._router.navigate(['/app/search/building']);
  }

  /** Go to Help Page */
  goToHelp() {
    this._router.navigate(['/app/help']);
  }

}
