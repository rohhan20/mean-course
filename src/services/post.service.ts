import { inject, Injectable } from "@angular/core";
import { Post } from "../app/models/post.model";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostsService{
    http: HttpClient = inject(HttpClient)

    private posts: Post[] = [];
    private postsSubject = new Subject<Post[]>();

    addPost(title: string, content: string){
        const newPost: Post = {id: null, title: title, content: content};
        this.http.post('http://localhost:3000/api/posts', newPost).subscribe({
            next: (message)=>{
                console.log(message);
                this.posts.push(newPost);
                this.postsSubject.next([...this.posts]);
            }
        });
    }

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts').subscribe({
            next: (postsData) => {
                this.posts = postsData.posts;
                this.postsSubject.next([...this.posts]);
            }
        });
    }

    getPostUpdateListner(){
        return this.postsSubject.asObservable();
    }
}