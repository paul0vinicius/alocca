import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

import { Professor } from '../professor.model';

@Component({
  selector: 'app-add-professor',
  templateUrl: './add-professor.component.html',
  styleUrls: ['./add-professor.component.css']
})
export class AddProfessorComponent implements OnInit {
  /**
   * Name of the professor to be saved.
   */
  name: any;
  /**
   * Nickname of the professor to be saved.
   */
  nickname: any;
  /**
   * SIAPE number of the professor to be saved.
   */
  SIAPE: any;
  /**
   * Message the professor is successfully saved.
   */
  SAVED_SUCCESSFULLY_MESSAGE: string = "Professor salvo com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the professor is saved successfully.
   */
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  /**
   * Message to display when the professor was not saved.
   */
  NOT_SAVED_MESSAGE: string = "Opa! Verifique se já existe um professor com esse SIAPE e/ou apelido.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the professor is not saved.
   */
  TIMEOUT_NOT_SAVED_MESSAGE: number = 8000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) {
  }

  /**
   * Saves a new Professor (object) on form submission.
   */
  onAddNewProfessor(){
    var newProfessor =  new Professor (
      this.SIAPE,
      this.name,
      this.nickname
    )
    
    var savedSuccessfully: boolean = this.FBservice.addNewProfessor(newProfessor);

    this.name = null;
    this.nickname = null;
    this.SIAPE = null;

    if (savedSuccessfully) {
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE)
    }
  }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    let initiateProfessors: any[];
    this.FBservice.getProfessors().valueChanges().subscribe(professors =>{
      initiateProfessors = professors;
    });
  }
}