import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-class-table',
  templateUrl: './class-table.component.html',
  styleUrls: ['./class-table.component.css']
})
export class ClassTableComponent implements OnInit {
  classesList: any[];
  selectedSemesterID: string;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.FBservice.getClasses().valueChanges().subscribe( classes =>{
      this.classesList = classes;
    })
  }

  onDeleteClass(id){
    this.FBservice.deleteClass(id);

  }
  
  onChangeCAStatus(id,stats){
    this.FBservice.changeCAStatus(id,stats);
  }
}
