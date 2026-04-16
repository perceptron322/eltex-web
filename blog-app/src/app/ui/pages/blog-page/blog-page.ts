import { Component, ViewChild, ElementRef } from '@angular/core';
import { AddBlogForm } from '../../components/add-blog-form/add-blog-form';
import { StatisticModal } from '../../components/statistic-modal/statistic-modal';

import { PostElement, PostElementWithId } from '../../../../models/post.models';
import { BlogStorageService } from '../../../services/blog-storage';

@Component({
    selector: 'app-blog-page',
    imports: [AddBlogForm, StatisticModal],
    templateUrl: './blog-page.html',
    styleUrl: './blog-page.scss',
})

export class BlogPage {
    @ViewChild(StatisticModal) statDialog!: StatisticModal;
    @ViewChild(AddBlogForm) addBlogFormRef ?: ElementRef;

    showForm: boolean = false;

    constructor(public blogStorage: BlogStorageService) {}

    onShowFormClick() {
        this.showForm = true;

        setTimeout(() => {
            this.addBlogFormRef?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 0);
    }

    onAdd(post: PostElement): void {
        this.blogStorage.addPost({...post, id: crypto.randomUUID()});
        this.showForm = false;
    }

    onDelete(post : PostElementWithId) : void {
        this.blogStorage.deletePost(post);
    }

    openStats(): void {
        this.statDialog.open();
    }
}