import { inject, InjectionToken } from "@angular/core";
import { BlogRequest } from "./blog-request.interface";

export const BLOG_REQUEST = new InjectionToken<BlogRequest>('BlogRequest');