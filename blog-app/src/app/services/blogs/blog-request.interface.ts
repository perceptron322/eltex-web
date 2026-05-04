import { Observable } from "rxjs";
import { PostElement, PostElementWithId } from "../../../models/post.models";

export interface IBlogRequest {
    getEntity(): Observable<PostElementWithId[]>;
    addPost(post: PostElement): void;
    updatePost(post: PostElementWithId): void;
    deletePost(post: PostElementWithId): void;
}