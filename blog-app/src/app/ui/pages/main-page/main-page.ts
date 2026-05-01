import { Component, inject, computed } from '@angular/core';
import { MainAbout } from '../../components/main-about/main-about';
import { MainSkills } from '../../components/main-skills/main-skills';
import { MainWork } from '../../components/main-work/main-work';
import { MainHobby } from '../../components/main-hobby/main-hobby';
import { BlogRequestService } from '../../../services/blogs/blog-request.service.ts'; 
import { MainPostPreview } from '../../components/main-post-preview/main-post-preview';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-main-page',
    imports: [MainAbout, MainPostPreview, MainSkills, MainWork, MainHobby],
    templateUrl: './main-page.html',
    styleUrl: './main-page.scss',
})
export class MainPage {
    protected blogRequest = inject(BlogRequestService);

    private allBlogs = toSignal(this.blogRequest.blogs$, { initialValue: [] });
    protected lastBlogs = computed(() => this.allBlogs().slice(-2));
}
