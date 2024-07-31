import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent implements OnInit {
  public priceForDisplay: number = 0.0;
  inputSlider = new FormControl();
  radioControl = new FormControl();
  public minPrice = 10;
  public maxPrice = 1000;

  public comitionLabel = '6.5% + 60¢';
  public comitionCurrency = 'USD';
  public taxTitle = 'TAX';
  public taxValue = 0.0;
  public comition = 0.0;
  public total = 0.0;

  constructor() {}

  ngOnInit() {
    this.comition = this.calculateComition(this.maxPrice);
    this.inputSlider.valueChanges.subscribe((values) => {
      this.priceForDisplay = values;
      this.comition = this.calculateComition(values);
      this.total = values - this.comition;
    });

    this.radioControl.valueChanges.subscribe((values) => {
      if (values === 'US') {
        this.comitionLabel = '6.5% + 60¢';
        this.comitionCurrency = 'USD';
        this.taxTitle = 'TAX';
      } else {
        this.comitionLabel = '6.5% + $5.00';
        this.comitionCurrency = 'MXN';
        this.taxTitle = 'IVA';
      }
    });

    this.inputSlider.setValue(this.maxPrice);
    this.radioControl.setValue('US');
  }

  private calculateComition(price: number): number {
    if (this.radioControl.value === 'US') {
      this.taxValue = (price * 0.065 + 5) * 0.08;
      return price * 0.065 + 0.6;
    } else {
      this.taxValue = (price * 0.065 + 5) * 0.16;
      return price * 0.065 + 5 + this.taxValue;
    }
  }
}
