import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ReportCardComponent } from "./components/report-card/report-card.component";
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";
import { ReportsService } from './services/reports.service';
import { GlobalReportStore } from '@app/store/globalReport.store';
import { ButtonModule } from 'primeng/button';
import { FilterDataComponentsComponent } from "../components/filter-data-components/filter-data-components.component";
import { IFilter, IReport } from '@app/models';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { GlobalService } from '@app/services';

@Component({
  selector: 'app-container-reports',
  standalone: true,
  imports: [CommonModule, ReportCardComponent, RouterLink, CardModule, BreadcrumbComponent, ButtonModule, FilterDataComponentsComponent,ToastModule],
  templateUrl: './container-reports.component.html',
  styleUrl: './container-reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
})
export class ContainerReportsComponent {

  public readonly store = inject(GlobalReportStore);
  public readonly _reportSvc = inject(ReportsService);
  public storeReports = signal<IReport[]>([]);

  public aplicarEstilo = true;
  public visible: boolean = false;
  public dataToFilter = signal<any>('');

  public dataInputSelect : IFilter[] = [
    { name: 'Fecha', code: 'date' },
  ]
  public readonly messageService = inject(MessageService);

  private readonly globalSvc = inject(GlobalService);
  constructor(){
    effect(() => {
      this.storeReports.set(this.store.reports());      
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit(){
    if(this.globalSvc.toastSignal() != null){
      this.messageService.add(this.globalSvc.toastSignal()); 
      this.globalSvc.toastSignal.set(null);
    }
  }

  filterData(data: any){
    this.dataToFilter.set(data);
    this.storeReports.set(this.store.reports());
    if(this.dataToFilter().length == 2 && this.dataToFilter()[0] != null && this.dataToFilter()[1] != null){
      const temp : IReport[] = [];
      this.storeReports().forEach((report: IReport) => {
        if(this.dataToFilter().length == 2){
          const dateCreated = new Date(report.created);
          if( dateCreated >= this.dataToFilter()[0] && dateCreated <= this.dataToFilter()[1]){
            temp.push(report);
          }
        }
      });

      this.storeReports.set([...temp]);
      
     }else{
      this.storeReports.set(this.store.reports());
     }
  }
}
