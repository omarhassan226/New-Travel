import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

/**
 * SharedModule consolidates commonly used Angular Material modules and
 * other dependencies that can be shared across different parts of the application.
 */
const materials = [
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatIconModule,
  MatSelectModule,
  MatSliderModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...materials,
  ],
  exports: [
    ...materials
  ]
})
/**
 * The SharedModule provides a centralized location for importing and exporting
 * Angular Material modules, enabling easier management of Material UI components.
 */
export class SharedModule { }
