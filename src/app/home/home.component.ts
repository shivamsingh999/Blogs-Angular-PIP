import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
})
export class HomeComponent implements OnInit {
  blogs: any[] = [];
  categories: string[] = ['Technology', 'Health', 'Lifestyle', 'Finance']; // Sample categories

  constructor(private http: HttpClient) {}

  onSubscribe() {
    // Logic for subscription form submission
    alert('You have subscribed successfully!');
  }


  filterBlogsByCategory(category: string) {
    // Filter logic here
    this.blogs = this.blogs.filter(blog => blog.category === category);
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/blogs').subscribe((data) => {
      this.blogs = data;
    });
  }
}
