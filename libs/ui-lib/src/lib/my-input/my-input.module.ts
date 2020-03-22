import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInputComponent } from './my-input.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MyInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MyInputComponent
  ]
})
export class MyInputModule {
}
