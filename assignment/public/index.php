<?php 
	// include 
	// =============================
	include "../models/view_model.php";
	include "../models/search_zip.php";
	// include session check
	include "../models/session_check.php";
	// end includes 
	// =============================

	$view_model = new View_Model();

	// check for action in url
	// ===========================
	// echo 'index.php is running', '<br>';
	if (empty($_GET["action"])){
		$action = "home";
	}else{
		$action = $_GET["action"];
	}

	// echo 'the action = ', $action, "<br>";
	// ===========================

	$my_data = $_POST;
	// check for post vars

	if( $action == "home"){
		$view_model->get_view('../views/loginPage/header.html');
		$view_model->get_view('../views/loginPage/nav.html');
		$view_model->get_view('../views/loginPage/login.html');
		$view_model->get_view('../views/loginPage/footer.html');
	}
	elseif($action == "getLogin"){
		$view_model->get_view('../views/videoPage/header.html');
		$view_model->get_view('../views/videoPage/nav.html');
		$view_model->get_view('../views/videoPage/playerAndSlider.html');
		$view_model->get_view('../views/videoPage/pageFooter.html');
	}


?>
