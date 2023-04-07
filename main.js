pred_1 = "";
pred_2 = "";



Webcam.set({
    width: 350,
    height: 300,
    image_format : "png",
    png_quality: 90
});


Webcam.attach("#camera");


function take_snapshot(){

   Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured' src = '" + data_uri  +  " ' />";
   });
    
}

console.log('ml5 version:', ml5.version);



function agent_speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + pred_1;
    speak_data_2 = "And the second prediction is " + pred_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
  

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function check(){
    img = document.getElementById("captured");
    classifier.classify(img,got_results);
}


function got_results(error, results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        pred_1 = results[0].label;
        pred_2 = results[1].label;


        document.getElementById("result_emotion_name").innerHTML = pred_1;
        
        document.getElementById("result_emotion_name2").innerHTML = pred_2;

        if (pred_1 == "happy"){

            
        document.getElementById("update_emoji").innerHTML = "&#128522";
            
        }

        if (pred_1 == "sad"){

            
            document.getElementById("update_emoji").innerHTML = "&#128532";
                
        }

        if (pred_1 == "angry"){

            
            document.getElementById("update_emoji").innerHTML = "&#128548";
                
        }


        if (pred_2 == "happy"){

            
            document.getElementById("update_emoji2").innerHTML = "&#128522";
                
            }
    
        if (pred_2 == "sad"){
    
                
                document.getElementById("update_emoji2").innerHTML = "&#128532";
                    
        }
    
        if (pred_2 == "angry"){
    
                
                document.getElementById("update_emoji2").innerHTML = "&#128548";
                    
        }

        agent_speak();


    }
    
}




