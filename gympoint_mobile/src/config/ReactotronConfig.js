import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  console.tron = Reactotron.configure()
    .useReactiveNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
