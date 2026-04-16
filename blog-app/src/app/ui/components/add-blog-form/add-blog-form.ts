import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostElement } from '../../../../models/post.models';


@Component({
    selector: 'app-add-blog-form',
    imports: [FormsModule],
    templateUrl: './add-blog-form.html',
    styleUrl: './add-blog-form.scss',
})
export class AddBlogForm {
    @Output() close = new EventEmitter<void>();
    @Output() add = new EventEmitter<PostElement>();

    newPost : PostElement = {
        title: '',
        text: ''
    };

    onAdd(blogForm: NgForm) : void {
        if(blogForm.invalid) return;
        this.add.emit(this.newPost);
        blogForm.reset();
        this.newPost = {
            title: '',
            text: ''
        }
    }

    onCancel() : void {
        this.close.emit();
    }
}
