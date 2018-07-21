import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
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
   * Emits data to parent component when buttons are clicked
   * @type {EventEmitter<Data>}
   */
  @Output() timeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() roomEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() buildingEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() helpEmitter: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Data passed to the Header Component
   */
  @Input() data: HeaderRequest;

  constructor() { }

  ngOnInit() { }

  /**
   * Emits data back to the parent component
   * @param {String} type
   */
  private buttonClick(type) {
    if (type === 'time') {
      this.timeEmitter.emit();
    } else if (type === 'room') {
      this.roomEmitter.emit();
    } else if (type === 'building') {
      this.buildingEmitter.emit();
    } else if (type === 'help') {
      this.helpEmitter.emit();
    }
  }

}
