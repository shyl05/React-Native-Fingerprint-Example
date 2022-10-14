import React from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';

import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

import Header from './Components/Header/Header';
import {PreferencesContext} from './Utlis/PreferencesContext';

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Profile from './Pages/Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <Header />
          <NavigationContainer theme={theme}>
            <Tab.Navigator
              initialRouteName="Home"
              activeColor="#f0edf6"
              inactiveColor="#3e2465"
              barStyle={{backgroundColor: '#d6d61c'}}>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({color}) => (
                    <Icons name="home" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="About"
                component={About}
                options={{
                  tabBarLabel: 'About',
                  tabBarIcon: ({color}) => (
                    <Icons name="information-circle" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({color}) => (
                    <Icons name="person-circle" color={color} size={26} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </>
  );
}
