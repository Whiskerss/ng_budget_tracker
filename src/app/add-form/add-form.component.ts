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
import { HomeComponent } from '../home/home.component';
import { Globals } from '../globals/global/global';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnInit {
  public form!: FormGroup;
  submitted: boolean = false;

  categories = this.globals.categories;
  reoccurings = this.globals.reoccurings;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public homeComponent: HomeComponent,
    public globals: Globals
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

    if (this.homeComponent.editData) {
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
    this.homeComponent.editData
      ? (this.userService.editFinancialData(formData),
        this.homeComponent.toggleFormVisibility(),
        (this.homeComponent.isStatsVisible = true))
      : this.userService.addFinancialData(formData);
    this.form.reset({
      type: 'Type',
      reoccuring: 'Reoccuring',
      category: 'Category',
    });
    this.homeComponent.editData = null;
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
    this.homeComponent.editData = null;
  }
}
