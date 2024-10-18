import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BlogService } from '../services/blog.service';
import { Blog, Comment } from '../model/blog.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  // blogs: any[] = [];
  blogs: Blog[] = []; // Initialize as null to handle the absence of data
  filteredBlogs: Blog[] = [];
  categories: string[] = ['Technology', 'Health', 'Lifestyle', 'Finance']; // Sample categories


  constructor(private http: HttpClient, public auth: AuthService, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((data) => {
      this.blogs = data;
      this.filteredBlogs = [...this.blogs]; // Initially, show all blogs
    });
  }

  logout() {
    this.auth.logout();
  }

  onSubscribe() {
    // Logic for subscription form submission
    alert('You have subscribed successfully!');
  }

  removeBlog(blogId: string): void {
    if (confirm('Are you sure you want to remove this blog?')) {
      // Assuming you're using a service to handle HTTP requests.
      this.blogService.deleteBlog(blogId).subscribe(() => {
        // After deletion, remove the blog from the list locally
        this.filteredBlogs = this.filteredBlogs.filter(blog => blog.id !== blogId);
        this.router.navigate(['/']);
      });
    }
  }



  filterBlogsByCategory(category: string): void {
    // debugger
    if (category === 'all') {
      this.filteredBlogs = [...this.blogs]; // Show all blogs if 'All' is selected
    } else {
      this.filteredBlogs = this.blogs.filter(blog => blog.category == category);
    }
  }

}
