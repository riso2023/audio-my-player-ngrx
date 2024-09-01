import {TrackDTO} from "./track";

export type TrackEntity = Pick<TrackDTO, 'id' | 'name' | 'audio'>;

