import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Peer from 'simple-peer'
import io, { Socket } from 'socket.io-client'
import { useAppSelector } from '../../hooks/store'
import Chat, { RefChat } from './Chat'
import { JoinRoom, MessageDto, ReceivingSignal } from './dto'
import './index.css'

export default function RoomDetail({ room }: { room: string }) {
  const myVideo = useRef<HTMLVideoElement>(null)
  const friendVideo = useRef<HTMLVideoElement>(null)
  const myPeer = useRef<Peer.Instance>()
  const socket = useRef<Socket>()
  const user = useAppSelector((state) => state.auth.user)

  const [friend, setFriend] = useState<JoinRoom>()
  const [loading, setLoading] = useState(false)

  const refChat = useRef<RefChat>(null)

  useEffect(() => {
    if (!user) return
    socket.current = io(`${import.meta.env.VITE_BASE_URL}`, {
      path: '/gateway',
      transports: ['websocket']
    })

    const nickname = user.fullName
    if (!socket.current) return

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (!myVideo.current) return
        myVideo.current.srcObject = stream
        socket.current?.emit('join-room', {
          userId: user?._id,
          nickname: nickname,
          room: room,
          socketId: socket.current.id
        } as JoinRoom)

        socket.current?.on('late-in', (payload: JoinRoom) => {
          console.log('late-in', payload)
          toast.warn('Người dùng đã vào phòng')
          setFriend(payload)
          setLoading(true)
          const peer = createPeer(stream, payload.socketId)
          myPeer.current = peer
        })

        socket.current?.on('first-in', (payload: JoinRoom) => {
          console.log('first-in', payload)
          setFriend(payload)
        })

        socket.current?.on('receiving-signal', (payload: ReceivingSignal) => {
          const { signal, sender } = payload
          const peer = addPeer(stream, signal, sender)

          peer.on('stream', (stream) => {
            if (!friendVideo.current) return
            friendVideo.current.srcObject = stream
          })
          setLoading(false)
        })

        socket.current?.on('re-receiving-signal', (payload: ReceivingSignal) => {
          const { signal } = payload
          console.log('re-receiving-signal')
          myPeer.current?.signal(signal)
          myPeer.current?.on('stream', (stream) => {
            if (!friendVideo.current) return
            friendVideo.current.srcObject = stream
          })
          setLoading(false)
        })

        socket.current?.on('user-leave', () => {
          toast.warn('Người dùng đã rời phòng')
          setFriend(undefined)
          setLoading(true)
        })

        socket.current?.on('receive-message', (payload: MessageDto) => {
          console.log('receive-message', payload)
          if (!refChat.current) return
          refChat.current.receivingMessage(payload.message)
        })
      })
      .catch((reason) => {
        console.log(reason)
      })
  }, [user, navigator.mediaDevices])

  const createPeer = (stream: MediaStream, socketId: string) => {
    console.log('create peer - send-signal')
    const peer = new Peer({ initiator: true, trickle: false, stream: stream })

    peer.on('signal', (signal) => {
      console.log('send-signal')
      socket.current?.emit('send-signal', { signal, socketId })
    })

    return peer
  }

  const addPeer = (stream: MediaStream, signal: Peer.SignalData, socketId: string) => {
    const peer = new Peer({ initiator: false, trickle: false, stream: stream })
    console.log('receiving-signal')
    peer.on('signal', (signal) => {
      socket.current?.emit('re-send-signal', { signal, socketId })
    })
    peer.signal(signal)
    return peer
  }

  const handleMessageSend = (m: string) => {
    if (friend?.socketId)
      socket.current?.emit('send-message', {
        message: m,
        socketId: friend?.socketId
      } as MessageDto)
  }

  return (
    <div className='room p-3'>
      <div className='row p-3'>
        <div className='col-lg-9 container-left'>
          <Link className='btn btn-secondary close' to='/dashboard/appointment/progress'>
            <i className='bi bi-box-arrow-left'></i>
          </Link>
          <div className='container-video-me'>
            <video muted ref={myVideo} autoPlay playsInline />
          </div>
          <div className='container-video-friend'>
            {loading && (
              <div className='loading'>
                <div className='spinner-border text-primary' role='status' />
              </div>
            )}
            <video ref={friendVideo} autoPlay playsInline />
          </div>
        </div>
        <div className='col-lg-3'>
          <Chat room={room} friend={friend} ref={refChat} handleMessageSend={handleMessageSend} />
        </div>
      </div>
    </div>
  )
}
