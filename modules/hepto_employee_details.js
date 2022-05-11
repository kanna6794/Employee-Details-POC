var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default:''
  },
  name: {
    type: String,
    default:''
  },
  gender: {
    type: String,
    default:''
  },
  contact: {
    type: String,
    default:''
  },
  profile_img: {
    type: String,
    default:''
  },
  resume_doc: {
    type: String,
    default:''
  }
},
  { collection: 'hepto_employee_details' });

module.exports = mongoose.model('hepto_employee_details', UserSchema);


