export interface IComment {
    username: string,
    content: string,
    datetime?: string;
    rating: number;
    id?: string;
    articleId?: string;
}