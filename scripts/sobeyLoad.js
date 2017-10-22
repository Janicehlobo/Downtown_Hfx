	function changeHashOnLoad() {
		if (document.location.hash) {
			var ifm = document.getElementById('ifm');
			ifm.src = ifm.src + document.location.hash;
			ifm.contentWindow.$("body").on("pagechange", function() { loaded(); });
		} else { 
			loaded(); 
		}
	}

	function loaded() {
		var loading = document.getElementById('loading');
		if (!loading) return;
                loading.parentNode.removeChild(loading);
		var ifm = document.getElementById('ifm');
		ifm.style.visibility='visible';
	}
