import { Component, ChangeDetectionStrategy, output, inject} from '@angular/core';
import { PostElementWithId } from '../../../../models/post.models';
import { BlogCard } from '../blog-card/blog-card';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { BlogRequestService } from '../../../services/blogs/blog-request.service.ts';

@Component({
    selector: 'app-blog-list',
    imports: [BlogCard],
    templateUrl: './blog-list.html',
    styleUrl: './blog-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogList {
    protected blogRequest = inject(BlogRequestService);
    protected blogStorage = inject(BlogStorageService);
    openEdit = output<PostElementWithId>();

    protected onOpenEdit(post: PostElementWithId): void {
        this.openEdit.emit(post);
    }
}