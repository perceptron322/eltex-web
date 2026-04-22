import { Component, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { BlogStorageService } from '../../../services/blog-storage';
import { AsyncPipe } from '@angular/common';
import { PostElementWithId } from '../../../../models/post.models';

@Component({
    selector: 'app-blog-list',
    imports: [AsyncPipe],
    templateUrl: './blog-list.html',
    styleUrl: './blog-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlogList {
    protected blogStorage = inject(BlogStorageService);
    @Output() openEdit = new EventEmitter<PostElementWithId>();

    onEdit(post : PostElementWithId) {
        this.openEdit.emit(post);
    }

    onDelete(post : PostElementWithId) : void {
        this.blogStorage.deletePost(post);
    }
}