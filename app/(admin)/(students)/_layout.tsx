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
    </Stack>
  )
}

export default Layout;