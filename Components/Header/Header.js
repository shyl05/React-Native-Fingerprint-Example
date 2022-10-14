/* eslint-disable prettier/prettier */
import React from 'react';
import {useTheme, Appbar, Switch, Text} from 'react-native-paper';
import {PreferencesContext} from '../../Utlis/PreferencesContext';

const Header = ({scene}) => {
  const theme = useTheme();
  const {toggleTheme, isThemeDark} = React.useContext(PreferencesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
      style={{backgroundColor: '#d6d61c'}}
      >
      <Appbar.Content title="VR46" />
      <>
        <Text>Mode</Text>
        <Switch
          value={isThemeDark}
          onValueChange={toggleTheme}
          color={theme.colors.background}
        />
      </>
    </Appbar.Header>
  );
};

export default Header;
