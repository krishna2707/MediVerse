import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

export default function QuickAction({ icon, title, sub, tint = colors.primary, onPress }) {
  return (
    <Pressable style={s.card} onPress={onPress}>
      <Ionicons name={icon} size={24} color={tint} />
      <Text style={s.title}>{title}</Text>
      <Text style={s.sub}>{sub}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { width: '48.5%', backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 4 },
  title: { color: colors.text, fontWeight: '700', marginTop: 8 },
  sub: { color: colors.muted, fontSize: 11 },
});