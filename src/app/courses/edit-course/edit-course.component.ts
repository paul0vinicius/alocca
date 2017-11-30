import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { Course } from '../course.model';

import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  /**
   * Key (code) of the course being updated.
   */
  id: string;
  /**
   * New code for the course.
   */
  code: string;
  /**
   * New name for the course.
   */
  name: string;
  /**
   * New short name for the course.
   */
  shortName: string;
  /**
   * Current name of the course being updated.
   */
  oldName: string;
  /**
   * New credits for the course.
   */
  credits: number;
  /**
   * New hours to schedule for the course.
   */
  hoursToSchedule: number;
  /**
   * New type for the course.
   */
  type: string;
  /**
   * New minimum recomended semester for the course.
   */
  minimumSemester: number;
  /**
   * New maximum recomended semester for the course.
   */
  maximumSemester: number;
  /**
   * New offerer department for the course.
   */
  offererDepartment: string;
  /**
   * New requester department for the course.
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
   * Message to display when the course is updated.
   */
  SAVED_SUCCESSFULLY_MESSAGE: string = "Disciplina editada com sucesso!";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the course is updated.
   */
  TIMEOUT_SAVED_MESSAGE: number = 2500;
  /**
   * Message to display when the course is not updated.
   */
  NOT_SAVED_MESSAGE: string = "Opa! Verifique se já existe uma disicplina com o código ou a sigla escolhidos.";
  /**
   * Timeout for the message displayed in the snackbar
   * 
   * when the course is not updated.
   */
  TIMEOUT_NOT_SAVED_MESSAGE: number = 5000;

  constructor(
    private FBservice: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private snackService: SnackbarService
  ) { }

  /**
   * Sets necessary elements on the start of the page.
   */
  ngOnInit() {
    this.id = this.route.snapshot.params['id'],
    this.FBservice.getCourseDetails(this.id).valueChanges().subscribe(course =>{
        this.code = course.code;
        this.name = course.name;
        this.shortName = course.shortName;
        this.oldName = course.shortName;
        this.credits = course.credits;
        this.hoursToSchedule = course.hoursToSchedule;
        this.type = course.type;
        this.minimumSemester = course.minimumSemester;
        this.maximumSemester = course.maximumSemester;
        this.offererDepartment = course.offererDepartment;
        this.requesterDepartment = course.requesterDepartment;
    });
    let initiateCourses: any[];
    this.FBservice.getCourses().valueChanges().subscribe(courses =>{
      initiateCourses = courses;
    });
  }

  /**
   * Updates the course on form submission.
   */
  onEditCourse(){
    if (this.credits===0){
      this.hoursToSchedule = 2;
    }else{
      this.hoursToSchedule = this.credits;
    }

    var course = new Course (
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

    let savedSuccessfully: boolean = this.FBservice.updateCourse(this.id, course,this.oldName);

    if (savedSuccessfully) {
        this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
    } else {
      this.snackService.openSnackBar(this.NOT_SAVED_MESSAGE,this.TIMEOUT_NOT_SAVED_MESSAGE);
    }

    this.router.navigate(['/view-courses']);

  }
}
