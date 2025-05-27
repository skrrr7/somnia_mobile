import Step from '../models/Step.js';
import mongoose from 'mongoose';

// Step Controller
export const stepController = {
  // Create a new step record
  async createStep(req, res) {
    try {
      const { user, id, lastModifiedTime, count, startTime, endTime } = req.body;
      
      const step = new Step({
        user,
        id,
        lastModifiedTime,
        count,
        startTime,
        endTime
      });

      const savedStep = await step.save();
      res.status(201).json(savedStep);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ error: 'Step record with this ID already exists' });
      }
      res.status(400).json({ error: error.message });
    }
  },

  // Get all steps for a user with optional date filtering
  async getStepsByUser(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate, limit = 50, offset = 0 } = req.query;

      let query = { user: userId };
      
      if (startDate || endDate) {
        query.startTime = {};
        if (startDate) query.startTime.$gte = new Date(startDate);
        if (endDate) query.startTime.$lte = new Date(endDate);
      }

      const steps = await Step.find(query)
        .sort({ startTime: -1 })
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .populate('user', 'name email');

      const total = await Step.countDocuments(query);

      res.json({
        steps,
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

  // Get step by ID
  async getStepById(req, res) {
    try {
      const { id } = req.params;
      const step = await Step.findOne({ id }).populate('user', 'name email');
      
      if (!step) {
        return res.status(404).json({ error: 'Step record not found' });
      }
      
      res.json(step);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update step record
  async updateStep(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const step = await Step.findOneAndUpdate(
        { id },
        updates,
        { new: true, runValidators: true }
      ).populate('user', 'name email');
      
      if (!step) {
        return res.status(404).json({ error: 'Step record not found' });
      }
      
      res.json(step);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete step record
  async deleteStep(req, res) {
    try {
      const { id } = req.params;
      const step = await Step.findOneAndDelete({ id });
      
      if (!step) {
        return res.status(404).json({ error: 'Step record not found' });
      }
      
      res.json({ message: 'Step record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get daily step totals for a user
  async getDailyStepTotals(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      let matchStage = { user: new mongoose.Types.ObjectId(userId) };
      
      if (startDate || endDate) {
        matchStage.startTime = {};
        if (startDate) matchStage.startTime.$gte = new Date(startDate);
        if (endDate) matchStage.startTime.$lte = new Date(endDate);
      }

      const dailyTotals = await Step.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$startTime"
              }
            },
            totalSteps: { $sum: "$count" },
            recordCount: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } }
      ]);

      res.json(dailyTotals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get step statistics for a user
  async getStepStatistics(req, res) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      let matchStage = { user: new mongoose.Types.ObjectId(userId) };
      
      if (startDate || endDate) {
        matchStage.startTime = {};
        if (startDate) matchStage.startTime.$gte = new Date(startDate);
        if (endDate) matchStage.startTime.$lte = new Date(endDate);
      }

      const stats = await Step.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalSteps: { $sum: "$count" },
            avgSteps: { $avg: "$count" },
            maxSteps: { $max: "$count" },
            minSteps: { $min: "$count" },
            totalRecords: { $sum: 1 }
          }
        }
      ]);

      res.json(stats[0] || { totalSteps: 0, totalRecords: 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Bulk create steps (for syncing from Health Connect)
  async bulkCreateSteps(req, res) {
    try {
      const { steps } = req.body;
      
      if (!Array.isArray(steps)) {
        return res.status(400).json({ error: 'Steps must be an array' });
      }

      const result = await Step.insertMany(steps, { ordered: false });
      res.status(201).json({
        message: `Successfully created ${result.length} step records`,
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

  // Bulk upsert steps (create or update based on ID)
  async bulkUpsertSteps(req, res) {
    try {
      const { steps } = req.body;
      
      if (!Array.isArray(steps)) {
        return res.status(400).json({ error: 'Steps must be an array' });
      }

      const bulkOps = steps.map(step => ({
        updateOne: {
          filter: { id: step.id },
          update: step,
          upsert: true
        }
      }));

      const result = await Step.bulkWrite(bulkOps);
      
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

export default stepController;