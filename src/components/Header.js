import { Platform, StatusBar } from 'react-native';

const paddingVertical = 10;
const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export const Header = ({
  title = ''
}) => ({
  title
});
