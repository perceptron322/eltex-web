export interface PostElement {
    title: string | null;
    text: string | null;
}

export interface PostElementWithId extends PostElement {
    id: ReturnType<typeof crypto.randomUUID>;
}