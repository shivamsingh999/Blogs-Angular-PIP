import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Blog, Comment } from '../model/blog.model'
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})

export class BlogDetailComponent implements OnInit {
  blog!: Blog;
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient,  private cdr: ChangeDetectorRef, private blogService: BlogService, ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogById(id).subscribe((data) => {
      // Modify the description to add style to img tags
      data.description = data.description.replace(/<img([^>]+)>/g, '<img$1 style="width: 100%;">');
      this.blog = data;

      // Manually trigger change detection
      this.cdr.detectChanges(); 

      console.log(this.blog.description);
      
      this.comments = data.comments || []; // Fetch comments from the blog
    });
  }
}
