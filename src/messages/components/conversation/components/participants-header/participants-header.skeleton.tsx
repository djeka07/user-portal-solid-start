import { Skeleton } from '~/app/components/lists';
import { infoSkeleton, participantsWrapper, root, statusWrapper } from './participants-header.css';

const ParticipantsHeaderSkeleton = () => (
  <div class={root}>
    <div>
      <div style={{ display: 'flex', 'align-items': 'center' }}>
        <Skeleton height="50px" width="50px" radius="round" />
        <div class={participantsWrapper}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Skeleton height="17px" width="50px" />
            <Skeleton height="17px" width="50px" />
          </div>
          <div class={statusWrapper}>
            <Skeleton height="10px" width="10px" />
            <Skeleton height="10px" width="50px" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <Skeleton class={infoSkeleton} height="30px" width="30px" radius="round" />
    </div>
  </div>
);

export default ParticipantsHeaderSkeleton;
