'use client'

import Heading from "@/components/heading";
import Loading from "@/components/loading";
import Data from "@/data/fakedata.json"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { formSchema } from "../constants";
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { redirect, useRouter } from "next/navigation"
import { getOneConversation, updateConversation } from "@/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWindow } from "@/components/ChatWindow";

const ConversationPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isReadyUpdate, setIsReadyUpdate] = useState(false);
    const [messages, setMessages] = useState<string>("");
    const [conversation, setConversation] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            setConversation(null);
            // Simulate an asynchronous data fetch
            // console.log(params.id)
            const foundConversation = await getOneConversation(params.id)
            console.log(foundConversation)
            // Update the state with the found conversation
            if (foundConversation !== undefined) {
                setConversation(foundConversation);
                setLoading(false);
            }
            // Update the state with the fetched conversation
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    //new
    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // console.log("In useEffect Updated");
        
        // console.log("Conversation ---")
        // console.log(conversation);
        // console.log("Conversation ---")

        // console.log("isReadyUpdate ---")
        // console.log(isReadyUpdate);
        // console.log("isReadyUpdate ---")

        if (isReadyUpdate) {
            // console.log("Message ---")
            // console.log(messages);
            // console.log("Message ---")

            // const newResponse = {
            //     role: "assistant",
            //     content: messages
            // }

            // // Creating a copy of the current conversation
            // const updatedConversation = { ...conversation };

            // // Adding the new message to the messages array
            // updatedConversation.messages = [...updatedConversation.messages, newResponse];

            // // Updating the conversation state with the new messages
            // setConversation(updatedConversation);

            // console.log("UPDATED!")
            // console.log(conversation)
            // console.log("UPDATED!")

            console.log("UPDATED CONVERSATION")
            updateConversation(conversation)

            setIsReadyUpdate(false);
        }

    }, [conversation, isReadyUpdate, messages])

    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try{
            console.log("SUBMITTED INTO")
            form.reset();
            setMessages("")
            setIsSubmitting(true)
            setIsReadyUpdate(false);

            let text: string=""

            const newChat = {
                role: "user",
                content: values.prompt
            }

            const newResponse = {
                role: "assistant",
                content: ""
            }
            // Creating a copy of the current conversation
            const updatedConversation = { ...conversation };

            // Adding the new message to the messages array
            updatedConversation.messages = [...updatedConversation.messages, newChat];

            // Updating the conversation state with the new messages
            
            // console.log(updatedConversation.messages)
            // console.log("Set!")

            // console.log("Chat Completion conversations")
            const apiURL = "http://localhost:8000/v1/chat/completions"
            // console.log(apiURL)
            if(!apiURL) {
                throw new Error("API URL is not defined in the config")
            }

            const headers:any = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Connection': 'keep-alive'
                // Add any other headers as needed
            };

            const requestBody = {
            "messages": updatedConversation.messages,
            "stream": true
            }

            updatedConversation.messages = [...updatedConversation.messages, newResponse];
            setConversation(updatedConversation);
            // console.log(updatedConversation.messages)

            await fetch(apiURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            }).
            then(async (response: any) => {
                const reader:any = response.body.getReader();
                // console.log(reader)

                while (true) {
                    const { done, value } = await reader?.read();
                    // done is true once the response is done
                    if(done) {
                        setIsReadyUpdate(true);
                        setIsSubmitting(false)
                        break;
                    }

                    // console.log(value)

                    // value : uint8array -> a string.
                    var currentChunk = new TextDecoder().decode(value);
                    // console.log(currentChunk)

                    const response_lines = currentChunk.split('\n').filter(Boolean)
                    // console.log(response_lines)
                    // const responseData = await currentChunk.json();

                    for (const item of response_lines){
                        // console.log(item)
                        if(item != "data: [DONE]\r" && !item.startsWith(': ping')){
                            if(item != '\r'){
                                // console.log(item)
                                const json_data = item.replace('data: ', '')
                                // console.log(json_data)
                                const response_object = JSON.parse(json_data)
                                // console.log(response_object)
                                if(response_object.choices[0].finish_reason != "stop"){
                                    if (response_object.choices[0].delta.content) {
                                        const contentValue = response_object.choices[0].delta.content;
                                        // setMessages((prev) => prev + contentValue);
                                        text = text + contentValue;
                                        // console.log(text);
                                        setConversation((prevObject:{
                                            _id: string;
                                            id: string;
                                            name: string;
                                            messages: [
                                                {
                                                    role: string;
                                                    content: string;
                                                }
                                            ];
                                        }) => ({
                                        ...prevObject,
                                            messages: [
                                            ...prevObject.messages.slice(0, -1), // Copy previous messages
                                        { ...prevObject.messages[prevObject.messages.length - 1], content: text } // Update the last message
                                        ]
                                        }))
                                    } else {
                                        console.log("The 'content' property does not exist in the JSON object.");
                                    }
                                } 
                            }
                        }
                    }
                }
            })
            .finally(async () => {
                console.log("Done");
                
            }).catch((err)=>{
                console.error(err);
            });
        }catch(error: any){
            console.error("Error in client" + error)
        }
        finally{
            console.log("Refresh?")
            router.refresh()
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col h-[80vh] sm:h-[95vh] mx-2">
            <div className="flex-grow">
                {conversation && (
                    <div className="flex flex-col">
                        <div className="flex-grow h-[8vh]">
                            <Heading
                                title={conversation.name} description={""}
                            />
                        </div>
                        <div className="flex-shrink-0 mx-5">
                            <ChatWindow conversation={conversation} />
                        </div>
                    </div>
                )}

                {!conversation && (
                    <div>
                        <p>No data found.</p>
                    </div>)
                }
            </div>

            {conversation && (
                <div className="flex-shrink-0 mx-5 mt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isSubmitting} placeholder="Hi there, how can I help you?" {...field}/> 
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2" disabled={isSubmitting}>Send</Button>  
                        </form>
                    </Form>
                </div>
            )}

        </div>
    );
}

export default ConversationPage;
