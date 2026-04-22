import { Component, EventEmitter, inject, Output, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BlogStorageService } from '../../../services/blog-storage';
import { PostElementWithId } from '../../../../models/post.models';


@Component({
    selector: 'app-add-blog-form',
    imports: [ReactiveFormsModule],
    templateUrl: './add-blog-form.html',
    styleUrl: './add-blog-form.scss',
})

export class AddBlogForm implements OnInit {
    @Output() close = new EventEmitter<void>();
    @Input() openFormMode!: OpenFormMode;
    @Input() post: PostElementWithId | null = null;

    private blogStorage = inject(BlogStorageService);
    private fb = inject(FormBuilder);

    blogForm = this.fb.group({
        title: ['', [
            Validators.required,
            Validators.minLength(25)
        ]],
        text: ['', [
            Validators.required,
            Validators.minLength(25)
        ]]
    });

    ngOnInit(): void {
        if(this.isEdit && this.post) {
            this.blogForm.patchValue({
                title: this.post.title,
                text: this.post.text
            });
        }
    }

    protected get title() { return this.blogForm.controls.title; }
    protected get text() { return this.blogForm.controls.text; }
    private get isEdit() : boolean { return this.openFormMode === 'edit' }

    protected get sectionTitle() : string {
        return this.isEdit ? 'Изменить статью' : 'Добавить статью';
    }
    protected get submitText() : string {
        return this.isEdit ? 'Сохранить' : 'Добавить';
    }


    onSubmit() : void {
        if(this.blogForm.invalid) {
            this.blogForm.markAllAsTouched();
            return;
        }

        if(this.isEdit) {
            this.onEdit();
        } else {
            this.onAdd();
        }
    }

    private onAdd(): void {
        this.blogStorage.addPost(this.blogForm.getRawValue());
        this.blogForm.reset();
        this.close.emit();
    }

    private onEdit(): void {
        if(!this.post) return;

        this.blogStorage.updatePost({
            ...this.post,
            ...this.blogForm.getRawValue()
        });
        this.close.emit();
    }

    onCancel() : void {
        this.close.emit();
    }
}

type OpenFormMode = 'add' | 'edit';