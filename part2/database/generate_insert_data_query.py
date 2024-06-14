import random
import string

# Generate random string
def random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

# Generate 200 first names
first_names = [random_string(4).capitalize() for _ in range(200)]
# Generate 200 last names
surnames = [random_string(5).capitalize() for _ in range(200)]
# Generate 50 courses, from Course 1 - Course 50
descriptions = [f"Course {i+1}" for i in range(50)]

# 3 different course statuses
statuses = ['not started', 'in progress', 'completed']

with open('insert_data.sql', 'w') as f:
    f.write("USE course_management;\n")
    
    # Insert 200 users
    for i in range(200):
        f.write(f"INSERT INTO user (first_name, surname) VALUES ('{first_names[i]}', '{surnames[i]}');\n")

    # Insert 50 courses
    for i in range(50):
        f.write(f"INSERT INTO course (description) VALUES ('{descriptions[i]}');\n")

    # Insert 5000 enrolments, different user and course combination
    enrolments = set()
    while len(enrolments) < 5000:
        user_id = random.randint(1, 200)
        course_id = random.randint(1, 50)
        status = random.choice(statuses)
        if (user_id, course_id) not in enrolments:
            enrolments.add((user_id, course_id))
            f.write(f"INSERT INTO enrolment (user_id, course_id, completion_status) VALUES ({user_id}, {course_id}, '{status}');\n")
