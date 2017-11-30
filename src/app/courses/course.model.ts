export class Course {
    constructor(
        private code: string,
        private name: string,
        private shortName: string,
        private credits: number,
        private hoursToSchedule: number,
        private type: string,
        private minimumSemester: number,
        private maximumSemester: number,
        private offererDepartment: string,
        private requesterDepartment: string
    ) {}

    /**
     * @returns This course's code.
     */
    getCode(): string{
        return this.code;
    }

    /**
     * @returns This course's name.
     */
    getName(): string{
        return this.name;
    }

    /**
     * @returns This course's short name.
     */
    getShortName(): string{
        return this.shortName;
    }

    /**
     * @returns This course's credits.
     */
    getCredits(): number{
        return this.credits;
    }

    /**
     * @returns This course's hours to schedule.
     */
    getHoursToSchedule(): number{
        return this.hoursToSchedule;
    }

    /**
     * @returns This course's type.
     */
    getType(): string{
        return this.type;
    }

    /**
     * @returns This course's minimum recomended semester.
     */
    getMinimumSemester(): number{
        return this.minimumSemester;
    }

    /**
     * @returns This course's maximum recomended semester.
     */
    getMaximumSemester(): number{
        return this.maximumSemester;
    }

    /**
     * @returns This course's offerer department.
     */
    getOffererDepartment(): string{
        return this.offererDepartment;
    }

    /**
     * @returns This course's requester department.
     */
    getRequesterDepartment(): string{
        return this.requesterDepartment;
    }

    /**
     * This course (object) in a JSON format.
     * 
     * @returns JSON element.
     */
    toFirebaseObject(): any{
        var course: any = {
            code: this.getCode(),
            name: this.getName(),
            shortName: this.getShortName(),
            credits: this.getCredits(),
            hoursToSchedule: this.getHoursToSchedule(),
            type: this.getType(),
            minimumSemester: this.getMinimumSemester(),
            maximumSemester: this.getMaximumSemester(),
            offererDepartment: this.getOffererDepartment(),
            requesterDepartment: this.getRequesterDepartment()
        }

        return <JSON>course;
    }

}