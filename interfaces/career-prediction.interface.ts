export interface ICareerPredictionBase {
  career_path_name: string;
  career_path_description: string;
  base_salary: ISalary;
  careermate_count: number;
  icon_svg: string | TrustedHTML;
  input_date: Date;
  object_id?: any;
}
export interface ICareerPredictionResult extends ICareerPredictionBase {
  related_careers: ICareer[];
}

export interface ICareerNodeTree extends ICareerPredictionBase {
  related_careers: ICareerWithSoftSkillNodeTree[];
}

export interface ICareerWithSoftSkillNodeTree extends ICareerNodeTree {
  soft_skills: {
    id: string;
    name: string[];
  }[];
}

export interface ICareerWithSoftSkill extends ICareer {
  soft_skills: {
    id: string;
    name: string[];
  };
}

export interface ICareerNodeTree {
  career: string;
  skill_domains: ISkillDomainNodeTree[];
  alt_skills: IAltSkill[];
}

export interface ICareer {
  career: string;
  skill_domains: ISkillDomain[];
  alt_skills: IAltSkill[];
}

export interface IAltSkill {
  name: string[];
}

export interface ISkillDomainNodeTree {
  id: string;
  name: string;
  skill_list: string[];
  is_in_resume: boolean;
}

export interface ISkillDomain {
  id: string;
  name: string;
  skill_list: ISkillInfo[];
  is_in_resume: boolean;
}

export interface ISkillInfo {
  isExisInResume: boolean;
  name: string[];
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
