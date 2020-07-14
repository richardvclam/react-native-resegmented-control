import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
  },
  disabled: {
    opacity: 0.5,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
    paddingLeft: 2,
    paddingRight: 2,
    width: '100%',
    textAlign: 'center',
  },
  segmentActiveText: {
    fontWeight: 'bold',
  },
});

export default styles;
