import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeef',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    height: 28,
    position: 'relative',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  sliderDefault: {
    height: '86%',
    backgroundColor: 'white',
    borderRadius: 7,
    margin: 2,
    shadowOffset: { width: 0.95, height: 0.95 },
    shadowColor: '#a2a2a2',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default styles;
