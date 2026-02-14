'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PersonalFormData {
  personalInfo: {
    id: number | null;
    name: string;
    surname: string;
    birthDate: string;
  };
  personalSkills: {
    id: number | null;
    skills: string[];
  };
}

interface FormContextType {
  data: PersonalFormData;
  setPersonalInfo: (info: PersonalFormData['personalInfo']) => void;
  setPersonalSkills: (skills: PersonalFormData['personalSkills']) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PersonalFormData>({
    personalInfo: {
      id: null,
      name: '',
      surname: '',
      birthDate: '',
    },
    personalSkills: {
      id: null,
      skills: [],
    },
  });

  const setPersonalInfo = (info: PersonalFormData['personalInfo']) => {
    setData((prev) => ({
      ...prev,
      personalInfo: info,
    }));
  };

  const setPersonalSkills = (skills: PersonalFormData['personalSkills']) => {
    setData((prev) => ({
      ...prev,
      personalSkills: skills,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setPersonalInfo, setPersonalSkills }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}
