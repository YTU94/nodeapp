var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: string,
  paw: string,
  meta: {
    creatAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function(next){
  if(this.isNew) {
    this.meta.creatAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
})

UserSchema.statics = {
  fetch: function(cb) {
    return this 
      .find()
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema 