// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker зарегистрирован:', registration.scope);
        } catch (err) {
            console.error('Ошибка регистрации:', err);
        }
    });
}

// Логика управления заметками
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const noteList = document.getElementById('noteList');
const offlineMessage = document.getElementById('offlineMessage');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Функция для отображения заметок
function displayNotes() {
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <span onclick="viewNote(${index})" style="cursor: pointer;">${note}</span>
            <button onclick="deleteNote(${index})">Удалить</button>
        `;
        noteList.appendChild(noteDiv);
    });
}

// Функция для добавления заметки
addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();
    }
});

// Функция для удаления заметки
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Функция для просмотра заметки
function viewNote(index) {
    alert(notes[index]); // Отображение заметки в виде всплывающего окна
}

// Проверка на офлайн-режим
window.addEventListener('offline', () => {
    offlineMessage.style.display = 'block';
});

window.addEventListener('online', () => {
    offlineMessage.style.display = 'none';
});

// Отображение заметок при загрузке
displayNotes();