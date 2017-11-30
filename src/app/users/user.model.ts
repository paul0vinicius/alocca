export class User {
    constructor(
        public SIAPE: string,
        public name: string,
        public email: string
    ) {}

    /**
     * @returns This user's SIAPE number.
     */
    getSIAPE(): string{
        return this.SIAPE;
    }

    /**
     * @returns This user's name.
     */
    getName(): string{
        return this.name;
    }

    /**
     * @returns This user's email.
     */
    getEmail(): string{
        return this.email;
    }

    /**
     * This user (object) in a JSON format.
     * 
     * @returns JSON element.
     */
    toFirebaseObject(): JSON {
        var user: any = {
            SIAPE: this.getSIAPE(),
            name: this.getName(),
            email: this.getEmail()
        }
        return <JSON>user;
    }
} 