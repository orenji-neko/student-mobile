import StudentProvider from "@/api/Student";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="(admin)" options={{ headerShown: false }}/>
      </Stack>
    </StudentProvider>
  )
}

export default RootLayout;
