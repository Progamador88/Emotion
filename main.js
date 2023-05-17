prediction1 = ""
prediction2 = ""

Webcam.set({
    width:350,
    height:300,
    imageFormat : 'png',
    pngQuality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  

  function fala(){
    apifala=window.speechSynthesis;
    fala1="A Primeira Previsão é: "+prediction1;
    fala2="a segunda previsão é"+prediction2;
    texto=new SpeechSynthesisUtterance(fala1+fala2);
    apifala.speak(texto);
  }

  function check(){
    imagem=document.getElementById("captured_image");
    classifier.classify(imagem,result);
  }
  
  function result(error,result){
    if(error){
      console.error(error)
    }
    else{
      console.log(result);
      prediction1=result[0].label;
      prediction2=result[1].label;
      document.getElementById("resultEmotionName").innerHTML=prediction1;
      document.getElementById("resultEmotionName2").innerHTML=prediction2;
      fala();
      if (prediction1=="feliz") {
        document.getElementById("updateEmoji").innerHTML="&#128522";
      }
      if (prediction1=="triste") {
        document.getElementById("updateEmoji").innerHTML="&#128532";
      }
      if (prediction1=="irritado") {
        document.getElementById("updateEmoji").innerHTML="&#128548";
      }
      if (prediction2=="feliz") {
        document.getElementById("updateEmoji2").innerHTML="&#128522";
      }
      if (prediction2=="triste") {
        document.getElementById("updateEmoji2").innerHTML="&#128532";
      }
      if (prediction2=="irritado") {
        document.getElementById("updateEmoji2").innerHTML="&#128548";
      }
    }
  }




