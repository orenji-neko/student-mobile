import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Card from "@/components/Card";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";

const dummy = Array.from({ length: 1}, (_v, index) => ({
  id: index + 1000,
  lastname: "Doe",
  firstname: "John",
  course: "BSIT",
  level: 3
}))

const Attendance = () => {
  const [ students, setStudents ] = useState([...dummy])

  return (
    <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}> Attendance </Text>
          <TouchableOpacity style={{
            backgroundColor: "#2A3335",
            borderRadius: "100%",
            padding: 10
          }}>
            <Ionicons name="pencil" size={30} color="white"/>
          </TouchableOpacity>
        </View>
      <ScrollView 
        style={{ width: "100%", paddingHorizontal: 20 }} 
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={true}
      >
        {
          students && students.map((student, index) => (
            // student info
            <TouchableOpacity key={index}>
              <Card layout="horizontal" style={{ borderRadius: 30, width: "100%" }}>
                <Ionicons name="person" size={20}/>
                <Text> {student.id} </Text>
                <Text> {student.lastname}, {student.firstname} </Text>
              </Card>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

export default Attendance;