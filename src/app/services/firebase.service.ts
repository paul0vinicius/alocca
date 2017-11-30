import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Professor } from '../professors/professor.model';
import { Course } from '../courses/course.model';
import { User } from '../users/user.model';
import { Request } from '../requests/request.model';
import { Semester } from '../semesters/semester.model';
import { ProfessorRestriction } from '../professors/professor-restriction.model';
import { Class } from '../classes/class.model';
import { NavbarService } from "./navbar.service";

@Injectable()
export class FirebaseService {
  CLASSES_PATH = '/classes';
  SEMESTERS_PATH = '/semesters';
  PROFESSORS_RESTRICTIONS_PATH = '/professorRestrictions/';
  //"local"
  classes: AngularFireList<any[]>;
  class_: AngularFireObject<any>;
  allocations: AngularFireList<any[]>;
  allocation: AngularFireObject<any>;
  professors: AngularFireList<any[]>;
  professor: AngularFireObject<any>;
  courses: AngularFireList<any[]>;
  course: AngularFireObject<any>;
  users: AngularFireList<any[]>;
  usersEmails: AngularFireList<any[]>;
  user: AngularFireObject<any>;
  requests: AngularFireList<any[]>;
  request: AngularFireObject<any>;
  requestsEmails: AngularFireList<any[]>;
  semesters: AngularFireList<any[]>;
  professorRestrictions: AngularFireList<any[]>;
  private currentSemester: string;
  
