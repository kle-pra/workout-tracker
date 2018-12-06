import { NgForm } from '@angular/forms';
import { Exercise } from './../../models/exercise.model';
import { WorkoutService } from './../../services/workout.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  @Output() startWorkout = new EventEmitter();

  exercises: Exercise[] = [];

  constructor(private workoutService: WorkoutService,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.workoutService.getExercises();
    this.workoutService.exerciseChangedEvent.asObservable().subscribe(() => {
      this.exercises = this.workoutService.getExercises();
    });
  }

  onStartWorkout(form: NgForm) {
    this.workoutService.startExercise(form.value.exercise);
  }
}
