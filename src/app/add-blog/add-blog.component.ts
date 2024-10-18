import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    CommonModule,  // For *ngFor and other common directives
    ReactiveFormsModule,  // For reactive forms
    NgxEditorModule,  // For the ngx-editor
    HttpClientModule,
  ],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss'
})

export class AddBlogComponent implements OnInit {
  blogForm!: FormGroup;
  categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Lifestyle' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Health' },
    // Add more categories here
  ];

  editor: Editor;
  blogId!: string | null;
  // http: HttpClient;

  constructor(private fb: FormBuilder, private http: HttpClient, private blogService: BlogService,  private route: ActivatedRoute,
    private router: Router) {
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      banner: [''],
      description: ['', [Validators.required, Validators.minLength(5)]],
      category: [null, [Validators.required]],
      createdDate: [{ value: this.getCurrentDate(), disabled: true }],
      author: [{ value: this.getAuthorName(), disabled: true }]
    });
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe(blog => {
        this.blogForm.patchValue(blog);
      });
    }

    this.editor = new Editor();
  }

  getCurrentDate(): string {
    return new Date().toISOString();
  }

  getAuthorName(): string {
    return 'John Doe'; // Replace with dynamic logged-in user
  }

  cancel(): void {
    this.blogForm.reset();
    this.blogForm = this.fb.group({
      createdDate: [{ value: this.getCurrentDate(), disabled: true }],
      author: [{ value: this.getAuthorName(), disabled: true }]
    });
  }


  onSubmit(): void {
    if (this.blogForm.valid) {
      const blogData = this.blogForm.getRawValue();
      blogData.description = this.stripParagraphTags(blogData.description);
      blogData.isPublished = true;

      if (this.blogId) {
        // Update existing blog
        this.blogService.updateBlog(this.blogId, blogData).subscribe({
          next: (response) => {
            console.log('Blog updated successfully:', response);
            this.router.navigate(['/']); // Redirect after updating
          },
          error: (err) => {
            console.error('Error updating blog:', err);
          }
        });
      } else {
        // Create new blog
        this.blogService.addBlog(blogData).subscribe({
          next: (response) => {
            console.log('Blog published successfully:', response);
            this.router.navigate(['/']); // Redirect after creating
          },
          error: (err) => {
            console.error('Error publishing blog:', err);
          }
        });
      }
    } else {
      console.error('Form is invalid, please check the fields.');
    }
  }

  saveDraft(): void {
    if (this.blogForm.valid) {
      const draftData = this.blogForm.getRawValue();
      draftData.description = this.stripParagraphTags(draftData.description);
      draftData.isPublished = false; // Set to false for saving as a draft
  
      if (this.blogId) {
        // Update existing draft
        this.blogService.updateBlog(this.blogId, draftData).subscribe({
          next: (response) => {
            console.log('Draft updated successfully:', response);
            this.router.navigate(['/']); // Redirect after updating
          },
          error: (err) => {
            console.error('Error updating draft:', err);
          }
        });
      } else {
        // Create new draft
        this.blogService.addBlog(draftData).subscribe({
          next: (response) => {
            console.log('Draft saved successfully:', response);
            this.router.navigate(['/']); // Redirect after creating
          },
          error: (err) => {
            console.error('Error saving draft:', err);
          }
        });
      }
    } else {
      console.error('Form is invalid, please check the fields.');
    }
  }

  // Helper function to strip <p> tags
  stripParagraphTags(description: string): string {
    // Replace closing </p> or <br> tags with a newline character
    let formattedDescription = description.replace(/<\/p>/g, '\n').replace(/<br>/g, '\n');

    // Remove opening <p> tags
    formattedDescription = formattedDescription.replace(/\n/g, '<br>');

    return formattedDescription.trim(); // Remove extra spaces or newlines
  }
}
