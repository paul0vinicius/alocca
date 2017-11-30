import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
//change to snack bars

import { MaterialModule } from '.././material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';
import { AlertsModule } from '../alerts/alerts.module'

import {SchedulesTableComponent} from './schedules-table/schedules-table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AlertsModule],
    declarations: [
        SchedulesTableComponent],
    exports: []
})

export class SchedulesModule {}
