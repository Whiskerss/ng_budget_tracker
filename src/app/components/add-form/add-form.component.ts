import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HomeComponent } from '../../pages/home/home.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { Globals } from '../../globals/global';
import { FinancialData } from '../../models/financial-data.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnInit {
  public form!: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public homeComponent: HomeComponent,
    public dataTable: DataTableComponent,
    public globals: Globals
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['D4T4' + new Date().getTime().toString()],
      name: ['', Validators.required],
      amount: [, Validators.required],
      date: ['', Validators.required],
      type: ['Type', this.optionValidator('Type')],
      reoccuring: ['Reoccuring', this.optionValidator('Reoccuring')],
      category: ['Category', this.optionValidator('Category')],
    });

    // Populate the form with data if in edit mode
    if (this.globals.editData) {
      this.form.patchValue(this.globals.editData);
    }
  }

  // Custom validator for specific string values
  optionValidator = (invalString: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === invalString) {
        return { specificString: true };
      }
      return null;
    };
  };

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control
      ? control.invalid && (control.touched || this.submitted)
      : false;
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData: FinancialData = this.form.value;
    this.globals.editData
      ? (this.userService.editFinancialData(formData),
        this.globals.toggleFormVisibility(),
        (this.globals.isStatsVisible = true))
      : this.userService.addFinancialData(formData);

    // Reset the form and clear edit data
    this.form.reset({
      type: 'Type',
      reoccuring: 'Reoccuring',
      category: 'Category',
    });
    delete this.globals.editData;
    this.submitted = false;
  }

  // Handle form cancellation
  onCancel(): void {
    this.submitted = false;
    this.globals.toggleFormVisibility();
    this.globals.isStatsVisible = true;
    this.form.reset({
      type: 'Type',
      reoccuring: 'Reoccuring',
      category: 'Category',
    });
    delete this.globals.editData;
  }
}
