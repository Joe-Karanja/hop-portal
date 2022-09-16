import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SigninComponent } from '../session/signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog/forgot-password-dialog.component';

const routes: Routes = [
    {
        path: 'login',
        component:LoginComponent,
        data: {
            title: 'ESB Reporting Portal Login'
        }
    },
    {
        path: 'registration',
        component:RegistrationComponent,
        data: {
            title: 'ESB Reporting Portal Register'
        }
    },
    {
        path: 'forgot-password',
        component:ForgotPasswordDialogComponent,
        data: {
            title: 'ESB Reporting Portal reset password'
        }
    },
    {
        path: "set-password",
        component: SigninComponent,
        data: {
            title: "Set Password"
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }