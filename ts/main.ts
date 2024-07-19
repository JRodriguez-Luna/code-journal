/* global data */
interface EntryForm extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface Entry {
  title: string;
  photoUrl: string;
  notes: string;
  entryId: number;
}

const $entryForm = document.querySelector('#entry-form') as HTMLFormElement;
const $photoUrl = document.querySelector('#photoUrl') as HTMLInputElement;
const $previewImg = document.querySelector(
  '#placeholder-img',
) as HTMLImageElement;
const placeholderImg = $previewImg.src;

if (!$entryForm) throw new Error('$entryForm did not query!');
if (!$photoUrl) throw new Error('$photoUrl did not query!');
if (!$previewImg) throw new Error('$previewImg did not query!');

// set the src attribute of the photo from user input
$photoUrl.addEventListener('input', (event: Event) => {
  const url = event.target as HTMLInputElement;
  if (!url.checkValidity()) $previewImg.src = placeholderImg;
  else $previewImg.src = url.value;
});

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page from refreshing
  const $entryElements = $entryForm.elements as EntryForm;

  // stores the form's input values in a new object
  const entryData: Entry = {
    title: $entryElements.title.value,
    photoUrl: $entryElements.photoUrl.value,
    notes: $entryElements.notes.value,
    // Assign property to new Object taken from nextEntryId
    entryId: data.nextEntryId,
  };
  // next entry will receive a different entryId.
  data.nextEntryId++;

  // adds to the beginning of entries array
  data.entries.unshift(entryData);
  writeData();

  // reset preview img
  $previewImg.src = placeholderImg;
  $entryForm.reset(); // reset form
});

function renderEntry(entry: Entry): HTMLLIElement {
  const $li = document.createElement('li');
  const $row = document.createElement('div');
  const $columnImg = document.createElement('div');
  const $columnText = document.createElement('div');
  const $img = document.createElement('img');
  const $heading = document.createElement('h2');
  const $description = document.createElement('p');

  $row.setAttribute('class', 'row');
  $columnImg.setAttribute('class', 'column-half');
  $columnText.setAttribute('class', 'column-half');
  $heading.setAttribute('class', 'header-font');

  // entry data
  $img.src = entry.photoUrl;
  $img.alt = entry.title;
  $heading.textContent = entry.title;
  $description.textContent = entry.notes;

  $columnImg.appendChild($img);
  $columnText.append($heading, $description);
  $row.append($columnImg, $columnText);
  $li.appendChild($row);

  return $li;
}

//  load entries onto webpage
document.addEventListener('DOMContentLoaded', () => {
  const $ul = document.querySelector('#journal-entry');
  if (!$ul) throw new Error('$ul did not query!');

  // loop through the data.entries array
  for (let i = 0; i < data.entries.length; i++) {
    const $newListItem = renderEntry(data.entries[i]);
    $ul.appendChild($newListItem);
  }
});
