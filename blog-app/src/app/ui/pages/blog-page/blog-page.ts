import { Component, ViewChild, ElementRef } from '@angular/core';

import { AddBlogForm } from '../../components/add-blog-form/add-blog-form';
import { StatisticModal } from '../../components/statistic-modal/statistic-modal';
import { BlogList } from '../../components/blog-list/blog-list';
import { PostElementWithId } from '../../../../models/post.models';

@Component({
    selector: 'app-blog-page',
    imports: [BlogList, AddBlogForm, StatisticModal],
    templateUrl: './blog-page.html',
    styleUrl: './blog-page.scss',
})

export class BlogPage {
    @ViewChild(StatisticModal) statDialog!: StatisticModal;
    @ViewChild(AddBlogForm, { read: ElementRef }) addBlogFormRef ?: ElementRef;

    protected showForm: boolean = false;
    protected formMode: OpenFormMode = 'add';
    protected post: PostElementWithId | null = null;
    

    onShowAddFormClick() : void {
        this.formMode = 'add';
        this.showForm = true;

        setTimeout(() => {
            this.addBlogFormRef?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 0);
    }

    onShowEditFormClick(post : PostElementWithId) : void {
        this.formMode = 'edit';
        this.post = post;
        this.showForm = true;

        setTimeout(() => {
            this.addBlogFormRef?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        }, 0);
    }

    openStats(): void {
        this.statDialog.open();
    }
}

type OpenFormMode = 'add' | 'edit';