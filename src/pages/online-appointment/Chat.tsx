import { createRef, forwardRef, useImperativeHandle, useState } from 'react'
import { MessageList, MessageType } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import { JoinRoom } from './dto'
import './index.css'

type Props = {
  room: string
  friend?: JoinRoom
  handleMessageSend: (m: string) => void
}

export type RefChat = {
  receivingMessage: (message: string) => void
}

const Chat = forwardRef<RefChat, Props>((props, ref) => {
  const { room, friend, handleMessageSend } = props
  const messageListReferance = createRef()
  const [text, setText] = useState<string>()

  const [messages, setMessages] = useState<Record<string, any>[]>([])

  useImperativeHandle(ref, () => ({
    receivingMessage(message: string) {
      const m = {
        position: 'left',
        type: 'text',
        text: message,
        date: new Date()
      }
      setMessages((pre) => [...pre, m])
    }
  }))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (!text) return
    const m = {
      position: 'right',
      type: 'text',
      text: text,
      date: new Date()
    }
    setMessages((pre) => [...pre, m])
    handleMessageSend && handleMessageSend(text)
    setText('')
  }

  return (
    <div className='container-chat p-3'>
      <h3>Mã phòng: {room}</h3>
      {friend ? <h6>Đã vào phòng: {friend.nickname}</h6> : <h6>Không có ai trong phòng</h6>}
      <MessageList
        referance={messageListReferance}
        className='message-list'
        lockable={false}
        toBottomHeight={'100%'}
        dataSource={messages as MessageType[]}
      />
      <div className='text-box'>
        <input onChange={handleChange} onKeyPress={handleEnterPress} value={text} className='form-control' />
        <button className='btn btn-success' onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  )
})

export default Chat
