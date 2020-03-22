import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInputModule } from './my-input/my-input.module';

@NgModule({
  imports: [CommonModule, MyInputModule],
  exports: [MyInputModule]
})
export class UiLibModule {
}
