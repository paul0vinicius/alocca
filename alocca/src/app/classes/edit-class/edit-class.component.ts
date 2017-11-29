import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
//remove params???
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Class } from '../class.model';
import { Schedule } from '../schedule.model';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  id: string;
  professorsList: any[];
  coursesList: any[];

  course: string;

  professor1: any;
  professor2: any;
  currentNote: string;
  

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.FBservice.getProfessors().valueChanges().subscribe(professorsnames =>{
      this.professorsList = professorsnames
    });

    this.FBservice.getClassDetails(this.id).valueChanges().subscribe(class_ =>{
      this.course = class_.course;
      this.professor1 = class_.professor1;
      this.professor2 = class_.professor2;
      this.currentNote = class_.note;
    });
  }

  onUpdateClass(){
    var professor1nickname: string;
    var professor2nickname: string;
    var professor1SIAPE: string;
    var professor2SIAPE: string;
    
    if(this.professor1){
      professor1nickname = this.professor1.nickname;
      professor1SIAPE = this.professor1.SIAPE;
    }else{
      professor1nickname = "";
      professor1SIAPE = "";
    }
    if(this.professor2){
      professor2nickname = this.professor2.nickname;
      professor2SIAPE = this.professor2.SIAPE;
    }else{
      professor2nickname = "";
      professor2SIAPE = "";
    }

    if(!this.currentNote){
      this.currentNote = "";
    }

     let newClass = {
       professor1: professor1nickname,
       professor1SIAPE: professor1SIAPE,
       professor2: professor2nickname,
       professor2SIAPE: professor2SIAPE,
       note: this.currentNote
     };
    this.FBservice.updateClass(this.id, newClass);
    this.router.navigate(['/classes']);
  }
}
