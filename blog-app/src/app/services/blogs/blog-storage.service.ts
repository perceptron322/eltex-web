import { computed, Injectable, signal } from '@angular/core';
import { PostElementWithId } from '../../ui/interfaces/post.models';

@Injectable({
    providedIn: 'root',
})
export class BlogStorageService {
    public blogs = signal<PostElementWithId[] | null>(null);
    private _currentPage = signal(1);
    public readonly currentPage = this._currentPage.asReadonly();
    public readonly pageSize = 7;
    public loading = signal<boolean>(false);

    private _totalBlogsCount = signal(1);
    public readonly totalBlogsCount = this._totalBlogsCount.asReadonly();

    public totalPages = computed(() =>
        Math.ceil(this.totalBlogsCount() / this.pageSize)
    );
    readonly pages = computed(() =>                                                                                                                
        Array.from({ length: this.totalPages() }, (_, i) => i + 1)                                                                               
    );

    public setBlogs(blogs: PostElementWithId[]): void {
        this.blogs.set(blogs);
    }

    public setTotal(count: number): void {
        this._totalBlogsCount.set(count);
    }

    public setCurrentPage(pageNumber : number): void {
        if(pageNumber < 1 || pageNumber > this.totalPages()) return;
        this._currentPage.set(pageNumber);
    }
}