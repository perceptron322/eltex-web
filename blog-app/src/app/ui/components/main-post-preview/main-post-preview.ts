import { Component, inject, input } from '@angular/core';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { PostElementWithId } from '../../../../models/post.models';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main-post-preview',
    imports: [RouterLink],
    templateUrl: './main-post-preview.html',
    styleUrl: './main-post-preview.scss',
})
export class MainPostPreview {
    public blogs = input<PostElementWithId[]>();

    protected blogStorage = inject(BlogStorageService);
}
