'use client'
import { Message } from "@/app/model/Message"
import ContentMD from "@/app/shared/ContentMD"
import { useChat } from "@/hooks/useChat"
import Image from "next/image"
import { useState } from "react"

export default function Chat() {
    const { chatId, messages, addMessage, clearMessages, thinking } = useChat()
    const [text, setText] = useState<string>('')
    return (
        <div>
            <h1>Chat</h1>
            <h2>{chatId.toString()}</h2>
            <button onClick={clearMessages}>Clear</button>
            {thinking && 
            <div>
                <Image src="/pensando.gif" alt="Thinking" width={50} height={50} />
            </div>
            }
            <ul>
                {messages.map((message: Message) => (
                    <li key={message.id} className="flex flex-col gap-2">
                        <p>{message.author}</p>
                        <ContentMD markdown={message.text} />
                    </li>
                ))}
            </ul>

            <input type="text" value={text} className="border border-gray-300 rounded-md p-2" onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addMessage(text)
                        setText('')
                    }
                }}
                />
                

        </div>
    )
}
