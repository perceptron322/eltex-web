import { computed, inject, Injectable, signal } from '@angular/core';
import { BlogRequestService } from './blog-request.service.ts';
import { PostElementWithId } from '../../../models/post.models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})

export class BlogStorageService {
    private blogRequest = inject(BlogRequestService);
    private blogs = toSignal(this.blogRequest.blogs$, { initialValue: [] })
    private readonly pageSize = 7;

    public blogsCount = computed(() => this.blogs().length);

    public totalPages = computed(() =>
        Math.ceil(this.blogs().length / this.pageSize)
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
    public currentPageBlogs = computed<PostElementWithId[]>(() => 
        this.blogs().slice(this.firstBlogOnPageNumber(), this.firstBlogOnPageNumber() + this.pageSize)
    );
}