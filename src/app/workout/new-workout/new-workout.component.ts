import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrls: ['./new-workout.component.css']
})
export class NewWorkoutComponent implements OnInit {

  @Output() startWorkout = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onStartWorkout() {
    this.startWorkout.emit();
  }

}
