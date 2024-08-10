const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;
const googleMapApiKey = "AIzaSyB8A3GQxkkTbhvfWOw-xptqG77UNoPy1gA";

const getRoute = async (origin, destination) => {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${googleMapApiKey}`;
    try {
        const response = await axios.get(directionsUrl);
        if (response.data.routes.length > 0) {
            const route = response.data.routes[0].legs[0].steps.map(step => ({
                latitude: step.start_location.lat,
                longitude: step.start_location.lng
            }));
            return route;
        } else {
            console.error('No routes found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching direction:', error);
        return [];
    }
};

app.get('/vehicle-location', async (req, res) => {
    const date = req.query.date || 'today';
    let route = [];

    if (date === 'yesterday') {
        route = await getRoute('17.385044,78.486671', '17.484044,78.456671');
    } else if (date === 'this week') {
        route = await getRoute('17.385044,78.486671', '17.784044,78.556671');
    } else if (date === 'previous week') {
        route = await getRoute('17.385044,78.486671', '17.685044,78.486671');
    } else if (date === 'this month') {
        route = await getRoute('17.385044,78.486671', '18.385044,79.486671');
    } else if (date === 'previous month') {
        route = await getRoute('17.385044,78.486671', '18.385044,79.986671');
    }

    res.json(route);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
