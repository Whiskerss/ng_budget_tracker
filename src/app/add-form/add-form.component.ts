import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css',
})
export class AddFormComponent implements OnInit {
  public form!: FormGroup;
  storedData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    // Retrieve existing data from local storage
    this.storedData = this.localStorageService.getData('formData');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: [0, Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      reoccuring: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.form.value;
    // Push the new data to the array
    this.storedData.push(formData);
    // Save the updated array to local storage
    this.localStorageService.saveData('formData', this.storedData);
    this.form.reset();
  }
}
