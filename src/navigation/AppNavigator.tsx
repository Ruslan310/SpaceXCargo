import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HeaderBackButton from '../component/HeaderBackButton/HeaderBackButton';
import {Company, CreateCompany, EditCompany} from '../screens/Company';
import Home from '../screens/Home';

export type MainStackNavigationParamList = {
  Home: undefined;
  Company: {id: string};
  CreateCompany: undefined;
  EditCompany: {id: string};
};

const Stack = createStackNavigator<MainStackNavigationParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            title: 'Cargo Planner',
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            title: 'Company',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <HeaderBackButton />,
          }}
          name="Company"
          component={Company}
        />
        <Stack.Screen
          options={{
            title: 'Create New Company',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <HeaderBackButton />,
          }}
          name="CreateCompany"
          component={CreateCompany}
        />
        <Stack.Screen
          options={{
            title: 'Edit Company',
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <HeaderBackButton />,
          }}
          name="EditCompany"
          component={EditCompany}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
