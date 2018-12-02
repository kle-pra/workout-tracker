import { Exercise } from './../../models/exercise.model';
import { WorkoutService } from './../../services/workout.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopWorkoutDialogComponent } from './stop-workout-dialog/stop-workout-dialog.component';

@Component({
  selector: 'app-current-workout',
  templateUrl: './current-workout.component.html',
  styleUrls: ['./current-workout.component.css']
})
export class CurrentWorkoutComponent implements OnInit {

  progress = 5;
  timer;
  currentExercise: Exercise;

  constructor(
    private dialog: MatDialog,
    private workoutService: WorkoutService) { }

  ngOnInit() {
    this.currentExercise = this.workoutService.getCurrentExercise();
    this.startOrResumeWorkout();
  }

  onStop(): void {

    clearInterval(this.timer);

    const dialogRef = this.dialog
      .open(StopWorkoutDialogComponent,
        {
          width: '250px',
          data: {
            progress: this.progress
          }
        });

    dialogRef
      .afterClosed()
      .subscribe(isStop => {
        if (isStop) {
          this.workoutService.cancelExercise(this.progress);
        } else {
          this.startOrResumeWorkout();
        }
      });
  }

  private startOrResumeWorkout(): void {
    const step = this.currentExercise.duration / 100 * 1000;

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.workoutService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

}
