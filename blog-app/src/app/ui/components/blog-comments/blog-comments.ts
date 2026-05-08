import { Component, inject, input } from '@angular/core';
import { IComment } from '../../interfaces/Comment.interface';
import { ChangeOperation } from '../../interfaces/changeOperation.type';
import { BlogCommentRequest } from '../../../services/separate-blog/blog-comment-request.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-blog-comments',
    imports: [MatCardModule, MatButtonModule, MatIcon],
    templateUrl: './blog-comments.html',
    styleUrl: './blog-comments.scss',
})
export class BlogComments {
    comments = input.required<IComment[]>();

    private req = inject(BlogCommentRequest);
    
    onChangeRating(operationType: ChangeOperation, commentId: string) {
        this.req.commentChangeRating(operationType, commentId);
    }
}
