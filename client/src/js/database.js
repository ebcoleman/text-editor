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

  export const putDb = async (content)  => {
    console.log('PUT to the database');
  
    // Create a connection
    const contactDb = await openDB('jate', 1);
  
    // Create a new transaction
    const tx = contactDb.transaction('jate', 'readwrite');
  
    // Open the object store
    const store = tx.objectStore('jate');
  
    // Use the .add() method on the store and pass in the content
    const request = store.put({ id: 1, value: content });
  
    // Get confirmation of request
    const result = await request;
    console.log('Data saved to the database', result);
  };
  
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    console.log('GET from the database');
  
    // Create a connection
    const contactDb = await openDB('jate', 1);
  
    // Create a new transaction
    const tx = contactDb.transaction('jate', 'readonly');
  
    // Open the object store
    const store = tx.objectStore('jate');
  
    // Use the .getAll() method to get all data in the database
    const request = store.getAll();
  
    // Confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result?.value;
  };
  
  
  initdb();