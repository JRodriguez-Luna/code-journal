"use strict";
/* exported data */
let data = readData();
// write data to localStorage
function writeData() {
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('data-storage', dataJSON);
}
;
// read data from localStorage
function readData() {
    let data = localStorage.getItem('data-storage');
    if (data)
        return JSON.parse(data);
    else {
        return {
            view: 'entry-form',
            entries: [],
            editing: null,
            nextEntryId: 1,
        };
    }
}
;
