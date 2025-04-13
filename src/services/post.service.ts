import { inject, Injectable } from "@angular/core";
import { Post } from "../app/models/post.model";
import { BehaviorSubject, map, Subject } from "rxjs";
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
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', newPost).subscribe({
            next: (response) => {
                newPost.id = response.postId
                this.posts.push(newPost);
                this.postsSubject.next([...this.posts]);
            }
        });
    }

    getPosts() {
        this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postsData)=>{
            return postsData.posts.map((post)=>{
                return {title: post.title, content: post.content, id: post._id};
            });
        }))
        .subscribe({
            next: (posts) => {
                this.postsSubject.next([...posts]);
            }
        });
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/api/posts/'+postId)
        .subscribe({
            next: (message) => {
                console.log(message);
                const updatedPosts = this.posts.filter(post => post.id !== postId); // TODO: Fix this.
                this.postsSubject.next([...this.posts]);
            }
        });
    }

    getPostUpdateListner(){
        return this.postsSubject.asObservable();
    }
}