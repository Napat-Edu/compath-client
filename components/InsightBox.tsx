import Image from "next/image";

interface IInsightBox {
    title: string;
    subtitle: string;
    icon: string;
    children?: React.ReactNode;
    className?: string;
}

export default function InsightBox(props: IInsightBox) {
    return (
        <div className={`border-[1px] rounded-2xl p-6 flex flex-col ${props.className}`}>
            <div className="flex flex-row justify-between">
                <h4 className="font-semibold text-2xl">{props.title}</h4>
                <Image src={props.icon} alt={`${props.icon}-icon`} width={24} height={24} />
            </div>
            <h5 className="text-gray-500">{props.subtitle}</h5>
            <div className="mt-4">
                {props.children}
            </div>
        </div>
    );
}