// Redux //

// Levels

export interface Images {
  id: string;
  url_big: string;
  url_small: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Character {
  id: string;
  name: string;
  image: Image;
  // found?: boolean;
}

export type Characters = Character[];

export type Position = [number, number];

export interface CharactersPosition {
  character_id: string;
  position: Position;
  // found?: boolean;
}

export type CharactersPositions = CharactersPosition[];

export interface FoundCharacter {
  id: string;
  found: boolean;
}

export type FoundCharacters = FoundCharacter[];

export interface Level {
  id: string;
  name: string;
  images: Images;
  characters_positions: CharactersPositions;
}

export type Levels = Level[];

// High scores table

export interface Score {
  id?: string;
  name: string;
  time: number;
}

export interface ScoresTable {
  id: string;
  levelId: string;
  scores?: Score[];
}

export type ScoresTables = ScoresTable[];

// Local - Level //

export interface LevelDetails {
  foundCharactersIds: string[];
  startTime: Date;
  endTime: Date | null;
}

// Timer

export interface Timer {
  start: number;
  stop: number | null;
}
