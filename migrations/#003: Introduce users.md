# #003 - Introduce users

Add `users` collection according to the following schema:
```js
Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
    minLength: 6,
    maxLength: 20,
    match: /^[A-Za-z0-9_]*$/,
  },
  password: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 20,
    // Alphanumeric with underscores: requires underscores, digits, lowercase and uppercase letters
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*_)[A-Za-z0-9_]*$/,
  },
  displayName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxLength: 100,
  },
})
```
