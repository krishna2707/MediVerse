import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';
import { saveThresholds } from '../services/api';
import useVitals from '../hooks/useVitals';
import Disclaimer from '../components/Disclaimer';

export default function SensorsScreen() {
  const v = useVitals();
  const [t, setT] = useState({ hrMax: '120', spo2Min: '92', tempMax: '38' });
  const [msg, setMsg] = useState('');

  const save = async () => {
    try { await saveThresholds(Object.fromEntries(Object.entries(t).map(([k, x]) => [k, Number(x)]))); setMsg('Saved to device'); }
    catch { setMsg('Device unreachable'); }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16, gap: 12 }}>
      <Text style={s.h}>Sensors & Alerts</Text>
      <View style={s.card}>
        <Text style={s.t}>ESP32 DevKit · Battery {v.battery}% · Wi-Fi {v.wifi}%</Text>
        <Text style={s.m}>MAX30102 · Temp sensor · OLED · Buzzer</Text>
      </View>
      <Text style={s.m}>Configurable alert thresholds (monitoring alerts, not diagnostic criteria)</Text>
      {[['hrMax', 'Max heart rate (BPM)'], ['spo2Min', 'Min SpO₂ (%)'], ['tempMax', 'Max temp (°C)']].map(([k, label]) => (
        <View key={k}>
          <Text style={s.m}>{label}</Text>
          <TextInput style={s.input} value={t[k]} keyboardType="numeric" onChangeText={x => setT({ ...t, [k]: x })} />
        </View>
      ))}
      <Pressable style={s.btn} onPress={save}><Text style={{ color: colors.bg, fontWeight: '700' }}>Save to device</Text></Pressable>
      {!!msg && <Text style={s.m}>{msg}</Text>}
      <Disclaimer />
    </View>
  );
}

const s = StyleSheet.create({
  h: { color: colors.text, fontSize: 22, fontWeight: '800' },
  t: { color: colors.text, fontWeight: '600' }, m: { color: colors.muted, fontSize: 11 },
  card: { backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 4 },
  input: { color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10, marginTop: 4 },
  btn: { backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: 'center' },
});