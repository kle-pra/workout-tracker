import { HistoryComponent } from './history/history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWorkoutComponent } from './current-workout/current-workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { WorkoutComponent } from './workout.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StopWorkoutDialogComponent } from './current-workout/stop-workout-dialog/stop-workout-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CurrentWorkoutComponent,
    StopWorkoutDialogComponent,
    HistoryComponent,
    NewWorkoutComponent,
    WorkoutComponent,
  ],
  imports: [AngularFirestoreModule, SharedModule],
  entryComponents: [StopWorkoutDialogComponent],
})
export class WorkoutModule {}
