import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  exerciseChangedEvent = new Subject<Exercise>();

  constructor() { }

  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }];

  exercises: Exercise[] = [];

  private currentExercise: Exercise;

  getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  startExercise(selectedExerciseId: string) {
    this.currentExercise = this.availableExercises.find(exercise => selectedExerciseId === exercise.id);
    this.exerciseChangedEvent.next({ ...this.currentExercise });
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ... this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      state: 'canceled',
      date: new Date()
    });
    this.currentExercise = undefined;
    this.exerciseChangedEvent.next(null);

  }

  completeExercise() {
    this.exercises.push({
      ... this.currentExercise,
      state: 'completed',
      date: new Date()
    });
    this.currentExercise = undefined;
    this.exerciseChangedEvent.next(null);
  }

  getCurrentExercise() {
    return { ...this.currentExercise };
  }
}
