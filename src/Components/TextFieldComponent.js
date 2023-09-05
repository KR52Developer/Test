import { Box, FormControl, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { handleAmountChange } from '../hooks/action';

const TextFieldComponent = () => {
    const dispatch = useDispatch();


    const handleChange = (e) => {
        dispatch(handleAmountChange(e.target.value));
    };
    return (
        <Box mt={3}>
            <FormControl fullWidth >
                <TextField onChange={handleChange}
                    variant='outlined'
                    label='Amount of Questions'
                    type='number'
                    size='small' />
            </FormControl>
        </Box>
    );
};

export default TextFieldComponent;