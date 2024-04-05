import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import Icon from "./Icon";

interface IConfirmAlertDialogProp {
    onAcceptClick: any;
    handleOpenChange: Dispatch<SetStateAction<boolean>>
    children?: any;
    isOpen?: boolean;
    title: string;
    description: string;
}

export default function ConfirmAlertDialog(props: IConfirmAlertDialogProp) {
    return (
        <AlertDialog open={props.isOpen} onOpenChange={(open) => { }}>
            <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => { props.handleOpenChange(false); }}> <Icon name={"Undo2"} color={"black"} size={16} className="mr-1" /> ย้อนกลับ</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive" onClick={() => { props.onAcceptClick() }}>ยืนยัน</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};