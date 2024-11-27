import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardsMiddelComponent } from './cards-middel/cards-middel.component';
import { CardsTopComponent } from './cards-top/cards-top.component';
import { DashboardService } from './services/dashboard.service';
import { CardsBottomComponent } from './cards-bottom/cards-bottom.component';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule,CardModule,MessagesModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIME_MODULES, CommonModule, BreadcrumbComponent, CardsTopComponent, CardsMiddelComponent,CardsBottomComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  
  public date = new Date();
  public currentUrl: string = '';
  public visible: boolean = false;
  public itemsLabels: MenuItem[] = [];
  public messages: Message[] | undefined;

  private readonly _dashboardSvc = inject(DashboardService);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.itemsLabels = this._dashboardSvc.getBreadcrumbLabels();

    this.messages = [
      { severity: 'secondary', detail: '👋 Hello! Welcome to Freya! Before start please complete your profile to know you better' },
  ];
  }
}
