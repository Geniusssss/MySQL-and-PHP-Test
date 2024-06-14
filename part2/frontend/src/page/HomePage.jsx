import React from 'react';
import { Typography, Container } from '@mui/material';
import EnrolmentTable from '../component/EnrolmentTable';

const HomePage = () => {
  return (
    <Container>
      {/* Page Title */}
      <Typography variant="h3" gutterBottom sx={{ marginTop: "20px" }}>
        Course Enrolments
      </Typography>
      {/* Enrolment table */}
      <EnrolmentTable />
    </Container>
  );
};

export default HomePage;
