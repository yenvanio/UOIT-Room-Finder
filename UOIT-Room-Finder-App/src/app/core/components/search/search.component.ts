import { Component, OnInit, Input } from '@angular/core';
import { SearchRequest } from '../../models/search-request';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /*
  * Data passed to the Header Component
  */
  @Input() data: SearchRequest;

  constructor() { }

  ngOnInit() {
  }

}
