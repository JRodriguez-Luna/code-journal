"use strict";
/* exported data */
let data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
// write data to localStorage
function writeData() {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
// read data from localStorage
function readData() {
    const item = localStorage.getItem('data-storage');
    if (item)
        return JSON.parse(item);
    else
        return data; // return default data if not found
}
