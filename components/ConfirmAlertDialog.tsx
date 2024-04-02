import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

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
                    <AlertDialogCancel onClick={() => { props.handleOpenChange(false); }}>ย้อนกลับ</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { props.onAcceptClick() }}>ไปต่อ</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};