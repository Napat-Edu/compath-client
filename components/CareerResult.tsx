import { MouseEventHandler } from "react";
import { Button } from "./ui/button";

interface ICareerResult {
    togglePredictionState: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CareerResult(props: ICareerResult) {
    return (
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-4">
                <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                >
                    <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                    </p>
                </div>
            </li>
            <div>
                SKILL
            </div>
            <div>
                SALARY
            </div>
            <div>
                COURSES
            </div>
            <div className="flex flex-row">
                <Button>ดูเพิ่มเติม</Button>
                <button className="mx-1 px-2 bg-slate-300 rounded-md">Save</button>
                <button className="mx-1 px-2 bg-slate-300 rounded-md" onClick={props.togglePredictionState}>Edit</button>
            </div>
        </ul>
    );
}