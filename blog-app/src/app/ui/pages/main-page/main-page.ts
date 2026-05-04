import { Component, inject, computed } from '@angular/core';
import { MainAbout } from '../../components/main-about/main-about';
import { MainSkills } from '../../components/main-skills/main-skills';
import { MainWork } from '../../components/main-work/main-work';
import { MainHobby } from '../../components/main-hobby/main-hobby';
import { MainPostPreview } from '../../components/main-post-preview/main-post-preview';
import { BlogStorageService } from '../../../services/blogs/blog-storage.service';

@Component({
    selector: 'app-main-page',
    imports: [MainAbout, MainPostPreview, MainSkills, MainWork, MainHobby],
    templateUrl: './main-page.html',
    styleUrl: './main-page.scss',
})
export class MainPage {
    private blogStorage = inject(BlogStorageService);

    private allBlogs = this.blogStorage.entity;
    protected lastBlogs = computed(() => (this.allBlogs() ?? []).slice(-2));
}
