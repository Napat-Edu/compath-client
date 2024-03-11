import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import NodeBox from "./NodeBox";
import Icon from "../Icon";
import { mapCareerIcon } from "@/utils/utils";

type CareerpathNodeData = {
    career_path_name: string;
};

function CareerpathNode({ data }: NodeProps<CareerpathNodeData>) {

    return (
        <NodeBox>
            <Icon size={16} name={mapCareerIcon(data.career_path_name)} />
            <h6 className="font-medium leading-5">{data.career_path_name}</h6>
            <Handle type="target" position={Position.Left} className="!bg-white border-2 border-maingray rounded-full" />
            <Handle type="source" position={Position.Right} className="!bg-white border-2 border-maingray rounded-full" />
        </NodeBox>
    );
}

export default memo(CareerpathNode);