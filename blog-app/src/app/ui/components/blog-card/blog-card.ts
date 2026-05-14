import { Component, computed, inject, input, output } from '@angular/core';
import { PostElementWithId } from '../../interfaces/post.models';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';
import { MatIcon } from "@angular/material/icon";
import { environment } from '../../../../environments/environment.development';

@Component({
    selector: 'li[app-blog-card]',
    imports: [MatIcon],
    templateUrl: './blog-card.html',
    styleUrl: './blog-card.scss',
})
export class BlogCard {
    card = input.required<PostElementWithId>();
    openEdit = output<PostElementWithId>();
    private blogRequest = inject(BLOG_REQUEST);
    private blogStorage = inject(BlogStorageService);
    private isDev = environment.isDev;

    protected cardTitle = computed(() => this.card().title);
    protected cardText = computed(() => this.card().content);
    protected imgSrc = computed(() => this.card().imgSrc ?? 'assets/images/hobby_section/small-non-image.jpg');

    protected onEdit(event: Event, post : PostElementWithId) {
        event.stopPropagation();
        this.openEdit.emit(post);
    }

    protected onDelete(event: Event, post : PostElementWithId) : void {
        event.stopPropagation();

        const currentPage = this.blogStorage.currentPage();
        const isLastPage = currentPage === this.blogStorage.totalPages();
        const isLastBlogOnPage = this.blogStorage.blogs()?.length === 1;
        console.log('last page:', isLastPage, 'las blog: ', isLastBlogOnPage);

        if(isLastPage && isLastBlogOnPage) {
            this.blogStorage.setCurrentPage(currentPage - 1);
        }
        if(this.isDev) {
            console.log(this.blogStorage.currentPage(), post);
            this.blogRequest.deletePost(post).subscribe();
        } else {
            this.blogRequest.deletePost(post);
        }
    }
}
