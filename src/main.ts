import { FormsModule } from '@angular/forms'; // Import FormsModule
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Import CommonModule

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  // This provides the HttpClientModule
    importProvidersFrom(RouterModule,FormsModule), // Include FormsModule for ngModel
  ],
});
