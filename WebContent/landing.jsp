<!DOCTYPE html>
<html lang="en">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
	integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
	crossorigin="anonymous">
<!-- Place at the end for faster loading -->
<!-- Replaced jQuery with the min version for AJAX (instead of slim) -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous">
</script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
	integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
	crossorigin="anonymous"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
	integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
	crossorigin="anonymous"></script>
<script src="js/landing.js"></script>
<link rel="stylesheet" type="text/css" href="css/landing.css">
</head>
<body onload="startGame()">
	<div id="myfilter"
		style="position: absolute; background-color: #000000; opacity: 0.3; width: 322px; height: 182px; display: none"></div>
	<div id="myrestartbutton"
		style="position: absolute; padding-top: 75px; padding-left: 120px; display: none;">
		<button onclick="restartGame()">Restart</button>
	</div>
	<div id="canvascontainer"></div>
	<br>
	<div style="text-align: center; width: 320px;">
		<button ontouchstart="moveup()" onmousedown="moveup()"
			onmouseup="clearmove()">UP</button>
		<br> <br>
		<button ontouchstart="moveleft()" onmousedown="moveleft()"
			onmouseup="clearmove()">LEFT</button>
		<button ontouchstart="moveright()" onmousedown="moveright()"
			onmouseup="clearmove()">RIGHT</button>
		<br> <br>
		<button ontouchstart="movedown()" onmousedown="movedown()"
			onmouseup="clearmove()">DOWN</button>
	</div>
	<br>

</body>
</html>