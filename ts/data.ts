/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

data = readData();

// write data to localStorage
function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
}

// read data from localStorage
function readData(): typeof data {
  const item = localStorage.getItem('data-storage');
  if (item) return JSON.parse(item);
  else return data; // return default data if not found
}
