import { NgModule } from "@angular/core";

import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar'


@NgModule({
    exports: [
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatToolbarModule
    ],
    providers: [
        provideNativeDateAdapter()
    ]
})
export class AngularMaterialModule {}