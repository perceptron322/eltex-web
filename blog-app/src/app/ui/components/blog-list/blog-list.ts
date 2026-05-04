import { Component, ChangeDetectionStrategy, output, inject, OnInit, DestroyRef} from '@angular/core';
import { PostElementWithId } from '../../../../models/post.models';
import { BlogCard } from '../blog-card/blog-card';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';

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
    protected currentPageBlogs = this.blogStorage.currentPageBlogs;
    protected blogsCount = this.blogStorage.blogsCount;
    protected pages = this.blogStorage.pages;
    protected totalPages = this.blogStorage.totalPages;

    openEdit = output<PostElementWithId>();

    ngOnInit(): void {
        this.blogRequest.getEntity()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    protected onOpenEdit(post: PostElementWithId): void {
        this.openEdit.emit(post);
    }

    protected setCurrentPage(page: number) {
        this.blogStorage.setCurrentPage(page);
    }
}