import { FormsModule } from '@angular/forms'; // Import FormsModule
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { provideAuth0 } from '@auth0/auth0-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // This provides the HttpClientModule
    importProvidersFrom(RouterModule,FormsModule), // Include FormsModule for ngModel
    provideAuth0({
      domain: 'dev-xkp6ett462zziib2.us.auth0.com',
      clientId: 'habJlkeZoHQEtgqA2sei1D0ja5Mb8ZVG',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
});