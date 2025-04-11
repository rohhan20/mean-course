import { Component, Input, input } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
   @Input() posts: Post[] = [];

}
