import { Component, OnInit } from '@angular/core';

import { Course } from '../course.model';

import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  /**
   * Code of the course to be saved.
   */
  code: string;
  /**
   * Name of the course to be saved.
   */
  name: string;
  /**
   * Short name of the course to be saved.
   */
  shortName: string;
  /**
   * Credits of the course to be saved.
   */
  credits: number;
  /**
   * Hours to schedule of the course to be saved.
   */
  hoursToSchedule: number;
  /**
   * Type of the course to be saved.
   */
  type: string;
  /**
   * Minimum recomended semester of the course to be saved.
   */
  minimumSemester: number;
  /**
   * Maximum recomended semester of the course to be saved.
   */
  maximumSemester: number;
  /**
   * Offerer department of the course to be saved.
   */
  offererDepartment: string;
  /**
   * Requester department of the course to be saved.
   */
  requesterDepartment: string;
  /**
   * Options of course type for the user selection.
   */
  courseTypes: string[] = [ "Complementar", "Eletiva", "Obrigatória", "Optativa" ];
  /**
   * Options of semester for the user selection.
   */
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  /**
   * Options of department for the user selection.
   */
  departments: string[] = ["UASC", "Outro"];
  /**
   * Message to display when the course is saved.
   */
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina salva com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the course is saved.
   */
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  /**
   * Message to display when the course is not saved.
   */
  NOT_SAVED_MESSAGE: string = "Opa! Verifique se esta já existe uma disciplina com esse código e/ou sigla.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the course is not saved.
   */
  TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private snackService: SnackbarService
  ) {  }

  /**
   * Saves new Course (object) on form submission
   */
  onAddNewCourse(){
    if (this.credits===0){
      this.hoursToSchedule = 2;
    }else{
      this.hoursToSchedule = this.credits;
    }

    var course = new Course(
      this.code,
      this.name,
      this.shortName,
      this.credits,
      this.hoursToSchedule,
      this.type,
      this.minimumSemester,
      this.maximumSemester,
      this.offererDepartment,
      this.requesterDepartment
    )

    let savedSuccessfully: boolean = this.FBservice.addNewCourse(course);

    this.code = null;
    this.name = null;
    this.shortName = null;
    this.credits = null;
    this.hoursToSchedule = null
    this.type = null;
    this.minimumSemester = null;
    this.maximumSemester = null;
    this.offererDepartment = null;
    this.requesterDepartment = null;

    if (savedSuccessfully) {
       this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
        this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
    }
  }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    let initiateCourses: any[];
    this.FBservice.getCourses().valueChanges().subscribe(courses =>{
      initiateCourses = courses;
    });
  }

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

}