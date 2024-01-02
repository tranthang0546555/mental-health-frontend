import { useEffect, useState } from 'react'
import { CATEGORY_LIST, useApi } from '../../api'

type Props = {
  onChange: (id: string) => void
}
export default function Categories({ onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    getCategoriest()
  }, [])

  const getCategoriest = async () => {
    await useApi(CATEGORY_LIST).then((res) => {
      const data = res.data as Data<Category>
      setCategories(data.data)
    })
  }

  return (
    <div className='sidebar-item categories'>
      <h3 className='sidebar-title'>
        Categories
        <i onClick={() => onChange('')} className='bi bi-x-circle clean'></i>
      </h3>
      <ul className='mt-3'>
        {categories.map((cate) => (
          <li key={cate._id} onClick={() => onChange(cate._id)}>
            <u>{cate.name}</u>
          </li>
        ))}
      </ul>
    </div>
  )
}
