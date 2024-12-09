import { Stack } from "expo-router";

const Layout = () => {

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
        name="index"
        />
      <Stack.Screen
        name="manage"
      />
      <Stack.Screen
        name="detail"
      />
    </Stack>
  )
}

export default Layout;