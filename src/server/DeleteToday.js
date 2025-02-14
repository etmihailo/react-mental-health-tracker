const sqlite3 = require('sqlite3').verbose();
const {DateTime} = require('luxon');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const deleteTodaysLogs = () => {
    const today = DateTime.local().startOf('day').toISODate();

    const countQuery = "SELECT COUNT(*) AS count FROM logs WHERE date(date) = ?";
    db.get(countQuery, [today], (err, row) => {
        if (err) {
            console.error('Error counting today\'s log entries:', err.message);
            db.close();
            return;
        }

        if (row.count >= 1) {
            const deleteQuery = "DELETE FROM logs WHERE date(date) = ?";
            db.run(deleteQuery, [today], function (err) {
                if (err) {
                    console.error('Error deleting today\'s log entries:', err.message);
                } else {
                    console.log(`Deleted ${this.changes} log entries for today.`);
                }
                db.close();
            });
        } else {
            console.log('One or no log entries found for today; no deletion performed.');
            db.close();
        }
    });
};

deleteTodaysLogs();
