import { Component, inject, input } from '@angular/core';
import { IComment } from '../../interfaces/Comment.interface';
import { ChangeOperation } from '../../interfaces/changeOperation.type';
import { SeparateBlogRequest } from '../../../services/separate-blog/separate-blog-request.service';
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
    private req = inject(SeparateBlogRequest);

    comments = input.required<IComment[] | null>();
    
    onChangeRating(operationType: ChangeOperation, commentId: string, currentRating: number) {
        const rating = operationType === 'increment' 
            ? currentRating + 1
            : currentRating - 1;
        if(rating > 5 || rating < 0) return;

        this.req.changeCommentRating(commentId, rating);
    }
}