  constructor(private db: AngularFireDatabase,
              private  navbarService: NavbarService)  {
    this.professors = db.list('/professors') as AngularFireList<Professor[]>;
    this.courses = db.list('/courses') as AngularFireList<Course[]>;
    this.users = db.list('/users') as AngularFireList<User[]>;
    this.usersEmails = db.list('/usersEmails') as AngularFireList<any[]>;
    this.requests = db.list('/requests') as AngularFireList<Request[]>;
    this.requestsEmails = db.list('/requestsEmails') as AngularFireList<any[]>;
    this.semesters = db.list(this.SEMESTERS_PATH) as AngularFireList<any[]>;
    this.professorRestrictions = db.list(this.PROFESSORS_RESTRICTIONS_PATH) as AngularFireList<ProfessorRestriction[]>;
    this.classes = db.list('/classes') as AngularFireList<Class[]>;


    this.navbarService.getSemesterSelectedEmitter().subscribe(sem => {
      this.currentSemester = sem;
      this.classes = db.list(this.CLASSES_PATH + '/' + this.currentSemester) as AngularFireList<Class[]>;
    })
  }

//Classes
  updateClass(id, classToUpdate){
    if (classToUpdate.professor1SIAPE===classToUpdate.professor2SIAPE){
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2')
      .set("");
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2SIAPE')
      .set("");
    }else{
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2')
      .set(classToUpdate.professor2);
      this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor2SIAPE')
      .set(classToUpdate.professor2SIAPE);
    }
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor1')
    .set(classToUpdate.professor1);
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/professor1SIAPE')
    .set(classToUpdate.professor1SIAPE);
    this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + id+'/note')
    .set(classToUpdate.note);
  }
  saveClass(classToSave: Class) {
    var classRef = this.db.database.ref(this.CLASSES_PATH + '/' + this.currentSemester + '/' + classToSave.getId());
    var detailedCourse: any;
    this.getCourseDetails(classToSave.getCourse()).valueChanges().subscribe(course_ => {
      detailedCourse = course_;
    })
    var recomendedSemester: string = "";
    if(detailedCourse.minimumSemester!==detailedCourse.maximumSemester){
      recomendedSemester = detailedCourse.minimumSemester+"-"+detailedCourse.maximumSemester;
    }else{
      recomendedSemester = detailedCourse.minimumSemester;
    }
    classRef.update({
      "isVerified":false,
      "recomendedSemester":recomendedSemester,
      "course":detailedCourse.shortName,
      "number":classToSave.getNumber(),
      "professor1":"",
      "professor2":"",
      "schedules":{
        "monday":{
          "hours":""
        },
        "tuesday":{
          "hours":""
        },
        "wednesday":{
          "hours":""
        },
        "thursday":{
          "hours":""
        },
        "friday":{
          "hours":""
        }
      },
      "hoursToSchedule": detailedCourse.hoursToSchedule,
      "note":""
    })
    // Only saves the data if it does not exists already
   classRef.once('value').then(
      function(snapshot) {
        if (snapshot.val() == null) {
          classRef.set(classToSave.toFirebaseObject());
          return true;
        } else {
          return false;
        }
      }
    );
  }
  getClasses() {
    let classesList = this.db.list('/classes/'+this.currentSemester) as AngularFireList<any[]>;
    return classesList;
  }
  getClassDetails(id){
    this.class_ = this.db.object('/classes/'+this.currentSemester+'/'+id) as AngularFireObject<Class>;
    return this.class_;
  }
  private addClassToSemester(classId: string) {
    var semester = this.db.database.ref(this.SEMESTERS_PATH + '2017-2');
    semester.transaction(
      function(snapshot) {
        if (snapshot.noDataYet) {
          return {classes: [classId]};
        } else {
          var classes = snapshot.classes as string[];
          classes.push(classId);
          snapshot.classes = classes;
          return snapshot;
        }
      }
    );
  }
  getProfessorNameWithSIAPE(professorSIAPE) {
    var professorName: String = "-";
    this.db.database.ref("professors/"+professorSIAPE).once("value", function(snapshot){
      professorName = snapshot.child('name').val();
    });
    return professorName;
  }
  getClassesNumber(courseKey){
    var actualClassesNumber: number;
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
        actualClassesNumber = (snapshot.child('classesNumber').val() + 1);
    });
    if (this.db.database.ref("courses/"+courseKey).update({
        "classesNumber": actualClassesNumber
    }))
    {
      return actualClassesNumber;
    }
  }
  getCourseName(courseKey){
    var name: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      name = snapshot.child('name').val();
    })
    return name;
  }
  getCourseType(courseKey){
    var type: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      type = snapshot.child('type').val();
    })
    return type;
  }
  getCourseCredits(courseKey){
    var credits: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      credits = snapshot.child('credits').val();
    })
    return credits;
  }
  deleteClass(courseKey){
    if(this.getClasses().remove(courseKey)){
      return true;
    }
  }
  changeCAStatus(id,status){
    this.db.database.ref("classes/"+this.getCurrentSemester()+"/"+id).update({
        "isVerified": status
    })
  }
  getOffererDepartment(courseKey){
    var department: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      department = snapshot.child('offererDepartment').val();
    })
    return department;
  }
  getRequesterDepartment(courseKey){
    var department: string = '';
    this.db.database.ref("courses/"+courseKey).once("value",function(snapshot){
      department = snapshot.child('requesterDepartment').val();
    })
    return department;
  }
