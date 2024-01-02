import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { LOCKED_USER_LIST, UNLOCK_USER, useApi } from '../../../../api'
import { avatarPath, dateFormat } from '../../../../utils'
import Modal from '../../../../components/Modal'

export default function LockUserList() {
  const [data, setData] = useState<User[]>([])

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        header: 'Ảnh',
        accessorKey: 'avatar',
        size: 1,
        Cell({
          row: {
            original: { avatar }
          }
        }) {
          if (!avatar) return <></>
          return <img className='avatar-small' src={avatarPath(avatar)} />
        }
      },
      {
        header: 'Họ tên',
        accessorKey: 'fullName',
        size: 1
      },
      {
        header: 'Email',
        accessorKey: 'email',
        size: 1
      },
      {
        header: 'Lý do',
        accessorKey: 'message',
        size: 1
      },
      {
        header: 'Đã khoá',
        Cell({
          row: {
            original: { lockedBy }
          }
        }) {
          if (!lockedBy) return <></>
          return <>{lockedBy.name?.firstName}</>
        },
        size: 1
      },
      {
        header: 'Thời gian',
        accessorKey: 'lockedAt',
        Cell({
          row: {
            original: { lockedAt }
          }
        }) {
          if (!lockedAt) return <></>
          return <>{dateFormat(lockedAt)}</>
        },
        size: 1
      },
      {
        header: 'Thao tác',
        size: 1,
        Cell({ row }) {
          const { _id = '', name } = row.original
          return (
            <>
              <Modal
                id={_id}
                name='unlock'
                title='Xoá khỏi danh sách đen'
                description={`Khôi phục tài khoản "${name?.firstName}" và người dùng có thể truy cập vào hệ thống.`}
                onSubmit={() => unlockUserAccount(_id)}
                button={
                  <button type='button' className='btn btn-primary'>
                    <i className='bi bi-unlock'></i>
                  </button>
                }
              />
            </>
          )
        }
      }
    ],
    []
  )

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = (await useApi(LOCKED_USER_LIST)).data as Data<User>
    setData(data.data)
  }

  const unlockUserAccount = async (id: string) => {
    await useApi(UNLOCK_USER.replace(':id', id), { method: 'PATCH' }).then(() => {
      getData()
      toast.success('Đã xóa khỏi danh sách đen')
    })
  }

  // if (!data) return <></>;
  return (
    <section className='section'>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers />
    </section>
  )
}
