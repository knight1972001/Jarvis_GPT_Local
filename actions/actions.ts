'use server'

import { pusherServer } from "@/lib/pusher"

export const updateConversation = async (conversation: any) => {
  try{
    console.log("Update One conversations")
      const apiURL = process.env.MONGODB_API + 'action/updateOne'
      // console.log(id)
      if(!apiURL) {
          throw new Error("API URL is not defined in the config")
      }

      const headers:any = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': process.env.MONGDODB_API_KEY,
          'Cache-Control': 'no-cache'
          // Add any other headers as needed
        };

        const requestBody = {
          // Add your request body data here
          dataSource: 'conversation',
          database: 'gptLocal',
          collection: 'conversation',
          filter: { id: conversation.id },
          update: { "$set": { messages: conversation.messages}}
        };
    
        const responseData = await fetch(apiURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestBody),
        });
    
        // console.log(responseData)
  }catch(err){
      console.error(err);
  }
}

export const insertConversation = async (conversation: any) => {
  try{
    console.log("Insert One conversations")
      const apiURL = process.env.MONGODB_API + 'action/insertOne'
      // console.log(id)
      if(!apiURL) {
          throw new Error("API URL is not defined in the config")
      }

      const headers:any = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': process.env.MONGDODB_API_KEY,
          'Cache-Control': 'no-cache'
          // Add any other headers as needed
        };

    
        const requestBody = {
          // Add your request body data here
          dataSource: 'conversation',
          database: 'gptLocal',
          collection: 'conversation',
          document: conversation
        };
    
        const responseData = await fetch(apiURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestBody),
        });
    
        // console.log(responseData)

        pusherServer.trigger("my-channel", 'my-event', {message: "hello"})
  }catch(err){
      console.error(err);
  }
}

export const getOneConversation = async (id: string) => {
    try{
      console.log("Getting One conversations")
        const apiURL = process.env.MONGODB_API + `action/findOne?timestamp=${Date.now()}`
        // console.log(id)
        if(!apiURL) {
            throw new Error("API URL is not defined in the config")
        }

        const headers:any = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'api-key': process.env.MONGDODB_API_KEY,
            'Cache-Control': 'no-cache'
            // Add any other headers as needed
          };

      
          const requestBody = {
            // Add your request body data here
            dataSource: 'conversation',
            database: 'gptLocal',
            collection: 'conversation',
            "filter": { "id": id }
          };
      
          const response = await fetch(apiURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
          });
      
          // Assuming you want to parse the response as JSON
          const responseData = await response.json();
          // console.log(responseData.document)
          return responseData.document
    }catch(err){
        console.error(err);
    }
}

export const deleteOneConversation = async (id: string) => {
  try{
    console.log("Deleting One conversations")
      const apiURL = process.env.MONGODB_API + `action/deleteOne`
      // console.log(id)
      if(!apiURL) {
          throw new Error("API URL is not defined in the config")
      }

      const headers:any = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': process.env.MONGDODB_API_KEY,
          'Cache-Control': 'no-cache'
          // Add any other headers as needed
        };

    
        const requestBody = {
          // Add your request body data here
          dataSource: 'conversation',
          database: 'gptLocal',
          collection: 'conversation',
          "filter": { "id": id }
        };
    
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestBody),
        });
    
        // Assuming you want to parse the response as JSON
        const responseData = await response.json();
        // console.log(responseData.document)
        pusherServer.trigger("my-channel", 'my-event', {message: "hello"})
  }catch(err){
      console.error(err);
  }
}


export const getAllConversation = async () => {
  try{
    console.log("Getting all conversations")
      const apiURL = process.env.MONGODB_API + `action/find?timestamp=${Date.now()}`
      // console.log(apiURL)
      if(!apiURL) {
          throw new Error("API URL is not defined in the config")
      }

      const headers:any = {
          'Content-Type': 'application/ejson',
          'Accept': 'application/json',
          'api-key': process.env.MONGDODB_API_KEY,
          'Cache-Control': 'no-store, max-age=0'
          // Add any other headers as needed
        };
    
        const requestBody = {
          // Add your request body data here
          dataSource: 'conversation',
          database: 'gptLocal',
          collection: 'conversation',
          sort: {_id: -1}
        };
    
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestBody),
        });
    
        // Assuming you want to parse the response as JSON
        const responseData = await response.json();
        // console.log(responseData.documents)
        return responseData.documents
  }catch(err){
      console.error(err);
  }
}
