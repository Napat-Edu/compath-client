export interface ICareerPredictionResult {
  career_path_name: string;
  career_path_description: string;
  related_careers: ICareer[];
  base_salary: ISalary;
  careermate_count: number;
  icon_svg: string | TrustedHTML;
  input_date: Date;
  object_id?: any;
}

export interface ICareer {
  career: string;
  skill_domains: string[];
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
  submit_date: string;
  object_id?: any;
}
