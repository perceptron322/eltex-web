export class BlogStorage {
    constructor() {
        this.blogList = document.querySelector('[data-js-card-list]')
        this.blogTemplate = document.querySelector('[data-js-card-template]');
        this.blogButton = document.querySelector('[data-js-blog-button]');
        this.loadingBlogAnimation = document.querySelector('[data-js-loading-blogs]');

        this.loadingBlogAnimation.classList.add('show');
        this.posts = this.#getFromLocalStorage();

        async function makeResponseGetBlogs() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        }

        makeResponseGetBlogs()
            .then(() => {
                console.log('Данные получены');
            })
            .finally(() => {
                this.#renderBlogList();
            });
    }

    #getFromLocalStorage() {
        const raw = localStorage.getItem('posts');
        if(!raw) return [];
        return JSON.parse(raw);
    }

    #saveToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(this.posts));
    }

    // отрисовка статей из массива
    #renderBlogList() {
        this.blogList.innerHTML = '';

        this.loadingBlogAnimation.classList.remove('show');

        if (this.posts.length === 0) {
            this.blogList.classList.add('blog-list--empty');
            this.blogButton.classList.add('is-hidden');
            return;
        }

        this.blogList.classList.remove('blog-list--empty');
        this.blogButton.classList.remove('is-hidden');

        const postElements = this.posts.map(post => {
            const card = this.blogTemplate.content.cloneNode(true);

            card.querySelector('[data-js-blog-title]').textContent = post.title;
            card.querySelector('[data-js-blog-description]').textContent = post.text;

            // сразу вешаем удаление статьи на иконку
            card.querySelector('[data-js-delete-blog-button]')
                .addEventListener('click', () => this.deletePost(post.id));
            
            return card;
        });

        this.blogList.append(...postElements);
    }

    // при изменении массива статей, сохраняем в localStorage и рендерим снова
    addPost(title, text) {
        const post = {
            id: crypto.randomUUID(),
            title,
            text
        }

        this.posts.push(post);
        this.#saveToLocalStorage();
        this.#renderBlogList();
    }

    deletePost(id) {
        this.posts = this.posts.filter(post => post.id !== id)
        this.#saveToLocalStorage();
        this.#renderBlogList();
    }

    getPostsCount() {
        return this.posts.length;
    }
}