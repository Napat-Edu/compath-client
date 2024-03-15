interface INodeBox {
    children: any;
}

export default function NodeBox(props: INodeBox) {
    return (
        <div className="inline-flex justify-center items-center gap-1 border-2 border-maingray rounded-full px-2 py-1">
            {props.children}
        </div>
    );
}