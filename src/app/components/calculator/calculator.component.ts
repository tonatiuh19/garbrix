import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { LandingActions } from '../../shared/store/actions';
import { fromLanding } from '../../shared/store/selectors';
import { Subject, takeUntil } from 'rxjs';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent implements OnInit {
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public priceForDisplay: number = 0.0;
  inputSlider = new FormControl();
  radioControl = new FormControl();
  public minPrice = 10;
  public maxPrice = 1000;

  contactForm!: FormGroup;
  isSubmitting: boolean = false;
  isSubmitted: boolean = false;

  public comitionLabel = '6.5% + 60¢';
  public comitionCurrency = 'USD';
  public taxTitle = 'TAX';
  public taxValue = 0.0;
  public comition = 0.0;
  public total = 0.0;

  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store) {}

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

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      businessType: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((landing) => {
        this.isSubmitting = landing.isSubmitting || false;
        this.isSubmitted = landing.isSubmitted || false;

        if (this.isSubmitted) {
          this.launchConfetti();
          this.contactForm.reset();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  launchConfetti(): void {
    const canvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      const myConfetti = confetti.create(canvas, { resize: true });
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.store.dispatch(
        LandingActions.sendContactInfo({
          contactInfo: {
            ...this.contactForm.value,
          },
        })
      );
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    this.store.dispatch(LandingActions.resetContactInfoState());
  }
}
