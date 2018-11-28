import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  isWorkoutActive = false;

  constructor() { }

  ngOnInit() {
  }

  stopWorkout(): void {
    this.isWorkoutActive = false;
  }
}
