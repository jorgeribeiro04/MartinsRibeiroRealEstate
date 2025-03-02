import { Component, OnInit, input, signal } from '@angular/core';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss'],
  standalone: false,
})
export class MortgageCalculatorComponent implements OnInit {
  propertyPrice = input.required<number | undefined>();
  deposit = signal('');
  constructor() {}

  ngOnInit() {
    this.setCalculatorDesign();
  }

  setCalculatorDesign() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const header = document.getElementById('header-row');
    const logo = document.getElementById('bank-logo');
    const margins = document.querySelectorAll('.border-row');

    if (randomNumber == 1) {
      logo?.setAttribute('src', './assets/ebsLogo.jpg');
      header?.classList.add('ebs');
      margins.forEach((element) => {
        element.classList.add('ebs-border');
      });
    } else if (randomNumber == 2) {
      logo?.setAttribute('src', './assets/aib-logo.jpg');
      header?.classList.add('aib');
      margins.forEach((element) => {
        element.classList.add('aib-border');
      });
    } else {
      logo?.setAttribute('src', './assets/bankOfIrelandLogo.png');
      header?.classList.add('bank-of-ireland');
      margins.forEach((element) => {
        element.classList.add('bOfI-border');
      });
    }
  }
}
