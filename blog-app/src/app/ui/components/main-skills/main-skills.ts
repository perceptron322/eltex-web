import { Component } from '@angular/core';

@Component({
    selector: 'app-main-skills',
    imports: [],
    templateUrl: './main-skills.html',
    styleUrl: './main-skills.scss',
})
export class MainSkills {
    protected skillsList: string[] = [
        "Photography",
        "Graphic Design",
        "Creativity",
        "Brand Identity",
        "Copy Writing",
        "Team Working"
    ];
}
