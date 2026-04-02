import { BlogStorage } from "./BlogStorage.js";
const blogStorage = new BlogStorage();

// Раскрытие формы по кнопке с админ панели
const openFormButtonElement = document.querySelector('[data-js-add-blog-button]');
const form = document.querySelector('.blog-new-form')

openFormButtonElement.addEventListener('click', () => {
    form.classList.add('blog-new-form--visible');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// убираем форму по кнопке отмена
const cancelFormButtonElement = document.querySelector('[data-js-form-cancel-button]');

cancelFormButtonElement.addEventListener('click', () => {
    form.classList.remove('blog-new-form--visible');
});

// анимация загрузки
const loadingIcon = document.querySelector('[data-js-loading]');

function showLoader() {
    loadingIcon.classList.add('show');
}
function hideLoader() {
    loadingIcon.classList.remove('show');
}

// disable формы и кнопки
const formTitleInput = document.querySelector('[data-js-title-input]');
const formTextInput = document.querySelector('[data-js-text-input]');
const formAddButton = document.querySelector('[data-js-add-button]');
const formCancelButton = document.querySelector('[data-js-form-cancel-button]');

function disableForm() {
    formTitleInput.disabled = true;
    formTextInput.disabled = true;

    formAddButton.disabled = true;
    formAddButton.classList.add('disabled');

    formCancelButton.disabled = true;
    formCancelButton.classList.add('disabled');
}

function unDisableForm() {
    formTitleInput.disabled = false;
    formTextInput.disabled = false;

    formAddButton.disabled = false;
    formAddButton.classList.remove('disabled');
    
    formCancelButton.disabled = false;
    formCancelButton.classList.remove('disabled');
}

// добавление в список
const formNewBlog = document.querySelector('[data-js-form-new-blog]');

formAddButton.addEventListener('click', () => {
    if (!formNewBlog.checkValidity()) {
        formNewBlog.reportValidity(); // покажет встроенные ошибки валидации
        return;
    }

    const formData = new FormData(formNewBlog);

    showLoader();
    disableForm();

    function makeResponse() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(formData);
            }, 1000);
        });
    }

    makeResponse()
        .then((formData) => {
            const title = formData.get('blog-title');
            const text = formData.get('blog-text');
            blogStorage.addPost(title, text);
        })
        .finally(() => {
            hideLoader();
            formNewBlog.reset();
            unDisableForm();
        });
});

// статистика
const statWindowElement = document.querySelector('[data-js-stat-dialog]')
const showStatWindowButtonElement = document.querySelector('[data-js-show-stat-button]');
const closeStatWindowButtonElement = document.querySelector('[data-js-close-button]');
const blogsCountElement = document.querySelector('[data-js-blogs-count]');

showStatWindowButtonElement.addEventListener('click', () => {
    blogsCountElement.textContent = blogStorage.getPostsCount();
    statWindowElement.showModal();
});

closeStatWindowButtonElement.addEventListener('click', () => {
    statWindowElement.close();
});