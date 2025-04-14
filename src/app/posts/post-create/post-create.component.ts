import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  postService: PostsService = inject(PostsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  post: Post;
  private mode: string = 'create';
  isLoading: boolean = false;

  onSavePost(postForm: NgForm){
    if(postForm.valid){
      if(this.mode == 'create'){
        this.postService.addPost(postForm.value.title, postForm.value.content); 
      } else {
        this.postService.updatePost(this.post.id, postForm.value.title, postForm.value.content);
      }
    }
    postForm.resetForm();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.postService.getPost(postId).subscribe(post=>{
          this.post = {id: post._id, title: post.title, content: post.content};
          this.isLoading = false
        });   
      } else {
        this.mode = 'create';
      }
    });
  }
}
