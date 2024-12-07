import { TextInput, ViewStyle, View, Text, KeyboardType } from "react-native"

type TextInputType = {
  value: string,
  keyboardType?: KeyboardType,
  onChangeText?: (txt: string) => void,
  style?: ViewStyle | ViewStyle[],
  placeholder?: string,
  error?: boolean,
  errorMessage?: string
}

export default ({ 
  keyboardType = "default",
  placeholder, 
  value, 
  onChangeText, 
  style, 
  error = false,
  errorMessage = "Error"
}: TextInputType) => {

  return (
    <View>
      <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          editable
          onChangeText={txt => onChangeText && onChangeText(txt)}
          value={value}
          style={{
            padding: 10,
            borderColor: "grey",
            backgroundColor: "white",
            borderBottomWidth: 2
          }}
        />
      { error && (
        <Text style={{ color: "red" }} >{ errorMessage }</Text>
      )}
    </View>
  )
}