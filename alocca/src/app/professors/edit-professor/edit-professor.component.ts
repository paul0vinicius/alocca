import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Professor } from '../professor.model';

import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-professor',
  templateUrl: './edit-professor.component.html',
  styleUrls: ['./edit-professor.component.css']
})
export class EditProfessorComponent implements OnInit {
  /**
   * New name for the professor.
   */
  name: string;
  /**
   * New nickname for the professor.
   */
  nickname: string;
  /**
   * New SIAPE number for the professor.
   */
  SIAPE: string;
  /**
   * Current name of the professor.
   */
  oldName: string;
  /**
   * Current nickname of the professor.
   */
  oldNickname: string;
  /**
   * Current SIAPE number of the professor.
   */
  oldSIAPE: string;
  /**
   * The key (SIAPE) of the professor being updated.
   */
  id: string;
  /**
   * Message to display when the professor is updated.
   */
  EDITED_PROFESSOR_MESSAGE: string = "Alterações efetuadas com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the professor is updated.
   */
  TIMEOUT_EDITED_MESSAGE: number = 2500;
  /**
   * Message to display when the professor is not updated.
   */
  NOT_EDITED_PROFESSOR_MESSAGE: string = "Opa! Verifique se já existe um professor com o SIAPE ou o apelido escolhido. ";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the professor is not updated.
   */
  TIMEOUT_NOT_EDITED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarService
  ){    }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit(){
    this.id = this.route.snapshot.params['id']
    this.FBservice.getProfessorDetails(this.id).valueChanges().subscribe(professor =>{
        this.name = professor.name;
        this.SIAPE = professor.SIAPE;
        this.nickname = professor.nickname;
        this.oldName = professor.name;
        this.oldSIAPE = professor.SIAPE;
        this.oldNickname = professor.nickname;

    });
    var initiateProfessors: any[];
    this.FBservice.getProfessors().valueChanges().subscribe(professors =>{
      initiateProfessors = professors;
    });
  }

  /**
   * Updates the professor on form submission.
   */
  onEditProfessor(){
    var oldProfessor = new Professor(
      this.oldSIAPE,
      this.oldName,
      this.oldNickname
    )
    var professor = new Professor (
      this.SIAPE,
      this.name,
      this.nickname
    )
        
    if(this.FBservice.updateProfessor(this.id,professor,oldProfessor)){
      this.snackService.openSnackBar(this.EDITED_PROFESSOR_MESSAGE,this.TIMEOUT_EDITED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_EDITED_PROFESSOR_MESSAGE,this.TIMEOUT_NOT_EDITED_MESSAGE);
    }
    this.router.navigate(['view-professors']);

  }
}
