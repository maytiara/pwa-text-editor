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
  // difference used "readwrite"
  const tx = typeDb.transaction('type', 'readwrite');

  // open the bucket stored data
  const store = tx.objectStore('type');

  // used <PUT> method and applied in the argument (content)
  const request = store.put({id: 1, type: content});

  // get confirmation of the req
  const result = await request;
  console.log('Success 🚀 Data saved to the database', result);
  return result;
};

// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all information from the database');

  // create connection to the database & version of we want to use
  const typeDb = await openDB('type', 1);

  // create a new transaction. Inside the argument specified the database name & data function
  // .transaction (middleware)
  // difference used "readonly"
  const tx = typeDb.transaction('type', 'readonly');

  // open the bucket stored data
  const store = tx.objectStore('type');

  // used <GETALL> method to get all the data in database
  const request = store.getAll(1);

  // get confirmation of the req
  const result = await request;
  console.log('result', result);

  // need a return statement
  // "?" optional chaining operator == undefined || no error
  return result?.content;
};

initdb();
