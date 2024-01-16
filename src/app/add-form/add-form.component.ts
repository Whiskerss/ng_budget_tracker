import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { CurrentUserService } from '../services/current-user.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnInit {
  public form!: FormGroup;
  submitted: boolean = false;

  categories: string[] = [
    'Utilities',
    'Primary Income',
    'Secondary Income',
    'Investment',
    'Housing',
    'Transportation',
    'Food',
    'Personal',
    'Entertainment',
    'Savings',
  ];

  reoccurings: string[] = [
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly',
    'Sometimes',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private currentUserService: CurrentUserService,
    public homeComponent: HomeComponent
  ) {}

  ngOnInit(): void {
    const optionValidator = (invalString: string): ValidatorFn => {
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value === invalString) {
          return { specificString: true };
        }
        return null;
      };
    };

    this.form = this.fb.group({
      id: ['D4T4' + new Date().getTime().toString()],
      name: ['', Validators.required],
      amount: [, Validators.required],
      date: ['', Validators.required],
      type: ['Type', optionValidator('Type')],
      reoccuring: ['Reoccuring', optionValidator('Reoccuring')],
      category: ['Category', optionValidator('Category')],
    });

    if (!this.homeComponent.isStatsVisible) {
      this.form.patchValue(this.homeComponent.editData);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const formData = this.form.value;
    const userId = this.currentUserService.getCurrentUser().id;
    this.userService.addFinancialData(userId, formData);
    this.form.reset({
      type: 'Type',
      reoccuring: 'Reoccuring',
      category: 'Category',
    });
    this.submitted = false;
  }

  onCancel() {
    this.submitted = false;
    this.homeComponent.toggleFormVisibility();
    this.homeComponent.isStatsVisible = true;

    this.form.reset({
      type: 'Type',
      reoccuring: 'Reoccuring',
      category: 'Category',
    });
  }
}
