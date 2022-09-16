import mongoose from "mongoose";
const OrderSchema = mongoose.Schema({
    order: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    client:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'clients'
    },
    seller:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    state: {
        type: String,
        default: 'PENDING'
    }

}, { timestamps: true });

export default OrderSchema;
