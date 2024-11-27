import express from 'express';
import School from '../models/school.Schema.js';
import haversine from 'haversine';
const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data.' });
    }

    try {
        const school = new School({ name, address, latitude, longitude });
        await school.save();
        res.status(201).json({ message: 'School added successfully.', schoolId: school._id });
    } catch (err) {
        console.error('Error adding school:', err.message);
        res.status(500).json({ error: 'Database error.' });
    }
});

router.get('/list', async (req, res) => {
    const { latitude, longitude } = req.query;

    // Input validation
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    const userLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
    };

    if (isNaN(userLocation.latitude) || isNaN(userLocation.longitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude.' });
    }

    try {
        const schools = await School.find();

        const schoolsWithDistance = schools.map((school) => {
            const schoolLocation = {
                latitude: school.latitude,
                longitude: school.longitude,
            };
            const distance = haversine(userLocation, schoolLocation); // Haversine distance calculation
            return { ...school.toObject(), distance };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json({ schools: schoolsWithDistance });
    } catch (err) {
        console.error('Error fetching schools:', err.message);
        res.status(500).json({ error: 'Database error.' });
    }
});
export default router;