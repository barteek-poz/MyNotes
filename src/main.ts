const btnAdd: HTMLButtonElement = document.querySelector('.add');
const btnDeleteAll: HTMLButtonElement = document.querySelector('.delete-all');
const btnDeleteNote: HTMLCollection =
	document.getElementsByClassName('delete-note');
const btnSave: HTMLButtonElement = document.querySelector('.save');
const btnCancel: HTMLButtonElement = document.querySelector('.cancel');
const categories: HTMLSelectElement = document.querySelector('#category');
const notePanel: HTMLDivElement = document.querySelector('.note-panel');
const noteArea: HTMLDivElement = document.querySelector('.note-area');
const noteText: HTMLTextAreaElement = document.querySelector('#text');
const error: HTMLParagraphElement = document.querySelector('.error');
const note: HTMLDivElement = document.querySelector('.note');
const dateToNote: HTMLParagraphElement = document.querySelector('.note-date');

let noteID: number = 0;
let selectedCategory:string;


const addNotePanel = ():void => {
	notePanel.style.display = 'flex';
};

const cancelNote = ():void => {
	notePanel.style.display = 'none';
};

const deleteAllNotes = ():void => {
	noteArea.innerHTML = '';
	noteID = 0;
};

const noteColor = (categories:string):string => {
	let color:string;
	if (categories === 'work') {
		color = 'rgba(181,146,253,255)';
	} else if (categories === 'shop') {
		color = 'rgba(141, 224, 85, 0.905)';
	} else if (categories === 'others') {
		color = 'rgba(254,201,112,255)';
	}
	return color;
};

const date = ():string => {
	const noteDate:Date = new Date();
	let day:number = noteDate.getDate();
	let month:string = noteDate.toLocaleString('default', { month: 'long' });
	let year:number = noteDate.getFullYear();
	return `${day} ${month} ${year}`;
};
const category = ():void => {
	selectedCategory = categories.options[categories.selectedIndex].text;
};

const saveNote = ():void => {
	if (noteText.value !== '' && categories.value !== '0') {
		const note:HTMLDivElement = document.createElement('div');
		note.setAttribute('id', 'noteID');
		note.innerHTML = `<div class="note" id="${
			categories.value
		}" style="background-color:${noteColor(categories.value)}">
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
	} else {
		error.style.visibility = 'visible';
	}
};

const deleteNote = (id:string):void => {
	const deletedNote:HTMLElement = document.getElementById(id);
	noteArea.removeChild(deletedNote);
};

const editNote = (id:string):void => {
	const editedNote:HTMLElement = document.getElementById(id);
	const editedNoteText:string = editedNote.querySelector('.note-body').textContent;
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

