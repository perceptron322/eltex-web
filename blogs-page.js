// Раскрытие формы по кнопке с админ панели
const openFormButtonElement = document.querySelector('[data-js-add-blog-button]');
const form = document.querySelector('.blog-new-form')

openFormButtonElement.addEventListener('click', () => {
    if (form.style.display === 'none' || !form.classList.contains('visible')) {
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                form.classList.add('visible');
                form.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        });
    }
});

// убираем форму по кнопке отмена
const cancelFormButtonElement = document.querySelector('[data-js-form-cancel-button]');

cancelFormButtonElement.addEventListener('click', () => {
    form.classList.remove('visible');
    form.addEventListener('transitionend', () => {
        form.style.display = 'none';
    }, {once: true});
});

// добавление в список
const blogListElements = document.querySelector('[data-js-card-list]');
const templateBlogElement = document.querySelector('[data-js-card-template]');
const formNewBlog = document.querySelector('[data-js-form-new-blog]');

formNewBlog.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!formNewBlog.checkValidity()) {
        formNewBlog.reportValidity();
        return;
    }

    const formData = new FormData(formNewBlog);
    const title = formData.get('blog-title');
    const text = formData.get('blog-text');

    const newBlog = templateBlogElement.content.cloneNode(true);
    const blogTitle = newBlog.querySelector('[data-js-blog-title]');
    blogTitle.textContent = title;

    blogListElements.appendChild(newBlog);
    
    formNewBlog.reset();
});


// удаление статьи
blogListElements.addEventListener('click', (event) => {
    const deleteButton = event.target.closest('[data-js-delete-blog-button]');
    if(!deleteButton) return;
    
    const blogItem = deleteButton.closest('.blogs-card-item');
    blogItem.remove();
});

// статистика
const statWindowElement = document.querySelector('[data-js-stat-dialog]')
const showStatWindowButtonElement = document.querySelector('[data-js-show-stat-button]');
const closeStatWindowButtonElement = document.querySelector('[data-js-close-button]');
const blogsCountElement = document.querySelector('[data-js-blogs-count]');

showStatWindowButtonElement.addEventListener('click', () => {
    const count = blogListElements.querySelectorAll('.blogs-card-item').length;
    blogsCountElement.textContent = count;
    statWindowElement.showModal();
});

closeStatWindowButtonElement.addEventListener('click', () => {
    statWindowElement.close();
});