import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  private _alive = true;

  errorCode: Number | String = '404';
  errorTitle: String = 'errors.404';
  errorMessage: String = 'Page does not exist';

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.pipe(takeWhile(() => this._alive)).subscribe(params => {
      if (params.get('code')) {
        this.errorCode = params.get('code');
        this.errorTitle = `errors.${this.errorCode}`;
        this.errorMessage = params.get('message');
      }
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

  /**
   * Navigates back to the page before the error occurred.
   */
  goBack() {
    const PRE_PRE_PAGE = -2;
    window.history.go(PRE_PRE_PAGE);
  }

}
