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
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '86%',
    backgroundColor: 'white',
    borderRadius: 7,
    margin: 2,
    shadowOffset: { width: 0.95, height: 0.95 },
    shadowColor: '#a2a2a2',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    zIndex: 1,
  },
  dividerContainer: {
    paddingTop: 7,
    paddingBottom: 7,
    zIndex: 0,
  },
  divider: {
    height: '100%',
    width: 1,
    borderWidth: 0,
    backgroundColor: 'rgba(120, 120, 120, 0.2)',
  },
});

export default styles;
