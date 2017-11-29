import { Component, OnInit } from '@angular/core';

import { Request } from '../request.model';

import { FirebaseService } from '../../services/firebase.service';
import { DialogsService } from '../../services/dialogs.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  /**
   * List of requests saved.
   */
  requests: any[];
  /**
   * Message to display when request is ignored.
   */
  DELETED_MESSAGE: string = "Requisição ignorada!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the request is ignored.
   */
  TIMEOUT_DELETED_MESSAGE: number = 2500;
  /**
   * Message to display when request is not ignored.
   */
  NOT_DELETED_MESSAGE: string = "Não foi possível remover a requisição. Tente novamente!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the request is not ignored.
   */
  TIMEOUT_NOT_DELETED_MESSAGE: number = 5000;
  /**
   * Message to display when request is accepted.
   */
  ACCEPTED_MESSAGE: string = "Requisição aceita!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the request is accepted.
   */
  TIMEOUT_ACCEPTED_MESSAGE: number = 2500;
  /**
   * Message to display when request is not accepted.
   */
  NOT_ACCEPTED_MESSAGE: string = "Não foi possível aceitar a requisição. Tente novamente!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the request is not accepted.
   */
  TIMEOUT_NOT_ACCEPTED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private dialogsService: DialogsService,
    private snackService: SnackbarService
  ) { }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    this.FBservice.getRequests().valueChanges().subscribe(requests =>{
      this.requests = requests;
    });
  }
  
  /**
   * Delete a selected request.
   * 
   * @param requestSIAPE Key (SIAPE) of the request to be deleted(ignored).
   * @param requestName Name of the request to be deleted (ignored).
   * @param requestEmail Email of the request to be deleted (ignored).
   */
  onDeleteRequest(requestSIAPE: string,requestName:string,requestEmail:string){
    var requestToDelete = new Request(
      requestSIAPE,requestName,requestEmail
    );

    var title = "Excluir Requisição";
    var message = "Deseja realmente excluir a requisição feita por " + requestName + " ?";;
    this.dialogsService
      .confirm(title, message)
      .subscribe(res => {
        if (res) {
          if(this.FBservice.deleteRequest(requestToDelete)){
            this.snackService.openSnackBar(this.DELETED_MESSAGE, this.TIMEOUT_DELETED_MESSAGE);
          }else{
            this.snackService.openSnackBar(this.NOT_DELETED_MESSAGE, this.TIMEOUT_NOT_DELETED_MESSAGE);
          }
        }
      });
  }

  /**
   * Accept a selected request.
   * 
   * @param requestSIAPE Key (SIAPE) of the request to be accepted.
   * @param requestName Name of the request to be accepted.
   * @param requestEmail Email of the request to be accepted.
   */
  onAcceptRequest(requestSIAPE:string,requestName:string,requestEmail:string){
    var requestToAccept = new Request(
      requestSIAPE,requestName,requestEmail
    );

    if(this.FBservice.acceptRequest(requestToAccept)){
      this.snackService.openSnackBar(this.ACCEPTED_MESSAGE, this.TIMEOUT_ACCEPTED_MESSAGE);
    }else{
      this.snackService.openSnackBar(this.NOT_ACCEPTED_MESSAGE, this.TIMEOUT_NOT_ACCEPTED_MESSAGE);
    }
  }

}
