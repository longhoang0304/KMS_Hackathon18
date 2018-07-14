import mongoose, { Schema } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helper/APIError';

const AnswerSchema = new Schema(
  {
    interviewId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    questionId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000
    },
    score: {
      type: Number      
    }
  },
  {
    collection: 'answer',
  },
);

AnswerSchema.method({
});

AnswerSchema.statics = {
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

export default mongoose.model('Answer', AnswerSchema);