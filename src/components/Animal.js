import React, { useEffect, useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from "react-redux";
import { animalsNameAndCountGroupByName, fetchAllAnimals } from "../features/animals/animalsSlice";
import { Fab, Grid } from '@material-ui/core';
import { AddAnimal } from './AddAnimal'
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(),
    },
    button: {
        float: 'left'
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export function Animal() {
    const tableRef = React.createRef();

    let dispatch = useDispatch()
    const loggedIn = useSelector(state => state.users.loggedIn);
    //No used, check material-table
    // const animals = useSelector(state => state.animals.animals);
    const animalsNameAndCount = useSelector(state => state.animals.animalsNameAndCountGroupByName)

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(animalsNameAndCountGroupByName());
        dispatch(fetchAllAnimals());
        if (open === false) {
            tableRef.current.onQueryChange();
        }
    }, [dispatch, open]);


    // function capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    const getData = query => {
        return new Promise((resolve, reject) => {
            Promise.resolve(dispatch(fetchAllAnimals(query))
                .then((data) => {
                    const TableData = data.payload.animals.map(r => ({ ...r }))
                    const totalCount = data.payload.totalCount;

                    resolve({
                        data: TableData,
                        page: query.page,
                        totalCount,
                    });
                }))
        });
    };

    if (loggedIn)
        return (
            <div className={classes.root}>
                {
                    animalsNameAndCount.filter((animal) => animal.space > animal.count).length > 0 ?
                        <Grid
                            container
                            justify="flex-end"
                        >
                            <Fab className={classes.button}
                                onClick={handleOpen}
                                color="secondary"
                                aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Grid>
                        :
                        <div />
                }
                <Paper className={classes.paper}>
                    <MaterialTable
                        tableRef={tableRef}
                        icons={tableIcons}
                        title="Animals"
                        columns={[
                            { title: 'Name', field: 'name' },
                            { title: 'Sex', field: 'sex' },
                            { title: 'Birth Date', field: 'birthDate' },
                            { title: 'Alteration', field: 'alterationStatus' },
                        ]}
                        data={getData}
                        options={{
                            sorting: true,
                            exportButton: true,
                        }}
                    />
                </Paper>
                <AddAnimal open={open} setOpen={setOpen} />
            </div>
        );
    else
        return (
            <div />
        );
}