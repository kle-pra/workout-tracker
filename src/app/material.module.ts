import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatInputModule],
})
export class MaterialModule { }