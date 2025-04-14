import { Component, inject, Input, input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  postService = inject(PostsService);
  subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.postService.getPostUpdateListner().subscribe({
      next: (posts)=>{ this.posts = posts },
      error: (err) => { console.log(err) },
    });
    this.postService.getPosts();
  }

  onDeletePost(id: string){
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
     this.subscription.unsubscribe(); 
  }
  
}
