import { icons } from "lucide-react";

export interface IconProps {
    name: keyof typeof icons;
    color?: string;
    strokeWidth?: number;
}

export default function Icon(props: IconProps) {
    const LucideIcon = icons[props.name];

    return <LucideIcon color={props.color || "#4ebc62"} strokeWidth={props.strokeWidth || 2} />;
}