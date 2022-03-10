import mongoose from 'mongoose';

const credentialsSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    lowercase: true,
  },
  loginName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const divisionsSchema = mongoose.Schema({
  divisionName: {
    type: String,
    required: true,
    lowercase: true,
  },
  credentials: [credentialsSchema]
});

const UnitSchema = mongoose.Schema({
  unitName: {
    type: String,
    required: true,
    lowercase: true,
  },
  divisions:[divisionsSchema]
}, {collection: 'organisationUnits'} );

const unit = mongoose.model('UnitSchema', UnitSchema);

export default unit;