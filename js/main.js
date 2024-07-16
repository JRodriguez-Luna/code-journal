'use strict';
const $entryForm = document.querySelector('form');
const $photoUrl = document.querySelector('#photoUrl');
const $previewImg = document.querySelector('#placeholder-img');
if (!$entryForm) throw new Error('$entryForm did not query!');
if (!$photoUrl) throw new Error('$photoUrl did not query!');
if (!$previewImg) throw new Error('$previewImg did not query!');
// set the src attribute of the photo from user input
$photoUrl.addEventListener('input', (event) => {
  const url = event.target;
  $previewImg.src = url.value;
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
  // next entry will receive a different entryId.
  data.nextEntryId++;
  // adds to the beginning of entries array
  data.entries.unshift(entryData);
  console.log(data.entries);
  // reset preview img
  $previewImg.src = './images/placeholder-image-square.jpg';
  $entryForm.reset(); // reset form
});
