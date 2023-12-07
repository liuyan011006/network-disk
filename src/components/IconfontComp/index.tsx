import { FC } from 'react'

interface IIconfontCompProps {
  name: string
  className?: string
  size?: string
}

const IconfontComp: FC<IIconfontCompProps> = ({ name, className, size }) => {
  return (
    <svg
      className={`icon ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <use xlinkHref={'#icon-' + name}></use>
    </svg>
  )
}

export default IconfontComp
