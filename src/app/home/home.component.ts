import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
})
export class HomeComponent implements OnInit {
  blogs: any[] = [];
  filteredBlogs: any[] = [];
  categories: string[] = ['Technology', 'Health', 'Lifestyle', 'Finance']; // Sample categories
  

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/blogs').subscribe((data) => {
      this.blogs = data;
      this.filteredBlogs = [...this.blogs]; // Initially, show all blogs
    });
  }

  onSubscribe() {
    // Logic for subscription form submission
    alert('You have subscribed successfully!');
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
