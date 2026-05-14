import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';

@Component({
    selector: 'app-statistic-modal',
    imports: [],
    templateUrl: './statistic-modal.html',
    styleUrl: './statistic-modal.scss',
})
export class StatisticModal {
    private blogStorage = inject(BlogStorageService);
    @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

    protected blogsCount = this.blogStorage.totalBlogsCount;

    open(): void {
        this.dialogRef.nativeElement.showModal();
    }

    protected closeModal() {
        this.dialogRef.nativeElement.close();
    }
}