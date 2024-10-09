import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {
  constructor(public auth: AuthService) {
    auth.loginWithRedirect();
  }

  // ngOnInit(): void {
  //   this.auth.loginWithRedirect();
  // }
}
