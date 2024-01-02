export interface JoinRoom {
  userId: string
  room: string
  nickname: string
  socketId: string
}

export interface SendSignal {
  signal: any
  socketId: string
}

export interface ReceivingSignal {
  signal: any
  sender: string
}

export interface MessageDto {
  message: string
  socketId: string
}
