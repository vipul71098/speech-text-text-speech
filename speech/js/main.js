
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	//recognition.interimResults = true;
	var lang ={
		'English':"eng",
		'Hindi':'hi-IN'
	}
 
	// function hindi(){
	// 	recognition.onresult = function(event) {   
	// 		console.log(event);
	// 		var output = document.getElementById("mytext");
	// 		output.innerHTML = "";
	// 		for(var i=0; i<event.results.length; i++){
	// 			output.innerHTML = output.innerHTML + event.results[i][0].transcript;
	// 		}
	// 	}
	// 	recognition.lang = 'hi-IN';
	// 	recognition.start();
	// }
	function start(){
		recognition.onresult = function(event) {   
			console.log(event);
			var output = document.getElementById("mytext");
			
			
			console.log("jjj",strUser)

			output.innerHTML = "";
			for(var i=0; i<event.results.length; i++){
				output.innerHTML = output.innerHTML + event.results[i][0].transcript;
			}
		} 
		var langslect = document.getElementById("language");
		var strUser = langslect.options[langslect.selectedIndex].text;
		console.log(strUser)
		if(strUser == "English"){
				recognition.lang = 'en-IN';
			}
			else if(strUser == "Hindi"){
				recognition.lang = 'hi-IN';
			}
			else if(strUser == "Bengali"){
				recognition.lang ='bn-BD';
			}
			else{
				recognition.lang = 'en-IN'
			}
		
		recognition.start();
	}
	// for text into speech
	function checkCompatbility(){
     if(!('speechSynthesis' in window)){
      alert("your browser is not Compatible");
     }
	};
	checkCompatbility();
	var voiceOptions = document.getElementById('voiceOptions');
	var volumeSlider = document.getElementById('volumeSlider');
	var rateSlider = document.getElementById('rateSlider');
	var pitchSlider = document.getElementById('pitchSlider');
	var mytext = document.getElementById('mytext');
console.log(recognition.lang)
	var voiceMap = [];

	function loadvoices(){
		var voices = speechSynthesis.getVoices();
		for( var i=0;i < voices.length;i++){
			var voice = voices[i];
			var option = document.createElement('option');
			option.value = voice.name;
			option.innerHTML = voice.name;
			voiceOptions.appendChild(option);
			voiceMap[voice.name] = voice;
		};
	};

	window.speechSynthesis.onvoiceschanged = function(e){
		loadvoices();
	};

	function speak(){
    var msg = new SpeechSynthesisUtterance();
    msg.volume = volumeSlider.value;
    msg.voice = voiceMap[voiceOptions.value]
    msg.rate = rateSlider.value;
    msg.pitch = pitchSlider.value;
    msg.text = mytext.value;
    window.speechSynthesis.speak(msg);
	};
	$("#btn-save").click( function() {
  var text = $("#mytext").val();
  var filename = $("#input-fileName").val()
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename+".txt");
});
