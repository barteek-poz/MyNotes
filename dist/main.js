const btnAdd = document.querySelector('.add');
const btnDeleteAll = document.querySelector('.delete-all');
const btnDeleteNote = document.getElementsByClassName('delete-note');
const btnSave = document.querySelector('.save');
const btnCancel = document.querySelector('.cancel');
const categories = document.querySelector('#category');
const notePanel = document.querySelector('.note-panel');
const noteArea = document.querySelector('.note-area');
const noteText = document.querySelector('#text');
const error = document.querySelector('.error');
const note = document.querySelector('.note');
const dateToNote = document.querySelector('.note-date');
let noteID = 0;
let selectedCategory;
const addNotePanel = () => {
    notePanel.style.display = 'flex';
};
const cancelNote = () => {
    notePanel.style.display = 'none';
};
const deleteAllNotes = () => {
    noteArea.innerHTML = '';
    noteID = 0;
};
const noteColor = (categories) => {
    let color;
    if (categories === 'work') {
        color = 'rgba(181,146,253,255)';
    }
    else if (categories === 'shop') {
        color = 'rgba(141, 224, 85, 0.905)';
    }
    else if (categories === 'others') {
        color = 'rgba(254,201,112,255)';
    }
    return color;
};
const date = () => {
    const noteDate = new Date();
    let day = noteDate.getDate();
    let month = noteDate.toLocaleString('default', { month: 'long' });
    let year = noteDate.getFullYear();
    return `${day} ${month} ${year}`;
};
const category = () => {
    selectedCategory = categories.options[categories.selectedIndex].text;
};
const saveNote = () => {
    if (noteText.value !== '' && categories.value !== '0') {
        const note = document.createElement('div');
        note.setAttribute('id', 'noteID');
        note.innerHTML = `<div class="note" id="${categories.value}" style="background-color:${noteColor(categories.value)}">
    <div class="note-header">
      <p class="note-date">${date()}</p>
      <div class="header-buttons">
        <button class="edit-note" onclick="editNote(${noteID})">
          <i class="fa-solid fa-pen icon"></i>
        </button>
        <button class="delete-note" onclick="deleteNote(${noteID})">
          <i class="fas fa-times icon"></i>
        </button>
      </div>
    </div>
    <div class="note-body">${noteText.value}</div>
    </div>`;
        noteArea.appendChild(note);
        cancelNote();
        noteID++;
        noteText.value = '';
        categories.value = '0';
    }
    else {
        error.style.visibility = 'visible';
    }
};
const deleteNote = (id) => {
    const deletedNote = document.getElementById(id);
    noteArea.removeChild(deletedNote);
};
const editNote = (id) => {
    const editedNote = document.getElementById(id);
    const editedNoteText = editedNote.querySelector('.note-body').textContent;
    addNotePanel();
    noteText.value = editedNoteText;
    noteArea.removeChild(editedNote);
    const noteCategory = editedNote.querySelector('.note');
    categories.value = noteCategory.getAttribute('id');
};
btnAdd.addEventListener('click', addNotePanel);
btnCancel.addEventListener('click', cancelNote);
btnDeleteAll.addEventListener('click', deleteAllNotes);
btnSave.addEventListener('click', saveNote);
