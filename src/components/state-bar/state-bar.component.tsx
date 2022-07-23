import { useAppSelector } from '../../hooks/index.hook';
import { selectPomodoroTimerType } from '../../store/modules/timer/timer.select';

import { StateBarContainer, Text } from './state-bar.style';

export interface StateBarProp {
  children: string;
}

export default function StateBar({ children }: StateBarProp): JSX.Element {
  const pomoTimerType = useAppSelector(selectPomodoroTimerType);

  return (
    <StateBarContainer pomoState={pomoTimerType}>
      <Text>{children}</Text>
    </StateBarContainer>
  );
}
