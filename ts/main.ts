/* global data */
interface EntryForm extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photoUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $entryForm = document.querySelector('form') as HTMLFormElement;
const $photoUrl = document.querySelector('#photoUrl') as HTMLInputElement;
const $previewImg = document.querySelector(
  '#placeholder-img',
) as HTMLImageElement;

if (!$entryForm) throw new Error('$entryForm did not query!');
if (!$photoUrl) throw new Error('$photoUrl did not query!');
if (!$previewImg) throw new Error('$previewImg did not query!');

// set the src attribute of the photo from user input
$photoUrl.addEventListener('input', (event: Event) => {
  const url = event.target as HTMLInputElement;
  $previewImg.src = url.value;
});

$entryForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page from refreshing
  const $entryElements = $entryForm.elements as EntryForm;

  // stores the form's input values in a new object
  const entryData = {
    title: $entryElements.title.value,
    photoUrl: $entryElements.photoUrl.value,
    notes: $entryElements.notes.value,
  };

  (data.entries as any[]).push(entryData);
});
