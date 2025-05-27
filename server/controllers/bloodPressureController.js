import bloodPressure from '../models/bloodPressureModels.js';

export const addBloodPressureData = async (req, res) => {
    const { diastolic, systolic, bodyPosition, measurementLocation, lastModifiedTime, id, time } = req.body;
    const userId = req.body.userId;

    if (!diastolic || !systolic || bodyPosition === undefined || measurementLocation === undefined || !lastModifiedTime || !id || !time) {
        return res.status(400).json({ success: false, message: 'Missing required details' });
    }

    if (!diastolic.inMillimetersOfMercury || !systolic.inMillimetersOfMercury) {
        return res.status(400).json({ success: false, message: 'Blood pressure readings must include inMillimetersOfMercury values' });
    }

    try {
        const existingBp = await bloodPressure.findOne({ id });

        if (existingBp) {
            return res.status(400).json({ success: false, message: "Blood pressure data with this ID already exists" });
        }

        const bpData = new bloodPressure({
            user: userId,
            diastolic: {
                inMillimetersOfMercury: diastolic.inMillimetersOfMercury
            },
            systolic: {
                inMillimetersOfMercury: systolic.inMillimetersOfMercury
            },
            bodyPosition,
            measurementLocation,
            lastModifiedTime: new Date(lastModifiedTime),
            id,
            time: new Date(time)
        });

        await bpData.save();

        return res.status(201).json({ success: true, message: "Blood pressure data added successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const getBloodPressureData = async (req, res) => {
    const userId = req.body.userId;
    const { startDate, endDate, limit = 100, page = 1 } = req.query;

    try {
        let query = { user: userId };

        if (startDate || endDate) {
            query.time = {};
            if (startDate) {
                query.time.$gte = new Date(startDate);
            }
            if (endDate) {
                query.time.$lte = new Date(endDate);
            }
        }

        const skip = (page - 1) * parseInt(limit);
        
        const bpData = await Bp.find(query)
            .sort({ time: -1 })
            .limit(parseInt(limit))
            .skip(skip);

        const totalCount = await Bp.countDocuments(query);

        return res.status(200).json({ 
            success: true, 
            data: bpData,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalRecords: totalCount,
                hasNext: skip + bpData.length < totalCount,
                hasPrev: page > 1
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getBloodPressureById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Blood pressure ID is required' });
    }

    try {
        const bpData = await Bp.findOne({ id, user: userId });

        if (!bpData) {
            return res.status(404).json({ success: false, message: "Blood pressure data not found" });
        }

        return res.status(200).json({ success: true, data: bpData });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateBloodPressureData = async (req, res) => {
    const { id } = req.params;
    const { diastolic, systolic, bodyPosition, measurementLocation, lastModifiedTime, time } = req.body;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Blood pressure ID is required' });
    }

    try {
        const bpData = await Bp.findOne({ id, user: userId });

        if (!bpData) {
            return res.status(404).json({ success: false, message: "Blood pressure data not found" });
        }

        if (diastolic && diastolic.inMillimetersOfMercury) {
            bpData.diastolic.inMillimetersOfMercury = diastolic.inMillimetersOfMercury;
        }
        
        if (systolic && systolic.inMillimetersOfMercury) {
            bpData.systolic.inMillimetersOfMercury = systolic.inMillimetersOfMercury;
        }
        
        if (bodyPosition !== undefined) {
            bpData.bodyPosition = bodyPosition;
        }
        
        if (measurementLocation !== undefined) {
            bpData.measurementLocation = measurementLocation;
        }
        
        if (lastModifiedTime) {
            bpData.lastModifiedTime = new Date(lastModifiedTime);
        }
        
        if (time) {
            bpData.time = new Date(time);
        }

        await bpData.save();

        return res.status(200).json({ success: true, message: "Blood pressure data updated successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteBloodPressureData = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Blood pressure ID is required' });
    }

    try {
        const bpData = await Bp.findOne({ id, user: userId });

        if (!bpData) {
            return res.status(404).json({ success: false, message: "Blood pressure data not found" });
        }

        await Bp.deleteOne({ id, user: userId });

        return res.status(200).json({ success: true, message: "Blood pressure data deleted successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

