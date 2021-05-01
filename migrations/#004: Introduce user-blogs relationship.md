# #004 - Introduce user-blogs relationship

Update the collections according to the following changes in `Blog` and `User` schemas:
```js
const blogSchema = Schema(
  {
    // ... same as before
    ownerId: {
      // ... same as before
      ref: 'User',
      // ... same as before
    },
  },
  { timestamps: true }
)

const userSchema = Schema({
  // ... same as before
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})
```

Changes to the `blogs` collection:
- make sure each `blog.ownerId` has a corresponding `user`

Changes to the `users` collection:
- for each `user` add `blogs` field containing all blog `_id`s whose `ownerId` is `user._id`
