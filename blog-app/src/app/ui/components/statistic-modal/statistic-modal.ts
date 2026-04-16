import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-statistic-modal',
    imports: [],
    templateUrl: './statistic-modal.html',
    styleUrl: './statistic-modal.scss',
})
export class StatisticModal {
    @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;

    @Input() postsCount: number = 0;

    open(): void {
        this.dialogRef.nativeElement.showModal();
    }

    closeModal() {
        this.dialogRef.nativeElement.close();
    }
}