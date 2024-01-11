import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { POST_COMMENT_EDIT, POST_COMMENT_LIST, useApi } from '../../api'
import { useAppSelector } from '../../hooks/store'
import { avatarPath, distanceFormat } from '../../utils'
import './index.css'

type Comment = {
  _id: string
  message: string
  left: number
  right: number
  createdAt?: string
  updatedAt?: string
  createdBy?: string
  postId?: string
  user?: User
  child?: Comment[]
}

type Props = {
  postId: string
}

export const CommentBar = (props: Props) => {
  const [data, setData] = useState<Comment>()

  useEffect(() => {
    getData(props.postId)
  }, [])

  const getData = async (id: string) => {
    const data = (await useApi.get(POST_COMMENT_LIST.replace(':id', id))).data
    setData(data)
  }

  const handleComment = async (text: string, parentId?: string) => {
    await useApi.post(POST_COMMENT_LIST.replace(':id', props.postId), { message: text, parentId: parentId })
    await getData(props.postId)
  }

  const handleEdit = async (text: string, commentId: string) => {
    await useApi.patch(POST_COMMENT_EDIT.replace(':id', commentId), { message: text })
    await getData(props.postId)
  }

  return (
    <div className='comment-bar'>
      <h5>{data && commentCount(data)} bình luận</h5>
      <br />
      <CommentBox onSubmit={(text) => handleComment(text, data?._id)} type='comment' />
      {data?.child?.map((c) => (
        <Comment comment={c} key={c._id} onReply={handleComment} onEdit={handleEdit} />
      ))}
    </div>
  )
}

type CommentBoxProps = {
  onSubmit?: (text: string) => void
  onAbort?: () => void
  type: 'reply' | 'edit' | 'comment'
  defaultValue?: string
}
const CommentBox = (props: CommentBoxProps) => {
  const user = useAppSelector((state) => state.auth.user)
  const [text, setText] = useState<string>(props.defaultValue || '')
  console.log('props.defaultValue', props.defaultValue, props.type)

  const onSubmit = () => {
    if (!text.trim()) return
    if (!user) return toast.info('Đăng nhập để bình luận')
    props.onSubmit && props.onSubmit(text)
    setText('')
  }

  return (
    <div className='comment-box'>
      <div className='avatar'>
        <img
          src={user ? avatarPath(user?.avatar) : '/assets/logo-animation.png'}
          alt={user?.avatar}
          className='avatar-img'
        />
      </div>
      <div className='comment-form'>
        <textarea
          name='message'
          className='form-control input'
          rows={1}
          placeholder={props.type === 'reply' ? 'Phản hồi...' : 'Viết bình luận...'}
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className='actions'>
          <button
            type='button'
            className='btn btn-secondary btn-sm'
            onClick={() => {
              props.onAbort && props.onAbort()
              setText('')
            }}>
            Hủy
          </button>
          <button type='button' className='btn btn-success btn-sm btn-comment' onClick={onSubmit}>
            {props.type === 'reply' ? 'Phản hồi' : props.type === 'edit' ? 'Chỉnh sửa' : 'Bình luận'}
          </button>
        </div>
      </div>
    </div>
  )
}

type CommentProps = {
  comment: Comment
  onReply: (text: string, parentId?: string) => void
  onEdit?: (text: string, commentId: string) => void
}
const Comment = (props: CommentProps) => {
  const { comment, onReply, onEdit } = props
  const [showComment, setShowComment] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const user = useAppSelector((state) => state.auth.user)
  const count = commentCount(comment)

  return (
    <div className='comment'>
      <div className='parent'>
        <div className='avatar'>
          <img src={avatarPath(comment.user?.avatar)} alt={comment.user?.avatar} className='avatar-img' />
        </div>
        <div className='info'>
          <span className='name'>{comment.user?.fullName}</span>
          <span className='time'>{distanceFormat(comment.createdAt)}</span>
          <br />
          <span className='message'>{comment.message}</span>
          <div className='reply'>
            <button
              type='button'
              className='btn btn-secondary btn-sm btn-reply'
              onClick={() => {
                setShowReply(true)
                setShowComment(true)
                setShowEdit(false)
              }}>
              Phản hồi
            </button>
            {count !== 0 && (
              <span
                className='reply-count btn'
                onClick={() => {
                  setShowComment((prev) => !prev)
                }}>
                <i className={`bi ${!showComment ? 'bi-caret-down-fill' : 'bi-caret-up-fill'}`} />
                {` ${count} phản hồi...`}
              </span>
            )}
            {user?._id === comment.user?._id && (
              <span
                className='reply-count btn'
                onClick={() => {
                  setShowReply(false)
                  setShowEdit(true)
                }}>
                Chỉnh sửa
              </span>
            )}
          </div>
          {showReply && (
            <CommentBox
              key={comment._id + 'reply'}
              onAbort={() => setShowReply(false)}
              type='reply'
              onSubmit={(text) => onReply(text, comment._id)}
            />
          )}

          {showEdit && (
            <CommentBox
              key={comment._id + 'edit'}
              onAbort={() => setShowEdit(false)}
              type='edit'
              defaultValue={comment.message}
              onSubmit={(text) => {
                onEdit && onEdit(text, comment._id)
                setShowEdit(false)
              }}
            />
          )}
        </div>
      </div>

      {comment.child && comment.child.length !== 0 && (
        <div className={`child ${showComment ? 'show' : 'collapse'}`}>
          {comment?.child?.map((c) => (
            <Comment comment={c} key={c._id} onReply={onReply} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  )
}

const commentCount = (comment: Comment): number => {
  if (!comment.child) return 0
  const childCount = comment.child?.length
  const reduce = comment.child?.reduce((prev, c) => {
    return prev + commentCount(c)
  }, childCount)
  return reduce
}
