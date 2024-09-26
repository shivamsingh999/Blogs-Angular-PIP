import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private oauthTokenEndpoint = 'https://oauth2.provider.com/token'; // Placeholder for future OAuth token endpoint
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Simulate a login (replace this with OAuth token handling later)
  login(username: string, password: string): Observable<boolean> {
    // Simulated login logic, replace with actual API call later
    if (username === 'john.doe@yopmail.com' && password === 'Dummyuser#123') {
      const token = 'dummyToken'; // Replace this with actual token
      localStorage.setItem(this.authTokenKey, token);
      this.loggedIn = true;
      return of(true); // Return observable of true
    }
    return of(false); // If login failed
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.loggedIn = false;
    this.router.navigate(['/sign-in']);
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authTokenKey);
    return !!token;
  }

  // Placeholder function for OAuth login
  oauthLogin(): Observable<any> {
    // Example for OAuth login request (to be replaced with actual provider details)
    return this.http.post(this.oauthTokenEndpoint, {
      grant_type: 'authorization_code',
      // Add your client_id, redirect_uri, and authorization_code here
    }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.authTokenKey, response.access_token); // Store OAuth token
        this.loggedIn = true;
      }),
      catchError(error => {
        console.error('OAuth login failed', error);
        return of(null); // Return null in case of failure
      })
    );
  }

  // Get stored authentication token
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
