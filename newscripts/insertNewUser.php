<?php
/*Vivek Karunakaran*/

session_start();

$username = "jh_lobo";

$password = "A00415463";
$dbname = "jh_lobo";
$host=":/var/run/mysqld/mysqld.sock";

$link = mysql_connect($host, $username, $password);
print "connect"
if (!$link) die("Couldn't connect to MySQL");
print "Connected dade"
mysql_select_db($dbname)
        or die("Couldn't open $db: ".mysql_error());

 $_SESSION['fname']=$fname;
$_SESSION['lname']=$lname;
	$_SESSION['email'] = $email;
	$_SESSION['phone'] = $phone;
	$_SESSION['password'] = $password;
	$_SESSION['companyname'] = $company;
$sql = "insert into user(firstName,lastName,email,telephone,company,password) values ($fname, $lname,$email,$phone,$companyname,$password)";
 $ok = mysql_query($sql);
    if (!$ok) print "SQL error: ".mysql_error();

mysql_close($link);   
?>


