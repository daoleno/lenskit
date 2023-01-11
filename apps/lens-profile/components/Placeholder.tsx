export default function Placeholder({
  message,
  description,
}: {
  message: string
  description?: string
}) {
  return (
    <div className="flex h-screen flex-col place-content-center items-center space-y-3 bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">{message}</h1>
      {description && <p className="text-sm uppercase text-gray-400">{description}</p>}
    </div>
  )
}
