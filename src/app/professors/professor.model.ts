/**
 * Class that represents a Professor.
 */
export class Professor {
    constructor(
        public SIAPE: string,
        public name: string,
        public nickname: string
    ) {}

    /**
     * @returns This professor's SIAPE number.
     */
    getSIAPE(): string {
        return this.SIAPE;
    }

    /**
     * @returns This professor's name.
     */
    getName(): string {
        return this.name;
    }

    /**
     * @returns This professor's nickname.
     */
    getNickname(): string {
        return this.nickname;
    }

    /**
     * This professor (object) in a JSON format.
     * 
     * @returns JSON element.
     */
    toFirebaseObject(): any {
        var professor: any = {
            SIAPE: this.getSIAPE(),
            name: this.getName(),
            nickname: this.getNickname()
        }

        return <JSON>professor.stringify();
    }

}