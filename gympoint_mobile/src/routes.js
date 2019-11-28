import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';

import Checkin from '~/pages/Checkin';
import HelpOrderList from '~/pages/HelpOrder/List';

// import Answer from '~/pages/HelpOrder/Answer';
// import Question from '~/pages/HelpOrder/Question';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator({
          Checkin,
          HelpOrderList,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
