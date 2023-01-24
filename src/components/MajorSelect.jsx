import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import major from './major.json';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
// import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function MajorSelect(props) {
    const [open, setOpen] = useState(false);
    const [depart, setDepart] = useState('');
    const [nowMajor, setNowMajor] = useState('');
    const [pick, setPick] = useState(0);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [valueSem, setValueSem] = useState('');
    let key = Object.getOwnPropertyNames(major);

    useEffect(() => {
        if (props.current === '학과별 순위') {
            setPick(1);
        } else if (props.current === '카테고리별 순위') {
            setDepart('');
            setNowMajor('');
            setPick(2);
        } else if (props.current === '교수님별 순위') {
            setDepart('');
            setNowMajor('');
            setPick(3);
        }
    }, [props.current]);

    const handleName = ({ target: { value } }) => {
        setName(value);
        props.setProfessor(value);
    };

    const handleChange = (event) => {
        setDepart(event.target.value || '');
    };
    const handleMajorChange = (event) => {
        setNowMajor(event.target.value || '');
        props.setMajor(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleCategory = (event) => {
        setValue(event.target.value);
        props.setCategory(event.target.value);
    };
    const handlSemester = (event) => {
        setValueSem(event.target.value);
        props.setSemester(event.target.value);
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4} sx={{ mb: 2 }}>
                    <Grid xs={4}>
                        <Grid sx={{ p: 0, ml: 2 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ p: 0, mt: 2, ml: 2, fontWeight: 'bold' }}
                            >
                                1. 학기를 체크해주세요
                            </Typography>
                        </Grid>
                        <Grid xs={12} sx={{ p: 0, ml: 2 }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    ml: 3,
                                    borderRadius: 2,
                                }}
                            >
                                <FormControl
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormGroup>
                                        {/* <FormLabel
                                        sx={{ mr: 1 }}
                                        id="demo-row-radio-buttons-group-label"
                                    >
                                        학기를 체크해주세요
                                    </FormLabel> */}
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={valueSem}
                                            onChange={handlSemester}
                                            defaultValue="top"
                                        >
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="1학기"
                                            />
                                            <FormControlLabel
                                                value="2"
                                                control={<Radio />}
                                                label="2학기"
                                            />
                                        </RadioGroup>
                                    </FormGroup>
                                </FormControl>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid xs={6}>
                        <Grid sx={{ p: 0, ml: 2 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                sx={{ p: 0, mt: 2, ml: 2, fontWeight: 'bold' }}
                            >
                                {props.current === '학과별 순위' &&
                                    '2. 학과를 선택해주세요'}
                                {props.current === '카테고리별 순위' &&
                                    '2. 카테고리를 체크해주세요'}
                                {props.current === '교수님별 순위' &&
                                    '2. 교수님 성함을 입력해주세요'}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sx={{ p: 0, ml: 2 }}>
                            {pick === 1 && (
                                <Paper
                                    sx={{
                                        p: 3,
                                        ml: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Button
                                        sx={{ mr: 1, mt: 0.3, mb: 0.3 }}
                                        variant="contained"
                                        onClick={handleClickOpen}
                                    >
                                        학과를 선택해주세요
                                    </Button>
                                    {depart && (
                                        <Button
                                            sx={{
                                                marginRight: 0.5,
                                                color: 'black',
                                            }}
                                            variant="outlined"
                                            disabled
                                        >
                                            {depart}
                                        </Button>
                                    )}
                                    {nowMajor && (
                                        <Button variant="outlined" disabled>
                                            {nowMajor}
                                        </Button>
                                    )}
                                </Paper>
                            )}

                            {pick === 2 && (
                                <Paper
                                    sx={{
                                        p: 3,
                                        ml: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <FormControl
                                        component="fieldset"
                                        variant="standard"
                                    >
                                        <FormGroup>
                                            {/* <FormLabel
                                                    sx={{ mr: 1 }}
                                                    id="demo-row-radio-buttons-group-label"
                                                >
                                                    카테고리를 체크해주세요
                                                </FormLabel> */}
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={value}
                                                onChange={handleCategory}
                                            >
                                                <FormControlLabel
                                                    value="전공"
                                                    control={<Radio />}
                                                    label="전공"
                                                />
                                                <FormControlLabel
                                                    value="교양"
                                                    control={<Radio />}
                                                    label="교양"
                                                />
                                                <FormControlLabel
                                                    value="전학년선택"
                                                    control={<Radio />}
                                                    label="전학년선택"
                                                />
                                                <FormControlLabel
                                                    value="SU평가강좌"
                                                    control={<Radio />}
                                                    label="SU평가강좌"
                                                />
                                                <FormControlLabel
                                                    value="(영어)"
                                                    control={<Radio />}
                                                    label="영어"
                                                />
                                                <FormControlLabel
                                                    value="인문교양"
                                                    control={<Radio />}
                                                    label="인문교양"
                                                />
                                            </RadioGroup>
                                        </FormGroup>
                                    </FormControl>
                                </Paper>
                            )}
                            {pick === 3 && (
                                <Paper
                                    sx={{
                                        p: 2.2,
                                        ml: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    <TextField
                                        key="password"
                                        sx={{ mr: 1, height: 55, p: 0 }}
                                        id="outlined-name"
                                        label="Name"
                                        value={name}
                                        onChange={handleName}
                                    />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                    <Grid xs={2}></Grid>
                </Grid>
            </Box>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>소속 대학과 학부(전공)을 선택해주세요</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            minWidth: 400,
                        }}
                    >
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel htmlFor="demo-dialog-native">
                                대학
                            </InputLabel>
                            <Select
                                native
                                value={depart}
                                onChange={handleChange}
                                input={
                                    <OutlinedInput
                                        label="Age"
                                        id="demo-dialog-native"
                                    />
                                }
                            >
                                <option aria-label="None" value="" />
                                {key &&
                                    key.map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="demo-dialog-select-label">
                                학부
                            </InputLabel>
                            <Select
                                native
                                value={nowMajor}
                                onChange={handleMajorChange}
                                input={<OutlinedInput label="Age" />}
                            >
                                <option aria-label="None" value="" />
                                {major[depart] &&
                                    major[depart].map((item, index) => (
                                        <option value={item} key={index}>
                                            {item}
                                        </option>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
