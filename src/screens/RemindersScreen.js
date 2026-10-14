import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';
import { pushReminder } from '../services/api';

export default function RemindersScreen() {
  const [list, setList] = useState([{ id: '1', name: 'Paracetamol', dose: '500 mg', time: '20:00' }]);
  const [f, setF] = useState({ name: '', dose: '', time: '' });

  const add = async () => {
    if (!f.name || !f.time) return;
    const r = { ...f, id: String(Date.now()) };
    setList(l => [...l, r]);
    setF({ name: '', dose: '', time: '' });
    try { await pushReminder(r); } catch {} // ESP32 offline ho toh app me save rahega
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16, gap: 10 }}>
      {['name', 'dose', 'time'].map(k => (
        <TextInput key={k} style={s.input} value={f[k]} onChangeText={t => setF({ ...f, [k]: t })}
          placeholder={k === 'time' ? 'Time (HH:MM, 24h)' : k[0].toUpperCase() + k.slice(1)} placeholderTextColor={colors.muted} />
      ))}
      <Pressable style={s.btn} onPress={add}><Text style={{ color: colors.bg, fontWeight: '700' }}>Add Reminder</Text></Pressable>
      <FlatList data={list} keyExtractor={r => r.id} contentContainerStyle={{ gap: 8, marginTop: 8 }}
        renderItem={({ item: r }) => (
          <View style={s.card}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{r.name} {r.dose}</Text>
            <Text style={{ color: colors.primary }}>{r.time}</Text>
          </View>
        )} />
    </View>
  );
}

const s = StyleSheet.create({
  input: { color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10 },
  btn: { backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: 'center' },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14 },
});