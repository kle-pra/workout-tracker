import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  exerciseChangedEvent = new Subject<Exercise>();
  private exercisesChanged = new Subject();

  constructor(private db: AngularFirestore) {
    this.getExercisesFs()
      .subscribe((exercises: Exercise[]) => {
        console.log(exercises);
        this.availableExercises = exercises;
        this.exerciseChangedEvent.next();
      });
  }

  availableExercises: Exercise[] = [];

  exercises: Exercise[] = [];

  private currentExercise: Exercise;

  getExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  getExercisesFs(): Observable<Exercise[]> {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(documentArray => {
          return documentArray.map((document: any) => ({
            id: document.payload.doc.id,
            duration: document.payload.doc.data().duration,
            name: document.payload.doc.data().name,
            calories: document.payload.doc.data().calories
          }));
        }));
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
