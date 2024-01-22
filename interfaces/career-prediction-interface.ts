export interface ICareerPredictionResult {
  career: string;
  description: string;
  relatedCareers: string[];
  baseSalary: number;
  careermatesCount: number;
  icon: string | TrustedHTML;
}

export interface IUserResume {
  skill: string;
  educational: string;
  experience: string;
  agreement: boolean;
}
