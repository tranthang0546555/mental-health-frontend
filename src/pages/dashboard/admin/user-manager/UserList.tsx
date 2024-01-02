import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { LOCK_USER, SET_ROLE_ACCOUNT, useApi, USER_LIST } from '../../../../api'
import Modal from '../../../../components/Modal'
import { ROLE } from '../../../../constants'
import { avatarPath } from '../../../../utils'

export default function UserList() {
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
        header: 'Số điện thoại',
        accessorKey: 'phone',
        size: 1
      },
      {
        header: 'Vai trò',
        accessorKey: 'role',
        size: 1
      },
      {
        header: 'Đã xác nhận',
        accessorKey: 'verify',
        Cell({
          row: {
            original: { verify }
          }
        }) {
          return <>{verify ? 'T' : 'F'}</>
        },
        size: 1
      },
      {
        header: 'Thao tác',
        accessorKey: 'actions',
        size: 1,
        Cell({ row }) {
          const { _id = '', name, role, email } = row.original
          return (
            <>
              <Modal
                id={_id}
                name='lock'
                title=' Đưa vào danh sách đen'
                description={`Chuyển người dùng "${
                  name?.firstName || email
                }" vào danh sách đen và người dùng sẽ không thể truy cập vào hệ thống được nữa!`}
                onSubmit={(data) => lockUserAccount(_id, String(data))}
                button={
                  <button type='button' className='btn btn-danger p-2'>
                    <i className='bi bi-lock'></i>
                  </button>
                }
                optional={{
                  input: {
                    name: 'message',
                    className: 'form-control',
                    type: 'text',
                    defaultValue: 'Người dùng vi phạm chinh sách của Mental-Health'
                  }
                }}
              />
              <span> </span>
              <Modal
                id={_id}
                name='role'
                onSubmit={(data) => setRoleAccount(_id, data as Role)}
                title='Quyền truy cập'
                button={
                  <button type='button' className='btn btn-info p-2'>
                    <i className='bi bi-gear'></i>
                  </button>
                }
                description={`Lựa chọn quyền truy cập cho người dùng "${name?.firstName || email}"`}
                optional={{
                  select: {
                    attributes: { defaultValue: role || ROLE.USER },
                    options: [
                      {
                        name: ROLE.USER,
                        value: ROLE.USER
                      },
                      {
                        name: ROLE.DOCTOR,
                        value: ROLE.DOCTOR
                      },
                      {
                        name: ROLE.AS,
                        value: ROLE.AS
                      },
                      {
                        name: ROLE.OSS,
                        value: ROLE.OSS
                      },
                      {
                        name: ROLE.ADMIN,
                        value: ROLE.ADMIN
                      }
                    ]
                  }
                }}
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
    const data = (await useApi.get(USER_LIST)).data as Data<User>
    setData(data.data)
  }

  const lockUserAccount = async (id: string, message: string) => {
    await useApi
      .patch(LOCK_USER.replace(':id', id), {
        message
      })
      .then(() => {
        getData()
        toast.success('Đã đưa vào danh sách đen')
      })
  }

  const setRoleAccount = async (id: string, role: Role) => {
    await useApi
      .patch(SET_ROLE_ACCOUNT.replace(':id', id), {
        role
      })
      .then(() => {
        toast.success('Thay đổi thành công')
        getData()
      })
  }
  // if (!data) return <></>;
  return (
    <section className='section'>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers />
    </section>
  )
}
