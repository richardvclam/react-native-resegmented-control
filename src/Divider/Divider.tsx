import React from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';

import styles from './DividerStyles';

export interface DividerProps {
  hide?: boolean;
}

export function Divider({ hide = false }: DividerProps): JSX.Element {
  const opacity = React.useRef(new Animated.Value<number>(hide ? 0 : 1));

  Animated.useCode(() => {
    return Animated.set(
      opacity.current,
      timing({
        from: hide ? 0 : 1,
        to: hide ? 1 : 0,
        easing: Easing.linear,
        duration: 200,
      }),
    );
  }, [hide]);

  return (
    <Animated.View
      style={[styles.dividerContainer, { opacity: opacity.current }]}
    >
      <View style={styles.divider} />
    </Animated.View>
  );
}
