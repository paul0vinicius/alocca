export class ScheduleRestriction {
    constructor(
        public monday: number[],
        public tuesday: number[],
        public wednesday: number[],
        public thursday: number[],
        public friday: number[]
    ) { }

    get getMonday() {
        return this.monday;
    }

    get getTuesday() {
        return this.tuesday;
    }

    get getWednesday() {
        return this.wednesday;
    }

    get getThursday() {
        return this.thursday;
    }

    get getFriday() {
        return this.friday;
    }
}