///Professors
  /**
   * Saves new professor in the firebase.
   * 
   * @param newprofessor Professor (object) do be saved.
   * 
   * @returns Status of the transaction: true if successfully saved. False, otherwise.
   */
  addNewProfessor(newprofessor: Professor): boolean{
    if(this.professorExists(newprofessor.getSIAPE())){
      return false;
    }else if(this.sameNickname(newprofessor.getNickname())){
      return false;
    }
    else{
      this.db.database.ref("professors/"+newprofessor.getSIAPE()).set(newprofessor.toFirebaseObject());
      return true;
    }  
  }
  /**
   * Retrieves the list of professors saved in the firebase.
   * 
   * @returns List of professors from the firebase.
   */
  getProfessors(): AngularFireList<any[]>{
    return this.professors;
  }
  /**
   * Retrieves the data from the professor of the key
   * 
   * passed as parameter.
   * 
   * @param id Key (SIAPE) of a professor.
   * 
   * @returns The professor as a Firebase Object.
   */
  getProfessorDetails(id: string): AngularFireObject<any>{
    var selectedProfessor = this.db.object('/professors/'+id) as AngularFireObject<any>;
    return selectedProfessor;
  }
  /**
   * Updates a professor in the firebase
   * 
   * @param id Key (SIAPE) of the professor to be updated.
   * @param professor New defined professor (object).
   * @param oldProfessor Current professor (object).
   * 
   * @returns The status of the transaction: true if the professor was updated. False, otherwise.
   */
  updateProfessor(id, professor: Professor, oldProfessor: Professor): boolean{
    if (id!==professor.getSIAPE()){
      if(this.professorExists(professor.getSIAPE())){
        return false;
      }else if(professor.getNickname()!==oldProfessor.getNickname()){
        if(this.sameNickname(professor.getNickname())){
          return false;
        }
      }
      this.deleteProfessor(id);
      this.addNewProfessor(professor);
      this.updateProfessorInClassesTable(professor,oldProfessor);
      return true;
    }else if(professor.getNickname()!==oldProfessor.getNickname()){
      console.log("entrou sim vum");
      if(this.sameNickname(professor.getNickname())===true){
        return false;
      }else{
        if(this.professors.update(id,professor.toFirebaseObject())){
          this.updateProfessorInClassesTable(professor,oldProfessor);
          return true;
        }else{
          return false;
        }
      }
    }else{
      console.log("entrou no terceiro");
      if(this.professors.update(id,professor.toFirebaseObject())){
        this.updateProfessorInClassesTable(professor,oldProfessor);
        return true;
      }else{
        return false;
      }
    }
  }
  /**
   * Updates all the classes related to the professor just updated.
   * 
   * @param professor New defined professor (object).
   * @param oldProfessor Professor updated (object).
   */
  private updateProfessorInClassesTable(professor: Professor,oldProfessor: Professor){
    var thisObject = this;
    var semests: any[];
    this.getSemesters().valueChanges().subscribe(sems => {
      semests = sems;
    })
    semests.forEach(function(sem){
      var rightclasses = []
      thisObject.db.list('/classes/'+sem.$key).valueChanges().subscribe(Rclasses=>{
        rightclasses = Rclasses;
      })
      rightclasses.forEach(function(thatClass){
        if(thatClass.professor1SIAPE == oldProfessor.getSIAPE()){
          thisObject.db.database.ref('/classes/'+sem.$key+'/'+thatClass.$key).update({
            "professor1":professor.getNickname(),
            "professor1SIAPE":professor.getSIAPE()
          });
        }
        else if(thatClass.professor2SIAPE == oldProfessor.getSIAPE()){
          thisObject.db.database.ref('/classes/'+sem.$key+'/'+thatClass.$key).update({
            "professor2":professor.getNickname(),
            "professor2SIAPE":professor.getSIAPE()
          });
        }
      })
    })
  }
  /**
   * Delete a professor from the firebase.
   * 
   * @param id Key (SIAPE) of the professor do be deleted.
   * 
   * @returns True if professor is removed successfully. False, otherwise.
   */
  deleteProfessor(id: string): boolean{
    if(this.professors.remove(id)){
      return true;
    }else{
      return false;
    }
    
  }
  /**
   * Checks if there is a professor with the same SIAPE number
   * 
   * already saved in the firebase.
   * 
   * @param newProfessorKey SIAPE number of the professor to be saved.
   * 
   * @returns True if there is a professor with the same SIAPE number. False, otherwise.
   */
  professorExists(newProfessorKey: string): boolean{
    var isSaved:boolean;
    this.db.database.ref("professors/"+newProfessorKey).once("value",function(snapshot){
      isSaved = snapshot.exists();
    });
    return isSaved;
  }
  /**
   * Checks if there is a professor with the same nickname
   * 
   * already saved in the firebase.
   * 
   * @param newProfessorNickname Nickname of the professor to be saved.
   * 
   * @returns True if there is a professor with the same nickname. False, otherwise.
   */
  sameNickname(newProfessorNickname: string): boolean{
    var sameNickname: boolean = false;
    var professors: any[];
    this.getProfessors().valueChanges().subscribe(profs =>{
      professors = profs;
    })

    professors.forEach(function(prof){
      if (prof.nickname===newProfessorNickname){
        sameNickname = true;
      }
    })
    
    return sameNickname;
  }

