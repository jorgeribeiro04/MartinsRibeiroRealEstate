import { Component, OnInit } from '@angular/core';
import { Counties } from 'src/counties.const';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false,
})
export class MyProfilePage implements OnInit {
  counties: string[] = Counties;
  countryRegion: string = 'ie';
  countryCode: string = '353';
  private contentId = 'personalProfile';
  constructor() {}

  ngOnInit() {}

  getContentId() {
    return this.contentId;
  }

  selectedCountry(countryCode: string[]) {
    this.countryCode = countryCode[0];
    this.countryRegion = countryCode[1];
  }
}
