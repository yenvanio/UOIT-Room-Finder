import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { HeaderRequest } from '../../models/header-request';

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
   * Data passed to the Header Component
   */
  @Input() data: HeaderRequest;

  constructor() { }

  ngOnInit() {
  }

}
