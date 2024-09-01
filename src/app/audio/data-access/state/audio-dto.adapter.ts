import { TrackDTO } from '../../model/track';
import { TrackEntity } from '../../model/track-entity';

type TrackDTOAdapter = {
  DTOtoEntity(dto: TrackDTO): TrackEntity;
};

export const trackDTOAdapter: TrackDTOAdapter = {
  DTOtoEntity(dto) {
    const { id, name, audio } = dto;

    return { id, name, audio };
  },
};
