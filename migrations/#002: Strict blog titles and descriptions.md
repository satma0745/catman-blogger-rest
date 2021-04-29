# Strict blog titles and descriptions

According to the following changes in the scheme:

```js
Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true, // new
      maxLength: 150, // new
    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true, // new
      maxLength: 500, // new
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)
```

Update blogs collection:

- trim each title
- make sure each title is 150 characters long or less
- trim each description
- make sure each description is 500 characters long or less
