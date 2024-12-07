import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import QRButton from "@/components/QRButton";

const Layout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2A3335',
          height: 60,
          paddingBottom: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        },
        tabBarActiveTintColor: "#FFF"
      }}
    >
      <Tabs.Screen 
        name="(students)" 
        options={{
          title: "Students",
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color}/>,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(scan)"
        options={{
          title: "Scan",
          headerShown: false,
          tabBarButton: () => <QRButton onPress={() => router.push("/(admin)/(scan)") }/>,
        }}
      />
      <Tabs.Screen 
        name="(attendance)" 
        options={{
          title: "Attendance",
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="checkbox" color={color}/>
        }}
      />
    </Tabs>
  )
}

export default Layout;