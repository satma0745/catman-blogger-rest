const { Schema, model } = require('mongoose')

const userSchema = Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: 'username must be unique',
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
  role: {
    type: Schema.Types.String,
    required: true,
    enum: ['user', 'moderator'],
    default: 'user',
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.statics.usernameIsTaken = function usernameIsTaken(username) {
  return this.exists({ username })
}

userSchema.statics.isModerator = async function isModerator(id) {
  const user = await this.findById(id)
  return user?.role === 'moderator'
}

userSchema.methods.usernameIsTaken = function usernameIsTaken(username) {
  return this.model('User').exists({ username, _id: { $ne: this._id } })
}

const User = model('User', userSchema)

module.exports = User
