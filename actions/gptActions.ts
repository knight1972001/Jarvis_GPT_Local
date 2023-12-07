'use server'
import { OpenAIStream, StreamingTextResponse } from "ai"

export const getResponseConversation = async (messages: any, max_tokens: number = 100) => {
    try{
        console.log("Chat Completion conversations")
        const apiURL = process.env.LOCAL_ENDPOINT
        console.log(apiURL)
        if(!apiURL) {
            throw new Error("API URL is not defined in the config")
        }

        const headers:any = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // Add any other headers as needed
            };

        const requestBody = {
        "messages": messages,
        "max_tokens": max_tokens,
        "stream": true
        }

        const response:any = await fetch(apiURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
        });
        console.log(response);

        return response;
        // console.log("Reader")
        // const reader:any = response.body.getReader();

        // while (true) {
        //     const { done, value } = await reader.read();
        //     // done is true once the response is done
        //     if(done) {
        //         break;
        //     }        
        //     console.log(value)

        //     const text = new TextDecoder().decode(value);

        // }
        
        // console.log("AISTREAM")
        // const stream = OpenAIStream(response);
        // console.log(stream)
        // console.log(new StreamingTextResponse(stream))
        // Assuming you want to parse the response as JSON
        // const responseData = await response.json();
        // console.log(responseData)
        // return responseData
        // return new StreamingTextResponse(stream)
    }catch(err){
        console.error("Error in actions: "+err);
    }
}