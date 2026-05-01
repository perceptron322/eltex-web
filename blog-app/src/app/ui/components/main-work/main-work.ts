import { Component } from '@angular/core';
import { WorkObject } from './workObject';

@Component({
    selector: 'app-main-work',
    imports: [],
    templateUrl: './main-work.html',
    styleUrl: './main-work.scss',
})
export class MainWork {
    protected worksList: WorkObject[] = [
        {   company: "Consectetur",
            period: { from: 2016, to: 2017 },
            title: "Graphic design",
            description: "Nostrud tempor cillum sunt excepteur do ut proident deserunt enim consequat exercitatio",
            iconUrl: "assets/icons/work-section/1.svg"
        },
        {   company: "Bibendum",
            period: { from: 2017, to: 2020 },
            title: "Photographer",
            description: "Ad do dolore cillum dolor et ex non dolor qui. Dolor amet tempor pariatur officia pariatur et",
            iconUrl: "assets/icons/work-section/2.svg"
        },
        {   company: "Adipiscing",
            period: { from: 2020, to: 2022 },
            title: "Photographer’s Assistant",
            description: "Ad do dolore cillum dolor et ex non dolor qui. Dolor amet tempor pariatur officia pariatur et",
            iconUrl: "assets/icons/work-section/3.svg"
        },
    ]
}
