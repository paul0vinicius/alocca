import { Alert } from "app/alerts/alert.model";

export class AlertFactory {
    // By default, an alert is non-ignored on creation.
    create(title: string, message: string) {
        return new Alert(title, message);
    }
}