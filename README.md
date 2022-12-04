# 🌿 LensKit 🌿

lenskit is a set of libraries for integrating lens protocol into your application.

## Installation

```bash
yarn add @lenskit/react
```

**Warning**
This package is still in development and not ready for production.

## Hooks

useAuth

```tsx
const { auth, token, error } = useAuth()
```

useIndexedTx

```tsx
const { tx, error } = useIndexedTx(txHash)
```

useProfile

```tsx
const { profile, loading, error } = useProfile('profileId')
```

useProfiles

```tsx
const { profiles, loading, error } = useProfiles(['profileId1', 'profileId2'])
```

useCreateProfile

```tsx
const { createProfile, profileId, loading, error } = useCreateProfile()
```

useSetProfileMetadata

```tsx
const { setProfileMetadata, tx, loading, error } = useSetProfileMetadata()
```

usePost

```tsx
const { post, publicationId, loading, error } = usePost()
```

useCollect

```tsx
const { collect, tx, loading, error } = useCollect()
```

useComment

```tsx
const { comment, publicationId, loading, error } = useComment()
```

useMirror

```tsx
const { createMirror, publicationId, loading, error } = useMirror()
```

useFollow

```tsx
const { follow, tx, loading, error } = useFollow()
```

useUnfollow

```tsx
const { unfollow, tx, loading, error } = useUnfollow()
```

usePublication

```tsx
const { publication, loading, error } = usePublication(publicationId)
```

usePublications

```tsx
const { publications, loading, error } = usePublications(profileId, [PublicationTypes.Post])
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
