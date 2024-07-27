'use strict';
const $entryForm = document.querySelector('#entry-form');
const $photoUrl = document.querySelector('#photoUrl');
const $entriesView = document.querySelector('.entries-wrap');
const $previewImg = document.querySelector('#placeholder-img');
const $titleInput = document.querySelector('#title');
const $notesInput = document.querySelector('#notes');
const $mainHeading = document.querySelector('#new-entry');
const $titleForm = document.querySelector('#new-entry');
const $journalEntry = document.querySelector('#journal-entry');
const $navItem = document.querySelector('.nav-item');
const $newEntryButton = document.querySelector('.new-entry-button');
// Modal pop-up
const $deleteButton = document.querySelector('#delete-entry-button');
const $confirmModal = document.querySelector('dialog');
const $confirmDelete = document.querySelector('#confirm-delete');
const $cancelDelete = document.querySelector('#cancel-delete');
const placeholderImg = $previewImg.src;
if (!$entryForm) throw new Error('$entryForm did not query!');
if (!$photoUrl) throw new Error('$photoUrl did not query!');
if (!$previewImg) throw new Error('$previewImg did not query!');
if (!$journalEntry) throw new Error('$journalEntry did not query!');
if (!$entriesView) throw new Error('$entriesView did not query!');
if (!$navItem) throw new Error('$navItem did not query!');
if (!$newEntryButton) throw new Error('$newEntryButton did not query!');
if (!$titleInput) throw new Error('$titleInput did not query!');
if (!$notesInput) throw new Error('$notesInput did not query!');
if (!$mainHeading) throw new Error('$mainHeading did not query!');
if (!$titleForm) throw new Error('$titleForm did not query!');
if (!$deleteButton) throw new Error('$deleteButton did not query!');
if (!$confirmModal) throw new Error('$confirmModal did not query!');
// set the src attribute of the photo from user input
$photoUrl.addEventListener('input', (event) => {
  const url = event.target;
  if (!url.checkValidity()) $previewImg.src = placeholderImg;
  else $previewImg.src = url.value;
});
$entryForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent page from refreshing
  const $entryElements = $entryForm.elements;
  // stores the form's input values in a new object
  const entryData = {
    title: $entryElements.title.value,
    photoUrl: $entryElements.photoUrl.value,
    notes: $entryElements.notes.value,
    // Assign property to new Object taken from nextEntryId
    entryId: data.nextEntryId,
  };
  if (data.editing) {
    //  assign the entry id value from data.editing to the new object with the updated form values.
    entryData.entryId = data.editing.entryId;
    //  find the index located in the array
    const index = data.entries.findIndex(
      (entry) => entry.entryId === data.editing?.entryId,
    );
    // replace the original object for the edited entry
    data.entries[index] = entryData;
    // render new DOM Tree and replace original 'li' with the updated
    const $oldListItem = $journalEntry.querySelector(
      `[data-entry-id='${data.editing.entryId}']`,
    );
    if (!$oldListItem) throw new Error('$oldListItem did not query!');
    // replaces old li with newly rendered
    $oldListItem.replaceWith(renderEntry(entryData));
    //  update the title on the form to New Entry.
    //  reset data.editing to null.
    data.editing = null;
    $titleForm.textContent = 'New Entry';
  } else {
    // next entry will receive a different entryId.
    data.nextEntryId++;
    // adds to the beginning of entries array
    data.entries.unshift(entryData);
    // Add new entry to the DOM
    $journalEntry.prepend(renderEntry(entryData));
  }
  writeData();
  toggleNoEntries();
  viewSwap('entries');
  resetForm(); // reset form
});
function renderEntry(entry) {
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
  // li that stores the entryId of the entry being rendered
  $li.setAttribute('data-entry-id', entry.entryId.toString());
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
$navItem.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  const viewName = $eventTarget.dataset.view;
  if (viewName === 'entries' || viewName === 'entry-form') viewSwap(viewName);
});
// when clicking on new, swaps to entry form
$newEntryButton.addEventListener('click', (event) => {
  const $viewName = event.target.dataset.view;
  $titleForm.textContent = 'New Entry';
  if ($viewName === 'entries' || $viewName === 'entry-form') {
    resetForm();
    viewSwap($viewName);
  }
});
// when selecting 'delete entry', pop-up confirmation
$deleteButton.addEventListener('click', () => {
  $confirmModal.showModal();
});
// if user cancels the delete, hide modal
$cancelDelete?.addEventListener('click', () => {
  $confirmModal.close();
});
// if user confirms deletion, delete that entry
$confirmDelete?.addEventListener('click', () => {
  // find the entryId located in the entries array
  const index = data.entries.findIndex(
    (entry) => entry.entryId === data.editing?.entryId,
  );
  // delete entry off the array
  data.entries.splice(index, 1);
  // delete off the DOM tree
  const $itemToDelete = document.querySelector(
    `[data-entry-id='${data.editing?.entryId}']`,
  );
  if (!$itemToDelete) throw new Error('$itemToDelete did not query!');
  // Remove from  DOM tree and update
  $journalEntry.removeChild($itemToDelete);
  // revert back to null
  data.editing = null;
  writeData();
  toggleNoEntries();
  $confirmModal.close();
  viewSwap('entries');
});
// when the pencil icon is clicked
$journalEntry.addEventListener('click', (event) => {
  const $icon = event.target;
  // if not found, return
  if (!$icon.classList.contains('fa-pencil')) return;
  // get the li closes and store the value
  const $parent = $icon.closest('li');
  if (!$parent) throw new Error('$entryForm closest() failed!');
  const $entryId = $parent.getAttribute('data-entry-id');
  if (!$entryId) throw new Error('$entryForm getAttribute() failed!');
  // search for and store that obj using the entryId to verify
  const entry = data.entries.find(
    (entry) => entry.entryId.toString() === $entryId,
  );
  if (!entry) throw new Error('data.entries find() failed!');
  // if found, assign entry to data.editing
  data.editing = entry;
  // pre-populate form with entry's values
  $previewImg.src = entry.photoUrl;
  $photoUrl.value = entry.photoUrl;
  $titleInput.value = entry.title;
  $notesInput.value = entry.notes;
  // change title
  $titleForm.textContent = 'Edit Entry';
  // display delete button
  toggleDeleteButton(true);
  viewSwap('entry-form');
});
// toggles the no entries text to show or hide when the function is called
const toggleNoEntries = () => {
  const $noEntryText = document.querySelector('.no-entries-text');
  if (!$noEntryText) throw new Error('$noEntryText failed to query!');
  if (data.entries.length) $noEntryText.classList.add('hidden');
  else $noEntryText.classList.remove('hidden');
};
const viewSwap = (viewName) => {
  if (viewName === 'entries') {
    $entriesView.classList.remove('hidden');
    $entryForm.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    $entriesView.classList.add('hidden');
    $entryForm.classList.remove('hidden');
  }
  data.view = viewName;
};
// delete function
const toggleDeleteButton = (view) => {
  const $deleteButton = document.querySelector('#delete-entry-button');
  if (!$deleteButton) throw new Error('$deleteButton did not query!');
  if (view) $deleteButton.classList.remove('hidden');
  else $deleteButton.classList.add('hidden');
};
// Reset form
const resetForm = () => {
  $previewImg.src = placeholderImg;
  $entryForm.reset();
  toggleDeleteButton(false);
};
