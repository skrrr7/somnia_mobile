<<<<<<< HEAD
<<<<<<< HEAD
import HeartRate from '../models/heartRateModel.js';
=======
import HeartRate from "../models/heartRateModel.js";
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6

export const addHeartRate = async (req, res) => {
    const { lastModifiedTime, id, samples, startTime, endTime, userId } = req.body;

    if (!userId || !lastModifiedTime || !id || !samples || !startTime || !endTime) {
        return res.status(400).json({ success: false, message: 'Missing required details!' });
    }

    try {
        const heartRateData = new HeartRate({
            user: userId,
            id,
            lastModifiedTime: new Date(lastModifiedTime),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            samples
        });

        await heartRateData.save();
<<<<<<< HEAD

=======
import HeartRate from "../models/heartRateModel.js";

export const addHeartRate = async (req, res) => {
    const { lastModifiedTime, id, samples, startTime, endTime, userId } = req.body;

    if (!userId || !lastModifiedTime || !id || !samples || !startTime || !endTime) {
        return res.status(400).json({ success: false, message: 'Missing required details!' });
    }

    try {
        const heartRateData = new HeartRate({
            user: userId,
            id,
            lastModifiedTime: new Date(lastModifiedTime),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            samples
        });

        await heartRateData.save();
>>>>>>> ca24ff9c3e81bf121923869272d60b633f134d5a
=======
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
        return res.status(201).json({ success: true, message: "Heart rate data added successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
<<<<<<< HEAD
<<<<<<< HEAD

export const getHeartRateData = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate, limit = 100, page = 1 } = req.query;

    try {
        let query = { user: userId };

        // Add date filtering if provided
        if (startDate || endDate) {
            query.startTime = {};
            if (startDate) {
                query.startTime.$gte = new Date(startDate);
            }
            if (endDate) {
                query.startTime.$lte = new Date(endDate);
            }
        }

        const skip = (page - 1) * parseInt(limit);
        
        const heartRateData = await HeartRate.find(query)
            .sort({ startTime: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const totalCount = await HeartRate.countDocuments(query);

        return res.status(200).json({ 
            success: true, 
            data: heartRateData,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalRecords: totalCount,
                hasNext: skip + heartRateData.length < totalCount,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getHeartRateById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Heart rate ID is required' });
    }

    try {
        const heartRateData = await HeartRate.findOne({ id, user: userId });

        if (!heartRateData) {
            return res.status(404).json({ success: false, message: "Heart rate data not found" });
        }

        return res.status(200).json({ success: true, data: heartRateData });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateHeartRateData = async (req, res) => {
    const { id } = req.params;
    const { lastModifiedTime, samples, startTime, endTime } = req.body;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Heart rate ID is required' });
    }

    try {
        const heartRateData = await HeartRate.findOne({ id, user: userId });

        if (!heartRateData) {
            return res.status(404).json({ success: false, message: "Heart rate data not found" });
        }

        // Update fields if provided
        if (lastModifiedTime) {
            heartRateData.lastModifiedTime = new Date(lastModifiedTime);
        }
        
        if (samples && Array.isArray(samples)) {
            // Validate samples
            for (const sample of samples) {
                if (!sample.beatsPerMinute || !sample.time) {
                    return res.status(400).json({ success: false, message: 'Each sample must have beatsPerMinute and time' });
                }
            }
            
            heartRateData.samples = samples.map(sample => ({
                beatsPerMinute: sample.beatsPerMinute,
                time: new Date(sample.time)
            }));
        }
        
        if (startTime) {
            heartRateData.startTime = new Date(startTime);
        }
        
        if (endTime) {
            heartRateData.endTime = new Date(endTime);
        }

        await heartRateData.save();

        return res.status(200).json({ success: true, message: "Heart rate data updated successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteHeartRateData = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Heart rate ID is required' });
    }

    try {
        const heartRateData = await HeartRate.findOne({ id, user: userId });

        if (!heartRateData) {
            return res.status(404).json({ success: false, message: "Heart rate data not found" });
        }

        await HeartRate.deleteOne({ id, user: userId });

        return res.status(200).json({ success: true, message: "Heart rate data deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getHeartRateStats = async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    try {
        let matchQuery = { user: userId };

        // Add date filtering if provided
        if (startDate || endDate) {
            matchQuery.startTime = {};
            if (startDate) {
                matchQuery.startTime.$gte = new Date(startDate);
            }
            if (endDate) {
                matchQuery.startTime.$lte = new Date(endDate);
            }
        }

        const stats = await HeartRate.aggregate([
            { $match: matchQuery },
            { $unwind: "$samples" },
            {
                $group: {
                    _id: null,
                    averageHeartRate: { $avg: "$samples.beatsPerMinute" },
                    minHeartRate: { $min: "$samples.beatsPerMinute" },
                    maxHeartRate: { $max: "$samples.beatsPerMinute" },
                    totalReadings: { $sum: 1 }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(200).json({ 
                success: true, 
                data: {
                    averageHeartRate: 0,
                    minHeartRate: 0,
                    maxHeartRate: 0,
                    totalReadings: 0
                }
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: {
                averageHeartRate: Math.round(stats[0].averageHeartRate * 100) / 100,
                minHeartRate: stats[0].minHeartRate,
                maxHeartRate: stats[0].maxHeartRate,
                totalReadings: stats[0].totalReadings
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const bulkAddHeartRateData = async (req, res) => {
    const { heartRateRecords } = req.body;
    const userId = req.user.id;

    if (!heartRateRecords || !Array.isArray(heartRateRecords) || heartRateRecords.length === 0) {
        return res.status(400).json({ success: false, message: 'Heart rate records array is required' });
    }

    try {
        const processedRecords = [];
        const skippedRecords = [];

        for (const record of heartRateRecords) {
            const { lastModifiedTime, id, samples, startTime, endTime } = record;

            // Validate required fields
            if (!lastModifiedTime || !id || !samples || !startTime || !endTime) {
                skippedRecords.push({ id: id || 'unknown', reason: 'Missing required fields' });
                continue;
            }

            // Check if record already exists
            const existingRecord = await HeartRate.findOne({ id });
            if (existingRecord) {
                skippedRecords.push({ id, reason: 'Record already exists' });
                continue;
            }

            processedRecords.push({
                user: userId,
                lastModifiedTime: new Date(lastModifiedTime),
                id,
                samples: samples.map(sample => ({
                    beatsPerMinute: sample.beatsPerMinute,
                    time: new Date(sample.time)
                })),
                startTime: new Date(startTime),
                endTime: new Date(endTime)
            });
        }

        let insertedCount = 0;
        if (processedRecords.length > 0) {
            const result = await HeartRate.insertMany(processedRecords);
            insertedCount = result.length;
        }

        return res.status(201).json({
            success: true,
            message: `Bulk operation completed`,
            data: {
                inserted: insertedCount,
                skipped: skippedRecords.length,
                skippedRecords: skippedRecords
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
=======
>>>>>>> ca24ff9c3e81bf121923869272d60b633f134d5a
=======
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
