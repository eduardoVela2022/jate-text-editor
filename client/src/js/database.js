// Imports
import { openDB } from "idb";

// Starts up the database
const initdb = async () =>
  // Creates a database named "jate" and sets its version to 1
  openDB("jate", 1, {
    upgrade(db) {
      // If the "jate" object store already exists, return
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }

      // Creates a "jate" object store with an id and with auto increment turned on
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Updates the object store of the database
export const putDb = async (content) => {
  // Creates database connection
  const jateDb = await openDB("jate", 1);

  // Creates a read and write database transaction
  const tx = jateDb.transaction("jate", "readwrite");

  // Selects the "jate" object store
  const store = tx.objectStore("jate");

  // Creates a request to update the item with the id of 1 with the new content.
  const request = store.put({ id: 1, value: content });

  // Execute the request
  await request;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Creates database connection
  const jateDb = await openDB("jate", 1);

  // Creates a read only database transaction
  const tx = jateDb.transaction("jate", "readonly");

  // Selects the "jate" object store
  const store = tx.objectStore("jate");

  // Creates a request to get the object with the id of 1
  const request = store.get(1);

  // Execute the request
  const result = await request;

  // If the object with the id of 1 was found, return it
  return result?.value;
};

// Create database
initdb();
