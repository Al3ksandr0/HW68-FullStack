// 1
use teaDB

// 2 3
db.reviews.insertMany([
    { teaName: "Puer", origin: "Yunnan", rating: 78 },
    { teaName: "Oolong", origin: "Fujian", rating: 88 },
    { teaName: "White", origin: "Fujian", rating: 83 },
    { teaName: "Red", origin: "Yunnan", rating: 72 },
    { teaName: "Green", origin: "Zhejiang", rating: 90 }
])

// 4
db.reviews.find({ rating: { $gt: 80 } })

// 5
db.reviews.updateOne(
    { rating: { $lt: 85 } },
    { $inc: { rating: 5 } }
)

// 6
db.reviews.deleteOne({}, { sort: { rating: 1 } })

// 7
db.reviews.find({}, { _id: 0, teaName: 1, rating: 1 })

// 8 9
db.reviews.aggregate([
    {
        $group: {
            _id: "$origin",
            averageRating: { $avg: "$rating" }
        }
    },
    {
        $match: {
            averageRating: { $gt: 75 }
        }
    }
])

// 12
db.reviews.createIndex({ teaName: 1 }, { unique: true })

// 13
db.reviews.find({ teaName: { $regex: /^O/, $options: "i" } })

// 14
db.reviews.find({ teaName: { $regex: /^O/, $options: "i" } }).explain("executionStats")
