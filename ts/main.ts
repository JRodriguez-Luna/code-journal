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
const $entriesView = document.querySelector('.entries-wrap');
const $previewImg = document.querySelector(
  '#placeholder-img',
) as HTMLImageElement;
const $journalEntry = document.querySelector('#journal-entry');
const $navItem = document.querySelector('.nav-item');
const $newEntryButton = document.querySelector('.new-entry-button');
const placeholderImg = $previewImg.src;

if (!$entryForm) throw new Error('$entryForm did not query!');
if (!$photoUrl) throw new Error('$photoUrl did not query!');
if (!$previewImg) throw new Error('$previewImg did not query!');
if (!$journalEntry) throw new Error('$journalEntry did not query!');
if (!$entriesView) throw new Error('$entriesView did not query!');
if (!$navItem) throw new Error('$navItem did not query!');
if (!$newEntryButton) throw new Error('$newEntryButton did not query!');

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
  toggleNoEntries();
  viewSwap('entries');

  // Add new entry to the DOM
  $journalEntry.prepend(renderEntry(entryData));

  // reset preview img
  $previewImg.src = placeholderImg;
  resetForm(); // reset form
});

function renderEntry(entry: Entry): HTMLLIElement {
  const $li = document.createElement('li');
  const $row = document.createElement('div');
  const $columnImg = document.createElement('div');
  const $columnText = document.createElement('div');
  const $img = document.createElement('img');
  const $entryTitle = document.createElement('h2');
  const $description = document.createElement('p');
  // pencil icon
  const $pencilIcon = document.createElement('i');

  $row.setAttribute('class', 'row');
  $columnImg.setAttribute('class', 'column-half');
  $columnText.setAttribute('class', 'column-half');
  $entryTitle.setAttribute('class', 'header-font');
  // pencil attribute
  $pencilIcon.setAttribute('class', 'fa-solid fa-pencil');

  // entry data
  $img.src = entry.photoUrl;
  $img.alt = entry.title;
  $entryTitle.textContent = entry.title;
  $description.textContent = entry.notes;

  $entryTitle.appendChild($pencilIcon);
  $columnImg.appendChild($img);
  $columnText.append($entryTitle, $description);
  $row.append($columnImg, $columnText);
  $li.appendChild($row);

  return $li;
}

//  load entries onto webpage
document.addEventListener('DOMContentLoaded', () => {
  if (!$journalEntry) throw new Error('$journalEntry did not query!');

  // loop through the data.entries array
  for (let i = 0; i < data.entries.length; i++) {
    const $newListItem = renderEntry(data.entries[i]);
    $journalEntry.appendChild($newListItem);
  }

  viewSwap(data.view);
  toggleNoEntries();
});

//  Swap proper tab view
$navItem.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const viewName = $eventTarget.dataset.view;
  if (viewName === 'entries' || viewName === 'entry-form') viewSwap(viewName);
});

// when clicking on new, swaps to entry form
$newEntryButton.addEventListener('click', (event: Event) => {
  const $viewName = (event.target as HTMLElement).dataset.view;
  if ($viewName === 'entries' || $viewName === 'entry-form') {
    resetForm();
    viewSwap($viewName);
  }
});

// toggles the no entries text to show or hide when the function is called
const toggleNoEntries = (): void => {
  const $noEntryText = document.querySelector('.no-entries-text');
  if (!$noEntryText) throw new Error('$noEntryText failed to query!');

  if (data.entries.length) $noEntryText.classList.add('hidden');
  else $noEntryText.classList.remove('hidden');
};

const viewSwap = (viewName: 'entries' | 'entry-form'): void => {
  if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    $entriesView.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }

  data.view = viewName;
};

// Reset form
const resetForm = (): void => {
  $entryForm.reset();
};
