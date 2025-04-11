import { Injectable } from "@angular/core";
import { Post } from "../app/models/post.model";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService{
    private posts: Post[] = [];
    private postsSubject = new Subject<Post[]>();

    addPost(title: string, content: string){
        const newPost: Post = {title: title, content: content};
        this.posts.push(newPost);
        this.postsSubject.next([...this.posts]);
    }

    getPostUpdateListner(){
        return this.postsSubject.asObservable();
    }
}