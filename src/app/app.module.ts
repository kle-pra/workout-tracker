import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CurrentWorkoutComponent } from './workout/current-workout/current-workout.component';
import { NewWorkoutComponent } from './workout/new-workout/new-workout.component';
import { HistoryComponent } from './workout/history/history.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkoutComponent } from './workout/workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopWorkoutDialogComponent } from './workout/current-workout/stop-workout-dialog/stop-workout-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CurrentWorkoutComponent,
    NewWorkoutComponent,
    HistoryComponent,
    WelcomeComponent,
    WorkoutComponent,
    HeaderComponent,
    SidenavListComponent,
    StopWorkoutDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    StopWorkoutDialogComponent
  ]
})
export class AppModule { }
