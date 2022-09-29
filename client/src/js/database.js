import { openDB } from 'idb';

const initdb = async () =>

// creating new database name "type" || Version 1
  openDB('type', 1, {

    // add database schema
    upgrade(db) {
      if (db.objectStoreNames.contains('type')) {
        console.log('type database already exists');
        return;
      }

      // new object stored for the data
      db.createObjectStore('type', { keyPath: 'id', autoIncrement: true });
      console.log('type database created');
    },
  });

// Added logic to a method that accepts content and adds it to the database
export const putDb = async (content) => {
  console.log('Update information sent to database');

  // create connection to the database & version of we want to use
  const typeDb = await openDB('type', 1);

  // create a new transaction. Inside the argument specified the database name & data function
  // .transaction (middleware)
  const tx = typeDb.transaction('type', 'readwrite');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
