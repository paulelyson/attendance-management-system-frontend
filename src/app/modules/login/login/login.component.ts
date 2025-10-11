import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
  displayError = signal(false);

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const email = this.emailControl.value ?? '';
    const password = this.passwordControl.value ?? '';

    this.authService.login(email, password).subscribe({
      next: (resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        localStorage.setItem('token', 'sampletoken');
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errorMessage = err;
        this.displayError.set(true);
        // this.cdr.markForCheck()
      },
    });
  }
}
