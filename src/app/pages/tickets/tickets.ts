import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Parking } from '../../core/services/parking';

@Component({
  selector: 'app-tickets',
  imports: [
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.scss',
})
export class Tickets {
  readonly plateNo = model('');
  readonly arrival = model(new Date());
  readonly location = model('');

  readonly isVisible = model(false);
  readonly prompt = model('');

  private parkingService = inject(Parking);

  async ok() {
    await this.parkingService.ask(this.prompt());
  }

  add() {
    this.parkingService.createTicket(this.plateNo(), this.arrival(), this.location());
  }
}
