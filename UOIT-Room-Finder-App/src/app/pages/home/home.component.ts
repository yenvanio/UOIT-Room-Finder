import { Component, OnInit } from '@angular/core';
import { HeaderRequest } from '../../core/models/header-request';
import { TableRequest } from '../../core/models/table-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Data to be sent to the page header
   */
  headerRequest: HeaderRequest = {
    title: 'UOIT Room Finder',
  };

  /**
   * Data to be sent to the table
   */
  tableRequest: TableRequest = {
    theme: 'blue',
    headers: [
      {name: 'Room', key: 'room', width: 200, align: 'center'},
      {name: 'Building', key: 'building', width: 300, align: 'center'},
      {
        name: 'Lab', key: 'isLab', width: 150, align: 'center', image:
          {trueValue: true, trueImageRef: '../../../assets/images/warning.svg', falseImageRef: ''}
      },
    ],
    data: []
  };

  constructor() { }

  ngOnInit() {
  }

}
