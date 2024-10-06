import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [
    CommonModule,  // For *ngFor and other common directives
    ReactiveFormsModule,  // For reactive forms
    NgxEditorModule,  // For the ngx-editor
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required]],
      banner: [''],
      description: ['', [Validators.required, Validators.minLength(5)]],
      category: [null, [Validators.required]],
      createdDate: [{ value: this.getCurrentDate(), disabled: true }],
      author: [{ value: this.getAuthorName(), disabled: true }]
    });
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
    }
  }
}
