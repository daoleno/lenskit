export interface FeatureCardProps {
  children: React.ReactNode
}
export default function FeatureCard({ children }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center justify-center border p-6 text-center">
      <div className="mt-3 text-gray-600">{children}</div>
    </div>
  )
}
