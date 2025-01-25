import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilter } from '@app/models';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { PrimeNG } from 'primeng/config';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter-data-components',
  standalone: true,
  imports: [ButtonModule,DropdownModule,FormsModule,InputTextModule,CalendarModule,CardModule],
  templateUrl: './filter-data-components.component.html',
  styleUrl: './filter-data-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDataComponentsComponent {

  dataToFilter = output<any>();
  selectedValue = output<string>();
  clear = output<any>();
  inputsSelect = input.required<IFilter[]>();
  isVisible : boolean = false;
  valueSelected: any | undefined;
  value : any | undefined;
  rangeDates: Date[] | undefined;

  public readonly primengConfig = inject(PrimeNG);

  ngOnInit() {
    this.primengConfig.setTranslation({
      // Import the Spanish locale object (replace with the actual import path)
      firstDayOfWeek: 1, // Monday as the first day of the week (adjust if needed)
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Limpiar',
      // ... other locale options
    });
  }

  checkVisible(){
    if(this.isVisible ){
      this.isVisible = false;
    }else{
      this.isVisible = true;
    }
  }

  ngOnChanges(){
    if(this.inputsSelect().length > 0){ this.valueSelected = this.inputsSelect()[0];}
  }

  ngAfterViewInit(){
    this.valueSelected = this.inputsSelect()[0];
    this.selectedValue.emit(this.valueSelected);
  }

  search(){
    if(this.valueSelected.code == "date"){
      this.dataToFilter.emit(this.rangeDates ?? []);
    }else if(this.valueSelected.code == "favourite"){
      this.dataToFilter.emit(true);
    }else if(this.valueSelected.code == "noFavourite"){
      this.dataToFilter.emit(false);
    }else{
      this.dataToFilter.emit(this.value);
    }
   
  }
}
