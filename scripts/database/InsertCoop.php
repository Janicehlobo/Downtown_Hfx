
<?php
/*fatma & Mahnoush*/
 session_start();
 $servername = file_get_contents("../../config/servername.txt");
 $servername = trim($servername);
 $username = file_get_contents("../../config/username.txt");
 $username = trim($username);
 $port = file_get_contents("../../config/port.txt");
 $port = trim($port); $password = file_get_contents("../../config/password.txt");
 $password = trim($password);
 $dbname = file_get_contents("../../config/database.txt");
 $dbname = trim($dbname);

try {
    $conn = new PDO("mysql:host=localhost;port=$port;dbname=$dbname", $username, $password);

    $conn -> setAttribute (PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     session_start();
     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];
         $userrole = $_SESSION["userrole"];     
      }

   if($_POST){
    date_default_timezone_set('America/Halifax');
   $coopName = $_POST['txtCoopName'];
   $industry = $_POST['txtindustry'];
   $type = $_POST['txttype'];
   $postalcode = $_POST['txtpostalcode'];
   $language = $_POST['txtlanguage'];
   $province = $_POST['txtprovince'];
   $country = $_POST['txtcountry'];    
   $createdate = date('Y-m-d');

  if ($userrole =='user'){
   $sql  = "INSERT INTO cooptable (coopName, industry, type, postalCode, language, province, country, cstatus, createdAt, createdBy)
    values ( :coopName, :industry , :type , :postalcode , :language , :province , :country ,'Active', :createdate , :userid )" ;
 
    $result1 = $conn->prepare($sql);
    $result1->execute(array('coopName' => $coopName , 'postalcode' => $postalcode, 'industry' => $industry,
                     'type' => $type, 'country' => $country ,'province' => $province ,'language' => $language,
                     'userid' => $userid, 'createdate' => $createdate )); 

    $last_id = $conn->lastInsertId();

   $assig_coop  = "UPDATE access SET cooptable_idcoop='$last_id' , updatedBy = :userid where user_iduser= :userid" ;

   $result2 = $conn->prepare($assig_coop); 
   $result2->execute( array('userid' => $userid ));


 }elseif ($userrole =='admin') {

  $sql  = "INSERT INTO cooptable (coopName, industry, type, postalCode, language, province, country, cstatus, createdAt, createdBy)
    values ( :coopName, :industry , :type , :postalcode, :language , :province , :country ,'Active', :createdate , :userid )" ;
 
    $result1 = $conn->prepare($sql);
    $result1->execute(array('coopName' => $coopName , 'postalcode' => $postalcode , 'industry' => $industry,
                           'type' => $type, 'country' => $country ,'province' => $province ,'language' => $language,
                           'userid' => $userid , 'createdate' => $createdate ));   
  
 }
 echo json_encode($userrole) ;
  } else{
 echo json_encode($userrole) ;

  }
}
catch(PDOException $e)
{
  echo "Connection failed: " . $e->getMessage();
}
$conn = null;
?>


