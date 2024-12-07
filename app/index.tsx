import Button from "@/components/Button";
import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TextInput from "@/components/TextInput";
import { useRouter } from "expo-router";

const Login = () => {
  const [server, setServer] = useState<string>("");
  const [serverError, setServerError] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // for development only
  const router = useRouter();

  const loginHandler = () => {
    // for development only
    router.push("/(admin)/(students)");
    return;

    if(!server) setServerError(true)
    else setServerError(false)

    if(!username) setUsernameError(true)
    else setUsernameError(false)

    if(!password) setPasswordError(true)
    else setPasswordError(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Final Project </Text>
      <Text> Server </Text>
      <TextInput 
        placeholder="http://127.0.0.1:5000"
        value={server} 
        onChangeText={(txt) => setServer(txt) }
        error={serverError}
        errorMessage="Invalid Server!"
        />
      <Text> Username </Text>
      <TextInput 
        placeholder="admin"
        value={username} 
        onChangeText={(txt) => setUsername(txt) }
        error={usernameError}
        errorMessage="Invalid Username!"
        />
      <Text> Password </Text>
      <TextInput
        placeholder="user"
        value={password} 
        error={passwordError}
        errorMessage="Invalid Password!"
        onChangeText={(txt) => setPassword(txt) }
        />
      <Button 
        onPress={loginHandler} 
        style={{ justifyContent: "center" }}
        >
        <Text style={{ color: "#FFF", textAlign: "center" }}> Login </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 100,
    gap: 27
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
})

export default Login;