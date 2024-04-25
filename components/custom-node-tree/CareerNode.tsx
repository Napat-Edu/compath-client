import { Handle, NodeProps, Position } from "reactflow";
import NodeBox from "./NodeBox";
import { memo, useState } from "react";
import Icon from "../Icon";

type CareerNodeData = {
    career: string;
    isSelected?: boolean;
};

function CareerpathNode({ data }: NodeProps<CareerNodeData>) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <button onClick={handleExpandClick} className="hover:bg-slate-100 rounded-full">
            <NodeBox>
                <h6 className="font-medium leading-5">{data.career}</h6>
                <Icon name={`${isExpanded || data.isSelected ? "ChevronsLeft" : "ChevronsRight"}`} size={16} />
                <Handle type="target" position={Position.Left} className="!bg-white border-2 border-maingray rounded-full" />
                <Handle type="source" position={Position.Right} className="!bg-white border-2 border-maingray rounded-full" />
            </NodeBox>
        </button>
    );
}

export default memo(CareerpathNode);