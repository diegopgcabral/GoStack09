import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import HelpOrderList from '~/pages/HelpOrderList';
import HelpOrderDetail from '~/pages/HelpOrderDetail';
import HelpOrderQuestion from '~/pages/HelpOrderQuestion';
import Logout from '~/pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin,
            New: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderDetail,
                  HelpOrderQuestion,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#FFF',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
            Logout,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              keyboardHidesTabBar: true,
              style: {
                backgroundColor: '#FFF',
              },
            },
          }
        ),
      },
      { initialRouteName: isSigned ? 'App' : 'Sign' }
    )
  );
