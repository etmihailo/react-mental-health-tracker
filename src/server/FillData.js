const sqlite3 = require('sqlite3').verbose();
const {DateTime} = require('luxon');

const db = new sqlite3.Database('./database.sqlite');

const generateRandomData = () => {
    const moods = ['very_sad', 'sad', 'neutral', 'happy', 'very_happy'];
    const anxieties = ['very_anxious', 'anxious', 'neutral', 'calm', 'very_calm'];
    const socialInteractions = ['not_often', 'fairly_often', 'very_often'];

    return {
        mood: moods[Math.floor(Math.random() * moods.length)],
        anxiety: anxieties[Math.floor(Math.random() * anxieties.length)],
        stress: Math.floor(Math.random() * 5),
        sleepHours: Math.floor(Math.random() * 10) + 1,
        sleepQuality: Math.floor(Math.random() * 101),
        physicalActivities: JSON.stringify([
            {activity: 'Running', hours: Math.floor(Math.random() * 3), minutes: Math.floor(Math.random() * 60)},
            {activity: 'Yoga', hours: Math.floor(Math.random() * 2), minutes: Math.floor(Math.random() * 60)}
        ]),
        socialInteractions: socialInteractions[Math.floor(Math.random() * socialInteractions.length)],
        symptoms: Math.random() < 0.5 ? 'None' : 'Headache',
    };
};

const insertData = (date, data) => {
    const query = `
        INSERT INTO logs (date, mood, anxiety, stress, sleepHours, sleepQuality, physicalActivities, socialInteractions,
                          symptoms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [
        date,
        data.mood,
        data.anxiety,
        data.stress,
        data.sleepHours,
        data.sleepQuality,
        data.physicalActivities,
        data.socialInteractions,
        data.symptoms
    ]);
};

const fillDataForLastMonths = () => {
    const endDate = DateTime.local().startOf('day');
    const startDate = endDate.minus({months: 2}).startOf('day');

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const randomData = generateRandomData();
        insertData(currentDate.toISODate(), randomData);
        currentDate = currentDate.plus({days: 1});
    }

    console.log('Data insertion complete.');
    db.close();
};

fillDataForLastMonths();
