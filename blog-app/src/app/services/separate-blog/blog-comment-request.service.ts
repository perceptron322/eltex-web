import { DestroyRef, inject, Injectable } from '@angular/core';
import { IComment } from '../../ui/interfaces/Comment.interface';
import { PostElementWithId } from '../../ui/interfaces/post.models';
import { BLOG_REQUEST } from '../blogs/blog-request.token';
import { BlogCommentStorage } from './blog-comment-storage.service';
import { BlogStorageService } from '../blogs/blog-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeOperation } from '../../ui/interfaces/changeOperation.type';

export class BlogCommentRequest {
    private blogRequest = inject(BLOG_REQUEST);
    private blogStorage = inject(BlogStorageService);
    private blogCommentStorage = inject(BlogCommentStorage);
    private destroyRef = inject(DestroyRef);

    public getBlogEntity(id: string): void {
        if(!this.blogStorage.entity()) {
            this.blogRequest.getEntity()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.blogCommentStorage.selectBlog(id));
            return;
        }
        this.blogCommentStorage.selectBlog(id);
    }

    public addComment(post: PostElementWithId, comment: IComment): void {
        post.commentsList.push(comment);
        this.blogRequest.updatePost(post);
    }

    public blogChangeRating(changeType: ChangeOperation): void {
        const post = this.blogCommentStorage.blogData();
        if(!post) return;
        if(changeType === 'increment' && post.rating < 5) {
            post.rating += 1;
            this.blogRequest.updatePost(post);
        } else if(changeType === 'decrement' && post.rating > 0) {
            post.rating -= 1;
            this.blogRequest.updatePost(post);
        }
    }

    public commentChangeRating(changeType: ChangeOperation, commentId: string): void {
        const post = this.blogCommentStorage.blogData();
        if(!post) return;
        const comment = post.commentsList.find(p => p.id === commentId);
        if(!comment) return;

        if(changeType === 'increment' && comment.rating < 5) {
            comment.rating += 1;
            this.blogRequest.updatePost(post);
        } else if(changeType === 'decrement' && comment.rating > 0) {
            comment.rating -= 1;
            this.blogRequest.updatePost(post);
        }
    }
}