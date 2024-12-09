import { View, Text, Pressable, ScrollView } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import TextInput from "@/components/TextInput";
import { useEffect, useState } from "react";
import { StudentType } from "@/types";
import Button from "@/components/Button";
import { useStudentContext } from "@/api/Student";

const Manage = () => {
  const { operation, idno, lastname, firstname, course, level } = useGlobalSearchParams<{
    operation: string,
    idno: string,
    lastname: string,
    firstname: string,
    course: string,
    level: string
  }>();

  // apis
  const studentApi = useStudentContext();

  const [title, setTitle] = useState<string>("Manage Student");
  
  const [student, setStudent] = useState<{
    idno: string,
    lastname: string,
    firstname: string,
    course: string,
    level: string
  }>({
    idno: idno ? idno : "",
    lastname: lastname ? lastname : "",
    firstname: firstname ? firstname: "",
    course: course ? course : "",
    level: level ? level : ""
  });

  const [errors, setErrors] = useState<{
    idno: boolean,
    lastname: boolean,
    firstname: boolean,
    course: boolean,
    level: boolean
  }>({
    idno: false,
    lastname: false,
    firstname: false,
    course: false,
    level: false
  });

  const router = useRouter();

  const backHandler = () => {
    router.back();
  }

  const submitHandler = () => {
    const { idno, lastname, firstname, course, level } = student;

    // error traps
    if(!idno) {
      setErrors(prev => ({...prev, idno: true}));
      return;
    }
    if(!lastname) {
      setErrors(prev => ({...prev, lastname: true}));
      return;
    }
    if(!firstname) {
      setErrors(prev => ({...prev, firstname: true}));
      return;
    }
    if(!course) {
      setErrors(prev => ({...prev, course: true}));
      return;
    }
    if(!level) {
      setErrors(prev => ({...prev, level: true}));
      return;
    }

    if(operation === "edit") {
      studentApi.put({
        idno: parseInt(idno),
        lastname: lastname,
        firstname: firstname,
        course: course,
        level: parseInt(level)
      })
    }
    else {
      // add student
      studentApi.post({
        idno: parseInt(idno),
        lastname: lastname,
        firstname: firstname,
        course: course,
        level: parseInt(level)
      })
    }

    router.push("/(admin)/(students)");
  }

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >

      {/* Header */}
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center"
        }}
      >
        <Pressable
          onPress={backHandler}
        >
          <FontAwesome name="arrow-left" size={28} color="#2A3335" />
        </Pressable>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold"
          }}
        >
          {title}
        </Text>
      </View>
        
      {/* Main */}
      <View
        style={{
          padding: 10,
          gap: 10
        }}
      >
        <Text> ID No. </Text>
        <TextInput
          value={student.idno}
          onChangeText={(txt) => setStudent(p => ({...p, idno: txt}))}
          readonly={operation === "edit"}
          keyboardType="number-pad"
          error={errors.idno}
          errorMessage="Invalid ID No."
        />
        <Text> Last Name </Text>
        <TextInput
          value={student.lastname}
          onChangeText={(txt) => setStudent(p => ({...p, lastname: txt}))}
          error={errors.lastname}
          errorMessage="Invalid Last Name."
        />
        <Text> First Name </Text>
        <TextInput
          value={student.firstname}
          onChangeText={(txt) => setStudent(p => ({...p, firstname: txt}))}
          error={errors.firstname}
          errorMessage="Invalid First Name."
        />
        <Text> Course </Text>
        <TextInput
          value={student.course}
          onChangeText={(txt) => setStudent(p => ({...p, course: txt}))}
          error={errors.course}
          errorMessage="Invalid Course."
        />
        <Text> Level </Text>
        <TextInput
          value={student.level}
          onChangeText={(txt) => setStudent(p => ({...p, level: txt}))}
          keyboardType="number-pad"
          error={errors.level}
          errorMessage="Invalid Level."
        />
        <Button
          style={{ justifyContent: "center" }}
          onPress={() => submitHandler() }
        >
          <Text style={{ color: "white" }}> Submit </Text>
        </Button>
      </View>
      
      
    </ScrollView>
  )
}

export default Manage;