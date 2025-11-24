export interface CVData {
  userType?: 'student' | 'professional';
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    city: string;
    summary: string;
    photo?: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    city: string;
    year: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
  photo?: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
  hasPhoto: boolean;
  disabled?: boolean;
  experienceCapacity: '0' | '1-3' | '4+' | 'any';
}

export interface CVPreferences {
  userType: 'student' | 'professional';
  hasPhoto: boolean;
  experienceCount: '0' | '1-3' | '4+';
}