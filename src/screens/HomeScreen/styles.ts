import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  HomeScreenContainer: {
    padding: 10,
    gap: 10,
    marginBottom: 70,
  },
  CardValuesText: {
    fontWeight: '900',
  },
  GreenText: {
    color: '#03a503',
  },
  RedText: {
    color: '#f70000',
  },
  ListText: {
    padding: 20,
  },
  NewSectionFab: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  NewItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  NewItemText: {
    fontSize: 15,
    color: '#0300bc',
  },
});
