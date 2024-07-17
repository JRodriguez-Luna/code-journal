/* exported data */

interface Data {
  view: 'entries' | 'entry-form';
  entries: Entry[];
  editing: null | Entry;
  nextEntryId: number;
}

let data = readData();

// write data to localStorage
function writeData(): void {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('data-storage', dataJSON);
};

// read data from localStorage
function readData(): Data {
  let data = localStorage.getItem('data-storage');
  if (data) return JSON.parse(data);
  else {
    return {
      view: 'entry-form',
      entries: [],
      editing: null,
      nextEntryId: 1,
    };
  }
};
