import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  arrayUnion,
  collection,
  doc,
  updateDoc,
  getDocs,
} from 'firebase/firestore';
import {} from 'firebase/firestore/dist/functions';
import { firestore } from '../../firebase';

import { ScoresTable, ScoresTables } from '../../types';

export const scoresApi = createApi({
  reducerPath: 'scores',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Score'],
  endpoints: (builder) => ({
    fetchHighScoresTables: builder.query<ScoresTables, void>({
      async queryFn() {
        try {
          const ref = collection(firestore, 'scoresTables');
          const querySnapshot = await getDocs(ref);
          let scoresTables: ScoresTables = [];
          querySnapshot?.forEach((doc) => {
            scoresTables.push({ id: doc.id, ...doc.data() } as ScoresTable);
          });
          return { data: scoresTables };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Score'],
    }),
    fetchHighScoresTableByLevelId: builder.query<ScoresTable, string>({
      async queryFn(levelId) {
        try {
          const querySnapshot = await getDocs(
            collection(firestore, 'scoresTables')
          );
          let scoresTables: ScoresTables = [];
          querySnapshot?.forEach((doc) => {
            scoresTables.push({ id: doc.id, ...doc.data() } as ScoresTable);
          });
          const scoreTable = scoresTables.find(
            (table) => table.levelId === levelId
          );
          return { data: scoreTable };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ['Score'],
    }),
    setNewHighScore: builder.mutation({
      async queryFn({ scoresTableId, newHighScore }) {
        try {
          await updateDoc(doc(firestore, 'scoresTables', scoresTableId), {
            scores: arrayUnion(newHighScore),
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ['Score'],
    }),
  }),
});

export const {
  useFetchHighScoresTablesQuery,
  useFetchHighScoresTableByLevelIdQuery,
  useSetNewHighScoreMutation,
} = scoresApi;
