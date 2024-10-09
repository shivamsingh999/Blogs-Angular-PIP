import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor'
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    // Add more categories here
  ];

  editor: Editor;
  // http: HttpClient;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.editor = new Editor();
  }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      banner: [''],
      description: ['', [Validators.required, Validators.minLength(5)]],
      category: [null, [Validators.required]],
      createdDate: [{ value: this.getCurrentDate(), disabled: true }],
      author: [{ value: this.getAuthorName(), disabled: true }]
    });

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
  }

  saveDraft(): void {
    const blogData = this.blogForm.getRawValue();
    // Handle save as draft logic
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blogData = this.blogForm.getRawValue();
      // Handle publishing the blog
      // Add publishing-specific logic, e.g., removing draft status
      // Clean the description: Strip <p> tags
      blogData.description = this.stripParagraphTags(blogData.description);
      blogData.isPublished = true;

      // Assuming `http://localhost:3000/blogs` is the endpoint for publishing
      this.http.post('http://localhost:3000/blogs', blogData).subscribe({
        next: (response: any) => {
          console.log('Blog published successfully:', response);
          // Optionally, navigate to another page or reset the form
        },
        error: (err: any) => {
          console.error('Error publishing blog:', err);
        }
      });
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
