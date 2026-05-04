import { computed, Injectable, signal } from '@angular/core';
import { PostElementWithId } from '../../../models/post.models';

@Injectable({
    providedIn: 'root',
})
export class BlogStorageService {
    public entity = signal<PostElementWithId[] | null>(null);
    private readonly pageSize = 7;

    public setEntity(entity: PostElementWithId[]): void {
        this.entity.set(entity);
    }

    public blogsCount = computed(() => this.entity()?.length ?? 0);
    public totalPages = computed(() =>
        Math.ceil(this.blogsCount() / this.pageSize)
    );
    readonly pages = computed(() =>                                                                                                                
        Array.from({ length: this.totalPages() }, (_, i) => i + 1)                                                                               
    ); 

    public currentPage = signal(1);
    public setCurrentPage(pageNumber : number): void {
        if(pageNumber < 1 || pageNumber > this.totalPages()) return;
        this.currentPage.set(pageNumber);
    }

    private firstBlogOnPageNumber = computed(() => (this.currentPage() - 1) * this.pageSize);
    public currentPageBlogs = computed<PostElementWithId[]>(() => {
        const entity = this.entity() ?? [];
        const start = this.firstBlogOnPageNumber();
        return entity.slice(start, start + this.pageSize);
    });
}