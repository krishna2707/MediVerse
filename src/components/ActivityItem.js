import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function ActivityItem({ title, sub, time }) {
  return (
    <View style={s.row}>
      <View style={{ flex: 1 }}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.sub}>{sub}</Text>
      </View>
      <Text style={s.time}>{time}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 12 },
  title: { color: colors.text, fontSize: 13, fontWeight: '600' },
  sub: { color: colors.muted, fontSize: 11 },
  time: { color: colors.primary, fontSize: 11 },
});