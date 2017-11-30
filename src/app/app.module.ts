import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';//import??

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DialogsComponent } from './dialogs/dialogs.component';

///Our modules
import { NavbarModule } from './navbar/navbar.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { ProfessorsModule } from './professors/professors.module';
import { SemesterModule } from './semesters/semester.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { SchedulesModule } from './schedules/schedules.module';
import { AlertsModule } from './alerts/alerts.module';
import { AppRoutingModule } from './app-routing.module';

//firebase
import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//firebase service -- TO CHANGE TO DATA MANAGER
import { FirebaseService } from './services/firebase.service';


//angular material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

//Services
import { DialogsService } from './services/dialogs.service';
import { NavbarService } from './services/navbar.service';
import { SnackbarService} from './services/snackbar.service';


@NgModule({
  declarations: [
    AppComponent,
    DialogsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ClassesModule,
    SemesterModule,
    CoursesModule,
    ProfessorsModule,
    NavbarModule,
    HomeModule,
    UsersModule,
    RequestsModule,
    SchedulesModule,
    AlertsModule
  ],
  entryComponents:[DialogsComponent],
  exports: [DialogsComponent],
  providers: [
    FirebaseService, 
    DialogsService, 
    NavbarService, 
    SnackbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
