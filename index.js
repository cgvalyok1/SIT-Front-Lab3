"use strict";
const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com',
        avatar: 'https://e7.pngegg.com/pngimages/708/819/png-clipart-konosuba-chibi-anime-crunchyroll-kavaii-chibi-hat-manga.png' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com',
        avatar: '' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com',
        avatar: 'https://yt3.googleusercontent.com/ytc/AOPolaREg9dpj4ejSQByL4kj593TD8NocGO8ky8HYNPY=s900-c-k-c0x00ffffff-no-rj' },
];
const container = document.getElementById("user-list");
const default_avatar = 'https://sengigames.com/images/icon_discord.svg';
function renderUsers(users) {
    container.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `
            <img src="${user.avatar || default_avatar}" alt="${user.name}" class="avatar">
            <div class="user-info">
                <div>
                    <p><strong>Имя:</strong> ${user.name}</p>
                    <button class="edit-name" data-id="${user.id}">Редактировать имя</button>
                </div>
                <div>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <button class="edit-email" data-id="${user.id}">Редактировать Email</button>
                </div>
                <input type="file" data-id="${user.id}" class="upload-avatar">
            </div>
        `;
        container.appendChild(userDiv);
    });
    addEventListeners();
}
function addEventListeners() {
    document.querySelectorAll('.edit-name').forEach(button => {
        button.addEventListener('click', handleEditName);
    });
    document.querySelectorAll('.edit-email').forEach(button => {
        button.addEventListener('click', handleEditEmail);
    });
    document.querySelectorAll('.upload-avatar').forEach(input => {
        input.addEventListener('change', handleAvatarUpload);
    });
}
function handleEditName(event) {
    const button = event.target;
    const id = Number(button.dataset.id);
    const user = users.find(user => user.id === id);
    if (user) {
        const newName = prompt('Введите новое имя:', user.name);
        if (newName !== null) {
            user.name = newName;
            renderUsers(users);
        }
    }
}
function handleEditEmail(event) {
    const button = event.target;
    const id = Number(button.dataset.id);
    const user = users.find(user => user.id === id);
    if (user) {
        const newEmail = prompt('Введите новый Email:', user.email);
        if (newEmail !== null) {
            user.email = newEmail;
            renderUsers(users);
        }
    }
}
function handleAvatarUpload(event) {
    const input = event.target;
    const id = Number(input.dataset.id);
    const user = users.find(user => user.id === id);
    if (user && input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            user.avatar = reader.result;
            renderUsers(users);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
window.onload = () => {
    renderUsers(users);
};
