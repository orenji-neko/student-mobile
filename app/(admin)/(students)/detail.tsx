import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useGlobalSearchParams, useRouter } from "expo-router";
import { User, GraduationCap, BookOpen, Tag } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '@/components/Button';
import { useStudentContext } from '@/api/Student';

const Detail = () => {
  const { 
    idno, 
    lastname, 
    firstname, 
    course, 
    level 
  } = useGlobalSearchParams<{
    idno: string,
    lastname: string,
    firstname: string,
    course: string,
    level: string
  }>();

  // Helper function to render detail row
  const DetailRow = ({ 
    icon: Icon, 
    label, 
    value 
  }: { 
    icon: LucideIcon, 
    label: string, 
    value: string | undefined 
  }) => (
    <View style={{
      display: "flex",
      flexDirection: "row",
      gap: 2,
      padding: 10,
      justifyContent: "center"
    }}>
      <View style={{
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Icon color="#4A5568" size={24} />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{label}</Text>
        <Text style={{ fontSize: 16 }}>{value || 'N/A'}</Text>
      </View>
    </View>
  );

  const router = useRouter();
  const studentApi = useStudentContext();

  const backHandler = () => {
    router.back();
  }

  const deleteHandler = () => {
    studentApi.del(parseInt(idno));
    router.back();
  }

  const editHandler = () => {
    router.push({
      pathname: "/(admin)/(students)/manage",
      params: {
        operation: "edit",
        idno: idno,
        lastname: lastname,
        firstname: firstname,
        course: course,
        level: level,
      }
    })
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 2,
      }}
      contentContainerStyle={{ paddingBottom: 20 }}
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
          Student Detail
        </Text>
      </View>

      {/* Details Container */}
      <View style={{  }}>
        <DetailRow 
          icon={Tag} 
          label="Student ID" 
          value={idno} 
        />
        <DetailRow 
          icon={User} 
          label="Full Name" 
          value={`${firstname} ${lastname}`.trim()} 
        />
        <DetailRow 
          icon={GraduationCap} 
          label="Course" 
          value={course} 
        />
        <DetailRow 
          icon={BookOpen} 
          label="Level" 
          value={level} 
        />
      </View>

      {/* Additional Actions (Optional) */}
      <View style={{ gap: 12, paddingHorizontal: 50, flexDirection: "row" }}>
        <Button style={{ backgroundColor: "#66785F", paddingVertical: 8, flex: 1, justifyContent: "center" }}
          onPress={editHandler}
        >
          <Text style={{ color: "white" }}> Edit </Text>
        </Button>
        <Button style={{ backgroundColor: "#F72C5B", paddingVertical: 8, flex: 1, justifyContent: "center" }}
          onPress={deleteHandler}
        >
          <Text style={{ color: "white" }}> Delete </Text>
        </Button>
      </View>
    </ScrollView>
  );
}

export default Detail;