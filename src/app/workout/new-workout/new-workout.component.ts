import { NgForm } from '@angular/forms';
import { Exercise } from './../../models/exercise.model';
import { WorkoutService } from './../../services/workout.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  @Output() startWorkout = new EventEmitter();

  exercises: Exercise[] = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.exercises = this.workoutService.getExercises();
  }

  onStartWorkout(form: NgForm) {
    this.workoutService.startExercise(form.value.exercise);
  }
}
