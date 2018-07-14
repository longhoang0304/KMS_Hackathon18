import mongoose, { Schema } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helper/APIError';

const InterviewSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    startTime: {
      type: Schema.Types.Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 200
    },
    requirementScore: {
      type: Number
    }
  },
  {
    collection: 'interview',
  },
);

InterviewSchema.method({
});

InterviewSchema.statics = {
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

export default mongoose.model('Interview', InterviewSchema);