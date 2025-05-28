import SleepSession from '../models/SleepSession.js';
import mongoose from 'mongoose';

// Sleep Session Controller
export const sleepController = {
  // Create a new sleep session
  async createSleepSession(req, res) {
    try {
      const { user, id, lastModifiedTime, title, startTime, endTime, stages } = req.body;
      
      const sleepSession = new SleepSession({
        user,
        id,
        lastModifiedTime,
        title,
        startTime,
        endTime,
        stages: stages || []
      });

      const savedSession = await sleepSession.save();
      res.status(201).json(savedSession);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ error: 'Sleep session with this ID already exists' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  // Get all sleep sessions for a user
  async getSleepSessionsByUser(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate, limit = 30, offset = 0 } = req.query;

      let query = { user: userId };
      
      if (startDate || endDate) {
        query.startTime = {};
        if (startDate) query.startTime.$gte = new Date(startDate);
        if (endDate) query.startTime.$lte = new Date(endDate);
      }

      const sessions = await SleepSession.find(query)
        .sort({ startTime: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .populate('user', 'name email');

      const total = await SleepSession.countDocuments(query);

      res.json({
        sessions,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: total > parseInt(offset) + parseInt(limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get sleep session by ID
  async getSleepSessionById(req, res) {
    try {
      const { id } = req.params;
      const session = await SleepSession.findOne({ id }).populate('user', 'name email');
      
      if (!session) {
        return res.status(404).json({ error: 'Sleep session not found' });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update sleep session
  async updateSleepSession(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const session = await SleepSession.findOneAndUpdate(
        { id },
        updates,
        { new: true, runValidators: true }
      ).populate('user', 'name email');
      
      if (!session) {
        return res.status(404).json({ error: 'Sleep session not found' });
      }
      
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete sleep session
  async deleteSleepSession(req, res) {
    try {
      const { id } = req.params;
      const session = await SleepSession.findOneAndDelete({ id });
      
      if (!session) {
        return res.status(404).json({ error: 'Sleep session not found' });
      }
      
      res.json({ message: 'Sleep session deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get sleep analytics for a user
  async getSleepAnalytics(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      let matchStage = { user: new mongoose.Types.ObjectId(userId) };
      
      if (startDate || endDate) {
        matchStage.startTime = {};
        if (startDate) matchStage.startTime.$gte = new Date(startDate);
        if (endDate) matchStage.startTime.$lte = new Date(endDate);
      }

      const analytics = await SleepSession.aggregate([
        { $match: matchStage },
        {
          $addFields: {
            duration: {
              $divide: [
                { $subtract: ["$endTime", "$startTime"] },
                1000 * 60 * 60 // Convert to hours
              ]
            },
            sleepDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$startTime"
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            totalSessions: { $sum: 1 },
            avgDuration: { $avg: "$duration" },
            minDuration: { $min: "$duration" },
            maxDuration: { $max: "$duration" },
            totalSleepHours: { $sum: "$duration" },
            dailySleep: {
              $push: {
                date: "$sleepDate",
                duration: "$duration",
                startTime: "$startTime",
                endTime: "$endTime"
              }
            }
          }
        }
      ]);

      res.json(analytics[0] || { totalSessions: 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get sleep stage analytics
  async getSleepStageAnalytics(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      let matchStage = { user: new mongoose.Types.ObjectId(userId) };
      
      if (startDate || endDate) {
        matchStage.startTime = {};
        if (startDate) matchStage.startTime.$gte = new Date(startDate);
        if (endDate) matchStage.startTime.$lte = new Date(endDate);
      }

      const stageAnalytics = await SleepSession.aggregate([
        { $match: matchStage },
        { $unwind: { path: "$stages", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$stages.stage",
            totalDuration: {
              $sum: {
                $divide: [
                  { $subtract: ["$stages.endTime", "$stages.startTime"] },
                  1000 * 60 // Convert to minutes
                ]
              }
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            stage: "$_id",
            stageName: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 0] }, then: "UNKNOWN" },
                  { case: { $eq: ["$_id", 1] }, then: "AWAKE" },
                  { case: { $eq: ["$_id", 2] }, then: "SLEEPING" },
                  { case: { $eq: ["$_id", 3] }, then: "OUT_OF_BED" },
                  { case: { $eq: ["$_id", 4] }, then: "LIGHT" },
                  { case: { $eq: ["$_id", 5] }, then: "DEEP" },
                  { case: { $eq: ["$_id", 6] }, then: "REM" }
                ],
                default: "UNKNOWN"
              }
            },
            totalDuration: 1,
            avgDuration: { $divide: ["$totalDuration", "$count"] },
            count: 1
          }
        },
        { $sort: { stage: 1 } }
      ]);

      res.json(stageAnalytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get sleep quality metrics
  async getSleepQualityMetrics(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      let matchStage = { user: new mongoose.Types.ObjectId(userId) };
      
      if (startDate || endDate) {
        matchStage.startTime = {};
        if (startDate) matchStage.startTime.$gte = new Date(startDate);
        if (endDate) matchStage.startTime.$lte = new Date(endDate);
      }

      const qualityMetrics = await SleepSession.aggregate([
        { $match: matchStage },
        { $unwind: { path: "$stages", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$_id",
            sessionStart: { $first: "$startTime" },
            sessionEnd: { $first: "$endTime" },
            totalDuration: {
              $first: {
                $divide: [
                  { $subtract: ["$endTime", "$startTime"] },
                  1000 * 60 // Convert to minutes
                ]
              }
            },
            deepSleep: {
              $sum: {
                $cond: [
                  { $eq: ["$stages.stage", 5] }, // DEEP stage
                  {
                    $divide: [
                      { $subtract: ["$stages.endTime", "$stages.startTime"] },
                      1000 * 60
                    ]
                  },
                  0
                ]
              }
            },
            remSleep: {
              $sum: {
                $cond: [
                  { $eq: ["$stages.stage", 6] }, // REM stage
                  {
                    $divide: [
                      { $subtract: ["$stages.endTime", "$stages.startTime"] },
                      1000 * 60
                    ]
                  },
                  0
                ]
              }
            },
            awakeTime: {
              $sum: {
                $cond: [
                  { $eq: ["$stages.stage", 1] }, // AWAKE stage
                  {
                    $divide: [
                      { $subtract: ["$stages.endTime", "$stages.startTime"] },
                      1000 * 60
                    ]
                  },
                  0
                ]
              }
            }
          }
        },
        {
          $project: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$sessionStart"
              }
            },
            totalDuration: 1,
            deepSleep: 1,
            remSleep: 1,
            awakeTime: 1,
            deepSleepPercentage: {
              $multiply: [
                { $divide: ["$deepSleep", "$totalDuration"] },
                100
              ]
            },
            remSleepPercentage: {
              $multiply: [
                { $divide: ["$remSleep", "$totalDuration"] },
                100
              ]
            },
            sleepEfficiency: {
              $multiply: [
                {
                  $divide: [
                    { $subtract: ["$totalDuration", "$awakeTime"] },
                    "$totalDuration"
                  ]
                },
                100
              ]
            }
          }
        },
        { $sort: { date: -1 } }
      ]);

      res.json(qualityMetrics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Bulk create sleep sessions
  async bulkCreateSleepSessions(req, res) {
    try {
      const { sessions } = req.body;
      
      if (!Array.isArray(sessions)) {
        return res.status(400).json({ error: 'Sessions must be an array' });
      }

      const result = await SleepSession.insertMany(sessions, { ordered: false });
      res.status(201).json({
        message: `Successfully created ${result.length} sleep sessions`,
        created: result.length
      });
    } catch (error) {
      if (error.name === 'BulkWriteError') {
        const successCount = error.result.insertedCount;
        const duplicateCount = error.writeErrors?.length || 0;
        
        res.status(207).json({
          message: `Bulk operation completed with some errors`,
          created: successCount,
          duplicates: duplicateCount,
          errors: error.writeErrors
        });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  },

  // Bulk upsert sleep sessions
  async bulkUpsertSleepSessions(req, res) {
    try {
      const { sessions } = req.body;
      
      if (!Array.isArray(sessions)) {
        return res.status(400).json({ error: 'Sessions must be an array' });
      }

      const bulkOps = sessions.map(session => ({
        updateOne: {
          filter: { id: session.id },
          update: session,
          upsert: true
        }
      }));

      const result = await SleepSession.bulkWrite(bulkOps);
      
      res.json({
        message: 'Bulk upsert completed',
        inserted: result.upsertedCount,
        modified: result.modifiedCount,
        matched: result.matchedCount
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default sleepController;