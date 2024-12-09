import { StudentType } from "@/types";
import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StudentContextType {
  get:    () => Promise<StudentType[]>;
  post:   (student: StudentType) => void;
  del:    (idno: number) => void;
  put:    (student: StudentType) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

const StudentProvider = ({ children }: { children?: ReactNode }) => {

  const get = async (): Promise<StudentType[]> => {
    const tmp = await AsyncStorage.getItem("students");
    
    if(!tmp) {
      return [];
    }
    else {
      return JSON.parse(tmp);
    }

  }

  const post = async (student: StudentType) => {
    let tmpStr = await AsyncStorage.getItem("students");
    let tmp: StudentType[] = [];

    if(!tmpStr) {
      tmp = [];
    }
    else {
      tmp = JSON.parse(tmpStr);
    }
    await AsyncStorage.setItem("students", JSON.stringify([...tmp, student]));
  };

  const put = async (student: StudentType) => {
    let str = await AsyncStorage.getItem("students");

    if(!str)
      return;
    let tmp: StudentType[] = JSON.parse(str);

    let newtmp = tmp.map((stud) => {
      // modify
      if(stud.idno === student.idno) {
        return {
          idno:       student.idno,
          lastname:   student.lastname,
          firstname:  student.firstname,
          course:     student.course,
          level:      student.level
        }
      }
      // leave alone
      else {
        return stud;
      }
    });

    // save to async storage
    await AsyncStorage.setItem("students", JSON.stringify(newtmp));
  }

  const del = async (idno: number) => {
    let tmpStr = await AsyncStorage.getItem("students");
    let tmp: StudentType[] = [];

    if(!tmpStr) {
      return [];
    }
    else {
      tmp = JSON.parse(tmpStr);
    }
    
    const newTmp = tmp.filter((stud) => stud.idno !== idno );
    await AsyncStorage.setItem("students", JSON.stringify(newTmp));
  }

  const contextValue: StudentContextType = {
    post,
    put,
    get,
    del
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  )
};

export default StudentProvider;