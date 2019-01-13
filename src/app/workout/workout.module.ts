import { HistoryComponent } from './history/history.component';
import { NgModule } from '@angular/core';
import { CurrentWorkoutComponent } from './current-workout/current-workout.component';
import { NewWorkoutComponent } from './new-workout/new-workout.component';
import { WorkoutComponent } from './workout.component';
import { StopWorkoutDialogComponent } from './current-workout/stop-workout-dialog/stop-workout-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';
import { WorkoutRoutingModule } from './workout-routing.module';

@NgModule({
  declarations: [
    CurrentWorkoutComponent,
    StopWorkoutDialogComponent,
    HistoryComponent,
    NewWorkoutComponent,
    WorkoutComponent,
  ],
  imports: [AngularFirestoreModule, SharedModule, WorkoutRoutingModule],
  entryComponents: [StopWorkoutDialogComponent],
})
export class WorkoutModule {}
