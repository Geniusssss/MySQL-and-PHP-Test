import React, { useState, useEffect } from 'react';
import { Chip, Popover, TextField, IconButton, Autocomplete, Box, Paper, Alert, Snackbar } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { fetchEnrolments, fetchMatchingUsers, fetchMatchingCourses } from '../api/enrolmentApi';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const EnrolmentTable = () => {
  // Manage states
  const [enrolments, setEnrolments] = useState([]); // Enrolment data

  const [page, setPage] = useState(0); // Current page number
  const [pageSize, setPageSize] = useState(20); // Number of rows per page
  const [rowCount, setRowCount] = useState(0); // Total number of rows

  // User filter states
  const [showUserFilter, setShowUserFilter] = useState(false); // Flag to show/hide user filter
  const [anchorElUser, setAnchorElUser] = useState(null); // User filter popover
  const [userFilter, setUserFilter] = useState(null); // Selected user
  const [userOptions, setUserOptions] = useState([]); // User list after filtering by user
  // Course filter states
  const [showCourseFilter, setShowCourseFilter] = useState(false); // Flag to show/hide course filter
  const [anchorElCourse, setAnchorElCourse] = useState(null); // Course filter popover
  const [courseFilter, setCourseFilter] = useState(null); // Selected course
  const [courseOptions, setCourseOptions] = useState([]); // Course list after filtering by course

  // Flag to show connection errors
  const [error, setError] = useState(false);



  // Fetch enrolment data whenever page, pageSize, userFilter, or courseFilter changes
  useEffect(() => {
    const loadEnrolments = async () => {
      // Handle exceptions
      try {
        const data = await fetchEnrolments(
          pageSize,
          page * pageSize,
          userFilter?.name,
          courseFilter?.description
        );
        setEnrolments(data.enrolments);
        setRowCount(data.totalCount);
      } catch (error) {
        setError(true);
      }
    };
    loadEnrolments();
  }, [page, pageSize, userFilter, courseFilter]);


  // User filter methods
  // Open or close the user filter when click the filter icon
  const handleUserFilterClick = (event) => {
    setAnchorElUser(event.currentTarget);
    setShowUserFilter(!showUserFilter);
  };

  // Handle user filter input change (input something in the user filter text box)
  const handleUserInputChange = async (event, value) => {
    if (value) {
      // Handle exceptions
      try {
        // Fetch the user list matching the input keyword
        const data = await fetchMatchingUsers(value);
        setUserOptions(data);
      } catch (error) {
        setError(true);
      }
    } else {
      // Empty list if no input keyword
      setUserOptions([]);
    }
  };

  // Handle user filter change (eg. select a user in the user list)
  const handleUserFilterChange = (event, value) => {
    setUserFilter(value);
    setPage(0);
  };

  // Delete the selected user chip
  const handleUserChipDelete = () => {
    setUserFilter(null);
    setUserOptions([]);
  };


  // Course filter methods
  // Open or close the course filter when click the filter icon
  const handleCourseFilterClick = (event) => {
    setAnchorElCourse(event.currentTarget);
    setShowCourseFilter(!showCourseFilter);
  };

  // Handle course filter input change (input something in the course filter text box)
  const handleCourseInputChange = async (event, value) => {
    if (value) {
      // Handle exceptions
      try {
        // Fetch the course list matching the input keyword
        const data = await fetchMatchingCourses(value);
        setCourseOptions(data);
      } catch (error) {
        setError(true);
      }
    } else {
      // Empty list if no input keyword
      setCourseOptions([]);
    }
  };

  // Handle course filter change (eg. select a course in the course list)
  const handleCourseFilterChange = (event, value) => {
    setCourseFilter(value);
    setPage(0);
  };

  // Delete the selected course chip
  const handleCourseChipDelete = () => {
    setCourseFilter(null);
    setCourseOptions([]);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };



  // Render component
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ width: '30%', fontWeight: 'bold' }}>
                <Box display="flex" alignItems="center">
                  User
                  <IconButton onClick={handleUserFilterClick}>
                    <FilterAltIcon />
                  </IconButton>
                  {/* Show first name and last name if there's a selected user */}
                  {userFilter !== null &&
                    <Chip label={userFilter.name} onDelete={handleUserChipDelete} />
                  }
                  {/* Show or hide the user filter */}
                  <Popover
                    open={showUserFilter}
                    anchorEl={anchorElUser}
                    onClose={() => setShowUserFilter(false)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Box>
                      <Autocomplete
                        options={userOptions}
                        noOptionsText="Text to search"
                        getOptionLabel={(option) => option.name}
                        value={userFilter}
                        onInputChange={handleUserInputChange}
                        onChange={handleUserFilterChange}
                        isOptionEqualToValue={(option, value) =>
                          option.user_id === value.user_id
                        }
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Filter by User"
                            variant="filled"
                          />
                        )}
                      />
                    </Box>
                  </Popover>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold' }}>
                <Box display="flex" alignItems="center">
                  Course
                  <IconButton onClick={handleCourseFilterClick}>
                    <FilterAltIcon />
                  </IconButton>
                  {/* Show course description if there's a selected course */}
                  {courseFilter !== null &&
                    <Chip
                      label={courseFilter.description}
                      onDelete={handleCourseChipDelete}
                    />
                  }
                  {/* Show or hide the course filter */}
                  <Popover
                    open={showCourseFilter}
                    anchorEl={anchorElCourse}
                    onClose={() => setShowCourseFilter(false)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Box>
                      <Autocomplete
                        options={courseOptions}
                        noOptionsText="Text to search"
                        getOptionLabel={(option) => option.description}
                        value={courseFilter}
                        onInputChange={handleCourseInputChange}
                        onChange={handleCourseFilterChange}
                        isOptionEqualToValue={(option, value) =>
                          option.course_id === value.course_id
                        }
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Filter by Course"
                            variant="filled"
                          />
                        )}
                      />
                    </Box>
                  </Popover>
                </Box>
              </TableCell>
              <TableCell
                align="center"
                sx={{ width: '30%', fontWeight: 'bold' }}
              >
                Completion Status
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Render the enrolment data as a table */}
          <TableBody>
            {enrolments.map((enrolment) => (
              <TableRow key={enrolment.id}>
                <TableCell>{enrolment.id}</TableCell>
                <TableCell>{enrolment.user}</TableCell>
                <TableCell>{enrolment.course}</TableCell>
                <TableCell align="center">{enrolment.completion_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination management, fetch the enrolment data more efficient */}
      <TablePagination
        component="div"
        count={rowCount}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => setPageSize(parseInt(event.target.value, 10))}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
      {/* Show an error if there is a connection error */}
      {error &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error}
          autoHideDuration={5000}
          onClose={handleErrorClose}
        >
          <Alert severity="error">Connection errors</Alert>
        </Snackbar>
      }
    </div>
  );
};

export default EnrolmentTable;
