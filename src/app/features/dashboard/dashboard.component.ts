import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

const PRIME_MODULES = [DialogModule, ButtonModule, InputTextModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PRIME_MODULES,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export default class DashboardComponent {
  ngAfterViewInit(): void {
    // this.visible = true;
    console.log(this.visible);
    this.currentUrl = this.route.url;
    console.log(this.currentUrl);
  }

  currentUrl: string = '';

  constructor(private route: Router) {}

  public date = new Date();
  public objetiveWeight: number = 78;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
