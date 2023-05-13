import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateHourChallenge: { type: Date },
    status: { type: String },
    dateHourRequest: { type: Date, default: Date.now },
    dateHourResponse: { type: Date },
    requester: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'challenges',
  },
);
