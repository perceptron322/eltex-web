import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, ɵInternalFormsSharedModule, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/Comment.interface';
import { BlogCommentRequest } from '../../../services/separate-blog/blog-comment-request.service';
import { PostElementWithId } from '../../interfaces/post.models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';                                                                             
import { MatInputModule } from '@angular/material/input';                                                                                    
import { MatButtonModule } from '@angular/material/button';                                                                                    
import { MatIconModule } from '@angular/material/icon';                                                                                      
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
    selector: 'app-add-blog-comment',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,                                                                                                                        
        MatInputModule,
        MatButtonModule,                                                                                                                           
        MatIconModule,                                                                                                                           
        TextFieldModule],
    templateUrl: './add-blog-comment.html',
    styleUrl: './add-blog-comment.scss',
})
export class AddBlogComment {
    blog = input<PostElementWithId | null>(null);

    private req = inject(BlogCommentRequest);

    protected commentForm = new FormGroup({
        author: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        text: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });

    protected onSubmit(): void {
        if(this.commentForm.invalid) {
            this.commentForm.markAllAsTouched();
            return;
        }

        const post = this.blog();
        console.log(post);
        if(!post) return;

        const { author, text } = this.commentForm.getRawValue();
        const comment: IComment = { author, text, datetime: '01-01-2026', rating: 0, id: crypto.randomUUID() };
        this.req.addComment(post, comment);
        this.commentForm.reset();
    }

    protected onCancel() {
        this.commentForm.reset();
    }
}
