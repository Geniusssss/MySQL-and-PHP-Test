USE mindatlas;

SELECT
    user.username AS Username,
    Phone.field_data AS Phone,
    Email.field_data AS Email,
    Position.field_data AS Position
FROM
    user
LEFT JOIN
    user_data AS Phone ON user.id = Phone.user_id AND Phone.field_id = 1
LEFT JOIN
    user_data AS Email ON user.id = Email.user_id AND Email.field_id = 2
LEFT JOIN
    user_data AS Position ON user.id = Position.user_id AND Position.field_id = 3
ORDER BY
    user.id;
