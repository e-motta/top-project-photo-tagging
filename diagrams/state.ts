// Redux //

// Levels

export interface Image {
  id: string;
  url_large: string;
  url_small: string;
}

export interface Character {
  id: string;
  name: string;
  position: [number, number];
}

export interface Level {
  id: string;
  name: string;
  images: Image[];
  characters: Character[];
}

export interface Levels {
  levels: Level[];
}

// High scores table

export interface Score {
  id: string;
  name: string;
  start_time: Date;
  end_time: Date;
}

export interface ScoresTable {
  scores: Score[];
}

// Local - Level //

export interface LevelDetails {
  foundCharactersIds: string[];
  startTime: Date;
  endTime: Date | null;
}
