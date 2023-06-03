import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Provider as PaperProvider} from 'react-native-paper';
import schema from './src/database/schema';
import {Database} from '@nozbe/watermelondb';
import {CompaniesModel} from './src/database/models/CompaniesModel';

const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
  onSetUpError: error => {
    console.log('onSetUpError', error);
  },
});

const database = new Database({
  adapter,
  modelClasses: [CompaniesModel],
});

const App = () => (
  <DatabaseProvider database={database}>
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  </DatabaseProvider>
);
export default App;
