import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopWorkoutDialogComponent } from './stop-workout-dialog/stop-workout-dialog.component';

@Component({
  selector: 'app-current-workout',
  templateUrl: './current-workout.component.html',
  styleUrls: ['./current-workout.component.css']
})
export class CurrentWorkoutComponent implements OnInit {

  @Output() stopWorkout = new EventEmitter();

  progress = 5;
  timer;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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
          this.stopWorkout.emit();
        } else {
          this.startOrResumeWorkout();
        }
      });
  }

  private startOrResumeWorkout(): void {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

}
