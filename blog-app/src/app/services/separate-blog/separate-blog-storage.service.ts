import { inject, Injectable, signal, computed } from '@angular/core';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { BlogStorageService } from '../blogs/blog-storage.service';
import { IComment } from '../../ui/interfaces/Comment.interface';

@Injectable()
export class SeparateBlogStorage {
    private blogStorage = inject(BlogStorageService);
    public loading = signal<boolean>(false);

    private _blogData = signal<PostElementWithId | null>(null);
    public readonly blogData = this._blogData.asReadonly();

    private _comments = signal<IComment[] | null>(null);
    public readonly comments = this._comments.asReadonly();

    public rating = computed<number>(() => {
        const ratingValue = this.blogData()?.rating;
        if(ratingValue === undefined) return 0;
        return ratingValue;
    });

    public setData(data: PostElementWithId): void {
        this._blogData.set(data);
    }

    public setComments(comments: IComment[]): void {
        this._comments.set(comments);
    }
}