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

    const handleHistoryChange = (id: string) => {
        // console.log(id);
    };

    const displayDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toDateString();
    };

    return (
        <Select onValueChange={(id) => { handleHistoryChange(id) }}>
            <SelectTrigger className="w-52">
                <SelectValue placeholder="เลือกการ์ดทำนาย" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>ผลลัพธ์และวันที่ทำการทำนาย</SelectLabel>
                    {
                        localStorage.predictionHistory.map((history, idx) => {
                            return (
                                <SelectItem value={history.objectId} key={"history-" + history.result + idx}>
                                    {history.result} - {displayDate(history.submitDate)}
                                </SelectItem>
                            );
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
