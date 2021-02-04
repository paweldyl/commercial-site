var current_slide = [0];
var number_of_slides = [4];
var slider_set_time_out = [4];
if(document.querySelector(".circle1") && document.querySelector(".circle0")){
	var circle_color = getComputedStyle(document.querySelector(".circle1")).backgroundColor;
	var current_circle_color = getComputedStyle(document.querySelector(".circle0")).backgroundColor;
}
var slider_html = [
	{
		h1: ["Praca zdalna", "Laptopy", "Światłowód", "Programowanie dla każdego"],
		p: ["ułatw pracę zdalną z naszym nowym oprogramowaniem!", "Sprawdź naszą najnowszą ofertę z laptopami", "oferujemy transfer nawet 1Gb/s !", "oferujemy bezpłatne programy szkoleniowe dla wszystkich"],
		button: ["Sprawdź", "Kup teraz", "Sprawdź", "Chce się uczyć!"]
	}
];
function toggleMenu(){
	document.querySelector(".burger_absolute").classList.toggle("vissible");
	document.querySelector(".hidden_nav").classList.toggle("vissible");
	document.querySelector(".dark").classList.toggle("vissible");
}
function showHide(){
	document.querySelector(".burger_menu").classList.toggle("change");
	toggleMenu();
}
function set_slider_css(which_slide, which_slider){
	let background = "linear-gradient(to right, rgba(0,0,0, 0.3), rgba(0,0,0, 0.3)),";
	document.querySelector("#slider"+which_slider).style.background = background + "url(" + "img/slide" + which_slide + ".jpg)";
	document.querySelector("#slider"+which_slider).style.backgroundSize = "100% 100%";
	document.querySelector("#slider"+which_slider).style.backgroundRepeat = "no-repeat";
}
function set_slider_circles(which_slide, which_slider){
	let slider_id = "#slider"+which_slider;
	let slider = document.querySelector(slider_id);
	let all_circles = slider.querySelectorAll(".circles > .circle");
	all_circles.forEach(function(circle){
		circle.style.backgroundColor = circle_color;
	});
	slider.querySelector(".circle" + which_slide).style.backgroundColor = current_circle_color;
}
function set_slider_text(which_slide, which_slider){
	document.querySelector("#slider"+which_slider+" > div > h1").innerHTML = slider_html[which_slider]["h1"][which_slide];
	document.querySelector("#slider"+which_slider+" > div > p").innerHTML = slider_html[which_slider]["p"][which_slide];
	document.querySelector("#slider"+which_slider+" > .slider_button").innerHTML = slider_html[which_slider]["button"][which_slide];
}
function slider(which_slide, which_slider){
	if(which_slide == -1){
		if(current_slide[which_slider] - 1 >= 0)
			which_slide = current_slide[which_slider] - 1;
		else
			which_slide = current_slide[which_slider];
	}
	else if(which_slide == -2){
		if(current_slide[which_slider] + 1 < number_of_slides[which_slider])
			which_slide = current_slide[which_slider] + 1;
		else
			which_slide = current_slide[which_slider];
	}
	clearTimeout(slider_set_time_out[which_slider]);
	set_slider_css(which_slide, which_slider);
	set_slider_circles(which_slide, which_slider);
	set_slider_text(which_slide, which_slider);
	current_slide[which_slider] =  ((which_slide + 1) - 1) % number_of_slides[0];
	slider_set_time_out[which_slider] = setTimeout(function(){slider((which_slide + 1) % number_of_slides[0],which_slider)}, 7000);
}
function resize_3d_photo(){
	let element = document.querySelector(".d3_laptop_photo");
	let width = getComputedStyle(element)['width'];
	width = width.slice(0,-2);
	let height = (width * 375) / 1000;
	element.style.height = height+"px";
	element.style.backgroundSize = width+"px"+" "+ (height * 36) +"px";
	let range_value = document.querySelector("#d3_laptop_range").value;
	element.style.backgroundPosition = "0px"+" "+ (height * (-range_value)) +"px";
}
function change_laptop(ele){
	let element = document.querySelector(".d3_laptop_photo");
	let height = getComputedStyle(element)['height'];
	height = height.slice(0,-2);
	let range_value = ele.value;
	element.style.backgroundPosition = "0px"+" "+ (height * (-range_value)) +"px";
}
function enlargeImg(){
	document.querySelector(".img_full_screen").classList.toggle("vissible");
	if(this.src){
		document. querySelector(".full_screen_img").src = this.src;	
	}
}
let images = document.querySelectorAll(".gallery_img img");
for(let i = 0; i < images.length; i++){
	images[i].addEventListener("click", enlargeImg);
}
function set_products_section(ele){
	console.log(ele["id"]);
	let which_ele = ele["id"].slice(9,ele["id"].length);
	console.log(which_ele);
	let all_sections = document.querySelectorAll(".which_products");
	for(let i = 0; i < all_sections.length; i++){
		all_sections[i].style.display = "none";
	}
	document.querySelector("#"+which_ele).style.display = "flex";
}
function showHideDescription(ele){
	ele.querySelector(".job_text").classList.toggle("height_auto");
	ele.querySelector(".job_show_arrow").classList.toggle("rotate90");
}