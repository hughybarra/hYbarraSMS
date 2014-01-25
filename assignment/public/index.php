<?php 
	// include 
	// =============================
	include "../models/view_model.php";
	include "../models/search_zip.php";
	// end includes 
	// =============================

	// check for action in url
	// ===========================
	if (empty($_GET["action"])){
		$action = "home";
	}else{
		$action = $_GET["action"];
	}
	// ===========================

	$my_data = $_POST;

	if( $action == "home"){
		$view_model = new View_Model();

		$view_model->get_view('../views/htmlHeader.html');
		$view_model->get_view('../views/pageNav.html');
		$view_model->get_view('../views/pageFooter.html');

	}elseif ($action == "getLogin"){
		$view_model = new View_Model();
		$view_model->get_view('../views/login.html');
	}// end else 
	elseif($action == "getLoggedIn"){
		$view_model = new View_Model();
		$view_model->get_view('../views/playerAndSlider.html');
	}

	// end home
	// ==============================================

	elseif( $action == "search_zip"){

		// search zip to handle all zip related stuff
		$search_zip = new Search_Zip(); 
	}
	// ==============================================
	elseif( $action== ""){

	}
?>
