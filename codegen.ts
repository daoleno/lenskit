import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-mumbai.lens.dev',
  documents: 'graphql',
  generates: {
    'packages/@lenskit-react/src/generated-gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
    'packages/@lenskit-client/src/generated-gql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
