import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestoreApi } from '../../../app/firestoreApi';

import { firestore } from '../../../firebase';
import { Character, Characters, Level, Levels } from '../../../types';

export const levelsApi = firestoreApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLevels: builder.query<Levels, void>({
      async queryFn() {
        try {
          const ref = collection(firestore, 'levels');
          const querySnapshot = await getDocs(ref);
          let levels: Levels = [];
          querySnapshot?.forEach((doc) => {
            levels.push({ id: doc.id, ...doc.data() } as Level);
          });
          return { data: levels };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Level'],
    }),
    fetchSingleLevel: builder.query<Level, string>({
      async queryFn(id) {
        try {
          const ref = doc(firestore, 'levels', id);
          const documentSnapshot = await getDoc(ref);
          const data: Level = { ...documentSnapshot.data() } as Level;
          return { data };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Level'],
    }),
    fetchCharacters: builder.query<Characters, void>({
      async queryFn() {
        try {
          const ref = collection(firestore, 'characters');
          const querySnapshot = await getDocs(ref);
          let characters: Characters = [];
          querySnapshot?.forEach((doc) => {
            characters.push({ id: doc.id, ...doc.data() } as Character);
          });
          return { data: characters };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Character'],
    }),
  }),
});

export const {
  useFetchLevelsQuery,
  useFetchSingleLevelQuery,
  useFetchCharactersQuery,
} = levelsApi;
