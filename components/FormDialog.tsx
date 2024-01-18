'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { InputForm } from "./Form";

export function FormDialog() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto mr-auto py-4 px-2">
                    <img
                        src="sparkles.svg"
                        alt="sparkles icon"
                        height="16px"
                        width="16px"
                        className="mr-1"
                    />
                    ไปทำนายอาชีพ
                </Button>
            </DialogTrigger>
            <DialogContent className="w-4/5">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src="resume.svg"
                                alt="resume icon"
                                height="24px"
                                width="24px"
                            />
                            <label>กรอกข้อมูลของคุณเพื่อทำนายอาชีพ</label>
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        โปรดกรอกข้อมูลให้ระบบเพื่อนำไปทำนายอาชีพที่เหมาะสมกับคุณ
                    </DialogDescription>
                </DialogHeader>

                <InputForm></InputForm>

            </DialogContent>
        </Dialog>
    )
}
