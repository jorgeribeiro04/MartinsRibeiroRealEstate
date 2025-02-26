import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false,
})
export class MyProfilePage implements OnInit {
  private contentId = 'personalProfile';
  constructor() {}

  ngOnInit() {}

  getContentId() {
    return this.contentId;
  }
}
