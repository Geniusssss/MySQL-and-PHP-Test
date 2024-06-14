<?php

// Use controller directly without a separate model, because only performing read operations
class EnrolmentController
{
  private $conn;

  // Constructor to initialize database connection
  public function __construct($db)
  {
    $this->conn = $db;
  }

  // Method to get enrolments from database
  public function getEnrolments($limit, $offset, $userFilter, $courseFilter)
  {
    try {
      // SQL query to select enrolment details
      $sql = "SELECT SQL_CALC_FOUND_ROWS
                  e.enrolment_id AS id,
                  CONCAT(u.first_name, ' ', u.surname) AS user,
                  c.description AS course,
                  e.completion_status
              FROM
                  enrolment e
              JOIN
                  user u ON e.user_id = u.user_id
              JOIN
                  course c ON e.course_id = c.course_id
              ORDER BY
                  id
              LIMIT :limit OFFSET :offset";

      // Prepare the SQL statement
      $stmt = $this->conn->prepare($sql);

      // Bind parameters to the SQL query
      $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
      $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);

      // Execute the query
      $stmt->execute();

      // Fetch the results
      $enrolments = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Query to get the total count of matching enrolments
      $count_stmt = $this->conn->query("SELECT FOUND_ROWS() AS totalCount");
      $totalCount = $count_stmt->fetch(PDO::FETCH_ASSOC)['totalCount'];

      // Return the enrolments and total count
      return ['enrolments' => $enrolments, 'totalCount' => $totalCount];
    } catch (PDOException $e) {
      // Handle any errors
      echo "Error: " . $e->getMessage();
      return ['enrolments' => [], 'totalCount' => 0];
    }
  }
}
?>