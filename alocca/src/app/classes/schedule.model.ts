export class Schedule {

    constructor(
        private weekday: string,
        private time: number
    ) {};

    public getWeekday() {
        return this.weekday;
    };

    public setWeekday(newWeekday: string) {
        this.weekday = newWeekday;
    };

    public getTime() {
        return this.time;
    };

    public setTimeout(newTime: number) {
        this.time = newTime;
    }

}