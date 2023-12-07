import { cn } from "@/lib/utils";

interface HeadingProps{
    title: string;
    description: string;
}


export const Heading = ({
    title
}: HeadingProps) => {
    return (
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-3 mb:8">
                {/* <div className={cn("p-2 w-fit rounded-md")}>
                    
                </div> */}
                <div>
                    <h2 className="text-3xl font-bold">
                        {title}
                    </h2>
                </div>
            </div>
        </>
    )
}

export default Heading;