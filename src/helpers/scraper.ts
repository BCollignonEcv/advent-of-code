// LIBRARIES
import axios from 'axios'
import * as dotenv from 'dotenv';

// Init .env variable
dotenv.config();

const generateUrl = (year: Number, testNumber: Number): string => {
    return [process.env.URL, year, 'day', testNumber, 'input'].join('/');
}

const getHTML = async (year: Number, testNumber: Number) => {
    try {
        const url = generateUrl(year, testNumber);

        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                "Cookie": "session=" + process.env.SESSION,
            },
            responseType: "text"
        })

        return response.data;
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
        return [];
    }

}

export {
    getHTML
}