import {Component} from '@angular/core';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import * as moment from 'moment';

/**
 * Root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loading = false;

  /**
   * Constructor.
   * Subscribes to router events to handle navigation changes
   * @param {Router} _router
   */
  constructor(private _router: Router) {
    _router.events.subscribe((routerEvent: Event) => this.checkRouterEvent(routerEvent));
  }

  /**
   * Handles router event changes
   * @param {Event} routerEvent
   */
  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof  NavigationStart) {
      this.loading = true;
      console.log('spinning');
    } else if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
      this.loading = false;
      console.log('stop');
    }
  }
}
