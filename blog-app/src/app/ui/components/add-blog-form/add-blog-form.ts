import { Component, inject, output, input, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PostElementWithId } from '../../../../models/post.models';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';


@Component({
    selector: 'app-add-blog-form',
    imports: [ReactiveFormsModule],
    templateUrl: './add-blog-form.html',
    styleUrl: './add-blog-form.scss',
})
export class AddBlogForm {
    public close = output();
    public editData = input<PostElementWithId | null>(null);
    protected isEditMode = computed<boolean>(() => this.editData() !== null);

    private blogRequest = inject(BLOG_REQUEST);
    private fb = inject(FormBuilder);

    protected formTitle = computed(() => {
        return this.isEditMode() ? 'Изменить статью' : 'Добавить статью';
    });

    protected saveButtonTitle = computed(() => {
        return this.isEditMode() ? 'Сохранить' : 'Добавить';
    });

    blogForm = this.fb.nonNullable.group({
        title: ['', [
            Validators.required,
            Validators.minLength(25)
        ]],
        text: ['', [
            Validators.required,
            Validators.minLength(25)
        ]]
    });

    protected get title() { return this.blogForm.controls.title };
    protected get text() { return this.blogForm.controls.text };

    private editDataEffect = effect(() => {
        const data = this.editData();

        if(data) {
            this.blogForm.patchValue({
                title: data.title,
                text: data.text
            });
        } else {
            this.blogForm.reset();
        }
    });

    onSubmit(): void {
        if(this.blogForm.invalid) {
            this.blogForm.markAllAsTouched();
            return;
        }

        if(this.isEditMode()) {
            this.onEdit();
        } else {
            this.onAdd();
        }
    }

    private onAdd(): void {
        this.blogRequest.addPost(this.blogForm.getRawValue());
        this.blogForm.reset();
        this.close.emit();
    }

    private onEdit(): void {
        const data = this.editData();
        if(!data) return;

        this.blogRequest.updatePost({
            ...data,
            ...this.blogForm.getRawValue()
        });
        this.blogForm.reset();
        this.close.emit();
    }

    protected onCancel(): void {
        this.blogForm.reset();
        this.close.emit();
    }
}