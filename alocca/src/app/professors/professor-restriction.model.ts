import { ScheduleRestriction } from "app/professors/schedule-restriction.model";

export class ProfessorRestriction {
    constructor(
        public SIAPESemester: string,
        public minCredits: number,
        public maxCredits: number,
        public graduateCredits: number,
        public scheduleRestrictions: ScheduleRestriction
    ) { }

    getSIAPESemester() {
        return this.SIAPESemester;
    }

    setSIAPESemester(newSIAPESemester: string) {
        this.SIAPESemester = newSIAPESemester;
    }

    getMinCredits() {
        return this.minCredits;
    }

    setMinCredits(newMinCredits: number) {
        this.minCredits = newMinCredits;
    }

   get getMaxCredits(): number {
        return this.maxCredits;
    }

   public test = (): number => {
       return 4;
   }

    setMaxCredits(newMaxCredits: number) {
        this.minCredits = newMaxCredits;
    }

    getGraduateCredits() {
        return this.graduateCredits;
    }

    setGraduateCredits(newGraduateCredits: number) {
        this.graduateCredits = newGraduateCredits;
    }

    getScheduleRestrictions() {
        return this.scheduleRestrictions;
    }

    setScheduleRestrictions(newScheduleRestrictions: ScheduleRestriction) {
        this.scheduleRestrictions = newScheduleRestrictions;
    }

    toFirebaseObject() {
       var firebaseObject: any = {
           'minCredits': this.minCredits,
           'maxCredits': this.maxCredits,
           'graduateCredits': this.graduateCredits,
           'scheduleRestrictions': this.scheduleRestrictions
       };
       return <JSON>firebaseObject;
    }
}