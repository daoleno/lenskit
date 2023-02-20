import { useState } from 'react'
type ColorPaletteProps = {
  currentColor: string
  onColorSelect: (color: string) => void
}

const ColorPalette = ({ currentColor, onColorSelect }: ColorPaletteProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const gradients = [
    'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100',
    'bg-gradient-to-r from-rose-100 to-teal-100',
    'bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500',
    'bg-gradient-to-r from-sky-400 to-cyan-300',
    'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
    'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
    'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
    'bg-gradient-to-r from-green-300 to-purple-400',
  ]

  const handleColorClick = (color: string) => {
    onColorSelect(color)
    setSelectedIndex(gradients.indexOf(color))
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {gradients.map((gradient, index) => (
        <div
          key={index}
          className={`h-12 w-12 cursor-pointer rounded-md shadow-md ${gradient} 
            ${
              index === selectedIndex
                ? 'ring-2 ring-gray-500 ring-offset-2 ring-offset-gray-500'
                : ''
            }`}
          onClick={() => handleColorClick(gradient)}
        />
      ))}
    </div>
  )
}

export default ColorPalette
