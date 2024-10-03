// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent {

// }
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // You can add styling later
})
export class HomeComponent implements OnInit {
  featuredBlogs = [];  // Placeholder for featured blogs
  categories = ['Technology', 'Finance', 'Business', 'Investment'];  // Placeholder categories

  constructor() {}

  ngOnInit(): void {
    // Fetch featured blogs from service here (to be added later)
  }

  selectCategory(category: string) {
    console.log('Category selected:', category);
    // Fetch blogs by category (to be implemented)
  }
}
