import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatSidenavModule,
  MatSelectModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
})
export class MaterialModule { }