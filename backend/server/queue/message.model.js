import mongoose, { Schema } from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helper/APIError';

const MessageSchema = new Schema(
  {
    from: {
      // each message can only have one sender
      // sender can be productID/UserId
      type: {
        senderId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        deviceId: {
          type: String,
          required: true,
        },
        required: true,
      },
    },
    to: {
      // one message can only have one receiver
      // sender can be productID/UserId
      type: {
        receiverId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        deviceId: {
          type: String,
          required: true,
        },
        required: true,
      },
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      default: new Date(),
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: 'msg_queue',
  },
);

MessageSchema.method({
});

MessageSchema.statics = {
  async get(receiverId, deviceId) {
    const sort = {
      priority: -1,
      createdAt: -1,
    };
    const msg = await this.findOneAndRemove({
      to: {
        receiverId, deviceId,
      },
    }, { sort }).exec();
    if (msg) {
      return msg;
    }
    throw new APIError('No such msg exist!', httpStatus.NOT_FOUND);
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      // .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

export default mongoose.model('Message', MessageSchema);