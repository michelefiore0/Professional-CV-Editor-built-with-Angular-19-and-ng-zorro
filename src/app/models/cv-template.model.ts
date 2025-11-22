export interface CVData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
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
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
  hasPhoto: boolean;
}