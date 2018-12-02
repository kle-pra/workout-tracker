import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  isWorkoutActive = false;
  onDestroy$ = new Subject();

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workoutService
      .exerciseChangedEvent
      .asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((exercise) => {
        if (exercise) {
          this.isWorkoutActive = true;
        } else {
          this.isWorkoutActive = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
