import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseManagement } from 'src/firebase-management.service';
import { Properties } from 'src/properties.interface';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
  standalone: false,
})
export class PropertyDetailsComponent implements OnInit {
  map!: google.maps.Map;
  propertyCode: string = '';
  property: Properties | undefined;
  geopoint: number[] | undefined;
  private firebaseManagement = inject(FirebaseManagement);
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((queryParams) => {
      this.propertyCode = queryParams.get('propertyId')!;
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  async fetchData() {
    try {
      this.property = await this.firebaseManagement.getPropertyById(
        +this.propertyCode
      );
      this.geopoint = Object.values(this.property.geolocation);
      this.initMap(this.geopoint);
      this.setAdditionalMargin(this.property.propertyAvailability);
    } catch (error) {
      console.error(error);
    }
  }
  initMap(geolocation: number[]): void {
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat: geolocation[0], lng: geolocation[1] },
        zoom: 15,
      }
    );
  }
  async geocodeAddress(address: string): Promise<void> {
    const geocoder = new google.maps.Geocoder();
    try {
      const results = await this.geocode(geocoder, address); // Call our helper function
      if (results && results.length > 0) {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
      } else {
        console.error('No results found for the address.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Wrap the geocode method in a Promise and handle null results
  private geocode(
    geocoder: google.maps.Geocoder,
    address: string
  ): Promise<google.maps.GeocoderResult[]> {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results !== null) {
          resolve(results);
        } else {
          reject(`Geocode failed: ${status}`);
        }
      });
    });
  }

  getSubtitleString() {
    const doubleBedroom = this.property?.propertyDetails.doubleBedroom!;
    const singleBedroom = this.property?.propertyDetails.singleBedroom!;
    const bathrooms = this.property?.propertyDetails.bathrooms;
    let subtitleString = '';
    if (doubleBedroom > 0 && singleBedroom > 0) {
      subtitleString = `${doubleBedroom} Double Bedrooms, ${singleBedroom} Single Bedrooms and ${bathrooms} Bathrooms`;
    } else if (doubleBedroom == 0) {
      subtitleString = `${singleBedroom} Single Bedrooms and ${bathrooms} Bathrooms`;
    } else {
      subtitleString = `${doubleBedroom} Double Bedrooms and ${bathrooms} Bathrooms`;
    }

    return subtitleString;
  }

  setAdditionalMargin(availability: string) {
    if (availability !== 'Sale') {
      document.getElementById('map')?.classList.add('additional-margin');
    }
  }
}
