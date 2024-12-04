import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GlobalStore } from '@app/store/global.store';
import { ReportCardComponent } from "./components/report-card/report-card.component";
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { SpinnerLoaderComponent } from '../components/spinner-loader/spinner-loader.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [CommonModule,ReportCardComponent,RouterLink,CardModule,SpinnerLoaderComponent],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {

  readonly store = inject(GlobalStore);

  public aplicarEstilo = true;
  public visible: boolean = false;

}
