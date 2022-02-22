<?php
 $host = "localhost"; /* Host name */
 $user = "root"; /* User */
 $password = ""; /* Password */
 $dbname = "tehden_coding_test"; /* Database name */
 
 $con = mysqli_connect($host, $user, $password, $dbname);
 // Check connection
 if (!$con) {
   die("Connection failed: " . mysqli_connect_error());
 }


 $data = json_decode(file_get_contents("php://input"));

 $request = $data->request;
 // Fetch all customers
if($request == 1){
    $customerData = mysqli_query($con,"
    select customer.id, customer.name, customer.email, count(project.id) as curprojects
    from customer
    left join project ON customer.id=project.customerid
    group by customer.id order by customer.name asc");
  
    $response = array();
    while($row = mysqli_fetch_assoc($customerData)){
      $response[] = $row;
    }
  
    echo json_encode($response);
    exit;
  }

  // Fetch projects by customer
  if($request == 2){
    $id = $data->id;
    
    $customerData = mysqli_query($con,"select id, name, customerid, starttime, endtime from project where customerid=".$id);
  
    $response = array();
    while($row = mysqli_fetch_assoc($customerData)){
      $response[] = $row;
    }
  
    echo json_encode($response);
    exit;
  }

  // Delete project
  if($request == 3){
    $id = $data->id;

    mysqli_query($con,"delete from project where id=".$id);  
    echo ("Delete succesfully");
    exit;
  }

  // Edit customer
  if($request == 4){
    $id = $data->id;
    $name = $data->name;
    $email = $data->email;

    mysqli_query($con,"update customer set name='".$name."',email='".$email."' where id=".$id);  
    echo ("Customer updated succesfully");
    exit;
  }
?>