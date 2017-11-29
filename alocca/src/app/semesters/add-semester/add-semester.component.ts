import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Semester } from '../semester.model';

@Component({
    selector: 'app-add-semester',
    templateUrl: './add-semester.component.html',
    styleUrls: ['./add-semester.component.css']
})
export class AddSemesterComponent implements OnInit {
    /**
     * Maximum year for the creation of a semester.
     */
    MAX_YEAR: number;
    /**
     * Year options for a new semester.
     */
    years: number[];
    /**
     * Academic year-half options for a new semester.
     */
    halves: number[];
    /**
     * Selected year for the new semester.
     */
    year: number;
    /**
     * Selected academic year-half for the new semester.
     */
    half: number;
    /**
     * Message to display when a semester is created.
     */
    SAVED_SUCCESSFULLY_MESSAGE: string = "Semestre criado com sucesso!";
    /**
     * Timeout for the message displayed in the snackbar.
     */
    TIMEOUT_SAVED_MESSAGE: number = 2500;

    constructor(
        private FBservice: FirebaseService,
        private snackService: SnackbarService
    ) {
        this.years = [];
        this.MAX_YEAR = 2030;
        this.initializeYears();
        this.halves = [1, 2];
    }

    /**
     * Populates the list of years, from 2017 to the MAX_YEAR defined (2030).
     */
    private initializeYears() {
        var yearToBeAdded = 2017;
        while (yearToBeAdded <= this.MAX_YEAR) {
            this.years.push(yearToBeAdded);
            yearToBeAdded++;
        }
    }

    /**
     * Creates a new semester.
     */
    onAddNewSemester() {
      let semester = new Semester(this.year, this.half);
      if(this.FBservice.saveSemester(semester)){
          this.snackService.openSnackBar(this.SAVED_SUCCESSFULLY_MESSAGE,this.TIMEOUT_SAVED_MESSAGE);
      }
    }

    /**
     * Executes its commands once the class constructor is called.
     */
    ngOnInit() {
    }

}
