import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './renderer/renderer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RendererComponent],
  exports: [RendererComponent]
})
export class CoreModule {
}
