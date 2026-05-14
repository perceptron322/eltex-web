import { DestroyRef, inject, Injectable } from '@angular/core';
import { IComment } from '../../ui/interfaces/Comment.interface';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { BLOG_REQUEST } from '../blogs/blog-request.token';
import { SeparateBlogStorage } from './separate-blog-storage.service';
import { BlogStorageService } from '../blogs/blog-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeOperation } from '../../ui/interfaces/changeOperation.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable()
export class SeparateBlogRequest {
    private blogRequest = inject(BLOG_REQUEST);
    private blogStorage = inject(BlogStorageService);
    private http = inject(HttpClient);
    private sepBlogStorage = inject(SeparateBlogStorage);
    private destroyRef = inject(DestroyRef);

    private isDev = environment.isDev;

    public getBlogData(id: string): void {
        if(this.isDev) {
            this.sepBlogStorage.loading.set(true);
            this.http.get<PostElementWithId>(`/api/articles/${id}`)                                                                                      
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({                                                                                                                               
                    next: (blog) => this.sepBlogStorage.setData(blog),                                                                                     
                    error: () => this.sepBlogStorage.loading.set(false),
                    complete: () => this.sepBlogStorage.loading.set(false)                                                                           
                });                                                                                                                                        
        
            this.getComments(id)                                                                                                                         
                .pipe(takeUntilDestroyed(this.destroyRef))                                                                                               
                .subscribe((comments) => this.sepBlogStorage.setComments(comments));
        } else {
            const blog = this.blogStorage.blogs()?.find((b) => b.id === id);
            if(!blog) {
                this.blogRequest.getBlogs(this.blogStorage.currentPage(), this.blogStorage.pageSize)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (blogs) => {
                        const found = blogs.find(b => b.id === id);
                        if(found) {
                            this.sepBlogStorage.setData(found);
                        }
                    }
                });
                return;
            }
            this.sepBlogStorage.setData(blog);
        }
    }

    public getComments(articleId: string): Observable<IComment[]> {
        return this.http.get<IComment[]>(`/api/comments/article/${articleId}`);
    }

    public addComment(post: PostElementWithId, comment: IComment): void {
        if(this.isDev) {
            const postId = post.id;
            if(!postId) return;
            
            comment.articleId = postId;
            this.http.post('/api/comments', comment)
                .pipe(tap(() => this.getBlogData(postId)))
                .subscribe();
        } else {
            if(!post.commentsList) return;
            post.commentsList.push(comment);
            this.blogRequest.updatePostRaw(post).subscribe();
        }
    }

    public changeBlogRating(changeType: ChangeOperation): void {
        if(this.isDev) {
            const id = this.sepBlogStorage.blogData()?.id;
            if(!id) return;
            this.changeBlogRatingRequest(changeType, id);

        } else {                                                                                                                                     
            const post = this.sepBlogStorage.blogData();
            if (!post) return;                                                                                                                         
            if (changeType === 'increment' && post.rating < 5) {                                                                                     
                this.blogRequest.updatePostRaw({ ...post, rating: post.rating + 1 })                                                                     
                    .pipe(tap(updated => this.sepBlogStorage.setData(updated)))
                    .subscribe();                                                                                                                          
            } else if (changeType === 'decrement' && post.rating > 0) {                                                                              
                this.blogRequest.updatePostRaw({ ...post, rating: post.rating - 1 })                                                                     
                    .pipe(tap(updated => this.sepBlogStorage.setData(updated)))                                                                            
                    .subscribe();
            }                                                                                                                                          
        }
    }

    private changeBlogRatingRequest(changeType: ChangeOperation, id: string): void {
        const currentRating = this.sepBlogStorage.rating();
        const isIncrement = changeType === 'increment';
        if(isIncrement && currentRating > 4) return;
        if(!isIncrement && currentRating < 1) return;

        const url = isIncrement 
            ? `/api/articles/${id}/rating-up`
            : `/api/articles/${id}/rating-down`;

        this.http.patch<PostElementWithId>(url, {})
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(post => this.sepBlogStorage.setData(post));
    }

    public changeCommentRating(commentId: string, rating: number): void {                                                                          
        const postId = this.sepBlogStorage.blogData()?.id;                                                                                         
        if (!postId) return;
                                                                                                                                                 
        this.blogRequest
            .updateCommentRating(postId, commentId, rating)                                                                                            
            .pipe(                                                                                                                                   
                tap(comments => this.sepBlogStorage.setComments(comments)),
                takeUntilDestroyed(this.destroyRef),                                                                                                     
            )
            .subscribe();                                                                                                                              
        }
}