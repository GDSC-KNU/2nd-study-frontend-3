import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useTheme } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Box } from '@mui/material';

const StyledIconButton = styled(IconButton)`
    padding: 0;
    .css-1kuq5xv-MuiButtonBase-root-MuiIconButton-root {
        padding: 0;
    }
`;

const StyledTableContainer = styled(TableContainer)`
    font-family: 'Nanum Pen Script', cursive;
    margin-top: 1rem;
    margin-left: 2rem;
`;

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const CategoryTable = ({ category, semester }) => {
    const [data, setData] = useState(null);
    const [control, setControl] = useState();
    const [length, setLength] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const fetchData = async () => {
        const { data } = await axios.get(
            'https://honeyclass.kro.kr/category?',
            {
                params: {
                    category: category,
                    semester: semester,
                },
            }
        );
        setLength(data.length);
        setData(data);
        setControl(data);
    };
    useEffect(() => {
        if (
            typeof category !== 'undefined' &&
            typeof semester !== 'undefined'
        ) {
            fetchData();
            setControl(data);
        }
    }, [category, semester]);

    const ResetData = () => {
        setControl(data);
    };
    const OldOrder = (index, e) => {
        // console.log(control);
        // console.log('e' + e);
        // console.log('name' + index);
        setControl(
            [...data].sort(function (a, b) {
                const x = b[index];
                const y = a[index];
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            })
        );
        // console.log(control);
    };
    const RecentOrder = (index, e) => {
        // console.log(control);
        setControl(
            [...data].sort(function (b, a) {
                const x = b[index];
                const y = a[index];
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            })
        );
        // console.log(control);
    };

    return (
        <StyledTableContainer component={Paper}>
            <br />
            <br />
            <Table
                size="small"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell width="8%">
                            수업순위
                            <StyledIconButton
                                sx={{ padding: 0.1 }}
                                color="primary"
                                onClick={(e) => ResetData()}
                            >
                                <RestartAltRoundedIcon sx={{ padding: 0 }} />
                            </StyledIconButton>
                        </TableCell>
                        <TableCell width="12%" align="center">
                            과목명
                            <StyledIconButton
                                sx={{ padding: 0.1 }}
                                color="primary"
                                onClick={(e) => RecentOrder('name', e)}
                            >
                                <ArrowCircleUpIcon fontSize="small" />
                            </StyledIconButton>
                            <StyledIconButton
                                color="secondary"
                                sx={{ padding: 0.1 }}
                                onClick={(e) => OldOrder('name', e)}
                            >
                                <ArrowCircleDownIcon fontSize="small" />
                            </StyledIconButton>
                            {/* <Chip label="" onClick={RecentTimeOrder} />
                            <Chip
                                label="오래된 순 정렬"
                                onClick={OldTimeOrder}
                            /> */}
                        </TableCell>
                        <TableCell width="20%" align="center">
                            과목코드
                            <StyledIconButton
                                sx={{ padding: 0.1 }}
                                color="primary"
                                onClick={(e) => RecentOrder('number', e)}
                            >
                                <ArrowCircleUpIcon fontSize="small" />
                            </StyledIconButton>
                            <StyledIconButton
                                color="secondary"
                                sx={{ padding: 0.1 }}
                                onClick={(e) => OldOrder('number', e)}
                            >
                                <ArrowCircleDownIcon fontSize="small" />
                            </StyledIconButton>
                        </TableCell>
                        <TableCell width="10%" align="center">
                            교과구분
                            <StyledIconButton
                                sx={{ padding: 0.1 }}
                                color="primary"
                                onClick={(e) => RecentOrder('type', e)}
                            >
                                <ArrowCircleUpIcon fontSize="small" />
                            </StyledIconButton>
                            <StyledIconButton
                                color="secondary"
                                sx={{ padding: 0.1 }}
                                onClick={(e) => OldOrder('type', e)}
                            >
                                <ArrowCircleDownIcon fontSize="small" />
                            </StyledIconButton>
                        </TableCell>
                        <TableCell width="10%" align="center">
                            교수님
                            <StyledIconButton
                                sx={{ padding: 0.1 }}
                                color="primary"
                                onClick={(e) => RecentOrder('professor', e)}
                            >
                                <ArrowCircleUpIcon fontSize="small" />
                            </StyledIconButton>
                            <StyledIconButton
                                color="secondary"
                                sx={{ padding: 0.1 }}
                                onClick={(e) => OldOrder('professor', e)}
                            >
                                <ArrowCircleDownIcon fontSize="small" />
                            </StyledIconButton>
                        </TableCell>
                        <TableCell width="40%" align="center">
                            수업시간
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {control &&
                        (rowsPerPage > 0
                            ? control.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : control
                        ).map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    height: '35px',
                                }}
                                // component={Link}
                                // to="/detail"
                                // state={data[index + page * rowsPerPage]}
                            >
                                <TableCell height="50px" scope="row">
                                    {/* <Link onClick={handleClickOpen}>
                                        {index + 1 + page * rowsPerPage}
                                    </Link> */}
                                    <Link
                                        to="/detail"
                                        state={data[index + page * rowsPerPage]}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontWeight: 'bolder',
                                                borderRadius: 2,
                                            }}
                                            // onClick={LoadDetail(index)}
                                        >
                                            {index + 1 + page * rowsPerPage}
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell align="center">
                                    {item.name}
                                </TableCell>
                                <TableCell align="center">
                                    {item.number}
                                </TableCell>
                                <TableCell align="center">
                                    {item.type}
                                </TableCell>
                                <TableCell align="center">
                                    {item.professor}
                                </TableCell>
                                <TableCell align="center">
                                    {item.real_time}
                                </TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 20 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                50,
                                100,
                                { label: 'All', value: -1 },
                            ]}
                            colSpan={3}
                            count={length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </StyledTableContainer>
    );
};

export default CategoryTable;
