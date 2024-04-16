"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { DialogFooter } from "../ui/dialog"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import Icon from "../Icon"

const FormSchema = z.object({
    educational: z.string().min(1, {
        message: "โปรดกรอกประวัติการศึกษาของคุณและกิจกรรมที่ทำในมหาวิทยาลัย"
    }).regex(/^[a-zA-Z0-9!@#$%^&*()-_=+[\]{};:'",.<>/?\s]*$/, {
        message: "โปรดกรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น"
    }),
    skill: z.string().min(1, {
        message: "โปรดกรอกทักษะที่คุณถนัดทั้งในด้าน soft skill และ hard skill"
    }).regex(/^[a-zA-Z0-9!@#$%^&*()-_=+[\]{};:'",.<>/?\s]*$/, {
        message: "โปรดกรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น"
    }),
    experience: z.string().min(1, {
        message: "โปรดกรอกประสบการณ์ทำงานหรือหน้าที่ที่เคยทำกับโปรเจ็คในมหาวิทยาลัย"
    }).regex(/^[a-zA-Z0-9!@#$%^&*()-_=+[\]{};:'",.<>/?\s]*$/, {
        message: "โปรดกรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น"
    }),
    agreement: z.boolean().refine((value) => {
        return value == true;
    }, {
        message: "โปรดยอมรับการเก็บข้อมูลเรซูเมของคุณ"
    }).default(false)
})

interface IInputForm {
    getCareerPrediction: any;
    currentUserInput: any;
    updateCurrentUserInput: any;
}

export function InputForm(props: IInputForm) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            educational: props.currentUserInput.educational == undefined ? "" : props.currentUserInput.educational,
            skill: props.currentUserInput.skill == undefined ? "" : props.currentUserInput.skill,
            experience: props.currentUserInput.experience == undefined ? "" : props.currentUserInput.experience,
            agreement: props.currentUserInput.agreement == undefined ? false : props.currentUserInput.agreement,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        props.updateCurrentUserInput(data);
        props.getCareerPrediction(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between h-full overflow-auto pt-1">
                <div className="flex flex-col p-1">
                    <FormField
                        control={form.control}
                        name="educational"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary text-lg font-semibold">การศึกษา</FormLabel>
                                <FormControl>
                                    <Textarea className="text-base focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. Computer Engineering, KMUTT" {...field} />
                                </FormControl>
                                <FormDescription>
                                    <FormMessage>
                                        กรอกประวัติการศึกษาของคุณและกิจกรรมที่ทำในมหาวิทยาลัย
                                    </FormMessage>
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="skill"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary text-lg font-semibold">ทักษะ</FormLabel>
                                <FormControl>
                                    <Textarea className="text-base focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. Javascript, Typescript, Python, ..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    <FormMessage>
                                        กรอกทักษะที่คุณถนัดทั้งในด้าน soft skill และ hard skill
                                    </FormMessage>
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-primary text-lg font-semibold">ประสบการณ์</FormLabel>
                                <FormControl>
                                    <Textarea className="text-base focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. To do list with React" {...field} />
                                </FormControl>
                                <FormDescription>
                                    <FormMessage>
                                        กรอกประสบการณ์ทำงานหรือหน้าที่ที่เคยทำกับโปรเจ็คในมหาวิทยาลัย
                                    </FormMessage>
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between pt-4 min-h-fit">
                    <div className="flex flex-row">
                        <FormField
                            name="agreement"
                            render={({ field }) => (
                                <div className="items-top flex space-x-2">
                                    <Checkbox id="terms1"
                                        checked={field.value}
                                        onCheckedChange={field.onChange} />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="terms1"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            ยอมรับข้อตกลงและเงื่อนไขการใช้งาน
                                        </label>
                                        <div className="text-sm text-muted-foreground">
                                            <FormMessage>
                                                คุณจะยอมรับการเก็บข้อมูลเรซูเมของคุณ
                                            </FormMessage>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <Button type="submit">เริ่มทำนาย<Icon className="ml-[6px]" name={"ArrowRight"} color="white" size={16} /></Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
