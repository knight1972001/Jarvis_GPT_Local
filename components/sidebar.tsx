"use client";

// import { getData } from "@/lib/get-data";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { deleteOneConversation, getAllConversation } from "@/actions/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import Pusher from "pusher";
import { pusherClient, pusherServer } from "@/lib/pusher";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const montserrat = Montserrat({weight: "600", subsets: ["latin"]})

const Sidebar = () => {
    const router = useRouter();
    // const conversation = await getAllConversation()
    const [conversation, setConversation] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            console.log("Fetching")
            // Simulate an asynchronous data fetch
            const foundConversation = await getAllConversation()
            // console.log(foundConversation)
            // Update the state with the found conversation
            if (foundConversation != undefined) {
                setConversation(foundConversation);
                setLoading(false);
            }
            // Update the state with the fetched conversation
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const deleteConversation = async (id: string) =>{
        await deleteOneConversation(id);
        router.push("/new")
    }

    useEffect(() => {
        console.log("Fetched conversation")
        pusherClient.subscribe('my-channel')

        pusherClient.bind('my-event', () => {
            fetchData();
        })

        fetchData();

        return () => {
            console.log("DONE Fetched conversation")
            pusherClient.unsubscribe('my-channel')
        }
        // Fetch data when the component mounts
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <ScrollArea className="h-[100vh] space-y-4 py-2 flex-col text-white bg-gradient-to-r from-gray-900 to-gray-900">
            <div className="px-3 py-1 flex-1">
                <Link href="/" className="flex justify-center mb-5">
                    <div className="relative w-full h-full">
                        <Image layout="responsive" width={100} height={100} alt="Logo" src="/logo.png" />
                    </div>
                </Link>
                <Link href="/new" className="flex justify-center pl-3 mb-5">
                    <Button variant="outline" className={cn("text-xl font-bold text-black", montserrat.className)}>
                        New chat
                    </Button>
                </Link>
                {conversation.map((item:any)=> (
                    <>
                        <Link href={`/conversation/${item.id}`} key={item.name}>
                            <div key={item.name} className="flex items-center flex-1 mb-1">
                                <Button variant="ghost" className="text-xs w-full justify-start" >{item.name}</Button>
                                <Button variant="destructive" onClick={() => deleteConversation(item.id)}><Trash2 /></Button>
                            </div>
                        </Link>
                        
                    </>
                ))}
            </div>
        </ScrollArea>
    )
};

export default Sidebar;