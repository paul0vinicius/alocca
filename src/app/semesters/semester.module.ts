import { NgModule } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { MaterialModule } from '.././material.module';

import { AddSemesterComponent } from './add-semester/add-semester.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        AddSemesterComponent
    ],
    exports: []
})

export class SemesterModule {}