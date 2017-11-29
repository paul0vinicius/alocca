import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';

import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  /**
   * Email of the user to be saved.
   */
  email: string;
  /**
   * Name of the user to be saved.
   */
  name: string;
  /**
   * SIAPE of the user to be saved.
   */
  SIAPE: string;
  /**
   * Message to display when user is saved.
   */
  SAVED_SUCCESSFULLY_MESSAGE: string = "Usuário cadastrado com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the user is saved.
   */
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  /**
   * Message to display when user is not saved.
   */
  NOT_SAVED_MESSAGE: string = "Opa! Parece que houve um erro ao cadastrar o usuário. Verifique se o usuário já foi cadastrado.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the user is not saved.
   */
  TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) {
  }

  /**
   * Saves a new user (object) on form submission.
   */
  onAddNewUser(){
    let user = new User (
      this.SIAPE,
      this.name,
      this.email
    )

    var savedSuccessfully: boolean = this.FBservice.addNewUser(user);

    this.SIAPE = null;
    this.email = null;
    this.name = null;

    if(savedSuccessfully){
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE, this.TIMEOUT_SAVED_MESSAGE);
        this.router.navigate(['/add-user']);
    }
    else{
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE, this.TIMEOUT_NOT_SAVED_MESSAGE);
    }    
  }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    let initiateUsers: any[];
    this.FBservice.getUsers().valueChanges().subscribe(users =>{
      initiateUsers = users;
    });
  }
}
