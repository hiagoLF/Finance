import React from 'react';
import {HomeScreen} from './src/screens/HomeScreen/HomeScreen';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
}

export default App;
