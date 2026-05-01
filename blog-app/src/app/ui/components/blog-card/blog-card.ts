import { Component, computed, inject } from '@angular/core';
import { input, output } from '@angular/core';
import { PostElementWithId } from '../../../../models/post.models';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { BlogRequestService } from '../../../services/blogs/blog-request.service.ts';

@Component({
    selector: 'li[app-blog-card]',
    imports: [],
    templateUrl: './blog-card.html',
    styleUrl: './blog-card.scss',
})
export class BlogCard {
    private blogRequest = inject(BlogRequestService);
    private blogStorage = inject(BlogStorageService);
    card = input.required<PostElementWithId>();
    openEdit = output<PostElementWithId>();

    protected cardTitle = computed(() => this.card().title);
    protected cardText = computed(() => this.card().text);

    protected onEdit(post : PostElementWithId) {
        this.openEdit.emit(post);
    }

    protected onDelete(post : PostElementWithId) : void {
        if(this.blogStorage.currentPage() === this.blogStorage.totalPages() && this.blogStorage.currentPageBlogs().length === 1) {
            this.blogStorage.setCurrentPage(this.blogStorage.currentPage() - 1);
        }
        this.blogRequest.deletePost(post);
    }
}
