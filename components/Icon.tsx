import { icons } from "lucide-react";

export interface IconProps {
    name: keyof typeof icons;
    color?: string;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export default function Icon(props: IconProps) {
    const LucideIcon = icons[props.name];

    return (
        <LucideIcon
            className={`${props.className || null}`}
            color={props.color || "#4ebc62"}
            strokeWidth={props.strokeWidth || 2}
            size={props.size || 24}
        />
    );
}