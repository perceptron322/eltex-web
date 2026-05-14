import { PostElementWithId } from "./post.models";

export interface IBlogResponse {
    items: PostElementWithId[];
    total: number;
    page: number;
    limit: number;
}