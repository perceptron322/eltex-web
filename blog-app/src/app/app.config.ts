import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { BLOG_REQUEST } from './services/blogs/blog-request.token';
import { BlogRequestService } from './services/blogs/blog-request.service.ts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top'
      })
    ),
    { provide: BLOG_REQUEST, useClass: BlogRequestService }
  ]
};
