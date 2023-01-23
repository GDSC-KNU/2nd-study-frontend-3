import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function ControlledRadioButtonsGroup() {
    const [value, setValue] = useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">학기</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="1학기"
                    control={<Radio />}
                    label="1학기"
                />
                <FormControlLabel
                    value="2학기"
                    control={<Radio />}
                    label="2학기"
                />
            </RadioGroup>
        </FormControl>
    );
}
