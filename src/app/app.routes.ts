import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard'; // Ensure the path is correct
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { HomeComponent } from './home/home.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'my-blogs', component: MyBlogsComponent, canActivate: [AuthGuard] },
  // { path: 'add-blog', component: ManageBlogsComponent, canActivate: [AuthGuard] },
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // AuthGuard  // Provide your AuthGuard here
  ],
});
