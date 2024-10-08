import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LandingStoreModule } from '../../shared/store/landing.store.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CalculatorComponent],
})
export class CalculatorModule {}
