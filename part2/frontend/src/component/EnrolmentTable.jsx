import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { fetchEnrolments } from '../api/enrolmentApi';

const EnrolmentTable = () => {
  // Manage states
  const [enrolments, setEnrolments] = useState([]); // Enrolment data

  const [page, setPage] = useState(0); // Current page number
  const [pageSize, setPageSize] = useState(20); // Number of rows per page
  const [rowCount, setRowCount] = useState(0); // Total number of rows


  // Fetch enrolment data whenever page or pageSize changes
  useEffect(() => {
    const loadEnrolments = async () => {
      const data = await fetchEnrolments(
        pageSize, 
        page * pageSize
    );
      setEnrolments(data.enrolments);
      setRowCount(data.totalCount);
    };
    loadEnrolments();
  }, [page, pageSize]);

  // Render component
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ width: '30%', fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold' }}>Course</TableCell>
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
    </div>
  );
};

export default EnrolmentTable;
