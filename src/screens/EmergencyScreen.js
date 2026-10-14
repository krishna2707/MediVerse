import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { sendEmergency } from '../services/api';

export default function EmergencyScreen() {
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  const trigger = () =>
    Alert.alert('Send emergency alert?', 'Your caregiver/contact will be notified.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', style: 'destructive', onPress: async () => {
          setStatus('sending');
          try { await sendEmergency(contact); setStatus('sent'); } catch { setStatus('failed'); }
      } },
    ]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16, alignItems: 'center' }}>
      <TextInput style={s.input} value={contact} onChangeText={setContact} keyboardType="phone-pad"
        placeholder="Caregiver / emergency contact" placeholderTextColor={colors.muted} />
      <Pressable style={s.sos} onPress={trigger}><Text style={s.sosT}>SOS</Text></Pressable>
      <Text style={{ color: status === 'failed' ? colors.danger : colors.text }}>
        {{ idle: 'Press to alert your contact', sending: 'Alert sending…', sent: 'ALERT SENT. Please wait for assistance.', failed: 'Failed to send. Call emergency services directly.' }[status]}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  input: { alignSelf: 'stretch', color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10 },
  sos: { width: 180, height: 180, borderRadius: 90, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  sosT: { color: '#fff', fontSize: 40, fontWeight: '900' },
});