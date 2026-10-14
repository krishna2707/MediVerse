import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ScanScreen from '../screens/ScanScreen';
import AssistantScreen from '../screens/AssistantScreen';
import SensorsScreen from '../screens/SensorsScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Vitals Hub', icon: 'pulse', comp: HomeScreen },
  { name: 'Telemetry', icon: 'heart-outline', comp: HistoryScreen },
  { name: 'Scan Pill', icon: 'scan', comp: ScanScreen, center: true },
  { name: 'Med AI', icon: 'sparkles-outline', comp: AssistantScreen },
  { name: 'Sensors', icon: 'hardware-chip-outline', comp: SensorsScreen },
];

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 64 },
        tabBarLabelStyle: { fontSize: 10 },
      }}
    >
      {tabs.map(t => (
        <Tab.Screen
          key={t.name}
          name={t.name}
          component={t.comp}
          options={{
            tabBarIcon: ({ color, size }) =>
              t.center ? (
                <View
                  style={{
                    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary,
                    alignItems: 'center', justifyContent: 'center', marginTop: -22,
                  }}
                >
                  <Ionicons name={t.icon} size={26} color={colors.bg} />
                </View>
              ) : (
                <Ionicons name={t.icon} size={size} color={color} />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}