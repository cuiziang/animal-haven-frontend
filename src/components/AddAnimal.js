import React, { useState } from 'react';
import { Modal, FormControl, FormLabel, TextField, Button, RadioGroup, Radio, FormControlLabel, makeStyles, Select, MenuItem } from '@material-ui/core';
import { useFormik } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { useDispatch, useSelector } from 'react-redux';
import { addAnimal } from '../features/animals/animalsSlice';
import * as yup from 'yup';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        outline: 0,
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '20 px',
        float: 'left'
    },
    modalPaper: {
        overflow: 'scroll',
        position: 'absolute',
        height: 800,
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
        },
    },
    modal: {
        outline: 0
    }
}));

export function AddAnimal(props) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const dispatch = useDispatch();

    const animalsNameAndCount = useSelector(state => state.animals.animalsNameAndCountGroupByName)


    const validationSchema = yup.object({
        name: yup.string().required("Required"),
        sex: yup.string().required("Required"),
        species: yup.string().required("Required"),
        alteration: yup.string().required("Required"),
        description: yup.string().required("Required"),
        surrenderedByAnimalControl: yup.string().required("Required"),
        surrenderReason: yup.string().required("Required"),
        microchipId: yup.string().required("Required"),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            sex: '',
            species: '',
            alteration: '',
            description: '',
            birthDate: '2000-01-01',
            surrenderedByAnimalControl: '',
            surrenderDate: '2000-01-01',
            surrenderReason: '',
            microchipId: ''
        },
        onSubmit: values => {
            props.setOpen(false);
            dispatch(addAnimal(values));
            formik.resetForm();
        },
        validationSchema
    });

    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.modalPaper}>
                <h2>Add Animal</h2>
                <form className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Name</FormLabel>
                        <TextField
                            id="name"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.name) && formik.touched.name}
                            helperText={Boolean(formik.errors.name) && formik.touched.name ? formik.errors.name : ""}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel id="species">Species</FormLabel>
                        <Select
                            labelId="species"
                            id="species"
                            name="species"
                            error={Boolean(formik.errors.species) && formik.touched.species}
                            onChange={formik.handleChange}
                            value={formik.values.species}
                        >
                            {animalsNameAndCount.filter((animal) => animal.count < animal.space).map((animal) => (
                                <MenuItem key={animal.name} value={animal.name}>{animal.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="sex"
                            name="sex"
                            onChange={formik.handleChange}
                            value={formik.values.sex}
                        >
                            <FormControlLabel
                                value="female"
                                checked={formik.values.sex === "female"}
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="male"
                                checked={formik.values.sex === "male"}
                                control={<Radio />}
                                label="Male"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Alteration</FormLabel>
                        <RadioGroup
                            aria-label="alteration"
                            name="alteration"
                            onChange={formik.handleChange}
                            value={formik.values.alteration}
                        >
                            <FormControlLabel
                                value='true'
                                checked={formik.values.alteration === 'true'}
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value='false'
                                checked={formik.values.alteration === 'false'}
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Birth Date</FormLabel>
                        <TextField
                            id="birthDate"
                            name="birthDate"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.birthDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Description</FormLabel>
                        <TextField
                            id="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.description) && formik.touched.description}
                            helperText={Boolean(formik.errors.description) && formik.touched.description ? formik.errors.description : ""}
                            onChange={formik.handleChange}
                            value={formik.values.description}
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Surrendered By Animal Control</FormLabel>
                        <RadioGroup
                            aria-label="surrenderedByAnimalControl"
                            name="surrenderedByAnimalControl"
                            onChange={formik.handleChange}
                            value={formik.values.surrenderedByAnimalControl}
                        >
                            <FormControlLabel
                                value='true'
                                checked={formik.values.surrenderedByAnimalControl === 'true'}
                                control={<Radio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value='false'
                                checked={formik.values.surrenderedByAnimalControl === 'false'}
                                control={<Radio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Surrender Reason</FormLabel>
                        <TextField
                            id="surrenderReason"
                            multiline
                            rows={4}
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.surrenderReason) && formik.touched.surrenderReason}
                            helperText={Boolean(formik.errors.surrenderReason) && formik.touched.surrenderReason ? formik.errors.surrenderReason : ""}
                            onChange={formik.handleChange}
                            value={formik.values.surrenderReason}
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Surrender Date</FormLabel>
                        <TextField
                            id="surrenderDate"
                            name="surrenderDate"
                            type="date"
                            onChange={formik.handleChange}
                            value={formik.values.surrenderDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Microchip ID</FormLabel>
                        <TextField
                            id="microchipId"
                            type="text"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.microchipId) && formik.touched.microchipId}
                            onChange={formik.handleChange}
                            value={formik.values.microchipId}
                        />
                    </FormControl>
                    <Button
                        onClick={formik.resetForm}
                        color="secondary"
                        variant="contained"
                        type="button"
                        className={classes.button}
                        startIcon={< ClearAllIcon />}
                    >
                        Reset
                                </Button>
                    <Button
                        disabled={!formik.isValid}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                                </Button>
                </form>
            </div>
        </Modal >
    )
}