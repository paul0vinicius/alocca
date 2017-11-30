import { Component, OnInit } from '@angular/core';
import  { MatCheckbox } from '@angular/material';
import { ScheduleRestriction } from '../schedule-restriction.model'
import { ProfessorRestriction } from '../professor-restriction.model'
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-restriction',
  templateUrl: './add-restriction.component.html',
  styleUrls: ['./add-restriction.component.css']
})

export class AddRestrictionComponent implements OnInit {
  maxCredits: number;
  minCredits: number;
  graduateCredits: number;
  restrictionFromFB: ProfessorRestriction;
  scheduleRestrictions: ScheduleRestriction;
  allScheduleRestrictions: number[];
  monday: number[];
  tuesday: number[];
  wednesday: number[];
  thursday: number[];
  friday: number[];
  HOURS = ["7:00 - 8:00", "8:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
          "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00", "20:00 - 22:00"];
  integerHours = [7, 8, 10, 12, 14, 16, 18, 20, 22];
  professor_id: string;
  MONDAY_START_INDEX = 1;
  TUESDAY_START_INDEX = 2;
  WEDNESDAY_START_INDEX = 3;
  THURSDAY_START_INDEX = 4;
  FRIDAY_START_INDEX = 5;

  constructor(
      private FBservice: FirebaseService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.professor_id = this.route.snapshot.params['id'];
      this.FBservice.getProfessorRestrictions(this.professor_id).valueChanges().subscribe(professorRestriction => {
          this.restrictionFromFB = professorRestriction;
          this.maxCredits = professorRestriction.maxCredits;
          this.minCredits = professorRestriction.minCredits;
          this.graduateCredits = professorRestriction.graduateCredits;
          this.monday = professorRestriction.scheduleRestrictions.monday;
          this.tuesday = professorRestriction.scheduleRestrictions.tuesday;
          this.wednesday = professorRestriction.scheduleRestrictions.wednesday;
          this.thursday = professorRestriction.scheduleRestrictions.thursday;
          this.friday = professorRestriction.scheduleRestrictions.friday;
      });
      this.allScheduleRestrictions = this.getRestrictionsFromDatabase();
  }

  private getScheduleRestrictionsFromTable = (): ScheduleRestriction => {

      var monday: number[] = [];
      var tuesday: number[] = [];
      var wednesday: number[] = [];
      var thursday: number[] = [];
      var friday: number[] = [];

      this.getRestrictionsFromCheckbox(this.MONDAY_START_INDEX, monday);
      this.getRestrictionsFromCheckbox(this.TUESDAY_START_INDEX, tuesday);
      this.getRestrictionsFromCheckbox(this.WEDNESDAY_START_INDEX, wednesday);
      this.getRestrictionsFromCheckbox(this.THURSDAY_START_INDEX, thursday);
      this.getRestrictionsFromCheckbox(this.FRIDAY_START_INDEX, friday);

    let scheduleRestrictions = new ScheduleRestriction(monday, tuesday, wednesday, thursday, friday);
    return scheduleRestrictions;
  }

  submitRestrictionsForm() {
    let restrictions = new ProfessorRestriction(
       this.professor_id,
       this.minCredits,
       this.maxCredits,
       this.graduateCredits,
       this.getScheduleRestrictionsFromTable()
    );

    this.FBservice.saveProfessorRestriction(restrictions);
    this.router.navigate(['view-professors']);
  }

  // TODO: Set this method to private
  getRestrictionsFromCheckbox(startIndex: number, restrictionsArray: number[]) {
      var iteration = 0;
      for (var i = startIndex; i <= 40; i += 5) {
          console.log(document.getElementsByName("graduateCredits"));
          console.log(document.getElementById("input-md-checkbox-" + i));
          var checkbox = <MatCheckbox><any>document.getElementById("input-md-checkbox-" + i);
          if (checkbox.checked) {
              restrictionsArray.push(this.integerHours[iteration]);
          } else restrictionsArray.push(0);
          iteration++;
      }
  }



  // TODO: Turn allScheduleRestrictions into a global variable, fix the function that uses this list and
  // call this function on ngOnInit()
  getRestrictionsFromDatabase() {

      var allScheduleRestrictions: number[] = [];
      for (var i = 0; i <= 40; i += 1) {
          allScheduleRestrictions.push(0);
      }

      this.getRestrictionsOfTheDay(this.MONDAY_START_INDEX, allScheduleRestrictions, this.monday);
      this.getRestrictionsOfTheDay(this.TUESDAY_START_INDEX, allScheduleRestrictions, this.tuesday);
      this.getRestrictionsOfTheDay(this.WEDNESDAY_START_INDEX, allScheduleRestrictions, this.wednesday);
      this.getRestrictionsOfTheDay(this.THURSDAY_START_INDEX, allScheduleRestrictions, this.thursday);
      this.getRestrictionsOfTheDay(this.FRIDAY_START_INDEX, allScheduleRestrictions, this.friday);

      return allScheduleRestrictions;
  }

  // TODO: Set this method to private
  getRestrictionsOfTheDay(startIndex: number, restrictionsArray: number[], dayRestrictions: number[]) {
      var iteration = 0;
      for (var i = startIndex; i <= 40; i += 5) {
          try {
              restrictionsArray.splice(i, 1, dayRestrictions[iteration]);
              iteration++;
          } catch (Error) { }
      }
  }

  verifyRestriction(id: number) {
      this.allScheduleRestrictions = this.getRestrictionsFromDatabase();
      //console.log(this.allScheduleRestrictions);
      //console.log(id);
      var isRestricted: boolean = (this.allScheduleRestrictions[id] > 0);
      return isRestricted;
  }

}
