import { useEffect, useState } from 'react'

type Props = {
  id: string
  name: string
  onSubmit: (data: unknown) => void
  title: string
  description?: string
  button?: React.ReactNode
  optional?: Optional
}

type Optional = {
  input?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  select?: {
    attributes?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
    options: {
      name: string
      value: string | number
    }[]
  }
}

export default function Modal(props: Props) {
  const [optionalValue, setOptionalValue] = useState<any>()
  const { id, name, title, description, button, optional, onSubmit } = props

  useEffect(() => {
    if (optional?.input) setOptionalValue(optional.input.defaultValue)
    if (optional?.select) setOptionalValue(optional.select.attributes?.defaultValue)
  }, [])

  const renderOptional = (optional: Optional) => {
    const { input, select } = optional
    if (input) return <input {...input} onChange={(e) => setOptionalValue(e.target.value)} />
    if (select)
      return (
        <select className='form-select' {...select.attributes} onChange={(e) => setOptionalValue(e.target.value)}>
          {select.options?.map((option, idx) => (
            <option value={option.value} key={idx}>
              {option.name}
            </option>
          ))}
        </select>
      )
  }

  return (
    <>
      <div
        className='modal fade'
        id={`modal-${name}-${id}`}
        tabIndex={-1}
        aria-labelledby='modalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='modalLabel'>
                {title}
              </h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {description}
              <div className='pt-3'>{optional && renderOptional(optional)}</div>
            </div>

            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Huỷ bỏ
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => onSubmit(optionalValue)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
      <span data-bs-toggle='modal' data-bs-target={`#modal-${name}-${id}`}>
        {button}
      </span>
    </>
  )
}
