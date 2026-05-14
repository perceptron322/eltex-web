import { Component, inject, computed, OnInit, DestroyRef } from '@angular/core';
import { MainAbout } from '../../components/main-about/main-about';
import { MainSkills } from '../../components/main-skills/main-skills';
import { MainWork } from '../../components/main-work/main-work';
import { MainHobby } from '../../components/main-hobby/main-hobby';
import { MainPostPreview } from '../../components/main-post-preview/main-post-preview';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';
import { BLOG_REQUEST } from '../../../services/blogs/blog-request.token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-main-page',
    imports: [MainAbout, MainPostPreview, MainSkills, MainWork, MainHobby],
    templateUrl: './main-page.html',
    styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
    private blogStorage = inject(BlogStorageService);
    private blogRequest = inject(BLOG_REQUEST);
    private destroyRef = inject(DestroyRef);

    private allBlogs = this.blogStorage.blogs;
    protected lastBlogs = computed(() => (this.allBlogs() ?? []).slice(0, 2));

    ngOnInit(): void {
        this.blogRequest.getBlogs(1, this.blogStorage.pageSize)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
}
