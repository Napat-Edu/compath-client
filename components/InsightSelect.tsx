'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useLocalStorage from "./hooks/useLocalStorage";

export function InsightSelect() {
    const localStorage = useLocalStorage();

    return (
        <Select>
            <SelectTrigger className="w-52">
                <SelectValue placeholder="เลือกการ์ดทำนาย" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>ผลลัพธ์และวันที่ทำการทำนาย</SelectLabel>
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <SelectItem value={history.result + idx} key={"history-" + history.result + idx}>{history.result}</SelectItem>
                            );
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
