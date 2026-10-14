import { useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius } from '../theme';
import { askAssistant } from '../services/api';
import Disclaimer from '../components/Disclaimer';

export default function AssistantScreen({ route }) {
  const medicine = route.params?.medicine;
  const [msgs, setMsgs] = useState([{ id: '0', role: 'ai', text: 'I can share general medicine information from the knowledge base. I can\'t diagnose, prescribe, or change doses.' }]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);

  const send = async () => {
    if (!q.trim() || busy) return;
    const question = q.trim(); setQ(''); setBusy(true);
    setMsgs(m => [...m, { id: String(Date.now()), role: 'user', text: question }]);
    try {
      const r = await askAssistant(question, medicine);
      setMsgs(m => [...m, { id: String(Date.now() + 1), role: 'ai', text: r.answer, sources: r.sources }]);
    } catch {
      setMsgs(m => [...m, { id: String(Date.now() + 1), role: 'ai', text: 'Backend se connect nahi ho paya.' }]);
    } finally { setBusy(false); }
  };

  return (
    <SafeAreaView style={s.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {medicine && <Text style={s.ctx}>Context: {medicine}</Text>}
        <FlatList
          data={msgs} keyExtractor={m => m.id} contentContainerStyle={{ padding: 16, gap: 8 }}
          renderItem={({ item }) => (
            <View style={[s.bubble, item.role === 'user' ? s.user : s.ai]}>
              <Text style={{ color: colors.text }}>{item.text}</Text>
              {item.sources?.length > 0 && <Text style={s.src}>Sources: {item.sources.join(', ')}</Text>}
            </View>
          )}
        />
        <Disclaimer>AI is informational only. Consult a doctor or pharmacist.</Disclaimer>
        <View style={s.bar}>
          <TextInput style={s.input} value={q} onChangeText={setQ} placeholder="Ask about this medicine…" placeholderTextColor={colors.muted} />
          <Pressable style={s.send} onPress={send}><Text style={{ color: colors.bg, fontWeight: '700' }}>{busy ? '…' : 'Send'}</Text></Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  ctx: { color: colors.primary, fontSize: 11, paddingHorizontal: 16, paddingTop: 8 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: radius.card },
  user: { alignSelf: 'flex-end', backgroundColor: '#164E63' },
  ai: { alignSelf: 'flex-start', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  src: { color: colors.muted, fontSize: 10, marginTop: 6 },
  bar: { flexDirection: 'row', gap: 8, padding: 12 },
  input: { flex: 1, color: colors.text, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10 },
  send: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
});