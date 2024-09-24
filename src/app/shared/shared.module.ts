import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const materials = [
  MatButtonModule
]
@NgModule({
  imports: [
    materials
  ],
  exports: [
    materials
  ]
})
export class SharedModule { }
