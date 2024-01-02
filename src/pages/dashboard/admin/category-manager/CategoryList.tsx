import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_DETAIL, CATEGORY_LIST, useApi } from '../../../../api'
import { dateFormat } from '../../../../utils'

export default function CategoryList() {
  const [data, setData] = useState<Category[]>([])

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        header: 'Tên',
        accessorKey: 'name'
      },
      {
        header: 'Mô tả',
        accessorFn(originalRow) {
          return (
            <textarea
              className='form-control'
              id='experience'
              name='experience'
              defaultValue={originalRow.description}
              disabled
              rows={5}
            ></textarea>
          )
        },
        size: 300
      },

      {
        header: 'Tạo',
        accessorFn(originalRow) {
          return dateFormat(originalRow.createdAt)
        }
      },
      {
        header: 'Thao tác',
        size: 1,
        Cell({ row }) {
          const { _id, name } = row.original
          return (
            <div className='group-btn'>
              <div
                className='modal fade'
                id={'modal-' + _id}
                tabIndex={-1}
                aria-labelledby='modalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='modalLabel'>
                        Bạn muốn xoá thể loại này!
                      </h1>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>{name}</div>
                    <div className='modal-footer'>
                      <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                        Huỷ bỏ
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-dismiss='modal'
                        onClick={() => deleteCategoty(_id)}
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button type='button' className='btn btn-danger' data-bs-toggle='modal' data-bs-target={`#modal-${_id}`}>
                <i className='bi bi-trash'></i>
              </button>{' '}
              <Link to={`/dashboard/post/category/${_id}`} className='btn btn-primary'>
                <i className='bi bi-pencil-square'></i>
              </Link>
            </div>
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
    const data = (await useApi(CATEGORY_LIST)).data as Data<Category>
    setData(data.data)
  }

  const deleteCategoty = async (id: string) => {
    await useApi(CATEGORY_DETAIL.replace(':id', id), {
      method: 'DELETE'
    }).then(() => {
      // TODO notification
      getData()
    })
  }

  // if (!data) return <></>;
  return (
    <section className='section'>
      <Link to='create'>
        <button className='btn btn-primary mb-3'> Tạo mới</button>
      </Link>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers />
    </section>
  )
}
