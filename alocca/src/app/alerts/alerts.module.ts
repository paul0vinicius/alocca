import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '.././material.module';

import { AlertsBoardComponent } from './alerts-board/alerts-board.component';

@NgModule({
  imports: [
    CommonModule, 
    MaterialModule
  ],
  declarations: [AlertsBoardComponent],
  exports: [AlertsBoardComponent]
})

export class AlertsModule { }
