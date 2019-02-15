import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TaskModel } from 'src/app/models/tasks.models';
import { AgendaColors } from 'src/app/shared/const/agenda-colors.const';
import { DateConvertService } from 'src/app/shared/services/date-convert.service';
import { ContextStoreService } from 'src/app/store/context-store.service';
import { filter } from 'rxjs/operators';
import { TasksStoreService } from '../store/tasks-store.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  form: FormGroup;
  options: any[];
  tasks$: Observable<TaskModel[]>;

  constructor(
    private contextStoreService: ContextStoreService,
    private dateConvertService: DateConvertService,
    private tasksStoreService: TasksStoreService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [{ value: null /*, disabled: true */ }, Validators.required],
      dateEnd: [null],
      type: [null, [Validators.required]],
      comment: []
    });
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  public addTask(): void {
    if (this.form.invalid) {
      alert('Заполните форму');
      return;
    }

    const val = this.form.getRawValue();
    const dateStart = moment(val.dateStart);

    this.tasksStoreService.addTasks(val.type.id, dateStart);

    if (val.dateEnd) {
      const lastDay = moment(val.dateEnd);

      let nextDate = dateStart;
      while (nextDate.isBefore(lastDay)) {
        nextDate = nextDate.clone().add(1, 'd');
        console.log(nextDate);
        this.tasksStoreService.addTasks(val.type.id, nextDate);
      }
    }
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.contextStoreService.setDateStart(moment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {
    // this.datesStoreService.setDateEnd(moment(date));
  }

  private getInfoFromStore() {
    // this.tasks$ = this.datesStoreService.getTasks();
    this.contextStoreService
      .getCurrentDate()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.form.get('dateStart').setValue(res.toDate(), { emitEvent: false });
        this.form.get('dateEnd').setValue(null, { emitEvent: false });

        // const agenda = AgendaColors.find(o => o.id === DayType.COMMON);
        // this.form.get('type').setValue(agenda, { emitEvent: false });

        // TODO: брать тип и описание из Tasks
      });

    this.contextStoreService
      .getDayType()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        // this.form.get('dateStart').setValue(res.toDate(), { emitEvent: false });
        // this.form.get('dateEnd').setValue(null, { emitEvent: false });
        console.log('received type');
        const agenda = AgendaColors.find(o => o.id === res);
        this.form.get('type').setValue(agenda, { emitEvent: false });

        // TODO: брать тип и описание из Tasks
      });

    // this.contextStoreService
    //   .getDayType()
    //   .pipe(filter(i => !!i))
    //   .subscribe(res => {
    //     const selected = AgendaColors.find(i => i.id === res);
    //     this.form.get('type').setValue(selected, { emitEvent: false });
    //   });
    // this.datesStoreService
    //   .getDateEnd()
    //   .pipe(filter(i => !!i))
    //   .subscribe(res => {
    //     this.form.get('dateEnd').setValue(res.toDate(), { emitEvent: false });
    //   });
  }
}
