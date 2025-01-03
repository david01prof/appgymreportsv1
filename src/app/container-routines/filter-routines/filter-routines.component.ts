import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filter-routines',
  standalone: true,
  imports: [],
  templateUrl: './filter-routines.component.html',
  styleUrl: './filter-routines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterRoutinesComponent {

  public getValueFilter(){

    // if(this.searchControl.value!.length === 0 && this.selectedFilter.code !== 'favorites' && this.selectedFilter.code !== 'nofavorites' && this.selectedFilter.code !== 'date'){
    //   this.data = this._routineSvc.getSafeData()
    // }else{

    //   switch(this.selectedFilter.code){
    //     case 'title': 
    //       this.data = this.data.filter( (item : IRoutine) => item.titleRoutine.includes(this.searchControl.value!));
    //       break;
    //     case 'favorites':
    //       this.data = this._routineSvc.getSafeData()
    //       this.data = this.data.filter( (item : IRoutine) => item.favourite === true);
    //       break;
    //     case 'nofavorites':
    //       this.data = this._routineSvc.getSafeData()
    //       this.data = this.data.filter( (item : IRoutine) => item.favourite === false);
    //       break;
    //     case 'tag':
    //       this.data = this.data.filter( (item : IRoutine) => item.tag.includes(this.searchControl.value!));
    //       break;
    //     case 'date':
    //       if(this.date != undefined && this.date.length >= 0 && this.date[1] != null){
    //         this.data = this._routineSvc.getSafeData();
    //         let timestampA = `${this.date[0].getTime()}`;
    //         let timestampB = `${this.date[1].getTime()}`;
            
    //         this.data = this.data.filter( (item : IRoutine) =>
    //           parseInt(`${item.date.seconds}000`) >= parseInt(timestampA) && parseInt(`${item.date.seconds}000`) <= parseInt(timestampB)
    //         );
    //       }
    //       break;
    //   }
      
    }
}
