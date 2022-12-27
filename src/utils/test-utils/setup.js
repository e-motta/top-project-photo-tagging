import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { connectFirestoreEmulator } from 'firebase/firestore';

import { firestore } from '../../firebase';
import { writeBatch, doc } from 'firebase/firestore';
import firestoreData from '../firestoreData';

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeAll(() => {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
});

beforeEach(() => {
  // Add data to Firestore Emulator
  const fillBatch = (batch, jsonDocument, collectionName) => {
    const ref = doc(firestore, collectionName, jsonDocument.id);
    batch.set(ref, jsonDocument);
  };
  const allJsonCollections = Object.values(firestoreData);
  const collectionNames = Object.keys(firestoreData);
  allJsonCollections.forEach(async (jsonCollection, i) => {
    const batch = writeBatch(firestore);
    const collectionName = collectionNames[i];
    jsonCollection.forEach((jsonDocument) => {
      fillBatch(batch, jsonDocument, collectionName);
    });
    await batch.commit();
  });
});

afterEach(() => {
  // Unmounts React trees that were mounted with render
  cleanup();
});
