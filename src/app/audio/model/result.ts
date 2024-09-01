//import {TrackDTO} from "../../libs/feature-audio/data-access/state/audio.reducer";
import { TrackDTO } from './track';

export interface ResultDTO {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  tracks: TrackDTO[];
}
