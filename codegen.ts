import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api-mumbai.lens.dev',
  documents: 'graphql',
  generates: {
    'packages/@lenskit-react/src/generated-gql.ts': {
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        // 'typed-document-node',
        'fragment-matcher',
      ],
      config: {
        dedupeFragments: true,
      },
    },
  },
}

export default config
