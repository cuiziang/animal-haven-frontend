import React, { useState } from 'react';
import { Modal, FormControl, FormLabel, TextField, Button, RadioGroup, Radio, FormControlLabel, makeStyles } from '@material-ui/core';
import { useFormik } from 'formik';
import SaveIcon from '@material-ui/icons/Save';

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


    const formik = useFormik({
        initialValues: {
            name: '',
            sex: '',
            alteration: '',
            birthDate: '',
            surrenderedByAnimalControl: '',
            microchipId: ''
        },
        onSubmit: values => {
            props.setOpen(false);
        }
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
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </FormControl>
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
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Surrender Date</FormLabel>
                        <TextField
                            id="surrenderDate<"
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
                            onChange={formik.handleChange}
                            value={formik.values.microchipId}
                        />
                    </FormControl>
                    <Button
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
        </Modal>
    )
}