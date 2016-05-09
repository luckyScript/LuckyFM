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

	document.querySelector("#music-control")
		.addEventListener("click", function() {
			if (document.querySelector('audio').paused) {
				document.querySelector('audio').play();
				$('#music-pic').css("animation","6s imground linear infinite");
				$(".fa").removeClass("fa-play").addClass("fa-pause");
			} else {
				document.querySelector('audio').pause();
				$('#music-pic').css("animation","a");
				$(".fa").removeClass("fa-pause").addClass("fa-play");
			}
		})
})(jQuery);
