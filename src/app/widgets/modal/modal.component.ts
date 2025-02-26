import { Component, OnInit, output, inject, input } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent implements OnInit {
  checkbox = input.required<{ [key: string]: boolean }>();
  isOpen = output<boolean>();
  uniqueValues: { [key: string]: string[] } = {};
  priceRange: string[] = [];
  checkboxesArray: { [key: string]: boolean } = {};
  appliedFilters = output<{ [key: string]: string[] }>();
  checkboxStatus = output<{ [key: string]: boolean }>();
  knobRange = {
    lower: 0,
    upper: 100,
  };
  private firebase = inject(FirebaseManagement);
  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initliazeCheckboxes();
    }, 10);
  }

  initliazeCheckboxes() {
    this.checkboxesArray = this.checkbox();
    Object.keys(this.checkboxesArray).forEach((key) => {
      const checkbox = document.getElementById(key) as HTMLInputElement;
      checkbox.checked = true;
    });
  }
  fetchData() {
    this.firebase
      .getUniqueFieldValues2(['propertyCity', 'propertyCounty', 'propertyType'])
      .subscribe((values) => {
        this.uniqueValues = values;
      });
    this.firebase.getPriceRange().subscribe((priceRange) => {
      this.priceRange = priceRange;
    });
  }

  closeModal() {
    this.isOpen.emit(false);
  }

  getKeys() {
    const keys = Object.keys(this.uniqueValues);
    return keys;
  }

  getValues(key: string) {
    return this.uniqueValues[key];
  }

  getPriceRange() {
    let minPrice = +this.priceRange[0];
    let maxPrice = +this.priceRange[0];
    this.priceRange.forEach((price) => {
      if (+price < minPrice) {
        minPrice = +price;
      } else if (+price > maxPrice) {
        maxPrice = +price;
      }
    });
    return [minPrice, maxPrice];
  }

  calculatePrice(
    percentage: number,
    minPrice: number,
    maxPrice: number
  ): number {
    return (percentage / 100) * (maxPrice - minPrice) + minPrice;
  }

  getMinPrice(): number {
    return this.calculatePrice(
      this.knobRange.lower,
      this.getPriceRange()[0],
      this.getPriceRange()[1]
    );
  }
  getMaxPrice(): number {
    return this.calculatePrice(
      this.knobRange.upper,
      this.getPriceRange()[0],
      this.getPriceRange()[1]
    );
  }

  onIonKnobMoveEnd(event: CustomEvent) {
    this.knobRange = {
      lower: event.detail.value.lower,
      upper: event.detail.value.upper,
    };
  }

  isChecked(key: string) {
    this.checkboxesArray[key] = !this.checkboxesArray[key];
    if (this.checkboxesArray[key] == false) {
      delete this.checkboxesArray[key];
    }
  }

  applyFilter() {
    const keys = this.getKeys();
    const filters: { [key: string]: string[] } = {};
    keys.forEach((key) => {
      this.uniqueValues[key].forEach((value) => {
        if (this.checkboxesArray[value]) {
          if (filters[key]) {
            filters[key].push(value);
          } else {
            filters[key] = [value];
          }
        }
      });
    });
    filters['propertyPrice'] = [
      this.getMinPrice().toString(),
      this.getMaxPrice().toString(),
    ];
    this.checkboxStatus.emit(this.checkboxesArray);
    this.appliedFilters.emit(filters);
    this.closeModal();
  }
}
