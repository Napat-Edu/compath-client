import { MouseEventHandler } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface IConfirmAlertDialogProp {
    onAcceptClick: MouseEventHandler<HTMLButtonElement> | undefined;
    children?: any;
    title: string;
    description: string;
}

export default function ConfirmAlertDialog(props: IConfirmAlertDialogProp) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>ย้อนกลับ</AlertDialogCancel>
                    <AlertDialogAction onClick={props.onAcceptClick}>ไปต่อ</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};