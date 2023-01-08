export default function Placeholder({ message }: any) {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">{message}</h1>
    </div>
  )
}
