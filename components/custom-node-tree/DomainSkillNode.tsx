import { Badge } from "../ui/badge";
import { Handle, NodeProps, Position } from "reactflow";

type DomainSkillNodeData = {
    domain_name: string;
    skill_list: string[][];
};

export default function DomainSkillNode({ data }: NodeProps<DomainSkillNodeData>) {

    return (
        <div className="border-2 border-maingray rounded-2xl p-3">
            <h6 className="font-medium leading-5 text-primary">{data.domain_name}</h6>
            <div className="flex flex-row flex-wrap gap-1 mt-1">
                {
                    data.skill_list.map((skill) => {
                        return (
                            <Badge key={`${skill[0]}-skill`} variant={"outline"}>{skill[0]}</Badge>
                        );
                    })
                }
            </div>
            <Handle type="target" position={Position.Left} className="!bg-white border-2 border-maingray rounded-full" />
        </div>
    );
}