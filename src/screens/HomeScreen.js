import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import useVitals from '../hooks/useVitals';
import VitalCard from '../components/VitalCard';
import SensorStream from '../components/SensorStream';
import MedicationCard from '../components/MedicationCard';
import QuickAction from '../components/QuickAction';
import ActivityItem from '../components/ActivityItem';
import Disclaimer from '../components/Disclaimer';

export default function HomeScreen() {
  const v = useVitals();
  const nav = useNavigation();

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.hello}>Good morning, Krishna</Text>
        <Text style={s.sub}>Here's your live diagnostic overview</Text>
        <Text style={s.sync}>ESP32 DEVKIT ACTIVE · Sync: Just now · {v.wifi}%</Text>

        <View style={s.row}>
          <VitalCard label="HEART RATE" value={v.hr} unit="BPM" badge="Normal" note="↘ 2 bpm resting" />
          <VitalCard label="SPO₂ OXYGEN" value={`${v.spo2}`} unit="%" badge="Optimal" note="Stable pulse" tint={colors.success} />
          <VitalCard label="BODY TEMP" value={v.temp} unit="°C" badge="Normal" note="↗ 0.1°" />
        </View>

        <SensorStream data={v.wave} />

        <MedicationCard
          name="Paracetamol"
          dose="500 mg"
          time="08:00 PM (in 2 hours)"
          onTaken={() => {}}
        />

        <Text style={s.section}>Quick Actions</Text>
        <View style={[s.row, s.wrap]}>
          <QuickAction icon="scan" title="Scan Pill" sub="AI Pill & Prescription" onPress={() => nav.navigate('Scan Pill')} />
          <QuickAction icon="alarm-outline" title="Add Reminder" sub="Schedule dosages" tint={colors.success} onPress={() => nav.navigate('Reminders')} />
          <QuickAction icon="stats-chart" title="Health History" sub="Diagnostics & trends" onPress={() => nav.navigate('Telemetry')} />
          <QuickAction icon="alert-circle" title="Emergency SOS" sub="Instant paramedic alert" tint={colors.danger} onPress={() => nav.navigate('Emergency')} />
        </View>

        <Text style={s.section}>System Activity</Text>
        <ActivityItem title="Morning dose logged" sub="Metformin 500mg verified" time="08:00 AM" />
        <ActivityItem title={`ESP32 Battery at ${v.battery}%`} sub="Li-Po cell nominal" time="10m ago" />

        <Disclaimer />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 16, gap: 14 },
  hello: { color: colors.text, fontSize: 24, fontWeight: '800' },
  sub: { color: colors.muted, fontSize: 12 },
  sync: { color: colors.primary, fontSize: 10, marginBottom: 4 },
  row: { flexDirection: 'row', gap: 8 },
  wrap: { flexWrap: 'wrap' },
  section: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 6 },
});