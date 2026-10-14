import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function VitalCard({ label, value, unit, badge, note, tint = colors.primary }) {
  return (
    <View style={s.card}>
      <View style={s.row}>
        <Text style={s.label}>{label}</Text>
        <Text style={[s.badge, { color: tint, borderColor: tint }]}>{badge}</Text>
      </View>
      <Text style={s.value}>
        {value}
        <Text style={s.unit}> {unit}</Text>
      </Text>
      <Text style={[s.note, { color: tint }]}>{note}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: { flex: 1, backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: colors.muted, fontSize: 10, letterSpacing: 1 },
  badge: { fontSize: 9, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 6, paddingVertical: 1 },
  value: { color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 8 },
  unit: { fontSize: 12, color: colors.muted, fontWeight: '400' },
  note: { fontSize: 10, marginTop: 4 },
});