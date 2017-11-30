import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Request } from '../request.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css']
})
export class RequestAccessComponent implements OnInit {
  /**
   * Email of the access request to be saved.
   */
  email: string;
  /**
   * Name of the access request to be saved.
   */
  name: string;
  /**
   * SIAPE number of the access request to be saved.
   */
  SIAPE: string;
  /**
   * Message to display when the access request is saved.
   */
  SAVED_SUCCESSFULLY_MESSAGE: string = "Sua solicitação foi enviada!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the access request is saved.
   */
  TIMEOUT_SAVED_MESSAGE = 2500;
  /**
   * Message to display when the access request is not saved.
   */
  NOT_SAVED_MESSAGE: string = "Opa! Parece que você já enviou uma solicitação com o email fornecido.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the access request is not saved.
   */
  TIMEOUT_NOT_SAVED_MESSAGE = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private snackService: SnackbarService
  ) { }

  /**
   * Saves a new access request (object) on form submission.
   */
  onAddNewRequest(){
    let request = new Request (
      this.SIAPE,
      this.name,
      this.email
    )

    let savedSuccessfully: boolean = this.FBservice.addNewRequest(request);
    
    this.SIAPE = null;
    this.email = null;
    this.name = null;

    if(savedSuccessfully){
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE, this.TIMEOUT_SAVED_MESSAGE);
        this.router.navigate(['/home']);
    }
    else{
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE, this.TIMEOUT_NOT_SAVED_MESSAGE);
    }
  }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    let initiateRequests: any[];
    this.FBservice.getRequestsEmails().valueChanges().subscribe(requests =>{
      initiateRequests = requests;
    });
  }

}
