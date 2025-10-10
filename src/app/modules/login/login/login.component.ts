import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent {
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  errorMessage: string = '';
  // errorMessage = signal('');
  displayError = signal(false)

  constructor(private cdr: ChangeDetectorRef, private loginService: LoginService) {}

  login() {
    const email = this.emailControl.value ?? '';
    const password = this.passwordControl.value ?? '';

    this.loginService.login(email, password).subscribe({
      next: (resp) => console.log('success'),
      error: (err) => {
        this.errorMessage = err;
        this.displayError.set(true)
        // this.cdr.markForCheck()
      },
    });
  }
}
