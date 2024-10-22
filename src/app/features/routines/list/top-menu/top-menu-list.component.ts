import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IRoutine } from '../../iroutine';

@Component({
  selector: 'app-top-menu-list',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <div class="mb-3">
      <p-button
        type="button"
        icon="pi pi-chevron-left"
        (onClick)="prev()"
        [disabled]="isFirstPage()"
        styleClass="p-button-text"
      />
      <p-button
        type="button"
        icon="pi pi-refresh"
        (onClick)="reset()"
        styleClass="p-button-text"
      />
      <p-button
        type="button"
        icon="pi pi-chevron-right"
        (onClick)="next()"
        [disabled]="isLastPage()"
        styleClass="p-button-text"
      />
    </div>
  `,
  styles: ``,
})
export class TopMenuListComponent {

  public first = input.required<number>();
  public rows = input.required<number>();

  public dataRoutines = input.required<IRoutine[]>();

  public firstout =  output<number>();

  next() {
    this.firstout.emit(this.first() + this.rows())
  }

  prev() {
    this.firstout.emit(this.first() - this.rows())
  }

  reset() {
    this.firstout.emit(0);
  }

  isLastPage(): boolean {
    return this.dataRoutines()
      ? this.first() === this.dataRoutines().length - this.rows()
      : true;
  }

  isFirstPage(): boolean {
    return this.dataRoutines() ? this.first() === 0 : true;
  }

}
