<?php
require_once '../src/controller/EnrolmentController.php';

// Set the content type to JSON
header('Content-Type: application/json');

try {
    // Initialize the controller with the database connection
    $controller = new EnrolmentController($conn);

    // Get the HTTP method and path info, using REST API
    $method = $_SERVER['REQUEST_METHOD'];
    $path = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'], '/')) : [];

    // Initialize the response variable
    $response = [];

    switch ($method) {
        // Get method
        case 'GET':
            if (isset($path[0])) {
                if ($path[0] === 'enrolments') {
                    // Get the limit, offset, userFilter, and courseFilter from the query parameters
                    // Set the default value if no value
                    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
                    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
                    $userFilter = isset($_GET['userFilter']) ? $_GET['userFilter'] : '';
                    $courseFilter = isset($_GET['courseFilter']) ? $_GET['courseFilter'] : '';

                    // Validate the input parameters
                    if ($limit <= 0 || $offset < 0) {
                        http_response_code(400);
                        $response = ['message' => 'Invalid limit or offset'];
                    } else {
                        // Get enrolments data
                        $response = $controller->getEnrolments($limit, $offset, $userFilter, $courseFilter);
                    }
                }
            } else {
                // Non-valid request
                http_response_code(400);
                $response = ['message' => 'Bad Request'];
            }
            break;
        // Do not support other methods
        default:
            http_response_code(405);
            $response = ['message' => 'Method Not Allowed'];
            break;
    }
} catch (Exception $e) {
    // Catch any exceptions
    http_response_code(500);
    $response = ['message' => 'Internal Server Error', 'error' => $e->getMessage()];
}

// Send data to the frontend as JSON
echo json_encode($response);
?>
