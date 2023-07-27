import React, { useEffect, useState } from 'react';
import axios from 'axios';


import './data.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { Paper, Box } from '@mui/material';



function Data() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
    const handleSearch = async () => {
        try {
            if (query !== '') {
                const query1 = query;
                const customSearchApiKey = 'AIzaSyBXLdShak9yIXnIlbI29fm0yIHlvIXGLH4';
                const customSearchCx = '24d2b4f0940654245';
                const customSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${query1}&key=${customSearchApiKey}&cx=${customSearchCx}&num=5`;

                const customSearchResponse = await axios.get(customSearchUrl);
                const topUrls = customSearchResponse.data.items.map(item => item.link);


                const scrapingBeeApiKey = 'AXTG7HKNDMLPJAGUT5FV1AJ4KAXTER2ZCJMJ7L5ZCJU24DT4HXR7AFUY7U6A98HB8NKF3U92MLAH5IYS';

                const scrapingBeeResults = [];

                for (const url of topUrls) {
                    const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/?url=${encodeURIComponent(url)}?&api_key=${scrapingBeeApiKey}&render_js=false&extract_rules={ "text": "body"}&block_resources=true`;
                    const scrapingBeeResponse = await axios.get(scrapingBeeUrl);

                    const scrapedText = scrapingBeeResponse.data;

                    scrapingBeeResults.push(scrapedText);
                    console.log(scrapingBeeResults);
                      setIsLoading(true)

                }


                setResults(scrapingBeeResults);
                 setIsLoading(false);
                console.log(results)
            }


        } catch (error) {
            console.error('Error:', error);
        }
    };






    const handleChange = (evt) => {
        setQuery(evt.target.value);
    };



    return (
        <div className='wrapper' >
            <Box sx={{ p: "0.5rem", width: "100%" }} component={Paper}>
                <Input value={query} onChange={handleChange}
                    sx={{ m: '1rem' }} />
                {isLoading ? "" :
                <Button onClick={handleSearch} variant="text" sx={{ color: "black" }}>Search</Button>}
  {isLoading ? <h4>fetching data...</h4> : ""}
                {results.map((data, index) => <p key={index}>{data.text}</p>)}


            </Box>
        </div>
    );
}

export default Data;

