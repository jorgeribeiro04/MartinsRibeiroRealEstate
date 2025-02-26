import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuManagement } from 'src/menu.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
  standalone: false,
})
export class ActionPage implements OnInit {
  private contentId = '';
  private menu = inject(MenuManagement);
  action: string = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((queryParams) => {
      this.action = queryParams.get('action')!;
    });
    this.setContentId(this.action);
  }

  setContentId(actionType: string): void {
    if (actionType === 'login') {
      this.contentId = 'login';
    } else if (actionType === 'signup') {
      this.contentId = 'signup';
    }
  }
  getContentId() {
    return this.contentId;
  }
}
