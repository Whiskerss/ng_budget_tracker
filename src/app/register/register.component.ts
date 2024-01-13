import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  private generateUserId(): string {
    return new Date().getTime().toString();
  }

  eRegister() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password == confirmPassword) {
      const userId = this.generateUserId();

      const user = {
        id: userId,
        name: name,
        email: email,
        password: password,
        expenses: [],
        incomes: [],
      };
      this.userService.addUser(user);
      this.router.navigateByUrl('/login');
    }
  }
}
