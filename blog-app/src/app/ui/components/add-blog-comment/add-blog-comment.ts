import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/Comment.interface';
import { SeparateBlogRequest } from '../../../services/separate-blog/separate-blog-request.service';
import { PostElementWithId } from '../../interfaces/post.models';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';                                                                             
import { MatInputModule } from '@angular/material/input';                                                                                    
import { MatButtonModule } from '@angular/material/button';                                                                                    
import { MatIconModule } from '@angular/material/icon';                                                                                      
import { TextFieldModule } from '@angular/cdk/text-field';
import { environment } from '../../../../environments/environment';

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

    private req = inject(SeparateBlogRequest);

    protected commentForm = new FormGroup({
        username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        content: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });

    protected onSubmit(): void {
        if(this.commentForm.invalid) {
            this.commentForm.markAllAsTouched();
            return;
        }

        const post = this.blog();
        if(!post) return;

        const { username, content } = this.commentForm.getRawValue();
        const comment: IComment = { username: username, content: content, rating: 0 };
        if(environment.isDev) {
            this.req.addComment(post, comment);
        } else {
            this.req.addComment(post, { ...comment, id: crypto.randomUUID() });
        }
        this.commentForm.reset();
    }

    protected onCancel() {
        this.commentForm.reset();
    }
}
