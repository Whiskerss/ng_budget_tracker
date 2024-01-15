import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public submitted: boolean = false;
  public existingUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  private generateUserId(): string {
    return new Date().getTime().toString();
  }

  eRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    if (this.authService.checkUser(email)) {
      this.existingUser = true;
      return;
    }
    const userId = this.generateUserId();
    const user = {
      id: userId,
      name: name,
      email: email,
      password: password,
    };
    this.userService.addUser(user);
    this.router.navigateByUrl('/login');
  }
}
