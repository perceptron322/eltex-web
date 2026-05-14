import { Component, inject, output, input, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PostElementWithId } from '../../interfaces/post.models';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';
import { environment } from '../../../../environments/environment.development';


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
    private isDev = environment.isDev;
    protected previewUrl: string | null = null;

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
        content: ['', [
            Validators.required,
            Validators.minLength(25)
        ]],
        image: this.fb.control<File | null>(null)
    });

    protected get title() { return this.blogForm.controls.title };
    protected get content() { return this.blogForm.controls.content };

    private editDataEffect = effect(() => {
        const data = this.editData();

        if(data) {
            this.blogForm.patchValue({
                title: data.title,
                content: data.content
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

    onFileSelected(event: Event): void {                                                                                                           
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0] ?? null;                                                                                                       
                                                                                                                                                
        this.blogForm.controls.image.setValue(file);                                                                                                 
                                                                                                                                                    
        if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);                                                                                   
        this.previewUrl = file ? URL.createObjectURL(file) : null;
    }                                                                                                                                              
                                                                                                                                                
    clearImage(input: HTMLInputElement): void {
        input.value = '';
        this.blogForm.controls.image.setValue(null);
        if (this.previewUrl) {                                                                                                                       
            URL.revokeObjectURL(this.previewUrl);
            this.previewUrl = null;    
        }                                                                                                                                            
    }


    private onAdd(): void {
        const formData = this.buildFormData(true);
        if(this.isDev) {
            this.blogRequest.addPost(formData).subscribe();
        } else {
            this.blogRequest.addPost(formData);
        }
        this.blogForm.reset();
        if (this.previewUrl) {
            URL.revokeObjectURL(this.previewUrl);                                                                                                      
            this.previewUrl = null;                                                                                                                  
        }
        this.close.emit();
    }

    private onEdit(): void {
        const dataId = this.editData()?.id;
        if (!dataId) return;

        const formData = this.buildFormData();

        if (this.isDev) {
            this.blogRequest.updatePost(dataId, formData).subscribe();
        } else {
            this.blogRequest.updatePost(dataId, formData);
        }
    
        this.blogForm.reset();                                                                                                                       
        if (this.previewUrl) {                                                                                                                     
            URL.revokeObjectURL(this.previewUrl);
            this.previewUrl = null;
        }
        this.close.emit();  
    }

    protected onCancel(): void {
        this.blogForm.reset();
        this.close.emit();
    }

    private buildFormData(includeRating = false): FormData {                                                                                       
        const { title, content, image } = this.blogForm.getRawValue();                                                                               
                                                                                                                                                    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (includeRating) formData.append('rating', '0');
        if (image) formData.append('image', image);
    
        return formData;
    }
}