import mongoose, { Schema } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helper/APIError';

const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 200
    },
    address: {
      type: String,
      required: true,
      maxlength: 200
    },
  },
  {
    collection: 'organization',
  },
);

OrganizationSchema.method({
});

OrganizationSchema.statics = {
  async get(id) {
    const Model = await this.findById(id).exec();
    if (Model) {
      return Model;
    }
    throw new APIError('No such question exist!', httpStatus.NOT_FOUND);
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      // .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

export default mongoose.model('Organization', OrganizationSchema);