///Courses
  /**
   * Saves new course in the firebase.
   * 
   * @param newCourse Course (object) do be saved in the firebase database.
   * 
   * @returns Status of the transaction: true if successfully saved. False, otherwise.
   */
  addNewCourse(newCourse: Course): boolean{
    if(this.courseExists(newCourse.getCode())){
      return false;
    }else if(this.sameShortname(newCourse.getShortName())){
      return false;
    }else{
      this.db.database.ref("courses/"+newCourse.getCode()).set(newCourse.toFirebaseObject());
      return true;
    }
  }
  /**
   * Retrieves the list of courses saved in the firebase.
   * 
   * @returns List of courses from the firebase.
   */
  getCourses(): AngularFireList<any[]>{
    return this.courses;
  }
  /**
   * Retrieves the data from the course of the key
   * 
   * passed as parameter.
   * 
   * @param id Key (code) of a course.
   * 
   * @returns The course as a Firebase Object.
   */
  getCourseDetails(id: string): AngularFireObject<any>{
    this.course = this.db.object('/courses/'+id) as AngularFireObject<any>
    return this.course;
  }
  /**
   * Updates course in the firebase.
   * 
   * @param id Key (code) of the course to be updated.
   * @param course New defined course (object).
   * @param oldName Current course (object).
   * 
   * @returns Status of the transaction: True if the course was updated. False, otherwise.
   */
  updateCourse(id:string, course: Course, oldShortName: string): boolean{
    if(id!==(course.getCode())){
      if(this.courseExists(course.getCode())){
        return false;
      }else if(course.getShortName()!==oldShortName){
        if(this.sameShortname(course.getShortName())){
          return false;
        }
      }
      this.deleteCourse(id);
      this.addNewCourse(course);
      this.updateCourseInClassesTable(course,oldShortName);
      return true;
    }else if(course.getShortName()!==oldShortName){
      if(this.sameShortname(course.getShortName())===true){
        return false;
      }else{
        if(this.courses.update(id,course.toFirebaseObject())){
          this.updateCourseInClassesTable(course,oldShortName);
          return true;
        }else{
          return false;  
        }
      }
    }else{
      if(this.courses.update(id,course.toFirebaseObject())){
        this.updateCourseInClassesTable(course,oldShortName);
        return true;
      }else{
        return false;  
      }
    }
  }
  /**
   * Updates all the classes related to the course just updated.
   * 
   * @param course New defined course (object).
   * @param oldName Short name of the of the course before update.
   */
  private updateCourseInClassesTable(course: Course,oldShortName: String){
    var thisObject = this;

    var recomends: string = "";
    if(course.getMinimumSemester()!==course.getMaximumSemester()){
      recomends = course.getMinimumSemester()+"-"+course.getMaximumSemester();
    }else{
      recomends = course.getMinimumSemester()+"";
    }

    var semests: any[];
    this.getSemesters().valueChanges().subscribe(sems => {
      semests = sems;
      semests.forEach(function(sem){
        var rightclasses = []
        thisObject.db.list('classes/'+sem.$key).valueChanges().subscribe(Rclasses=>{
          rightclasses = Rclasses;
          console.log(rightclasses);
          rightclasses.forEach(function(thatClass){
            console.log(thatClass.course);
            if(thatClass.course === oldShortName){
              console.log('entrou no 1')
              thisObject.db.database.ref("classes/"+sem.$key+'/'+thatClass.$key).update({
                "course":course.getShortName(),
                "hoursToSchedule":course.getHoursToSchedule(),
                "recomendedSemester": recomends
              });
            }
          })
        })
      })
    })
  }
  /**
   * Deletes a Course from the firebase.
   * 
   * @param id Key (code) of the course to be deleted.
   * 
   * @returns Status of the transaction: true if successfully deleted. False, otherwise.
   */
  deleteCourse(id:string): boolean{
    if (this.courses.remove(id)){
      return true;
    }else{
      return false;
    }
  }
  /**
   * Checks if there is a course with the same code
   * 
   * already saved in the firebase.
   * 
   * @param newCourseKey Code of the course to be saved.
   * 
   * @returns True if there is a course with the same code. False, otherwise.
   */
  courseExists(newCourseKey: string):boolean{
    var isSaved: boolean;
    this.db.database.ref("courses/"+newCourseKey).on("value",function(snapshot){
      isSaved = snapshot.exists();
    });
    return isSaved;
  }
  /**
   * Checks if there is a course with the same short name
   * 
   * already saved in the firebase.
   * 
   * @param newCourseShortname Short name of the course to be saved.
   * 
   * @returns True if there is a course with the same short name. False, otherwise.
   */
  sameShortname(newCourseShortname: string): boolean{
    var sameShortname: boolean = false;
    var courses: any[];
    this.getCourses().valueChanges().subscribe(cours =>{
      courses = cours;
    })

    courses.forEach(function(course){
      if (course.shortName===newCourseShortname){
        sameShortname = true;
      }
    })
    
    return sameShortname;
  }

