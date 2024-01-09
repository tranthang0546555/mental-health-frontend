import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import { TREATMENT_DETAIL, TREATMENT_LIST, useApi } from '../../../api'
import { dateFormat } from '../../../utils'

export default function TreatmentManager() {
  const [data, setData] = useState<Treatment[]>([])
  const columns = useMemo<MRT_ColumnDef<Treatment>[]>(
    () => [
      {
        header: 'Tiêu đề',
        accessorKey: 'title'
      },
      {
        header: 'Mô tả',
        Cell({ row }) {
          return <span className='text-line-clamp-5'>{row.original.description}</span>
        }
      },
      {
        header: 'Đường dẫn',
        accessorKey: 'link'
      },
      {
        header: 'Tạo',
        accessorFn: (originalRow) => dateFormat(originalRow.createdAt),
        size: 1
      },
      {
        header: 'Thao tác',
        accessorKey: '_id',
        size: 1,
        Cell({ row }) {
          const { _id, title } = row.original
          return (
            <div className='group-btn'>
              <div
                className='modal fade'
                id={'modal-' + _id}
                tabIndex={-1}
                aria-labelledby='modalLabel'
                aria-hidden='true'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='modalLabel'>
                        Bạn muốn xoá mục này!
                      </h1>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>{title}</div>
                    <div className='modal-footer'>
                      <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                        Huỷ bỏ
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        data-bs-dismiss='modal'
                        onClick={() => deleteTreatment(_id)}>
                        Xoá
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button type='button' className='btn btn-danger' data-bs-toggle='modal' data-bs-target={`#modal-${_id}`}>
                <i className='bi bi-trash'></i>
              </button>{' '}
              {/* <Link
                to={`/dashboard/treatment/${_id}`}
                className="btn btn-primary"
              >
                <i className="bi bi-pencil-square"></i>
              </Link> */}
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
    const data = (await useApi.get(TREATMENT_LIST)).data as Data<Treatment>
    setData(data.data)
  }

  const deleteTreatment = async (id: string) => {
    await useApi.delete(TREATMENT_DETAIL.replace(':id', id)).then(() => {
      // TODO notification
      getData()
    })
  }

  return (
    <section className='section'>
      <MaterialReactTable columns={columns} data={data} enableFilters={false} enableRowNumbers />
    </section>
  )
}
