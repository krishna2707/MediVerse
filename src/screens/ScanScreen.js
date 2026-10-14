import { useState } from 'react';
import { View, Text, Image, TextInput, Pressable, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../theme';
import { captureImage, runOcr } from '../services/api';
import { isMatch } from '../utils/match';
import Disclaimer from '../components/Disclaimer';

const SCHEDULED = { name: 'Paracetamol', dose: '500 mg' }; // TODO: next reminder from store

export default function ScanScreen({ navigation }) {
  const [uri, setUri] = useState(null);
  const [form, setForm] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const scan = async () => {
    try {
      setBusy(true); setErr(null); setConfirmed(false);
      const img = await captureImage();
      setUri(img);
      const r = await runOcr(img);
      setForm({ name: r.name ?? '', dose: r.dose ?? '' });
    } catch {
      setErr('Capture/OCR fail hua. ESP32-CAM aur backend ka IP check kar.');
    } finally { setBusy(false); }
  };

  const matched = confirmed && form && isMatch(SCHEDULED, form);

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.pad}>
        <Text style={s.h}>Scan Medicine</Text>
        {uri && <Image source={{ uri }} style={s.img} />}
        <Pressable style={s.btn} onPress={scan} disabled={busy}>
          {busy ? <ActivityIndicator color={colors.bg} /> : <Text style={s.btnT}>{uri ? 'Rescan' : 'Capture with ESP32-CAM'}</Text>}
        </Pressable>
        {err && <Text style={{ color: colors.danger }}>{err}</Text>}

        {form && (
          <View style={s.card}>
            <Text style={s.label}>Detected (OCR can be wrong, verify with the packaging)</Text>
            <TextInput style={s.input} value={form.name} onChangeText={t => setForm({ ...form, name: t })} placeholder="Medicine name" placeholderTextColor={colors.muted} />
            <TextInput style={s.input} value={form.dose} onChangeText={t => setForm({ ...form, dose: t })} placeholder="Dose" placeholderTextColor={colors.muted} />
            <Pressable style={s.btn} onPress={() => setConfirmed(true)}><Text style={s.btnT}>Confirm</Text></Pressable>
          </View>
        )}

        {confirmed && (
          <View style={[s.card, { borderColor: matched ? colors.success : colors.danger }]}>
            <Text style={{ color: matched ? colors.success : colors.danger, fontWeight: '700' }}>
              {matched ? 'MEDICINE MATCH ✓' : 'WARNING: does not match the reminder. Please verify the medicine.'}
            </Text>
            <Text style={s.label}>Scheduled: {SCHEDULED.name} {SCHEDULED.dose}</Text>
            <Pressable onPress={() => navigation.navigate('Med AI', { medicine: `${form.name} ${form.dose}` })}>
              <Text style={{ color: colors.primary, marginTop: 8 }}>Ask AI about this medicine →</Text>
            </Pressable>
          </View>
        )}
        <Disclaimer>Package/text matching only, not a check that the medicine is medically suitable for you.</Disclaimer>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg }, pad: { padding: 16, gap: 12 },
  h: { color: colors.text, fontSize: 22, fontWeight: '800' },
  img: { width: '100%', height: 200, borderRadius: radius.card },
  btn: { backgroundColor: colors.primary, padding: 12, borderRadius: 10, alignItems: 'center' },
  btnT: { color: colors.bg, fontWeight: '700' },
  card: { backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
  label: { color: colors.muted, fontSize: 11 },
  input: { color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 10 },
});