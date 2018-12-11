import { UiService } from './ui.service';
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
  availableExercisesChangedEvent = new Subject();
  availableExercises: Exercise[] = [];
  private currentExercise: Exercise = undefined;

  constructor(
    private db: AngularFirestore,
    private uiService: UiService) {
    this.fetchExercises()
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.availableExercisesChangedEvent.next();
          this.uiService.progressLoadingEvent.next(false);
        },
        error => {
          console.log(error);
        });
  }


  fetchExercises(): Observable<Exercise[]> {

    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(documentArray => {
          this.uiService.progressLoadingEvent.next(true);

          return documentArray.map((document: any) => ({
            id: document.payload.doc.id,
            duration: document.payload.doc.data().duration,
            name: document.payload.doc.data().name,
            calories: document.payload.doc.data().calories
          }));
        }));
  }

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  getCurrentExercise() {
    return !this.currentExercise ? this.currentExercise : { ...this.currentExercise };
  }

  startExercise(selectedExerciseId: string) {
    this.currentExercise = this.availableExercises.find(exercise => selectedExerciseId === exercise.id);
    this.exerciseChangedEvent.next({ ...this.currentExercise });

    // example of updating a single exercise (doc)
    this.db.doc('availableExercises/' + selectedExerciseId)
      .update({
        lastSelected: new Date()
      });
  }

  cancelExercise(progress: number) {
    const exercise: Exercise = {
      ... this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      state: 'canceled',
      date: new Date()
    };

    this.saveExerciseHistory(exercise);
    this.currentExercise = undefined;
    this.exerciseChangedEvent.next(null);
  }

  completeExercise() {
    const exercise: Exercise = {
      ... this.currentExercise,
      state: 'completed',
      date: new Date()
    };

    this.saveExerciseHistory(exercise);
    this.currentExercise = undefined;
    this.exerciseChangedEvent.next(null);
  }

  fetchHistoryExercises(): Observable<Exercise[]> {
    return <Observable<Exercise[]>>this.db
      .collection('exercises')
      .valueChanges();
  }

  private saveExerciseHistory(exercise: Exercise) {
    this.db.collection('exercises').add(exercise);
  }

}
