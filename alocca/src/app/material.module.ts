import {NgModule} from '@angular/core';

import {
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule {}