export interface ICareerPredictionResult {
  career: string;
  description: string;
  relatedCareers: ICareer[];
  baseSalary: ISalary;
  careermatesCount: number;
  icon: string | TrustedHTML;
  inputDate: Date;
  objectId?: any;
}

export interface ICareer {
  career: string;
  skillDomains: string[];
}

export interface ISalary {
  min_salary: number;
  max_salary: number;
}

export interface IUserResume {
  skill: string;
  educational: string;
  experience: string;
  agreement: boolean;
}

export interface IPredictionHistory {
  result: string;
  submitDate: string;
  objectId?: any;
}
