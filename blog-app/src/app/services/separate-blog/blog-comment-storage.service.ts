import { inject, Injectable, signal, computed } from '@angular/core';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { BlogStorageService } from '../blogs/blog-storage.service';

export class BlogCommentStorage {
    private blogStorage = inject(BlogStorageService);
    private selectedId = signal<string | null>(null);

    public blogData = computed<PostElementWithId | null>(() => {
        const id = this.selectedId();
        const list = this.blogStorage.entity();
        console.log({id, list});
        if(!id) return null;
        return this.blogStorage.entity()?.find(p => p.id === id) ?? null;
    });

    public selectBlog(id: string) {
        this.selectedId.set(id);
    }
}