# Introduce user-blogs relationship

Update the collections according to the following changes in `blog` and `user` schemas:

```js
const blogSchema = Schema(
  {
    // ... same as before
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // new
      required: true,
    },
  },
  { timestamps: true }
)

const userSchema = Schema({
  // ... same as before
  blogs: [
    // new
    {
      // new
      type: Schema.Types.ObjectId, // new
      ref: 'Blog', // new
    }, // new
  ], // new
})

// new
userSchema.statics.usernameIsTaken = function usernameIsTaken(username) {
  return this.exists({ username })
}

// new
userSchema.methods.usernameIsTaken = function usernameIsTaken(username) {
  return this.model('User').exists({ username, _id: { $ne: this._id } })
}
```

Changes to the `blogs` collection:

- make sure each `blog.ownerId` has a corresponding `user`

Changes to the `users` collection:

- for each `user` add `blogs` field containing all blog `_id`s whose `ownerId` is `user._id`
