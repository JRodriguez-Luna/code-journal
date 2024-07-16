"use strict";
/* global data */
const $photoUrl = document.querySelector('#photo-url');
const $previewImg = document.querySelector('#placeholder-img');
if (!$photoUrl)
    throw new Error('$photoUrl did not query!');
if (!$previewImg)
    throw new Error('$previewImg did not query!');
$photoUrl.addEventListener('input', (event) => {
    const url = event.target;
    $previewImg.setAttribute('src', url.value);
});
