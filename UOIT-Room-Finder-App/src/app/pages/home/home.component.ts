import { Component, OnInit } from '@angular/core';
import { HeaderRequest } from '../../core/models/header-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Data to be sent to the page header
   */
  headerInfo: HeaderRequest = {
    title: 'Summer Semester',
    src: '../../../assets/images/summer.jpg'
  };

  /**
   * export interface HeaderRequest {
    title: string;
    image?: HeaderImageObject;
}

export interface HeaderImageObject {
    src?: string;
    html?: string;
}

   */

  constructor() { }

  ngOnInit() {
  }

}
