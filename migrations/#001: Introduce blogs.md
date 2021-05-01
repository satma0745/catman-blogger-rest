# #001 - Introduce blogs

Add `blogs` collection according to the following schema:
```js
Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)
```