///Users
  /**
   * Retrieves the list of users saved in the firebase.
   * 
   * @returns List of users from the firebase.
   */
  getUsers(){
    return this.users;
  }
  /**
   * Retrieves the list of emails from the users saved in the firebase.
   * 
   * @returns List of emails.
   */
  getUsersEmails(): AngularFireList<any[]>{
    return this.usersEmails;
  }
  /**
   * Deletes a user from the firebase.
   * 
   * @param userKey Key (SIAPE) of the user to be deleted.
   * @param userEmail Email of the user to be deleted.
   * 
   * @returns Status of the transaction: true if deleted. False, otherwise.
   */
  deleteUser(userKey:string, userEmail:string): boolean{
    var thisObject = this;
    if(this.users.remove(userKey)){
      if(this.db.database.ref("usersEmails/").on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(childSnapshot.child('email').val()===userEmail){
            thisObject.usersEmails.remove(childSnapshot.key);
            return true;
          }
        });
      })){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  /**
   * Saves new user in the firebase.
   * 
   * @param newUser User (object) to be saved.
   * 
   * @returns Status of the transaction: true if user is saved. False, otherwise.
   */
  addNewUser(newUser: User): boolean{
      if (this.userAlreadySaved(newUser.getSIAPE())){
        return false;
      }else{
        if(this.db.database.ref("users/"+newUser.SIAPE).set(newUser.toFirebaseObject())){
          if(this.usersEmails.push([newUser.getEmail()])){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
  }
  /**
   * @param newUserKey Key (SIAPE) of the user to be saved.
   * 
   * @returns True if user is already saved. False, otherwise.
   */
  userAlreadySaved(newUserKey: string): boolean{
    var userSIAPE: boolean = false;
    this.db.database.ref("users/"+newUserKey).once("value",function(snapshot){
      userSIAPE = snapshot.exists();
    });
    return userSIAPE;
  }
  /**
   * 
   * @param userEmail Email of the user logging in.
   * 
   * @returns True is the user is registered. False, otherwise.
   */
  isUserRegistered(userEmail){
    var sameEmail: boolean = false;
    var users: any[];
    this.getUsersEmails().valueChanges().subscribe(usrs =>{
      users = usrs;
    })

    users.forEach(function(user){
      if (user.email===userEmail){
        sameEmail = true;
      }
    })
    
    return sameEmail;
  }

///Requests
  /**
   * Retrieves the list of requests saved in the firebase.
   * 
   * @returns List of requests from the firebase.
   */
  getRequests(): AngularFireList<any[]>{
    return this.requests;
  }
  /**
   * Retrieves the list of requests' Emails saved in the firebase.
   * 
   * @returns List of emails from the firebase.
   */
  getRequestsEmails(): AngularFireList<any[]>{
    return this.requestsEmails;
  }
  /**
   * Saves new request in the firebase.
   * 
   * @param newRequest New request (object) to be saved.
   * 
   * @returns Status of the transaction: true if request is saved. False, otherwise.
   */
  addNewRequest(newRequest: Request): boolean{
    if(this.requestExists(newRequest.getEmail())){
      return false;
    }else{
      this.db.database.ref("requests/"+newRequest.getSIAPE()).set(newRequest.toFirebaseObject());
      this.requestsEmails.push([
        newRequest.getEmail()
      ]);
      return true;
    }
  }
  /**
   * 
   * @param request Request (object) to be accepted.
   * 
   * @returns Status of the transaction: true if accepted. False, otherwise.
   */
  acceptRequest(request: Request): boolean{
    var requestToUser = new User (
      request.getSIAPE(),
      request.getName(),
      request.getEmail()
    )
    if(this.addNewUser(requestToUser)){
      if(this.deleteRequest(request)){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  /**
   * 
   * @param request Request (object) to be ignored.
   * 
   * @returns Status of the transaction: true if ignored. False, otherwise.
   */
  deleteRequest(request: Request): boolean{
    var thisObject = this;
    var requestsList: any[];
    if(this.requests.remove(request.getSIAPE())){
      console.log("entrou no remove");
      this.getRequestsEmails().valueChanges().subscribe(rqsts =>{
        console.log(rqsts);
        requestsList = rqsts;
        console.log(requestsList);
        console.log(requestsList);
        requestsList.forEach(function(reqst){
          console.log(reqst.email);
          console.log(request.getEmail());
          if (reqst.email===request.getEmail()){
            thisObject.requestsEmails.remove(reqst.$key);
          }
        })
      })
      return true;
    }else{
      return false;
    }
  }
  /**
   * Checks if there is a request with the same email
   * 
   * already saved in the firebase.
   * 
   * @param requestEmail Email of the request to be saved.
   * 
   * @returns True if a request with the email already exists. False, otherwise.
   */
  requestExists(requestEmail: string): boolean{
    var sameEmail: boolean = false;
    var requests: any[];
    this.getRequestsEmails().valueChanges().subscribe(rqsts =>{
      requests = rqsts;
    })

    requests.forEach(function(request){
      if (request.email===requestEmail){
        sameEmail = true;
      }
    })
    
    return sameEmail;
  }

// Semesters
  /**
   * 
   * @param semester 
   * New (object) Semester to be saved.
   * 
   * @returns Status of the semester to be saved
   */
  saveSemester(semester: Semester): boolean {
      this.db.database.ref(this.SEMESTERS_PATH + '/' + semester.getId())
          .set(semester.toFirebaseObject());
      this.navbarService.emitSemesterSelected(semester.getId());
      return true;
  }

  /**
   * 
   * @returns List of available semesters from firebase.
   */
  getSemesters(): AngularFireList<any[]> {
      return this.semesters;
  }

  /**
   * 
   * @returns Current selected semester.
   */
  getCurrentSemester(): string{
    return this.currentSemester;
  }

  /**
   * 
   * @param id 
   * ID of the semester to be deleted.
   * 
   * @returns {boolean}
   * Status of the operation: true if deleted.
   */
  removeSemester(id: string): boolean {
    if (this.semesters.remove(id)){
      return true;
    }else{
      return false;
    }
  }

// Restrictions
  getProfessorRestrictionsList() {
      return this.professorRestrictions;
  }

  saveProfessorRestriction(restriction: ProfessorRestriction) {
      this.db.database.ref(this.PROFESSORS_RESTRICTIONS_PATH + restriction.getSIAPESemester())
          .set(restriction.toFirebaseObject());
  }

  getProfessorRestrictions(restriction_id: string) {
      return this.db.object(this.PROFESSORS_RESTRICTIONS_PATH + restriction_id) as AngularFireObject<ProfessorRestriction>;
  }

//Schedules

  /**
   * 
   * @param classKey The key of the class that will be added
   * @param day The day in the schedule of the class that will be added
   * @param hour The hour in the schedule of the class that will be added
   * 
   * @example addClassToSchedule('LES-1','monday',7)
   * 
   * @returns status of the addition: true if class scheduled
   */
  addClassToSchedule(classKey:string,day: string,hour: number): boolean{
    var daySchedulesList: any[] = [];
    var alreadyScheduled: boolean = false;
    this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        daySchedulesList.push(childSnapshot.val());
        if(childSnapshot.val()===hour){
          alreadyScheduled = true;
        }
        if(!daySchedulesList){
          return  true;
        }
      })
    })
    if (!alreadyScheduled){
      daySchedulesList.push(hour);
      if(this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours').set(daySchedulesList)){
        this.updateHoursToSchedule(classKey,hour,true);
        return true;
      }
    }else{
      return false;
    }
  }

  /**
   * 
   * @param classKey The key of the class that will be deleted
   * @param day The day in the schedule of the class that will be deleted
   * @param hour The hour in the schedule of the class that will be deleted
   * 
   * @example deleteClassFromSchedule('LES-1','monday',7)
   * 
   * @returns {boolean} status of the deletion: true if class unscheduled
   */
  deleteClassFromSchedule(classKey:string,day:string,hour:number): boolean{
    var hoursFromClass: any[] = [];
    this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .on("value",function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        if(childSnapshot.val()!==hour){
          hoursFromClass.push(childSnapshot.val());
        }
        if(hoursFromClass===null){
          return  true;
        }
      })
    })
    if(hoursFromClass.length===0){
      hoursFromClass.push("");
    }
    if(this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/schedules/'+day+'/hours')
    .set(hoursFromClass)){
      this.updateHoursToSchedule(classKey,hour,false)
      return true;
    }else{
      return false;
    }
  }

  /**
   * 
   * @param classKey The key of the class
   * @param hour The hour in the schedule of the class
   * @param isAdd Is the method being used when a class is being scheduled or unscheduled
   * 
   * @example pdateHoursToSchedule('LES-1',8,true)
   * 
   * @return {boolean} status of the update: true if succesfull
   */
  private updateHoursToSchedule(classKey: string, hour: number, isAdd: boolean): boolean{
    var thisObject = this;
    var hourToAddOrSubtract:number = 0;
    var oldHours: number;
    var newHours: number;
    if(isAdd){
      if(hour===7){
        hourToAddOrSubtract = -1;
      }else{
        hourToAddOrSubtract = -2;
      }
    }else{
      if(hour===7){
        hourToAddOrSubtract = 1;
      }else{
        hourToAddOrSubtract = 2;
      }
    }
    if (this.db.database.ref("classes/"+this.currentSemester+"/"+classKey)
      .on("value", function(snapshot){
        oldHours = snapshot.child('hoursToSchedule').val();
      }))
    {
      newHours = oldHours + hourToAddOrSubtract;
      this.db.database.ref("classes/"+this.currentSemester+"/"+classKey+'/hoursToSchedule').set(newHours);
      return true;
    }else{
      return false;
    }

  }
}

interface Email{
  email: string;
}