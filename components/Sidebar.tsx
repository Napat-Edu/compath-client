import Link from "next/link"
import { Button } from "./ui/button"

export function Sidebar() {

    return (
        <div className="min-w-52 max-w-72 w-1/6 border-r-2">
            <div className="space-y-4 py-4 sticky top-0 h-screen">
                <div className="flex flex-col justify-between h-full">

                    <section className="px-3 py-2">
                        <div className="flex flex-row mb-2 px-4 gap-1">
                            <img
                                src="compass.svg"
                                alt="compass icon"
                                height="36px"
                                width="36px" />
                            <h2 className="text-2xl font-semibold tracking-tight mt-auto mb-auto">
                                Compath
                            </h2>
                        </div>
                        <h3 className="pt-4 pb-2 pl-4 font-semibold">Feature</h3>
                        <div className="space-y-1">
                            <Button variant="secondary" className="w-full justify-start">
                                <img
                                    src="paperclip.svg"
                                    alt="paperclip icon"
                                    height="20px"
                                    width="20px" />
                                <Link href="/" className="ml-2" >Career Prediction</Link>
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <img
                                    src="grid.svg"
                                    alt="grid icon"
                                    height="20px"
                                    width="20px" />
                                <Link href="/career-path" className="ml-2">Career Path</Link>
                            </Button>
                        </div>
                    </section>

                    <section className="px-6 py-4 flex flex-col gap-4">
                        <Button variant="outline">Login</Button>
                        <Button>Sign Up</Button>
                    </section>

                </div>
            </div>
        </div>
    )
}