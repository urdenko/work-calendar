import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../../shared/models/tasks.model';
import { DayType } from '../../../shared/const/day-type.const';
import { ConfirmService } from '../../../shared/services/confirm.service';
import { PrintHelperService } from '../../../shared/services/print-helper.service';
import { Employee } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-presence-history',
  templateUrl: './presence-history.component.html',
  styleUrls: ['./presence-history.component.scss']
})
export class PresenceHistoryComponent {
  @Input()
  tasks: TaskModel[];

  @Input()
  user: Employee;

  @Output()
  deleteTask = new EventEmitter<string>();

  @Output()
  approve = new EventEmitter<string>();

  dayTypes = DayType;

  constructor(private confirm: ConfirmService, private printService: PrintHelperService) {}

  openApproveDialog(taskId: string) {
    this.confirm.openDialog('Вы согласовали отпуск?').subscribe(res => res && this.approve.emit(taskId));
  }

  openDeleteDialog(taskId: string) {
    this.confirm
      .openDialog('Вы уверены, что хотите удалить запись?')
      .subscribe(res => res && this.deleteTask.emit(taskId));
  }

  printStatement(task: TaskModel): void {
    this.printService.printStatement(this.user.username, task.dateStart, task.dateEnd);
  }
}
