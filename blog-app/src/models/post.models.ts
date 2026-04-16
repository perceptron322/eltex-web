export interface PostElement {
    title: string;
    text: string;
}

export interface PostElementWithId extends PostElement {
    id: ReturnType<typeof crypto.randomUUID>;
}