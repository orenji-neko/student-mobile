import { Text, View, ScrollView, Pressable } from "react-native";
import Card from "@/components/Card";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const dummy = Array.from({ length: 1}, (_v, index) => ({
  id: index + 1000,
  lastname: "Doe",
  firstname: "John",
  course: "BSIT",
  level: 3
}))

const Students = () => {
  const [ students, setStudents ] = useState([...dummy])
  const router = useRouter();

  const addHandler = () => {
    router.push("/(admin)/(students)/manage");
  }

  return (
    <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}> Student List </Text>
          <Pressable 
            style={{
              padding: 10
            }}
            onPress={addHandler}
          >
            <Ionicons name="pencil" size={30} color="#2A3335"/>
          </Pressable>
        </View>
      <ScrollView 
        style={{ width: "100%", paddingHorizontal: 20 }} 
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={true}
      >
        {
          students && students.map((student, index) => (
            // student info
            <Pressable key={index}>
              <Card layout="horizontal" style={{ borderRadius: 30, width: "100%" }}>
                <Ionicons name="person" size={20}/>
                <Text> {student.id} </Text>
                <Text> {student.lastname}, {student.firstname} </Text>
              </Card>
            </Pressable>
          ))
        }
      </ScrollView>
    </View>
  );
}

export default Students;