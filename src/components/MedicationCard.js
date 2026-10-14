import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function MedicationCard({ name, dose, time, onTaken }) {
  return (
    <View style={s.card}>
      <Text style={s.name}>
        {name} <Text style={s.dose}>{dose}</Text>
      </Text>
      <Text style={s.time}>{time}</Text>
      <View style={s.row}>
        <Text style={s.pod}>Dispenser Pod #01 ready</Text>
        <Pressable style={s.btn} onPress={onTaken}>
          <Text style={s.btnTxt}>Mark as Taken</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14 },
  name: { color: colors.text, fontSize: 16, fontWeight: '600' },
  dose: { color: colors.muted, fontSize: 11 },
  time: { color: colors.muted, fontSize: 12, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  pod: { color: colors.text, fontSize: 12 },
  btn: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  btnTxt: { color: colors.bg, fontWeight: '700', fontSize: 12 },
});