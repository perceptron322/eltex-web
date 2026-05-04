import { InjectionToken } from "@angular/core";
import { IBlogRequest } from "./blog-request.interface";

export const BLOG_REQUEST = new InjectionToken<IBlogRequest>('BlogRequest');