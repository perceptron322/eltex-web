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
const addBlogButtonElement = document.querySelector('[data-js-add-button]');

addBlogButtonElement.addEventListener('click', () => {
    const clone = templateBlogElement.content.cloneNode(true);

    blogListElements.appendChild(clone);
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