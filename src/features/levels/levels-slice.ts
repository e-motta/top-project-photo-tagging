import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { RootState } from '../../app/store';

import { firestore } from '../../firebase';
import {
  Character,
  Characters,
  FoundCharacter,
  FoundCharacters,
  Level,
  Levels,
} from '../../types';
import { useAppSelector } from '../../app/hooks';

export const levelsApi = createApi({
  reducerPath: 'levels',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Level', 'Character'],
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
          // if (data && data.characters_positions) {
          //   data?.characters_positions.forEach((position) => {
          //     position.found = false;
          //   });
          // }
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

const initialState: FoundCharacters = [
  { id: '15hg3If0JJaa3gXzfpow', found: false },
  { id: '8LhDob2HJEjB5Gvi7s2u', found: false },
  { id: 'tWH93mZU0sfqsPYC4ART', found: false },
  { id: 'xvke58nGthigfxFfvOTp', found: false },
];

export const foundCharactersSlice = createSlice({
  name: 'foundCharacters',
  initialState: initialState,
  reducers: {
    resetScore() {
      return initialState;
    },
    setFoundCharacter(state, action: PayloadAction<string>) {
      const id = action.payload;
      const character = state.find((char: FoundCharacter) => char.id === id);
      if (character) character.found = true;
    },
  },
});

export const { resetScore, setFoundCharacter } = foundCharactersSlice.actions;
