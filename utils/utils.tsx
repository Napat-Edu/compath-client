import { icons } from "lucide-react";

export const toSalaryNumber = (salary: number): string => {
    const salaryString = salary.toString();
    const replacedSalary = salaryString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return replacedSalary;
};

export const displayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toDateString();
};

export const displayTime = (dateString: string) => {
    const date = new Date(dateString);
    let ampm = 'AM'
    let hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours == 12) {
        ampm = 'PM'
    } else if (hours == 0) {
        hours = 12
    } else if (hours > 12) {
        hours -= 12
        ampm = 'PM'
    }

    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return time;
};

export const mapCareerIcon = (career: string) => {
    let icon: keyof typeof icons;
    switch (career) {
        case 'Developer':
            icon = "Code2";
            break;
        case 'Designer':
            icon = "PenTool";
            break;
        case 'Data & AI':
            icon = "PieChart";
            break;
        case 'Security':
            icon = "ShieldCheck";
            break;
        case 'Cloud Management':
            icon = "Cloud";
            break;
        case 'QA & Tester':
            icon = "FileSearch";
            break;
        default:
            icon = "Code2";
            break;
    }
    return icon;
};