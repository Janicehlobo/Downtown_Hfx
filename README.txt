The following need to be done for every fresh installation:

1. Create database

Create the database by running the `db/create_database.sql` script against the database.

2. Enter configuration

Fill the configuration files in `config/` with the correct data:

database.txt -> Database name
servername.txt -> MySQL server (can be localhost)
password.txt -> Database user password
port.txt -> MySQL server port
username.txt -> Database username

3. Create initial admin user

4. Apply permission to temporary reports folder

This command gives full permissions to the temporary reports folder. This is required to send the reports by email. The reports are temporarily storing the PDF file in that folder. After sending the email as an attachment this file will automatically be deleted from reportsTemp directory.

Run this command from `app/script/database/`:  “chmod 777 reportsTemp”
