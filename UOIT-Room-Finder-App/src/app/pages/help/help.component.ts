import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newTab(type) {
    let url = '';
    if (type === 'mail') {
      url = 'mailto:yoganathan.shiv@gmail.com?Subject=UOITRoomFinder%20Inquiry';
    } else if (type === 'devPage') {
      url = 'https://play.google.com/store/apps/dev?id=5450137585172063918';
    } else if (type === 'website') {
      url = 'http://yshiv.com';
    }
    window.open(url, '_blank');
  }

}
