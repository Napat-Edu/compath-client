import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DialogHeader } from "./ui/dialog";
import { MouseEventHandler } from "react";

interface IResultDialog {
    result: any;
    onClose: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function ResultDialog(props: IResultDialog) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button onClick={props.onClose}>Close</button>
            </DialogTrigger>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src="wand.svg"
                                alt="wand icon"
                                height="24px"
                                width="24px"
                            />
                            <label>ผลการทำนายอาชีพ</label>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        อาชีพที่เหมาะสมกับคุณคือ
                    </DialogDescription>
                </DialogHeader>

                Content

            </DialogContent>
        </Dialog>
    );
}