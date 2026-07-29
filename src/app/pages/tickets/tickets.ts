import { Component, inject, model } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Parking } from '../../core/services/parking';

@Component({
  selector: 'app-tickets',
  imports: [
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzModalModule,
    NzAlertModule,
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
  readonly isWorking = model(false);
  readonly prompt = model('');

  private readonly notification = inject(NzNotificationService);
  private parkingService = inject(Parking);

  async ok() {
    this.isWorking.set(true);
    await this.parkingService.ask(this.prompt());
    this.isWorking.set(false);
    this.notifySuccess();
  }

  add(form: NgForm) {
    this.parkingService.createTicket(this.plateNo(), this.arrival(), this.location());
    form.reset();
  }

  private notifySuccess() {
    this.notification.create(
      'success',
      'Ticket Created',
      `Successfully added ticket for ${this.plateNo()}`,
    );
  }
}
