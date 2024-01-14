import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedTeam = '';

  types = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private homeComponent: HomeComponent
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      amount: [, Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.form.value;
    const userId = this.currentUserService.getCurrentUser().id;
    this.userService.addFinancialData(userId, formData);

    this.form.reset();
  }

  onCancel() {
    this.homeComponent.toggleFormVisibility();
    this.form.reset();
  }
}
