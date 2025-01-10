import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter-data-components',
  standalone: true,
  imports: [ButtonModule,DropdownModule,FormsModule,InputTextModule],
  templateUrl: './filter-data-components.component.html',
  styleUrl: './filter-data-components.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterDataComponentsComponent {

  dataToFilter = output<any[]>();
  isVisible : boolean = false;

  cities: any[] | undefined;

  selectedCity: any | undefined;

  value : any | undefined;

  ngOnInit() {
      this.cities = [
          { name: 'New York', code: 'NY' },
          { name: 'Rome', code: 'RM' },
          { name: 'London', code: 'LDN' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Paris', code: 'PRS' }
      ];
  }

  checkVisible(){
    if(this.isVisible ){
      this.isVisible = false;
    }else{
      this.isVisible = true;
    }
  }
}
