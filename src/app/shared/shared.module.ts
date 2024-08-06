import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerComponent } from './components/divider/divider.component';
import { MySvgPicComponent } from './components/my-svg-pic/my-svg-pic.component';

const components = [DividerComponent, MySvgPicComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class SharedModule {}
