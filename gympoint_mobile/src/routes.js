import React from 'react';
import { useDispatch } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SignIn from '~/pages/SignIn';

import Checkin from '~/pages/Checkin';

import HelpOrderList from '~/pages/HelpOrder/List';
import Answer from '~/pages/HelpOrder/Answer';
import Question from '~/pages/HelpOrder/Question';

import { signOut } from '~/store/modules/auth/actions';

function Logout({ navigation }) {
  const dispatch = useDispatch();
  dispatch(signOut());
  return SignIn;
}

Logout.navigationOptions = {
  tabBarLabel: 'Sair',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="undo" size={20} color={tintColor} />
  ),
};

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator({ Checkin }),
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
            Help: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  Question,
                  Answer,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#f64f65',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
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
              keyboardHidesTabBar: true /* O teclado passa por acima da tab bar */,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      { initialRouteName: signedIn ? 'App' : 'Sign' }
    )
  );
