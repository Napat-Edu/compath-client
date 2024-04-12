import { Badge } from "../ui/badge";
import { Handle, NodeProps, Position } from "reactflow";

type DomainSkillNodeData = {
    domain_name: string;
    skill_list: string[][];
    soft_skill?: {
        id: string;
        name: string[];
    }[];
};

export default function DomainSkillNode({ data }: NodeProps<DomainSkillNodeData>) {

    return (
        <div className="border-2 border-maingray rounded-2xl p-3">
            <h6 className="font-medium leading-5 text-primary">{data.domain_name}</h6>
            <div className="flex flex-row flex-wrap gap-1 mt-1">
                {
                    data.soft_skill ?
                        data.soft_skill.map((skill) => {
                            return <Badge key={`${skill.name[0]}-${skill.id}`} variant={"outline"}>{skill.name[0]}</Badge>
                        }) :
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