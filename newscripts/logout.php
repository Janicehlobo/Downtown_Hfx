<?php

session_start();

     if (isset($_SESSION['userlogin'])){
         $userid = $_SESSION['userlogin'];
     
      }

$_SESSION=array();
session_destroy();


?>