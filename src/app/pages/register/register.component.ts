import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public submitted: boolean = false;
  public existingUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Getter method for easy access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Private method to generate a unique user ID
  private generateUserId(): string {
    return new Date().getTime().toString();
  }

  eRegister(): void {
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
    const userId: string = this.generateUserId();
    const user: User = {
      id: userId,
      name: name,
      email: email,
      password: password,
    };
    this.authService.register(user);
    this.router.navigateByUrl('/login');
  }
}
