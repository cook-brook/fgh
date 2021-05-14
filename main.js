prediction=""

Webcam.set({
    width:315,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>' ;
    });


}
console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tHbAd7Ebp/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1= "the prediction is"+prediction;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
    
}

function check(){
    img=document.getElementById('captured_image')
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);

} else {
    console.log(results);
    document.getElementById("result_object_name").innerHTML=results[0].label;
    prediction= results[0].label;
    speak();
    if (results[0].label=="Pataka Haste"){
        document.getElementById("emoji_update").innerHTML="&#9995;";
    }
    if (results[0].label=="Khpitta haste"){
        document.getElementById("emoji_update").innerHTML="&#128532;";
    }
    if (results[0].label=="Musti haste"){
        document.getElementById("emoji_update").innerHTML="&#9994;";
    }
    if (results[0].label=="Suchi haste")
        document.getElementById("emoji_update").innerHTML=" &#9757;";
    }    

}