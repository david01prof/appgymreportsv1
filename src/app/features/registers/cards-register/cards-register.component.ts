import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NewCardRegisterComponent } from './new-card-register/new-card-register.component';
import { DetailCardsComponent } from './detail-cards/detail-cards.component';
import { IRegister } from '../interfaces/iregister';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

const PRIME_MODULES = [CardModule];

@Component({
  selector: 'app-cards-register',
  standalone: true,
  imports: [CommonModule,PRIME_MODULES,NewCardRegisterComponent,DetailCardsComponent,CalendarModule,FormsModule],
  templateUrl: './cards-register.component.html',
  styleUrl: './cards-register.component.scss'
})
export class CardsRegisterComponent {

    registers = input.required<IRegister[]>();
}
