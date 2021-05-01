# #002 - Strict blog titles and descriptions

Update the `blogs` collection according to the following changes in the schema:
```js
Schema(
  {
    title: {
      // ... same as before
      trim: true,
      maxLength: 150,
    },
    description: {
      // ... same as before
      trim: true, 
      maxLength: 500,
    },
    // ... same as before
  },
  { timestamps: true }
)
```

Changes to the `blogs` collection:
- trim each title
- make sure each title is 150 characters long or less
- trim each description
- make sure each description is 500 characters long or less
