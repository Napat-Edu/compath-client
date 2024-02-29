import { icons } from "lucide-react";

export interface IconProps {
    name: keyof typeof icons;
}

export default function Icon(props: IconProps) {
    const LucideIcon = icons[props.name];

    return <LucideIcon />;
}