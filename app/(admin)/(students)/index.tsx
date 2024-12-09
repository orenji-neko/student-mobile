import { Text, View, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useStudentContext } from "@/api/Student";
import { StudentType } from "@/types";

const Students = () => {
  const [ students, setStudents ] = useState<StudentType[]>()
  const router = useRouter();

  // apis
  const studentApi = useStudentContext();

  const addHandler = () => {
    router.push("/(admin)/(students)/manage");
  }

  useEffect(() => {

    const fetchIntervalId = setInterval(async () => {
      setStudents(await studentApi.get());
    }, 1000);

  }, []);

  const viewStudentDetail = (student: StudentType) => {
    router.push({
      pathname: "/(admin)/(students)/detail",
      params: { 
        ops:        "edit",
        idno:       student.idno,
        lastname:   student.lastname,
        firstname:  student.firstname,
        course:     student.course,
        level:      student.level
      }
    });
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
            <TouchableOpacity key={index} onPress={() => viewStudentDetail(student) }>
              <Card layout="horizontal" style={{ borderRadius: 30, width: "100%" }}>
                <Ionicons name="person" size={20}/>
                <Text> {student.idno} </Text>
                <Text> {student.lastname}, {student.firstname} </Text>
              </Card>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  );
}

export default Students;