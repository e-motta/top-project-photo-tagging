const levels = [
  {
    id: '4BBW4Eb1vJ80oyIrAROD',
    characters_positions: [
      {
        character_id: '15hg3If0JJaa3gXzfpow',
        position: [1084, 560],
      },
      {
        position: [480, 517],
        character_id: '8LhDob2HJEjB5Gvi7s2u',
      },
      {
        position: [188, 526],
        character_id: 'tWH93mZU0sfqsPYC4ART',
      },
      {
        character_id: 'xvke58nGthigfxFfvOTp',
        position: [1353, 575],
      },
    ],
    images: {
      url_big:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fbeach.jpg?alt=media&token=16055943-6bd2-4e0a-8fe8-accb176f6e2e',
      url_small:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fbeach-low.jpg?alt=media&token=8ca18ba7-fce3-4276-9dda-b917b0fe3d10',
    },
    name: 'Beach',
  },
  {
    id: 'HlepkVoPWLVtFac6ELiV',
    characters_positions: [
      {
        position: [493, 504],
        character_id: '15hg3If0JJaa3gXzfpow',
      },
      {
        character_id: '8LhDob2HJEjB5Gvi7s2u',
        position: [1071, 1083],
      },
      {
        position: [1050, 846],
        character_id: 'tWH93mZU0sfqsPYC4ART',
      },
      {
        character_id: 'xvke58nGthigfxFfvOTp',
        position: [440, 931],
      },
    ],
    images: {
      url_small:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fstadium-low.jpg?alt=media&token=ac9357d4-7fd6-4a08-adb5-07a1b6e98d80',
      url_big:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fstadium.jpg?alt=media&token=09ad7ca1-753c-47db-883b-8141c8d232b0',
    },
    name: 'Stadium',
  },
  {
    id: 'ThZl5MFX7zTlPYlCO9Q6',
    images: {
      url_big:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fspace.jpg?alt=media&token=3a42a8ec-4c49-41ad-ac14-2f59d61bff13',
      url_small:
        'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/levels%2Fspace-low.jpg?alt=media&token=32880dd2-2f8e-4c88-af56-69d835d8f291',
    },
    name: 'Space',
    characters_positions: [
      {
        position: [708, 846],
        character_id: '15hg3If0JJaa3gXzfpow',
      },
      {
        position: [1366, 792],
        character_id: '8LhDob2HJEjB5Gvi7s2u',
      },
      {
        character_id: 'tWH93mZU0sfqsPYC4ART',
        position: [124, 920],
      },
      {
        position: [516, 728],
        character_id: 'xvke58nGthigfxFfvOTp',
      },
    ],
  },
];

const characters = [
  {
    id: '15hg3If0JJaa3gXzfpow',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/characters%2Fwally-head.png?alt=media&token=5bc79317-d7e0-4f33-8c49-413d9798390b',
    },
    name: 'Wally',
  },
  {
    id: '8LhDob2HJEjB5Gvi7s2u',
    name: 'Whitebeard',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/characters%2Fwhitebeard-head.png?alt=media&token=9d4b9231-ff36-46bd-9096-d0323b6ce4a4',
    },
  },
  {
    id: 'tWH93mZU0sfqsPYC4ART',
    name: 'Odlaw',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/characters%2Fodlaw-head.png?alt=media&token=36e35fff-ab8a-4a99-accd-bc1f3045f1a8',
    },
  },
  {
    id: 'xvke58nGthigfxFfvOTp',
    image: {
      url: 'https://firebasestorage.googleapis.com/v0/b/top-project-photo-tagging.appspot.com/o/characters%2Fwelda-head.png?alt=media&token=48d7e9cc-516c-46d1-8737-a940318309a3',
    },
    name: 'Welda',
  },
];

const scoresTables = [
  {
    id: 'QL81sF3eFMSTUMkVrn0u',
    levelId: 'HlepkVoPWLVtFac6ELiV',
    scores: [],
  },
  {
    id: 'TUgnWg9VzCljbKqsjbKF',
    levelId: '4BBW4Eb1vJ80oyIrAROD',
    scores: [],
  },
  {
    id: 'kn4L7w9XrOaRFcnLxBfk',
    levelId: 'ThZl5MFX7zTlPYlCO9Q6',
    scores: [
      {
        name: 'Astronaut',
        id: '690a977cc8282',
        time: 20345,
      },
      {
        name: 'Marlowe',
        id: 'c3a10700760a7',
        time: 27661,
      },
      {
        name: 'Jack',
        time: 13420,
        id: 'cefad8689a4e6',
      },
    ],
  },
];

const firestoreData = { levels, characters, scoresTables };

export default firestoreData;
