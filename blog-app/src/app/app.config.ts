import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { BLOG_REQUEST } from './services/blogs/blog-request.token';
import { BlogRequestService } from './services/blogs/blog-request-local.service';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ENV_CONFIG } from './core/env-token/env-config.token';
import { BlogRequestHttpService } from './services/blogs/blog-request-http.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top'
      }),
      withComponentInputBinding()
    ),
    { provide: ENV_CONFIG, useValue: environment },
    { provide: BLOG_REQUEST, useClass: environment.useLocalRequestService ? BlogRequestService : BlogRequestHttpService }
  ]
};
