export class Semester {
    /**
     * ID of the semester
     */
    private id: string;
    /**
     * Name of the semester
     */
    private name: string;

    constructor(year: number, semester: number) {
        this.id = year + '-' + semester;
        this.name = year + '.' + semester;
    }

    /**
     * 
     * @returns The semester ID
     */
    getId(): string{
        return this.id;
    }

    /**
     * 
     * @returns The semester name
     */
    getName(): string {
        return this.name;
    }

    /**
     * 
     * @param newId The new ID to be set to the semester
     */
    setId(newId: string) {
        this.id = newId;
    }

    /**
     * 
     * @param newName The new name to be set to the semester
     */
    setName(newName: string) {
        this.name = newName;
    }

    /**
     * 
     * @returns The semester as a JSON object
     */
    toFirebaseObject(): JSON {
        var firebaseObject: any = {
            name: this.name
        }
        return <JSON>firebaseObject;
    }
}