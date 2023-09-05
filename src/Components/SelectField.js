import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCategoryChange, handleDifficultyChange, handleTypeChange } from '../hooks/action';

const SelectField = (props) => {
    const { label, options } = props;
    // console.log(options);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value);
        switch (label) {
            case "Category":
                console.log(e.target.value);
                dispatch(handleCategoryChange(e.target.value));
                break;
            case "Difficulty":
                dispatch(handleDifficultyChange(e.target.value));
                break;
            case "Type":
                dispatch(handleTypeChange(e.target.value));
                break;
            default:
                return;
        }
    };
    return (
        <Box mt={3} width="100%">
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select value={value} label={label} onChange={handleChange}>

                    {options.map(({ id, name }) => (
                        <MenuItem value={id} key={id}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectField;