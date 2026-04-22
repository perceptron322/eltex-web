import { Injectable } from '@angular/core';
import { PostElement, PostElementWithId } from '../../models/post.models';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class BlogStorageService {
    private blogSubject$ = new BehaviorSubject<PostElementWithId[]>(
        this.#loadFromLocalStorage()
    );
    readonly blogs$ = this.blogSubject$.asObservable();
    readonly blogsCount$ = this.blogs$.pipe(
        map(blogs => blogs.length)
    );


    #loadFromLocalStorage() : PostElementWithId[] {
        const raw = localStorage.getItem('blogs');
        if(!raw) return [];

        try {
            return JSON.parse(raw) as PostElementWithId[];
        } catch(err) {
            console.error('Невалидный JSON в localStorage, ', err);
            localStorage.removeItem('blogs');
            return [];
        }
    }

    #saveToLocalStorage() : void {
        try {
            const posts = this.blogSubject$.value;
            localStorage.setItem('blogs', JSON.stringify(posts));
        } catch(err) {
            console.error('Не удалось загрузить данные в localStorage, ', err);
        }
    }

    addPost(post: PostElement) : void {
        const withId: PostElementWithId = { ...post, id: crypto.randomUUID() };
        const updated = [...this.blogSubject$.value, withId];
        this.blogSubject$.next(updated);
        this.#saveToLocalStorage();
    }

    updatePost(post: PostElementWithId) : void {
        const updated = this.blogSubject$.value.map(
            p => p.id === post.id ? post : p
        );
        this.blogSubject$.next(updated);
        this.#saveToLocalStorage();
    };

    deletePost(post : PostElementWithId) : void {
        const id = post.id;
        const updated = this.blogSubject$.value.filter(p => p.id !== id);
        this.blogSubject$.next(updated);
        this.#saveToLocalStorage();
    }
}
