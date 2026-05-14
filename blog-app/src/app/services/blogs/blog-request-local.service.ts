import { inject, Injectable } from '@angular/core';
import { IBlogRequest } from './blog-request.interface';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { Observable, tap, of, throwError } from 'rxjs';
import { BlogStorageService } from './blog-storage.service';
import { IComment } from '../../ui/interfaces/Comment.interface';

@Injectable()
export class BlogRequestService implements IBlogRequest {
    private blogStorage = inject(BlogStorageService);

    private loadFromLocalStorage(): PostElementWithId[] {
        const raw = localStorage.getItem('blogs');
        if(!raw) return [];

        try {
            return JSON.parse(raw) as PostElementWithId[];
        } catch(err) {
            console.error('Невалидный JSON в localStorage, ', err);
            localStorage.removeItem('blogs');
            return [];
        }
    }

    private saveToLocalStorage(): void {
        try {
            const posts = this.blogStorage.blogs();
            localStorage.setItem('blogs', JSON.stringify(posts));
        } catch(err) {
            console.error('Не удалось загрузить данные в localStorage, ', err);
        }
    }

    public getBlogs(
            page: number = this.blogStorage.currentPage(), 
            limit: number = this.blogStorage.pageSize): Observable<PostElementWithId[]> 
    {
        return of(this.loadFromLocalStorage()).pipe(
            tap((result) => this.blogStorage.setBlogs(result))
        );
    }

    addPost(post: FormData): Observable<PostElementWithId> {
        const withId: PostElementWithId = {   
            title: post.get('title') as string,     
            content: post.get('content') as string,
            id: crypto.randomUUID(),
            commentsList: [],
            rating: 0,
            imgSrc: null,
        };
    
        const updated = [...(this.blogStorage.blogs() ?? []), withId];
        this.blogStorage.setBlogs(updated);
        this.saveToLocalStorage();

        return of(withId);
    }

    updatePost(id: string, post: FormData): Observable<PostElementWithId> {                                                                      
        const blogs = this.blogStorage.blogs() ?? [];                                                                                                
        const target = blogs.find(p => p.id === id);
        if (!target) return throwError(() => new Error('post not found'));                                                                           
                                                                                                                                                
        const updatedPost: PostElementWithId = {                                                                                                     
            ...target,                                                                                                                               
            title: post.get('title') as string,                                                                                                        
            content: post.get('content') as string,
        };                                                                                                                                           
                                                                                                                                                
        const updated = blogs.map(p => p.id === id ? updatedPost : p);
        this.blogStorage.setBlogs(updated);
        this.saveToLocalStorage();                                                                                                                   
        return of(updatedPost);
    } 

    updatePostRaw(post: PostElementWithId): Observable<PostElementWithId> {
        const updated = (this.blogStorage.blogs() ?? []).map(
            p => p.id === post.id ? post : p
        );
        this.blogStorage.setBlogs(updated);
        this.saveToLocalStorage();
        return of(post);
    };

    deletePost(post : PostElementWithId): Observable<void> {
        const id = post.id;
        const updated = (this.blogStorage.blogs() ?? []).filter(p => p.id !== id);
        this.blogStorage.setBlogs(updated);
        this.saveToLocalStorage();
        return of();
    }

    public changeCurrentPage(pageNumber : number): void {
        if(pageNumber < 1 || pageNumber > this.blogStorage.totalPages()) return;
        this.blogStorage.setCurrentPage(pageNumber);
        this.getBlogs().subscribe();
    }

    public updateCommentRating(                                                                                                                    
        postId: string,
        commentId: string,                                                                                                                           
        rating: number,                                                                                                                            
    ): Observable<IComment[]> {
        const blogs = this.blogStorage.blogs() ?? [];
                                                                                                                                                    
        const updated = blogs.map(post => {
        if (post.id !== postId) return post;                                                                                                       
        return {                                                                                                                                 
            ...post,
            commentsList: (post.commentsList ?? []).map(c =>
            c.id === commentId ? { ...c, rating } : c,                                                                                             
            ),
        };                                                                                                                                         
        });                                                                                                                                        

        this.blogStorage.setBlogs(updated);
        this.saveToLocalStorage();
                                                                                                                                                    
        const post = updated.find(p => p.id === postId);
        return of(post?.commentsList ?? []);                                                                                                         
    }
}
