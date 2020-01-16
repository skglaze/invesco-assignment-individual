const mongoose = require('./connection')

const InvestmentSchema = new mongoose.Schema({
    InvestmentId: int,
    Region: String,
    Office: String,
    ["Registration Received"]: String,
    ["Investment Name"]: String,
    ["Deal Status"]: String,
    City: String,
    State: {
        Province: String
    },
    ["Deal Source"]: String,
    ["Acquisition Officer"]: String
})

const InvestmentCollection = mongoose.model('Investment', InvestmentSchema)

const getAllInvestments = () => {
    return InvestmentCollection.find({})
}

const getInvestments = (investmentId) => {
    return InvestmentCollection.findById(investmentId)
}

const addNewInvestment = (newInvestment) => {
    return InvestmentCollection.create(newInvestment)
}

const updateInvestment = (investmentId, investmentData) => {
    return InvestmentCollection.updateOne({ _id: investmentId }, investmentData)
}

const deleteInvestment = (investmentId) => {
    return InvestmentCollection.deleteOne({ _id: investmentId })
}

module.exports = {
    getAllInvestments,
    getInvestments,
    addNewInvestment,
    updateInvestment,
    deleteInvestment
}