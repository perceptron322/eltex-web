import { inject } from '@angular/core';
import { IBlogRequest } from './blog-request.interface';
import { PostElement, PostElementWithId } from '../../../models/post.models';
import { Observable, tap, of } from 'rxjs';
import { BlogStorageService } from './blog-storage.service';

export class BlogRequestService implements IBlogRequest {
    private blogStorage = inject(BlogStorageService);

    public getEntity(): Observable<PostElementWithId[]> {
        return of(this.loadFromLocalStorage()).pipe(
            tap((result) => this.blogStorage.setEntity(result))
        );
    }

    private loadFromLocalStorage() : PostElementWithId[] {
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

    private saveToLocalStorage() : void {
        try {
            const posts = this.blogStorage.entity();
            localStorage.setItem('blogs', JSON.stringify(posts));
        } catch(err) {
            console.error('Не удалось загрузить данные в localStorage, ', err);
        }
    }

    addPost(post: PostElement) : void {
        const withId: PostElementWithId = { ...post, id: crypto.randomUUID() };
        const updated = [...(this.blogStorage.entity() ?? []), withId];
        this.blogStorage.setEntity(updated);
        this.saveToLocalStorage();
    }

    updatePost(post: PostElementWithId) : void {
        const updated = (this.blogStorage.entity() ?? []).map(
            p => p.id === post.id ? post : p
        );
        this.blogStorage.setEntity(updated);
        this.saveToLocalStorage();
    };

    deletePost(post : PostElementWithId) : void {
        const id = post.id;
        const updated = (this.blogStorage.entity() ?? []).filter(p => p.id !== id);
        this.blogStorage.setEntity(updated);
        this.saveToLocalStorage();
    }
}
