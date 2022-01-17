import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutRoutingModule } from './aut-routing.module';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AutRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
