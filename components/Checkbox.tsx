import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxWithText() {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox id="terms1" />
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
            </div>
        </div>
    )
}
