import { Component, ChangeDetectionStrategy, output, inject, OnInit, DestroyRef} from '@angular/core';
import { PostElementWithId } from '../../interfaces/post.models';
import { BlogCard } from '../blog-card/blog-card';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog-list',
    imports: [BlogCard],
    templateUrl: './blog-list.html',
    styleUrl: './blog-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogList implements OnInit {
    private blogStorage = inject(BlogStorageService);
    private blogRequest = inject(BLOG_REQUEST);
    private destroyRef = inject(DestroyRef);

    protected currentPage = this.blogStorage.currentPage;
    protected pageBlogs = this.blogStorage.blogs;
    protected blogsCount = this.blogStorage.totalBlogsCount;
    protected pages = this.blogStorage.pages;
    protected totalPages = this.blogStorage.totalPages;
    protected loading = this.blogStorage.loading;

    openEdit = output<PostElementWithId>();

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.blogStorage.loading.set(true);
        this.blogRequest.getBlogs(this.blogStorage.currentPage(), this.blogStorage.pageSize)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
            error: () => this.blogStorage.loading.set(false),
            complete: () => this.blogStorage.loading.set(false)
        });
    }

    protected onOpenEdit(post: PostElementWithId): void {
        this.openEdit.emit(post);
    }

    protected setCurrentPage(page: number) {
        this.blogRequest.changeCurrentPage(page);
    }

    protected onSeparateBlogOpen(id: string): void {
        this.router.navigate(['blog', id]);
    }
}