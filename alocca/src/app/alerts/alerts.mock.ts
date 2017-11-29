import { Alert } from "app/alerts/alert.model";
import { AlertFactory } from "app/alerts/alert.factory";

// Single instance of factory
const ALERT_FACTORY: AlertFactory = new AlertFactory();

export class SampleAlerts {
    
    alerts: Alert[];

    constructor() {
        this.alerts = [];
        this.populate();
    }

    populate() {
        var i: number;
        for (i = 0; i < 10; i++){
            var alert: Alert = ALERT_FACTORY.create("Restrição " + i, "Default message");
            alert.id = i;
            this.alerts.push(alert);
        }
    }

    getSamples() {
        return this.alerts;
    }

}