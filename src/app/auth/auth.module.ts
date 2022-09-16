import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordDialogComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    JwtModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatStepperModule
  ]
})
export class AuthModule { }
