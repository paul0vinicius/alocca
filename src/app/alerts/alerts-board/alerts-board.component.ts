import { Component, OnInit } from '@angular/core';
import { Alert } from "app/alerts/alert.model";
import { AlertFactory } from "app/alerts/alert.factory";
import { SampleAlerts } from "app/alerts/alerts.mock";

// Single instance of factory
const ALERT_FACTORY: AlertFactory = new AlertFactory();
const ALERTS_MOCK: Alert[] = new SampleAlerts().getSamples();

@Component({
  selector: 'app-alerts-board',
  templateUrl: './alerts-board.component.html',
  styleUrls: ['./alerts-board.component.css']
})

export class AlertsBoardComponent implements OnInit {
    // For now, this list gets alerts from mock, but it must gets from the database in the future.
    alertsList: Alert[];

    // I decided it's best to separate in two lists the alerts. The backend must filter the ignored
    // and the non-ignored alerts.
    ignoredAlerts: Alert[];

    constructor() {
        this.alertsList = ALERTS_MOCK;
        this.ignoredAlerts = [];
    }

    ngOnInit() {}

  // The alert ID's is its index in the list.
  ignoreAlert(id) {
      var alert: Alert = this.alertsList.splice(id, 1)[0];
      console.log(alert.id);
      alert.ignore();
      this.ignoredAlerts.push(alert)
  }

}
