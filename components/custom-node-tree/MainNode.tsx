import { memo } from "react";
import { Handle, Position } from "reactflow";

function MainNode({ data }: { data: any }) {

    return (
        <div className="border-[1px] border-maingray rounded-lg px-2 py-1 bg-teal-200">
            {data.label}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default memo(MainNode);