import { UiService } from './../../services/ui.service';
import { NgForm } from '@angular/forms';
import { Exercise } from './../../models/exercise.model';
import { WorkoutService } from './../../services/workout.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit, OnDestroy {

  @Output() startWorkout = new EventEmitter();
  onDestroy$ = new Subject();
  exercises: Exercise[] = null;
  isLoading = false;

  constructor(
    private workoutService: WorkoutService,
    private uiService: UiService) { }

  ngOnInit() {

    this.uiService.progressLoadingEvent
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isLoading => {
        this.isLoading = isLoading;
      });

    this.workoutService
      .availableExercisesChangedEvent
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.exercises = this.workoutService.getAvailableExercises();
      });
    this.exercises = this.workoutService.getAvailableExercises();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  onStartWorkout(form: NgForm) {
    this.workoutService.startExercise(form.value.exercise);
  }
  reload() {
    this.exercises = this.workoutService.getAvailableExercises();
  }
}
