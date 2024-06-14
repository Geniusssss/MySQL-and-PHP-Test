<?php

// Use controller directly without a separate model, because only performing read operations
class EnrolmentController
{
  private $conn;

  // Constructor to initialize database connection with exception handling
  public function __construct($db)
  {
    try {
      if ($db === null) {
        throw new Exception("Invalid database connection");
      }
      $this->conn = $db;
    } catch (Exception $e) {
      // Handle the exception by logging the error
      error_log("Error initializing EnrolmentController: " . $e->getMessage());
      throw $e;
    }
  }

  // Method to get enrolments from the database with pagination and search filter
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
              WHERE 
                  (:userFilter = '' OR CONCAT(u.first_name, ' ', u.surname) = :userFilter)
                  AND (:courseFilter = '' OR c.description = :courseFilter)
              ORDER BY
                  id
              LIMIT :limit OFFSET :offset";

      // Prepare the SQL statement
      $stmt = $this->conn->prepare($sql);

      // Bind parameters to the SQL query
      $stmt->bindValue(':userFilter', $userFilter ? "$userFilter" : '', PDO::PARAM_STR);
      $stmt->bindValue(':courseFilter', $courseFilter, PDO::PARAM_STR);
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

  // Method to get users matching the search query
  public function getMatchingUsers($query)
  {
    try {
      // SQL query to select users matching the search query
      $sql = "SELECT
                  user_id,
                  CONCAT(first_name, ' ', surname) AS name
              FROM
                  user
              WHERE
                  CONCAT(first_name, ' ', surname) LIKE :searchTerm";

      // Prepare the SQL statement
      $stmt = $this->conn->prepare($sql);
      // Create search term for partial matching
      $searchTerm = '%' . $query . '%';
      // Bind parameter to the SQL query
      $stmt->bindValue(':searchTerm', $searchTerm, PDO::PARAM_STR);
      // Execute the query
      $stmt->execute();
      // Fetch the results
      $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Return the list of matching users
      return $users;
    } catch (PDOException $e) {
      // Handle any errors
      echo "Error: " . $e->getMessage();
      return [];
    }
  }

  // Method to get courses matching the search query
  public function getMatchingCourses($query)
  {
    try {
      // SQL query to select courses matching the search query
      $sql = "SELECT
                  course_id,
                  description
              FROM
                  course
              WHERE
                  description LIKE :searchTerm";

      // Prepare the SQL statement
      $stmt = $this->conn->prepare($sql);
      // Create search term for partial matching
      $searchTerm = '%' . $query . '%';
      // Bind parameter to the SQL query
      $stmt->bindValue(':searchTerm', $searchTerm, PDO::PARAM_STR);
      // Execute the query
      $stmt->execute();
      // Fetch the results
      $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

      // Return the list of matching courses
      return $courses;
    } catch (PDOException $e) {
      // Handle any errors
      echo "Error: " . $e->getMessage();
      return [];
    }
  }
}

?>