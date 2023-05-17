import { NgModule } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  imports: [
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule
  ],
  exports: [
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule
  ]
})
export class MaterialModule { }
