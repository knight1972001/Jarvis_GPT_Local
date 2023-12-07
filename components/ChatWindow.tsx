import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ReactMarkdown from 'react-markdown'

export const ChatWindow = ({conversation}: any) => {
    return (
        <ScrollArea className="w-full h-[58vh] sm:h-[75vh] rounded-lg">
            {conversation.messages.map((item: any, index: number) => (
                <div key={index} className={`max-w-[100%] flex rounded-lg mb-1 ${item.role === 'user' ? 'ml-[0%] sm:ml-[40%] mb-[25px] mt-[20px] items-end justify-end bg-[#cacaca] bg-gradient-to-r from-gray-500 to-gray-300' : 'mr-[0%] sm:mr-[40%] mb-[25px] mt-[20px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500'} `}>
                    {item.role === 'assistant' && (
                        <>
                            <Avatar className="ml-4 my-1">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>   
                            <div className={`rounded-lg p-2`}>
                                <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ node, ...props }) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                                    )
                                    }} className="text-sm overflow-hidden leading-7">
                                        {item.content || ""}
                                </ReactMarkdown>
                                {/* <ReactMarkdown>{item.content}</ReactMarkdown> */}
                            </div>
                        </>
                    )}
                    {item.role === 'user' && (
                        <>
                            <div className={`mr-2 rounded-lg p-2`}>
                                <p>{item.content}</p>
                            </div>
                            <Avatar className="mr-4 my-1">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>   
                        </>
                    )}
                </div>
            ))}
        </ScrollArea>
    )
}