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
import { Input } from "@/components/ui/input"
import { DialogFooter } from "./ui/dialog"
import { Checkbox } from "./ui/checkbox"

const FormSchema = z.object({
    educational: z.string().min(1, {
        message: "โปรดกรอกประวัติการศึกษาของคุณและกิจกรรมที่ทำในมหาวิทยาลัย"
    }),
    skill: z.string().min(1, {
        message: "โปรดกรอกทักษะที่คุณถนัดทั้งในด้าน soft skill และ hard skill"
    }),
    experience: z.string().min(1, {
        message: "โปรดกรอกประสบการณ์ทำงานหรือหน้าที่ที่เคยทำกับโปรเจ็คในมหาวิทยาลัย"
    }),
    agreement: z.boolean().refine((value) => {
        return value == true;
    }, {
        message: "โปรดยอมรับการเก็บข้อมูลเรซูเมของคุณ"
    }).default(false)
})

export function InputForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            educational: "",
            skill: "",
            experience: "",
            agreement: false
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
                <FormField
                    control={form.control}
                    name="educational"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-primary text-lg font-semibold">การศึกษา</FormLabel>
                            <FormControl>
                                <Input className="focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. Computer Engineering, KMUTT" {...field} />
                            </FormControl>
                            <FormDescription>
                                <FormMessage children="กรอกประวัติการศึกษาของคุณและกิจกรรมที่ทำในมหาวิทยาลัย" />
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
                                <Input className="focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. Javascript, Typescript, Python, ..." {...field} />
                            </FormControl>
                            <FormDescription>
                                <FormMessage children="กรอกทักษะที่คุณถนัดทั้งในด้าน soft skill และ hard skill" />
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
                                <Input className="focus-visible:ring-primary focus-visible:ring-2" placeholder="Ex. To do list with React" {...field} />
                            </FormControl>
                            <FormDescription>
                                <FormMessage children="กรอกประสบการณ์ทำงานหรือหน้าที่ที่เคยทำกับโปรเจ็คในมหาวิทยาลัย" />
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <DialogFooter className="flex flex-row lg:justify-between">
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
                                        <p className="text-sm text-muted-foreground">
                                            <FormMessage children="คุณจะยอมรับการเก็บข้อมูลเรซูเมของคุณ" />
                                        </p>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <Button type="submit">เริ่มทำนาย<img className="ml-2" src="arrow-right.svg" alt="arrow-right" width="16px" height="16px" /></Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
