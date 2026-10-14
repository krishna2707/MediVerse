import { Text } from 'react-native';
import { colors } from '../theme';

export default function Disclaimer({ children }) {
  return <Text style={{ color: colors.muted, fontSize: 10, textAlign: 'center', marginVertical: 8 }}>
    {children ?? 'Prototype monitoring system, not a certified medical device. Not medical advice.'}
  </Text>;
}