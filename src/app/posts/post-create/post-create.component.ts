import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../../services/post.service';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  postService: PostsService = inject(PostsService);

  onAddPost(postForm: NgForm){
    if(postForm.valid){
      this.postService.addPost(postForm.value.title, postForm.value.content);      
    }
    postForm.resetForm();
  }
}
