import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:3000/blogs';  // Your API endpoint

  constructor(private http: HttpClient) {}

  // Method to add a new blog
  addBlog(blogData: Blog): Observable<any> {
    return this.http.post(this.baseUrl, blogData);
  }

  updateBlog(blogId: string, blogData: Blog): Observable<any> {
    return this.http.put(`${this.baseUrl}/${blogId}`, blogData);
  }

  deleteBlog(blogId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${blogId}`);
  }

  // Method to fetch a blog by ID
  getBlogById(id: string | null): Observable<Blog> {
    return this.http.get<Blog>(`${this.baseUrl}/${id}`);
  }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl);
  }

  // Other CRUD methods can go here (e.g., deleteBlog, updateBlog, etc.)
}
