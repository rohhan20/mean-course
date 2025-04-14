import { inject, Injectable } from "@angular/core";
import { Post } from "../app/models/post.model";
import { BehaviorSubject, map, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PostsService{
    http: HttpClient = inject(HttpClient)
    router: Router = inject(Router);

    private posts: Post[] = [];
    private postsSubject = new Subject<Post[]>();

    addPost(title: string, content: string){
        const newPost: Post = {id: null, title: title, content: content};
        this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', newPost).subscribe({
            next: (response) => {
                newPost.id = response.postId;
                this.posts.push(newPost);
                this.postsSubject.next([...this.posts]);
                this.router.navigate([""]);
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
                this.posts = posts;
                this.postsSubject.next([...posts]);
            }
        });
    }

    deletePost(postId: string){
        this.http.delete<{message: string}>('http://localhost:3000/api/posts/'+postId)
        .subscribe({
            next: (response) => {
                console.log(response.message);
                this.posts = this.posts.filter(post => post.id !== postId);
                this.postsSubject.next([...this.posts]);
            }
        });
    }

    updatePost(id: string, title: string, content: string){
        const updatedPost: Post = {id: id, title: title, content: content};
        this.http.patch("http://localhost:3000/api/posts/" + id, updatedPost)
        .subscribe((response)=>{
            console.log(response);
            const postIndex = this.posts.findIndex(p=>p.id === updatedPost.id);
            this.posts[postIndex] = updatedPost;
            this.postsSubject.next([...this.posts]);
            this.router.navigate([""]);
        });
    }

    getPost(postId: string) {
        // return {...this.posts.find(post=>post.id === postId)};
        return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/" + postId);
    }

    getPostUpdateListner(){
        return this.postsSubject.asObservable();
    }
}