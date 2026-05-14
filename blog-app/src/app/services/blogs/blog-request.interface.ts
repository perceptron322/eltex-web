import { Observable } from "rxjs";
import { PostElementWithId } from "../../ui/interfaces/post.models";
import { IComment } from "../../ui/interfaces/Comment.interface";

export interface IBlogRequest {                                                                                                                
    getBlogs(page?: number, limit?: number): Observable<PostElementWithId[]>;                                                                  
    addPost(post: FormData): Observable<PostElementWithId>;
    updatePost(id: string, post: FormData): Observable<PostElementWithId>;                                                                       
    updatePostRaw(post: PostElementWithId): Observable<PostElementWithId>;
    deletePost(post: PostElementWithId): Observable<void>;                                                                                       
    changeCurrentPage(pageNumber: number): void;                                                                                               
    updateCommentRating(postId: string, commentId: string, rating: number): Observable<IComment[]>;                                              
}