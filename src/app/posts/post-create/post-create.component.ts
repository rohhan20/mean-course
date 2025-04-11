import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  @Output()
  onPostCreate = new EventEmitter<Post>();

  onAddPost(postForm: NgForm){
    if(postForm.valid){
      const newPost: Post = {title: postForm.value.title, content: postForm.value.content}
      this.onPostCreate.emit(newPost);
    }
  }
}
