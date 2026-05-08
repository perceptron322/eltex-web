import { Component, ViewChild, ElementRef, inject, effect } from '@angular/core';
import { AddBlogForm } from '../../components/add-blog-form/add-blog-form';
import { StatisticModal } from '../../components/statistic-modal/statistic-modal';
import { BlogList } from '../../components/blog-list/blog-list';
import { PostElementWithId } from '../../interfaces/post.models';
import { smoothScrollIntoView } from '../../../../models/smoothScroll';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';

@Component({
    selector: 'app-blog-page',
    imports: [BlogList, AddBlogForm, StatisticModal],
    templateUrl: './blog-page.html',
    styleUrl: './blog-page.scss',
})

export class BlogPage {
    @ViewChild(StatisticModal) statDialog!: StatisticModal;
    @ViewChild(AddBlogForm, { read: ElementRef }) addBlogFormRef ?: ElementRef;

    private blogStorage = inject(BlogStorageService);

    constructor() {                                                                                                                              
      effect(() => {                                                                                                                         
        const posts = this.blogStorage.currentPageBlogs();                                                                                          
        if (this.showForm && this.post && !posts.some(p => p.id === this.post!.id)) {
            this.showForm = false;                                                                                                         
            this.post = null;
        }
    });                                                                                                                             
    } 

    protected showForm: boolean = false;
    protected post: PostElementWithId | null = null;
    

    protected onShowAddFormClick(): void {
        this.post = null;
        this.showForm = true;

        smoothScrollIntoView(() => this.addBlogFormRef);
    }

    protected onShowEditFormClick(post : PostElementWithId): void {
        this.post = post;
        this.showForm = true;

        smoothScrollIntoView(() => this.addBlogFormRef);
    }

    protected openStats(): void {
        this.statDialog.open();
    }
}