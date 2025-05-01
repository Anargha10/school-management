const pool = require('../db');
const calculateDistance = require('../utils/distance');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM schools');
    const sortedSchools = rows.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json({ schools: sortedSchools });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};
