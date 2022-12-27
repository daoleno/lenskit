import React from 'react'

interface AlertProps {
  color: string
  children: React.ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
  const { color, children } = props
  return (
    <div style={{ backgroundColor: color, padding: '20px', borderRadius: '5px' }}>{children}</div>
  )
}

export default Alert
