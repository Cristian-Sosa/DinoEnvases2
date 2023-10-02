import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPage } from '../../pages';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, InputsModule } from 'src/app/shared';

@NgModule({
  declarations: [AuthPage],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule
  ], exports: [
    AuthPage
  ]
})
export class AuthModule { }
