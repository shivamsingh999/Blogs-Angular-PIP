import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Blog, Comment as BlogComment } from '../model/blog.model';
import { BlogService } from '../services/blog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog!: Blog;
  comments: BlogComment[] = [];
  newComment: string = '';
  replyText: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(id).subscribe((data) => {
      data.description = data.description.replace(/<img([^>]+)>/g, '<img$1 style="width: 100%;">');
      this.blog = data;

      // Manually trigger change detection
      this.cdr.detectChanges();

      // Fetch comments from the blog
      // Fetch comments for the blog
      this.blogService.getCommentsByBlogId(id!).subscribe((comments) => {
        this.comments = comments;
      });
      // this.comments = data.comments || [];
    });
  }

   // Add a new comment
   addComment(newComment: string): void {
    if (this.newComment = newComment.trim()) {
      const newComment: BlogComment = {
        id: this.generateId(),
        author: 'Current User',
        text: this.newComment,
        likes: 0,
        dislikes: 0,
        createdDate: new Date().toISOString(),
        replies: []
      };

      // POST the new comment to the server
      this.blogService.addComment(this.blog.id, newComment).subscribe({
        next: (response: BlogComment) => {
          this.comments.push(response);
          this.newComment = ''; // Clear the comment input field
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
    }
  }

  // Add a reply to a comment
  addReply(commentId: string, newReplyText: string): void {
    const comment = this.comments.find((c) => c.id === commentId);
    if (comment && newReplyText.trim()) {
      const newReply: BlogComment = {
        id: this.generateId(),
        author: 'Current User',
        text: newReplyText,
        likes: 0,
        dislikes: 0,
        createdDate: new Date().toISOString(),
        replies: []
      };

      this.blogService.addReply(commentId, newReply).subscribe({
        next: (response: BlogComment) => {
          if (!comment.replies) {
            comment.replies = [];
          }
          comment.replies.push(response);
          this.replyText[commentId] = ''; // Clear the reply input field
        },
        error: (err) => {
          console.error('Error adding reply:', err);
        }
      });
    }
  }

  // Toggle reply form
  toggleReply(commentId: string): void {
    const comment = this.comments.find((comment) => comment.id === commentId);
    if (comment) {
      comment.showReply = !comment.showReply;
    }
  }

  // Helper function to generate a unique ID for new comments/replies
 

  toggleReplyForm(comment: BlogComment): void {
    comment.showReply = !comment.showReply;
  }


  // Update the blog's comments in the backend
  updateBlogComments(): void {
    this.blogService.updateBlog(this.blog.id, { ...this.blog, comments: this.comments }).subscribe({
      next: () => {
        console.log('Comments updated successfully');
      },
      error: (err) => {
        console.error('Error updating comments:', err);
      }
    });
  }

  // Helper function to generate a unique ID for new comments/replies
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
