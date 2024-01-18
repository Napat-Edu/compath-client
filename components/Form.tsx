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
import { toast } from "@/components/ui/use-toast"
import { DialogFooter } from "./ui/dialog"
import { CheckboxWithText } from "./Checkbox"

const FormSchema = z.object({
    educational: z.string().min(1, {
        message: "โปรดใส่ข้อมูลก่อน"
    }),
    skill: z.string().min(1, {
        message: "โปรดใส่ข้อมูลก่อน"
    }),
    experience: z.string().min(1, {
        message: "โปรดใส่ข้อมูลก่อน"
    })
})

export function InputForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            educational: "",
            skill: "",
            experience: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
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
                                <Input placeholder="Ex." {...field} />
                            </FormControl>
                            <FormDescription>
                                กรอกประวัติการศึกษาของคุณและกิจกรรมที่ทำในมหาวิทยาลัย
                            </FormDescription>
                            <FormMessage />
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
                                <Input placeholder="Ex." {...field} />
                            </FormControl>
                            <FormDescription>
                                กรอกทักษะที่ีคุณถนัดทั้งในด้าน soft skill และ hard skill
                            </FormDescription>
                            <FormMessage />
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
                                <Input placeholder="Ex." {...field} />
                            </FormControl>
                            <FormDescription>
                                กรอกประสบการณ์ทำงานหรือหน้าที่ที่เคยทำกับโปรเจ็คในมหาวิทยาลัย
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="flex flex-row lg:justify-between">
                    <div className="flex flex-row">
                        <CheckboxWithText></CheckboxWithText>
                    </div>
                    <Button type="submit">เริ่มทำนาย</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
