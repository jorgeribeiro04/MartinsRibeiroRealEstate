import { Component, OnInit, input, output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: false,
})
export class FilterComponent implements OnInit {
  titleString = input.required<string>();
  applyFilters = output<{ [key: string]: string[] }>();
  checkboxData: { [key: string]: boolean } = {};
  resetContent = output<boolean>();
  isModalOpen = false;
  constructor() {}

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.resetContent.emit(true);
  }

  outputFilters(filters: { [key: string]: string[] }) {
    this.applyFilters.emit(filters);
  }

  checkboxStatus(checkbox: { [key: string]: boolean }) {
    this.checkboxData = checkbox;
  }
}
