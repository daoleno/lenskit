import { Flex, useColorModeValue } from '@chakra-ui/react'
export interface FeatureCardProps {
  children: React.ReactNode
}
export default function FeatureCard({ children }: FeatureCardProps) {
  return (
    <Flex align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <div className="mt-3 text-gray-600">{children}</div>
    </Flex>
  )
}
