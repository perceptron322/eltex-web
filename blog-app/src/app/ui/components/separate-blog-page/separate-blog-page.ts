import { Component, effect, inject, input, untracked, computed } from '@angular/core';
import { BlogComments } from '../blog-comments/blog-comments';
import { AddBlogComment } from '../add-blog-comment/add-blog-comment';
import { SeparateBlogRequest } from '../../../services/separate-blog/separate-blog-request.service';
import { SeparateBlogStorage } from '../../../services/separate-blog/separate-blog-storage.service';
import { ChangeOperation } from '../../interfaces/changeOperation.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';
import { IComment } from '../../interfaces/Comment.interface';

@Component({
    selector: 'app-separate-blog-page',
    imports: [BlogComments, AddBlogComment, MatButtonModule, MatIcon],
    providers: [
        SeparateBlogRequest,
        SeparateBlogStorage
    ],
    templateUrl: './separate-blog-page.html',
    styleUrl: './separate-blog-page.scss',
})
export class SeparateBlogPage {
    private req = inject(SeparateBlogRequest);
    private store = inject(SeparateBlogStorage);

    id = input.required<string>();
    protected blog = this.store.blogData;
    protected comments = environment.isDev ? this.store.comments : computed<IComment[]>(() => this.blog()?.commentsList ?? []);
    protected loading = this.store.loading;
    protected imgSrc = computed(() => this.blog()?.imgSrc ?? 'assets/images/hobby_section/small-non-image.jpg');

    constructor() {
        effect(() => {
            const id = this.id();
            untracked(() => {
                this.req.getBlogData(id);
            });
        });
    }

    protected onChangeRating(operationType: ChangeOperation) {
        this.req.changeBlogRating(operationType);
    }
}
