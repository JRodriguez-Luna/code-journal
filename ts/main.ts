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
