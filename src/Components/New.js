import { useState } from "react";

const countries = [
    {
        name: 'India', value: 'IN', cities: ['Delhi', 'Mumbai']
    },
    {
        name: 'Pak', value: 'PK', cities: ['Lahore', 'Karachi']
    },
    {
        name: 'Bangladesh', value: 'BG', cities: ['Karur', 'Coimbatore']
    }
];


export const New = () => {

    const [country, setCountry] = useState(0);
    return (
        <>
            <select value={country}
                onChange={(e) => {
                    console.log(e.target.value);
                    setCountry(e.target.value);
                }}>
                {countries.map((item, index) => {
                    return (
                        <option key={index} value={index}>{item.name}</option>
                    );
                })}
            </select>
            <select value={country}
            >
                {countries[country].cities.map((item, index) => {
                    return (
                        <option key={index} value={index}>{item}</option>
                    );
                })}
            </select>

        </>
    );
};