import Image from "next/image";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import NodeBox from "./NodeBox";

function MainNode() {

    return (
        <NodeBox>
            <Image width={0} height={0} className="w-44 h-auto" src={"compath-logo.svg"} alt={"compath-logo"} />
            <Handle type="source" position={Position.Right} className="!bg-white border-2 border-maingray rounded-full" />
        </NodeBox>
    );
}

export default memo(MainNode);