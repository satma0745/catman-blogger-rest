#Migration #001 - Introduce blogs

Add blogs collection.
Blog schema:

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
