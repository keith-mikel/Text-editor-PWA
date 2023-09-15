import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database
const dbPromise = initdb();

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  const newItem = {
    content,
  };

  await store.add(newItem);
  await tx.done;
  console.log('Data added to the database');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const allItems = await store.getAll();
  await tx.done;

  return allItems;
};

// Example usage:
putDb("This is some content");
const data = await getDb();
console.log(data);

