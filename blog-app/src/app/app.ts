import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./ui/components/header/header";
import { Footer } from "./ui/components/footer/footer";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('blog-app');

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry.addSvgIcon('addArticle', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/admin-panel/addArticle.svg'));
    this.iconRegistry.addSvgIcon('showStats', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/admin-panel/showStats.svg'));
    this.iconRegistry.addSvgIcon('deleteArticle', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/trash-bin.svg'));
    this.iconRegistry.addSvgIcon('editArticle', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit-icon.svg'));
  }
}
