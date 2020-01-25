import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';
import React from 'react';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

export default createAppContainer(
   createStackNavigator({
      Feed,
      New
   },{
      //initialRouteName: 'New',
      defaultNavigationOptions: {
         headerTintColor: '#000',
         headerTitle: () => <Image source={logo} />,
         headerTitleAlign: 'center',
         headerBackTitle: null
      },
      mode: 'modal'
   })
)