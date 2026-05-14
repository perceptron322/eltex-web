import { inject, Injectable } from '@angular/core';
import { IBlogRequest } from './blog-request.interface';
import { Observable, throwError, tap, switchMap, map } from 'rxjs';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { HttpClient } from '@angular/common/http';
import { BlogStorageService } from './blog-storage.service';
import { IBlogResponse } from '../../ui/interfaces/BlogResponse.interface';
import { IComment } from '../../ui/interfaces/Comment.interface';

@Injectable()
export class BlogRequestHttpService implements IBlogRequest {
    private http = inject(HttpClient);
    private blogStorage = inject(BlogStorageService);

    public getBlogs( 
            page: number = this.blogStorage.currentPage(), 
            limit: number = this.blogStorage.pageSize
        ): Observable<PostElementWithId[]> 
        {
        return this.http
            .get<IBlogResponse>('/api/articles', { params: { page: page, limit: limit } })
            .pipe(
                tap(response => this.blogStorage.setTotal(response.total)),
                map(response => response.items),
                tap(blogs => this.blogStorage.setBlogs(blogs))
            )
        };

    public addPost(post: FormData) : Observable<PostElementWithId> {
        return this.http
            .post<PostElementWithId>('/api/articles', post)
            .pipe(switchMap(created => 
                this.getBlogs().pipe(map(() => created))
        ));
    }

    public updatePost(id: string, post: FormData) : Observable<PostElementWithId> {
        if(!id) {
            return throwError(() => Error('updatePost: post.id is missing'));
        }
        return this.http
            .patch<PostElementWithId>(`/api/articles/${id}`, post)
            .pipe(switchMap(updated => 
                this.getBlogs().pipe(map(() => updated))
        ));
    }

    public deletePost(post : PostElementWithId) : Observable<void> {
        if(!post.id) {
            return throwError(() => Error('deletePost: post.id is missing'));
        }
        const id: string = post.id;
        return this.http
            .delete<PostElementWithId>(`/api/articles/${id}`)
                .pipe(switchMap(() => 
                    this.getBlogs().pipe(map(() => void 0))));
    }

    public changeCurrentPage(pageNumber : number): void {
        if(pageNumber < 1 || pageNumber > this.blogStorage.totalPages()) return;
        this.blogStorage.setCurrentPage(pageNumber);
        this.getBlogs().subscribe();
    }

    public updatePostRaw(post: PostElementWithId): Observable<PostElementWithId> {                                                                 
        if (!post.id) {                                                                                                                            
            return throwError(() => new Error('updatePostRaw: post.id is missing'));
        }                                                                                                                                            
        return this.http
            .patch<PostElementWithId>(`/api/articles/${post.id}`, post)                                                                                
            .pipe(switchMap(updated => this.getBlogs().pipe(map(() => updated))));                                                                     
    }
                                                                                                                                                    
    public updateCommentRating(                                                                                                                  
        postId: string,
        commentId: string,
        rating: number,                                                                                                                              
    ): Observable<IComment[]> {
        return this.http                                                                                                                             
        .patch(`/api/comments/${commentId}/rating`, { rating })                                                                                  
        .pipe(
            switchMap(() => this.http.get<IComment[]>(`/api/comments/article/${postId}`)),                                                           
        );
    }
}