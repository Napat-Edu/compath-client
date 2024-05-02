'use client'
import useLocalStorage from "@/hooks/useLocalStorage";
import Icon from "./Icon";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import useSelectInsight from "@/hooks/useSelectInsight";
import { useEffect } from "react";

export default function CompareSelect() {
    const localStorage = useLocalStorage();
    const selectInsight = useSelectInsight();

    useEffect(() => {
        selectInsight.updateCompareCareer('');
        return () => { };
    }, []);

    if (!localStorage.isStorageReady || !(localStorage.predictionHistory.length > 0)) {
        return null;
    }

    const mapCareerCompareChoice = () => {
        const careers: string[] = ['Developer', 'Designer', 'Data & AI', 'Security', 'Cloud Management', 'QA & Tester'];
        return (
            <>
                {
                    careers.map((career, idx) => {
                        if (career !== selectInsight.selectedInsight.career_path) {
                            return (
                                <SelectItem value={career} key={career + idx}>{career}</SelectItem>
                            );
                        }
                    })
                }
            </>
        );
    };

    const handleCleanCompare = () => {
        selectInsight.updateCompareCareer('');
    };

    const handleSelectValueChange = (value: string) => {
        selectInsight.updateCompareCareer(value);
    };

    return (
        <div className="border rounded-3xl p-6 flex flex-col gap-4 md:gap-0 md:flex-row items-center w-full md:w-80 flex-grow">
            <div className="flex shrink-0 w-full md:w-fit">
                <Icon name={"ArrowLeftRight"} className="flex-shrink-0"></Icon>
                <h4 className="font-semibold ml-1 mr-4 flex-shrink-0">เปรียบเทียบ</h4>
            </div>

            <div className="flex grow w-full md:w-fit">
                <Select value={selectInsight.compareCareer} onValueChange={(value) => { handleSelectValueChange(value) }}>
                    <SelectTrigger className="flex-grow flex flex-row">
                        <div className="w-full text-left">
                            <SelectValue placeholder="เลือกสายอาชีพ" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {mapCareerCompareChoice()}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button variant={"outline"} size={"icon"} className="border ml-2 flex-shrink-0" onClick={handleCleanCompare} disabled={selectInsight.compareCareer == ''}>
                    <Icon name={"XCircle"} size={16} color="black"></Icon>
                </Button>
            </div>
        </div>
    );
}