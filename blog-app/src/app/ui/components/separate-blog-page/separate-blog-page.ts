import { Component, effect, inject, input } from '@angular/core';
import { BlogComments } from '../blog-comments/blog-comments';
import { AddBlogComment } from '../add-blog-comment/add-blog-comment';
import { BlogCommentRequest } from '../../../services/separate-blog/blog-comment-request.service';
import { BlogCommentStorage } from '../../../services/separate-blog/blog-comment-storage.service';
import { ChangeOperation } from '../../interfaces/changeOperation.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-separate-blog-page',
    imports: [BlogComments, AddBlogComment, MatButtonModule, MatIcon],
    providers: [
        BlogCommentRequest,
        BlogCommentStorage
    ],
    templateUrl: './separate-blog-page.html',
    styleUrl: './separate-blog-page.scss',
})
export class SeparateBlogPage {
    id = input.required<string>();

    private req = inject(BlogCommentRequest);
    private store = inject(BlogCommentStorage);

    constructor() {
        effect(() => this.req.getBlogEntity(this.id()));
    }

    protected blog = this.store.blogData;

    protected onChangeRating(operationType: ChangeOperation) {
        this.req.blogChangeRating(operationType);
    }
}
