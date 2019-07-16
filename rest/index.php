<?php

require '../vendor/autoload.php';
Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=babies','root','password'));

/*Flight::route('/', function(){
    echo 'hello world!';
});*/

Flight::route('GET /baby_count', function(){
    $count = Flight::db()->query('SELECT SUM(IF(gender = "MALE", 1, 0 )) AS male, SUM(IF(gender = "FEMALE", 1, 0 )) AS female FROM babies', PDO::FETCH_ASSOC)->fetch();
    Flight::json($count);
});

Flight::route('GET /babies', function(){
 $babies = Flight::db()->query('SELECT * FROM babies', PDO::FETCH_ASSOC)->fetchAll();
 Flight::json($babies);
});

Flight::route('POST /babies', function(){
    $request = Flight::request()->data->getData();
    $insert = "INSERT INTO babies (gender, date_time, weight, height, mother_name) VALUES(:gender, :date_time, :weight, :height, :mother_name)";
    $stmt= Flight::db()->prepare($insert);
    $stmt->execute($request);
});

Flight::route('DELETE /babies/@id', function($id){
     $delete = "DELETE FROM babies WHERE id = :id";
     $stmt= Flight::db()->prepare($delete);
     $stmt->execute([":id" => $id]);
});

Flight::start();
?>
