import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [ReactiveFormsModule, AngularFireAuthModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
