<?php
/*Vivek Karunakaran*/

$fname=@$_POST['fname']
$lname=@$_POST['lname']
$email=@$_POST['email']
$phone=@$_POST['phone']
$company=@$_POST['companyname']
$passwd=@$_POST['passworduser']
$table="user";
$link=mysql_connect(':/var/run/mysqld/mysqld.sock','root','');

if(!$link) die("Couldnt Connect!");

mysql_select_db('downtown') or die("Couldnt open!");

$checkfn=mysql_query("select fname,lname from user where fname='$fname' and lname='$lname'");

$numResults = mysql_num_rows($checkfn);
session_start();
$_SESSION['fname']=$fname;
$_SESSION['lname']=$lname;
$_SESSION['email']=$email;
$_SESSION['phone']=$phone;
$_SESSION['companyname']=$company;
//$_SESSION['btype']=$btype;
$_SESSION['passworduser']=$passwd;
if($numResults>0 ){
echo "<p>There is already an entry with the name '$fname' and '$lname'?Do you still wish to insert</p>";
}
else {

$fname = "\"$fname\"";
$lname = "\"$lname\"";
$email="\"$email\"";
$phone="\"$phone\"";
$company="\"$company\"";
$btype="\"$btype\"";
$passwd="\"$passwd\"";
 $query = "insert into $table(firstName,lastName,email,telephone,companyname,businesstype,password) values  ($fname, $lname,$email,$phone,$company,NULL,$passwd)";
 

    print "<p>Values inserted successfully<p>";

    $ok = mysql_query($query);
    if (!$ok) print "SQL error: ".mysql_error();

    }
       
}

mysql_close($link);

?>