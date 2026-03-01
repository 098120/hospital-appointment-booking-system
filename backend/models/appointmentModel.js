import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    docId: {type: String, required: true},
    slotDate: {type: String, required: true},
    slotTime: {type: String, required: true},
    userDate: {type: Object, required: true},
    docId: {type: Object, required: true},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    cncelled: {type: Boolean, default: false},
    payment: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
})

const appointmentModel = mongoose.model("appointments", appointmentSchema)

export default appointmentModel