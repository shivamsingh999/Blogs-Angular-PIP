import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, Comment as BlogComment } from '../model/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://localhost:3000/blogs';  // Your API endpoint
  private commentsUrl = 'http://localhost:3000/comments';  // Endpoint for comments
  
  constructor(private http: HttpClient) { }

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

  // Fetch comments for a specific blog
  getCommentsByBlogId(blogId: string): Observable<BlogComment[]> {
    return this.http.get<BlogComment[]>(`${this.commentsUrl}?blogId=${blogId}`);
  }

   // Method to add a new comment
   addComment(blogId: string, comment: BlogComment): Observable<any> {
    const commentWithBlogId = { ...comment, blogId };
    return this.http.post(this.commentsUrl, commentWithBlogId);
  }

  // Add a reply to a comment
  addReply(commentId: string, reply: BlogComment): Observable<any> {
    return this.http.post(`${this.commentsUrl}/${commentId}/replies`, reply);
  }


  // In BlogService (adjust accordingly)
  // addComment(blogId: string, comment: BlogComment) {
  //   return this.http.post<BlogComment>(this.baseUrl, comment);
  // }

  // addReply(blogId: string, commentId: string, reply: BlogComment) {
  //   return this.http.post<BlogComment>(`${this.baseUrl}/comments/${commentId}/replies`, reply);
  // }

  // Other CRUD methods can go here (e.g., deleteBlog, updateBlog, etc.)
}
