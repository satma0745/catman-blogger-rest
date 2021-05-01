# #005 - Introduce user roles

Update the `users` collection according to the following changes in the `User` schema:
```js
Schema({
  // ... same as before
  role: {
    type: Schema.Types.String,
    required: true,
    enum: ['user', 'moderator'],
    default: 'user',
  },
  // ... same as before
})
```

Changes to the `users` collection:
 - make sure each `user` has role
 - make sure each role is either `'user'` or `'moderator'`
