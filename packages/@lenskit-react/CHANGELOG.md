# @lenskit/react

## 0.0.1

### Patch Changes

- ffc1e09: 

  Added 14 react hooks

  useAuth: a hook that retrieves the current authentication status, token, and error if any.

  useIndexedTx: a hook that retrieves a transaction by its hash, and returns the transaction and error if any.

  useProfile: a hook that retrieves a profile by its ID, and returns the profile, loading status, and error if any.

  useProfiles: a hook that retrieves multiple profiles by their IDs, and returns the profiles, loading status, and error if any.

  useCreateProfile: a hook that creates a new profile, and returns the created profile ID, loading status, and error if any.

  useSetProfileMetadata: a hook that sets metadata for a profile, and returns the transaction, loading status, and error if any.

  usePost: a hook that creates a new post, and returns the post, publication ID, loading status, and error if any.

  useCollect: a hook that collects a publication, and returns the transaction, loading status, and error if any.

  useComment: a hook that creates a new comment, and returns the comment, publication ID, loading status, and error if any.

  useMirror: a hook that creates a new mirror, and returns the mirror, publication ID, loading status, and error if any.

  useFollow: a hook that follows a profile, and returns the transaction, loading status, and error if any.

  useUnfollow: a hook that unfollows a profile, and returns the transaction, loading status, and error if any.

  usePublication: a hook that retrieves a publication by its ID, and returns the publication, loading status, and error if any.

  usePublications: a hook that retrieves publications for a given profile ID and publication type(s), and returns the publications, loading status, and error if any.
