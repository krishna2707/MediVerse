import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';
import Disclaimer from '../components/Disclaimer';

const DATA = [ // TODO: GET /readings from backend
  { date: '09/11', temp: 36.7, spo2: 98, hr: 76 },
  { date: '09/10', temp: 36.6, spo2: 97, hr: 79 },
  { date: '09/09', temp: 36.8, spo2: 98, hr: 74 },
];

const Row = ({ c1, c2, c3, c4, head }) => (
  <View style={[s.row, head && { borderBottomWidth: 1, borderColor: colors.border }]}>
    {[c1, c2, c3, c4].map((c, i) => <Text key={i} style={[s.cell, head && { color: colors.muted }]}>{c}</Text>)}
  </View>
);

export default function HistoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <Text style={s.h}>Health History</Text>
      <Row head c1="Date" c2="Temp °C" c3="SpO₂ %" c4="HR" />
      <FlatList data={DATA} keyExtractor={d => d.date}
        renderItem={({ item: d }) => <Row c1={d.date} c2={d.temp} c3={d.spo2} c4={d.hr} />} />
      <Disclaimer />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  h: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { flexDirection: 'row', paddingVertical: 10 },
  cell: { flex: 1, color: colors.text },
});