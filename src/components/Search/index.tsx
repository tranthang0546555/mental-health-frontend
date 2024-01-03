import { useDebouncedCallback } from 'use-debounce'
import './index.css'

type Props = {
  title?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (text: string) => void
}

export default function Search(props: Props) {
  const { defaultValue, placeholder, title, onChange } = props

  const handleChange = useDebouncedCallback((text: string) => {
    onChange && onChange(text)
  }, 500)

  return (
    <div className='sidebar-item search-form'>
      <h3 className='sidebar-title'>{title ?? 'Tìm kiếm'}</h3>
      <form onSubmit={(event) => event.preventDefault()} className='mt-3'>
        <input
          type='text'
          defaultValue={defaultValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          title='search-text'
        />
        <button type='submit' title='search'>
          <i className='bi bi-search'></i>
        </button>
      </form>
    </div>
  )
}
