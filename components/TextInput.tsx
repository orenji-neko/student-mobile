import { TextInput, ViewStyle, View, Text, KeyboardType } from "react-native"

type TextInputType = {
  value: string,
  keyboardType?: KeyboardType,
  onChangeText?: (txt: string) => void,
  style?: ViewStyle | ViewStyle[],
  placeholder?: string,
  error?: boolean,
  errorMessage?: string,
  readonly?: boolean,
}

export default ({ 
  keyboardType = "default",
  placeholder, 
  value, 
  onChangeText, 
  style, 
  error = false,
  errorMessage = "Error",
  readonly = false,
}: TextInputType) => {

  return (
    <View>
      <TextInput
          keyboardType={keyboardType}
          placeholder={placeholder}
          readOnly={readonly}
          editable={readonly}
          onChangeText={txt => onChangeText && onChangeText(txt)}
          value={value}
          style={
            [{
              padding: 10,
              borderColor: "grey",
              backgroundColor: "white",
              borderBottomWidth: 2
            },
            readonly ? {
              color: "gray"
            } : {
              color: "black"
            }]
          }
        />
      { error && (
        <Text style={{ color:  "red" }} >{ errorMessage }</Text>
      )}
    </View>
  )
}