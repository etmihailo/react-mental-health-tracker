const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const {DateTime} = require('luxon');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

const dbPath = path.join(__dirname, 'database.sqlite');

const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS logs
            (
                id
                INTEGER
                PRIMARY
                KEY,
                mood
                TEXT,
                anxiety
                TEXT,
                sleepHours
                TEXT,
                sleepQuality
                TEXT,
                physicalActivities
                TEXT,
                socialInteractions
                TEXT,
                stress
                TEXT,
                symptoms
                TEXT,
                date
                TEXT
            )`);
});

app.post('/api/log', (req, res) => {
    const {
        mood,
        anxiety,
        sleepHours,
        sleepQuality,
        physicalActivities,
        socialInteractions,
        stress,
        symptoms
    } = req.body;

    const date = new Date().toISOString().split('T')[0];

    const physicalActivitiesJSON = JSON.stringify(physicalActivities);


    const stmt = db.prepare("INSERT INTO logs (mood, anxiety, sleepHours, sleepQuality, physicalActivities, socialInteractions, stress, symptoms, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    stmt.run(mood, anxiety, sleepHours, sleepQuality, physicalActivitiesJSON, socialInteractions, stress, symptoms, date, (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(400).json({error: err.message});
            return;
        }
        res.status(201).send('Log created');
    });
    stmt.finalize();
});


app.get('/api/log-by-date', (req, res) => {
    const date = req.query.date;

    const localDate = new Date(date);
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // Convert to UTC


    db.get("SELECT * FROM logs WHERE date(date) = date(?)", [utcDate], (err, row) => {
        if (err) {
            console.error('Error querying database:', err.message);
            return res.status(400).json({error: err.message});
        }

        if (row) {
            row.physicalActivities = JSON.parse(row.physicalActivities);
        }
        res.json(row);
    });
});


app.get('/api/logs', (req, res) => {
    const {startDate, endDate} = req.query;

    let query = "SELECT * FROM logs WHERE 1=1";
    const params = [];

    if (startDate) {
        query += " AND date >= ?";
        params.push(startDate);
    }

    if (endDate) {
        query += " AND date <= ?";
        params.push(endDate);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.put('/api/log', (req, res) => {
    const {
        id,
        mood,
        anxiety,
        sleepHours,
        sleepQuality,
        physicalActivities,
        socialInteractions,
        stress,
        symptoms
    } = req.body;
    const date = new Date().toISOString().split('T')[0];
    const physicalActivitiesJSON = JSON.stringify(physicalActivities);
    const stmt = db.prepare("UPDATE logs SET mood = ?, anxiety = ?, sleepHours = ?, sleepQuality = ?, physicalActivities = ?, socialInteractions = ?, stress = ?, symptoms = ?, date = ? WHERE id = ?");
    stmt.run(mood, anxiety, sleepHours, sleepQuality, physicalActivitiesJSON, socialInteractions, stress, symptoms, date, id);
    stmt.finalize();
    res.status(200).send('Log updated');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
