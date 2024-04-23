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

export const mapCareerThemeColor = (career: string) => {
    let color: string;
    switch (career) {
        case 'Developer':
            color = "#3B82F6";
            break;
        case 'Designer':
            color = "#4EBC62";
            break;
        case 'Data & AI':
            color = "#EC4899";
            break;
        case 'Security':
            color = "#6366F1";
            break;
        case 'Cloud Management':
            color = "#F59E0B";
            break;
        case 'QA & Tester':
            color = "#EF4444";
            break;
        default:
            color = "black";
            break;
    }
    return color;
};