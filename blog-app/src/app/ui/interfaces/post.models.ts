import { IComment } from "./Comment.interface";

export interface PostElement {
    title: string;
    content: string;
    imgSrc?: File | null;
}

export interface PostElementWithId extends PostElement {
    id?: ReturnType<typeof crypto.randomUUID>;
    commentsList?: IComment[];
    rating: number;
    categoryId?: number | null;
    createdAt?: string;
    updatedAt?: string;
}