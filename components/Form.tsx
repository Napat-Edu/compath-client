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
        message: "โปรดใส่ข้อมูลก่อน"
    }),
    skill: z.string().min(1, {
        message: "โปรดใส่ข้อมูลก่อน"
    }),
    experience: z.string().min(1, {
        message: "โปรดใส่ข้อมูลก่อน"
    }),
    agreement: z.boolean().refine((value) => {
        return value == true;
    }, {
        message: "โปรดยินยอมก่อน"
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
                                กรอกทักษะที่คุณถนัดทั้งในด้าน soft skill และ hard skill
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
                                            คุณจะยอมรับการเก็บข้อมูลเรซูเมของคุณ
                                        </p>
                                        <FormMessage />
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                    <Button type="submit">เริ่มทำนาย</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
