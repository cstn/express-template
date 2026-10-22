import {
  HydratedDocument,
  InferSchemaType,
  model,
  Schema,
  Types,
} from 'mongoose';

const contentSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, nullable: true },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false },
    isDeleted: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, required: false, nullable: true, default: null },
  },
  { timestamps: true }
);

contentSchema.index({ createdAt: -1 });

export type Content = InferSchemaType<typeof contentSchema>;
export type ContentDoc = HydratedDocument<Content>;
export const ContentModel = model('contents', contentSchema);
