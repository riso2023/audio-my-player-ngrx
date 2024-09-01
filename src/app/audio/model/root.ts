//import {HeadersDTO, ResultDTO} from "../../libs/feature-audio/data-access/state/audio.reducer";

import { HeadersDTO } from './headers';
import { ResultDTO } from './result';

export interface RootObjectDTO {
  headers: HeadersDTO;
  results: ResultDTO[];
}
