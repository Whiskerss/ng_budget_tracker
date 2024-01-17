import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted: boolean = false;
  public authError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Getter method for easy access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  eLogin(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    if (this.authService.login(email, password)) {
      this.router.navigateByUrl('/home');
      // Resetting form submission and authentication error flag
      this.submitted = false;
      this.authError = false;
    } else {
      this.authError = true;
    }
  }
}
