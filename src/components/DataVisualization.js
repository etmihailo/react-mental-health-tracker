import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import {DateTime} from 'luxon';
import {FormControl, InputLabel, Select, MenuItem, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {styled} from '@mui/system';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
});

const ControlsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '600px',
    gap: '8px',
    padding: '8px',
});


const DropdownRow = styled('div')({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    maxWidth: '600px',
});


const ChartsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

const ChartWrapper = styled('div')({
    width: '100%',
    maxWidth: '600px',
    height: '300px',
});

const SmallSelect = styled(FormControl)({
    flex: 1,
    minWidth: 80,
    maxWidth: 120,
});

const SmallButton = styled(Button)({
    minWidth: 30,
    padding: '5px',
});


const DataVisualization = () => {
    const [logs, setLogs] = useState([]);
    const [timePeriod, setTimePeriod] = useState('week');
    const [selectedMetric, setSelectedMetric] = useState('mood');
    const [startDate, setStartDate] = useState(DateTime.local().minus({weeks: 1}).toISODate());
    const [endDate, setEndDate] = useState(DateTime.local().toISODate());

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/logs', {
                    params: {startDate, endDate}
                });
                setLogs(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLogs();
    }, [startDate, endDate]);

    const handleTimePeriodChange = (event) => {
        setTimePeriod(event.target.value);
        const end = DateTime.local();
        const start = event.target.value === 'week'
            ? end.minus({weeks: 1}).toISODate()
            : end.minus({months: 1}).toISODate();
        setStartDate(start);
        setEndDate(end.toISODate());
    };

    const handleMetricChange = (event) => {
        setSelectedMetric(event.target.value);
    };

    const handleNavigate = (direction) => {
        const currentEnd = DateTime.fromISO(endDate);
        const currentStart = DateTime.fromISO(startDate);
        const newEnd = direction === 'backward'
            ? currentEnd.minus({[timePeriod + 's']: 1})
            : currentEnd.plus({[timePeriod + 's']: 1});
        const newStart = direction === 'backward'
            ? currentStart.minus({[timePeriod + 's']: 1})
            : currentStart.plus({[timePeriod + 's']: 1});

        setStartDate(newStart.toISODate());
        setEndDate(newEnd.toISODate());
    };

    const formatDateRange = () => {
        const start = DateTime.fromISO(startDate);
        const end = DateTime.fromISO(endDate);
        return timePeriod === 'week'
            ? `${start.toFormat('MM/dd/yyyy')} - ${end.toFormat('MM/dd/yyyy')}`
            : `${start.toFormat('MMM. yyyy')}`;
    };

    const valueMappings = {
        mood: {very_sad: 0, sad: 1, neutral: 2, happy: 3, very_happy: 4},
        anxiety: {very_anxious: 0, anxious: 1, neutral: 2, calm: 3, very_calm: 4},
        stress: {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
    };

    const labelMappings = {
        mood: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
        anxiety: ['Very Anxious', 'Anxious', 'Neutral', 'Calm', 'Very Calm'],
        stress: ['Low', 'Optimal', 'Moderate', 'High', 'Too High']
    };

    const mappedLogs = logs.map(log => ({
        ...log,
        mood: valueMappings.mood[log.mood],
        anxiety: valueMappings.anxiety[log.anxiety],
        stress: valueMappings.stress[log.stress]
    }));

    const metricCounts = mappedLogs.reduce((acc, log) => {
        const value = log[selectedMetric];
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});

    const metricData = Object.keys(metricCounts).map((key) => ({
        name: labelMappings[selectedMetric][key],
        value: metricCounts[key]
    }));

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff0000'];

    const yAxisTicks = {
        mood: ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'],
        anxiety: ['Very Anxious', 'Anxious', 'Neutral', 'Calm', 'Very Calm'],
        stress: ['Low', 'Optimal', 'Moderate', 'High', 'Too High']
    };

    return (
        <Container>
            <ControlsContainer>
                <SmallSelect variant="outlined">
                    <InputLabel>Time</InputLabel>
                    <Select value={timePeriod} onChange={handleTimePeriodChange} label="Time">
                        <MenuItem value="week">Week</MenuItem>
                        <MenuItem value="month">Month</MenuItem>
                    </Select>
                </SmallSelect>

                <SmallButton onClick={() => handleNavigate('backward')}>
                    <ArrowBackIosIcon fontSize="small"/>
                </SmallButton>

                <span style={{
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    minWidth: 60,
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
        {formatDateRange()}
    </span>

                <SmallButton onClick={() => handleNavigate('forward')}>
                    <ArrowForwardIosIcon fontSize="small"/>
                </SmallButton>

                <SmallSelect variant="outlined">
                    <InputLabel>Metric</InputLabel>
                    <Select value={selectedMetric} onChange={handleMetricChange} label="Metric">
                        <MenuItem value="mood">Mood</MenuItem>
                        <MenuItem value="anxiety">Anxiety</MenuItem>
                        <MenuItem value="stress">Stress</MenuItem>
                    </Select>
                </SmallSelect>
            </ControlsContainer>


            <ChartsContainer>
                <ChartWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={600}
                            height={300}
                            data={mappedLogs}
                            margin={{top: 30, right: 20, left: 20, bottom: 60}}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="date" dy={20}/>
                            <YAxis
                                ticks={[0, 1, 2, 3, 4]}
                                tickFormatter={(value) => yAxisTicks[selectedMetric][value]}
                                allowDataOverflow={true}
                            />
                            <Tooltip formatter={(value) => yAxisTicks[selectedMetric][value]}/>

                            <Line
                                type="monotone"
                                dataKey={selectedMetric}
                                stroke="#8884d8"
                                activeDot={{r: 8}}
                                dot={true}
                            />
                        </LineChart>

                    </ResponsiveContainer>
                </ChartWrapper>

                <ChartWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={metricData} dataKey="value" nameKey="name" outerRadius={120}>
                                {metricData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip/>
                            <Legend/>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartWrapper>
            </ChartsContainer>
        </Container>
    );
};

export default DataVisualization;
