import './index.css'

type Skeleton = {
  width?: number | string
  height?: number | string
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text'
  className?: string
}

export default function Skeleton(props: Skeleton) {
  const { variant = 'rectangular', className, ...rest } = props
  return <span className={`skeleton ${variant} ${className}`} style={{ ...rest }} />
}
