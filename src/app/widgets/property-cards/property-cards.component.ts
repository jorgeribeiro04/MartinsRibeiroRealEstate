import { Component, OnInit, input } from '@angular/core';
import { Properties } from 'src/properties.interface';

@Component({
  selector: 'app-property-cards',
  templateUrl: './property-cards.component.html',
  styleUrls: ['./property-cards.component.scss'],
  standalone: false,
})
export class PropertyCardsComponent implements OnInit {
  constructor() {}
  properties = input.required<Properties[] | undefined>();
  ngOnInit() {}
}
