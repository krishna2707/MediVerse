import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors, radius } from '../theme';

const W = 300, H = 60;

export default function SensorStream({ data }) {
  const pts = data.map((y, i) => `${(i / (data.length - 1)) * W},${H / 2 - y}`).join(' ');
  return (
    <View style={s.card}>
      <View style={s.head}>
        <Text style={s.title}>● Sensor Stream</Text>
        <Text style={s.chip}>MAX30102 400Hz</Text>
      </View>
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        <Polyline points={pts} fill="none" stroke={colors.primary} strokeWidth="2" />
      </Svg>
      <View style={s.head}>
        <Text style={s.foot}>Continuous Raw PPG</Text>
        <Text style={s.foot}>SNR: 28.4 dB</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 12 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: colors.text, fontWeight: '600' },
  chip: { color: colors.muted, fontSize: 10 },
  foot: { color: colors.muted, fontSize: 10, marginTop: 4 },
});