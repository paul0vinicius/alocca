import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogsComponent>
  ) { }

  ngOnInit() {  }
}

