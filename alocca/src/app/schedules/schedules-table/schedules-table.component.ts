import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';
import { DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'app-schedules-table',
  templateUrl: './schedules-table.component.html',
  styleUrls: ['./schedules-table.component.css']
})
export class SchedulesTableComponent implements OnInit {
  classes: any[];
  currentClassKey: string;
  SAVED_SUCCESSFULLY_MESSAGE: string = "Aula adicionada com sucesso!";
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  ALREADY_SAVED_MESSAGE: string = "A aula já está alocada nesse horário";
  TIMEOUT_ALREADY_SAVED: number  = 5000;
  DELETED_SUCCESSFULLY_MESSAGE: string =  "Aula removida do horário";
  TIMEOUT_DELETED_MESSAGE: number = 3000;
  NOT_DELETED_MESSAGE: string =  "Não foi possível desalocar a turma. Tente novamente!";
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private snackService: SnackbarService,
    private dialogService: DialogsService
  ) {
    
  }

  ngOnInit() {
    this.FBservice.getClasses().valueChanges().subscribe(currentClasses =>{
      this.classes = currentClasses;
    })
  }

  /**
   * 
   * @param day The day of the class in the schedule
   * @param hour The hour of the Class in the schedule
   * 
   * @example onAddClassToSchedule('monday','10')
   */
  onAddClassToSchedule(day: string, hour: number){
    if(this.FBservice.addClassToSchedule(this.currentClassKey,day,hour)){
      this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.ALREADY_SAVED_MESSAGE,this.TIMEOUT_ALREADY_SAVED);
    }
    this.currentClassKey = null;
  }

  /**
   * @param classCourse The name of the course of that course
   * @param classNumber The number of that class for that course
   * @param classKey The key of the class that will be removed
   * @param day The day in the schedule of the class that will be removed
   * @param hour The hour in the schedules of the class that will be removed
   * 
   * @example onDeleteClassSchedule('01','monday','8')
   */
  onDeleteClassSchedule(classCourse: string, classNumber:number, classKey: string, day: string, hour:number){
    var title = "Desalocar disciplina";
    var message = "Deseja realmente remover "+classCourse+" - t"+ classNumber +" das "+hour+"h?";
    this.dialogService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteClassFromSchedule(classKey,day,hour)){
            this.snackService.openSnackBar(this.DELETED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }



}
