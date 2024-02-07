export const toSalaryNumber = (salary: number): string => {
    const salaryString = salary.toString();
    const replacedSalary = salaryString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return replacedSalary;
};