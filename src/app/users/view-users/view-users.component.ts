import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';

import { FirebaseService } from '../../services/firebase.service';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  /**
   * List of saved users.
   */
  users: any[];
  /**
   * Message to display when user is deleted.
   */
  DELETED_MESSAGE: string = "Usuário deletado com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a user is deleted.
   */
  TIMEOUT_DELETED_MESSAGE: number = 2500;
  /**
   * Message to display when user is not deleted.
   */
  NOT_DELETED_MESSAGE: string = "Não foi possível remover o usuário. Tente novamente!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when a user is not deleted.
   */
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private dialogsService: DialogsService,
    private snackService: SnackbarService
  ) { }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    this.FBservice.getUsers().valueChanges().subscribe(users =>{
      this.users = users;
    });
  }

  /**
   * Delete a selected user. 
   * 
   * @param id Key (SIAPE) of the user to be deleted.
   * @param userName Name of the user to be deleted.
   */
  onDeleteUser(id: string, userName: string, userEmail: string){
    var title: string = "Excluir Usuário";
    var message: string =  "Deseja realmente excluir " + userName + " ?";
    this.dialogsService
    .confirm(title,message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteUser(id,userEmail)){
            this.snackService.openSnackBar(this.DELETED_MESSAGE, this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE, this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

}
