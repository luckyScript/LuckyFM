(function($) {
	var audioSrc;
	function getMusic() {
		$.ajax({
			url: "/app",
			method: "GET"
		}).done(function(data) {
			musicData = data;
			var audio = document.querySelector('audio');
			audio.src = musicData.mp3Url;
			var download = document.querySelector(".a-download");
			download.href = musicData.mp3Url;
			download.download = musicData.name;
			document.querySelector('h3').innerHTML = musicData.name;
			document.querySelector('h4').innerHTML = musicData.artist;
			document.querySelector('#music-pic').src = musicData.pic;
			audio.play();
			
		})	
	}
	getMusic();
	
	setInterval(function() {
		if (document.querySelector('audio').ended) {
			getMusic();
		}
	},1000)

	document.querySelector(".arrow")
		.addEventListener("click", function() {
			document.querySelector('audio').pause();
			getMusic();
		});

	document.querySelector(".home")
		.addEventListener("click", function() {
			window.location.href = "http://www.luckyscript.me"
		});

	document.querySelector("#music-control")
		.addEventListener("click", function() {
			if (document.querySelector('audio').paused) {
				document.querySelector('audio').play();
				$('#music-pic').css("animation","6s imground linear infinite");
				$(".controller").removeClass("fa-play").addClass("fa-pause");
			} else {
				document.querySelector('audio').pause();
				$('#music-pic').css("animation","a");
				$(".controller").removeClass("fa-pause").addClass("fa-play");
			}
		})
})(jQuery);
