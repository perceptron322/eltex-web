import { Component, input } from '@angular/core';
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
}
