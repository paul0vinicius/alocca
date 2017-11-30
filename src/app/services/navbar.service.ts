import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class NavbarService {
    semesterSelected: EventEmitter<string> = new EventEmitter();

    public getSemesterSelectedEmitter() {
        return this.semesterSelected;
    }

    public emitSemesterSelected(semester: string){
        this.semesterSelected.emit(semester)
    }
}

//TO DO: MOVE THIS CLASS TO ../services and update references