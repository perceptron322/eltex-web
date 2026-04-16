import { Injectable } from '@angular/core';
import { PostElementWithId } from '../../models/post.models';

@Injectable({
    providedIn: 'root',
})
export class BlogStorageService {
    posts: PostElementWithId[] = this.#getFromLocalStorage();

    addPost(post: PostElementWithId){
        this.posts.push(post);
        this.#saveToLocalStorage();
    }

    #getFromLocalStorage() {
        const raw = localStorage.getItem('posts');
        if(!raw) return [];
        return JSON.parse(raw);
    }

    #saveToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }

    deletePost(post : PostElementWithId) {
        this.posts = this.posts.filter(postElement => postElement.id !== post.id)
        this.#saveToLocalStorage();
    }

    getPostsCount() {
        return this.posts.length;
    }
}
