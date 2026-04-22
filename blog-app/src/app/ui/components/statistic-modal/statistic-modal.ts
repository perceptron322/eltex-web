import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { BlogStorageService } from '../../../services/blog-storage';

@Component({
    selector: 'app-statistic-modal',
    imports: [AsyncPipe],
    templateUrl: './statistic-modal.html',
    styleUrl: './statistic-modal.scss',
})

export class StatisticModal {
    protected blogStorage = inject(BlogStorageService);
    @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

    protected postsCount$ = this.blogStorage.blogsCount$;

    open(): void {
        this.dialogRef.nativeElement.showModal();
    }

    closeModal() {
        this.dialogRef.nativeElement.close();
    }
}