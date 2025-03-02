import { Component, OnInit, output } from '@angular/core';
import { PhoneNumberUtil } from 'google-libphonenumber';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
  standalone: false,
})
export class PhoneListComponent implements OnInit {
  isModalOpen: boolean = false;
  isOpen = output<boolean>();
  phoneUtil = PhoneNumberUtil.getInstance();
  countryCode = output<string[]>();
  constructor() {}

  ngOnInit() {
    this.displayAllFlagsWithCodes();
  }

  displayAllFlagsWithCodes() {
    const container = document.getElementById('flag-container');

    if (!container) return;

    // Iterate over all possible country codes (from libphonenumber)
    for (let countryCode = 1; countryCode <= 999; countryCode++) {
      try {
        const regionCode =
          this.phoneUtil.getRegionCodeForCountryCode(countryCode);
        if (regionCode && regionCode !== 'ZZ') {
          const flagElement = document.createElement('ion-item');
          flagElement.innerHTML = `
          <ion-radio value="${countryCode}">
            <span class="flag-icon flag-icon-${regionCode.toLowerCase()}"></span>
            <span>+${countryCode} (${regionCode})</span>
            </ion-radio>
          `;

          container.appendChild(flagElement);
        }
      } catch (error) {
        continue;
      }
    }
  }

  selectedCountry(event: Event) {
    const target = event.target as HTMLInputElement;
    const countryCode = JSON.parse(target.value);
    const regionCode = this.phoneUtil.getRegionCodeForCountryCode(+countryCode);
    console.log(regionCode);
    this.countryCode.emit([countryCode, regionCode]);
  }
}
