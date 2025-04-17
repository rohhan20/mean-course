import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  standalone: false,
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  postService: PostsService = inject(PostsService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  postForm: FormGroup;
  imageURL: string;

  post: Post;
  private mode: string = 'create';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.min(6)]),
      content: new FormControl(null, [Validators.required]),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
    });
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      if(paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = 'edit';
        const postId = paramMap.get('postId');
        this.postService.getPost(postId).subscribe(post=>{
          this.post = {id: post._id, title: post.title, content: post.content};
          this.postForm.setValue({title: this.post.title, content: this.post.content});
          this.isLoading = false
        });   
      } else {
        this.mode = 'create';
      }
    });
  }

  onSavePost(){
    if(this.postForm.valid){
      if(this.mode == 'create'){
        this.postService.addPost(this.postForm.value.title, this.postForm.value.content); 
      } else {
        this.postService.updatePost(this.post.id, this.postForm.value.title, this.postForm.value.content);
      }
    }
    this.postForm.reset();
  }

  onImagePicked(event: Event){
    const image = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: image});
    this.postForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      console.log(this.imageURL);
    };

    reader.readAsDataURL(image);
  }
}
