import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { MaterialModule } from '.././material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import 'hammerjs';

import { AppRoutingModule } from '../app-routing.module';

import { AddProfessorComponent } from './add-professor/add-professor.component';
import { EditProfessorComponent } from './edit-professor/edit-professor.component';
import { ViewProfessorsComponent } from './view-professors/view-professors.component';
import { AddRestrictionComponent } from './add-restriction/add-restriction.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        AppRoutingModule],
    declarations: [
        AddProfessorComponent,
        EditProfessorComponent,
        ViewProfessorsComponent,
        AddRestrictionComponent
        ],
    exports: []
})

export class ProfessorsModule {}