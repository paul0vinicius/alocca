import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-professors',
  templateUrl: './view-professors.component.html',
  styleUrls: ['./view-professors.component.css']
})
export class ViewProfessorsComponent implements OnInit {
    /**
     * List of saved Professors.
     */
    professors: any[];
    /**
     * Message to display when a professor is deleted.
     */
    DELETED_MESSAGE: string = "Professor deletado com sucesso!";
    /**
     * Timeout for the message displayed in the snackbar
     * 
     * when a professor is deleted.
     */
    TIMEOUT_DELETED_MESSAGE: number = 2500;
    /**
     * Message to display when a professor is not deleted.
     */
    NOT_DELETED_MESSAGE: string = "Não foi possível remover o professor. Tente novamente!";
    /**
     * Timeout for the message displayed in the snackbar
     * 
     * when a professor is not deleted.
     */
    TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;
    /**
     * Message to display when no semester is previously selected.
     */
    NO_SEMESTER_SELECTED: string = "Selecione um semestre ou crie um novo";
    /**
     * Timeout for the message displayed in the snackbar
     * 
     * when no semester is previously selected.
     */
    TIMEOUT_NO_SEMESTER_SELECTED: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private dialogsService: DialogsService,
    private snackService: SnackbarService,
  ) {}

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    this.FBservice.getProfessors().valueChanges().subscribe(professors =>{
      this.professors = professors;
      });
  }

  /**
   * Edit selected professor's restrictions.
   * 
   * @param siape SIAPE number of the Professor selected.
   */
  onEditRestrictions(siape: string){
    if(this.FBservice.getCurrentSemester()){
      this.router.navigate(['/add-restriction/'+siape+'-'+this.FBservice.getCurrentSemester()]);
    }else{
      this.snackService.openSnackBar(this.NO_SEMESTER_SELECTED,this.TIMEOUT_NO_SEMESTER_SELECTED);
    }
  }

  /**
   * Delete selected professor.
   * 
   * @param id Key (SIAPE) of the professor selected to be deleted.
   * @param professorNickname  Nickname of the professor selected to be deleted.
   */
  onDeleteProfessor(id: string, professorNickname:string){
    var title = "Excluir Professor";
    var message = "Deseja realmente excluir "+professorNickname+" ?";
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteProfessor(id)){
          this.snackService.openSnackBar(this.DELETED_MESSAGE,this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE,this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

}
