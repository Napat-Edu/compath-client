import { icons } from 'lucide-react';
import Icon from "./Icon";

interface IInsightBox {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
    className?: string;
    name: keyof typeof icons;
}

export default function InsightBox(props: IInsightBox) {
    const LucideIcon = icons[props.name];

    return (
        <div className={`border-[1px] rounded-2xl p-6 flex flex-col ${props.className}`}>
            <div className="flex flex-row justify-between">
                <h4 className="font-semibold text-2xl">{props.title}</h4>
                <Icon name={props.name} />
            </div>
            <h5 className="text-gray-500">{props.subtitle}</h5>
            <div className="mt-4 h-full">
                {props.children}
            </div>
        </div>
    );
}