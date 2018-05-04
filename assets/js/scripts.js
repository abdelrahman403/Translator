var transForm = document.getElementById("trans-form");
var Input = document.getElementById("en-input");
var arOutput = document.getElementById("ar-output");
var wordlist, count = 0;

transForm.onsubmit = (e) => {
  // wordlist = Input.value.split(/\s/); 
  
  wordlist = dataForm.dataInput.value.split(/\s/); // regex
  console.log(wordlist);
  
  wordlist.forEach( (word) => {
    arOutput.value = " ";
    getTranslate(word);
  });
  
  e.preventDefault();
}

function getTranslate(query) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      arOutput.value += xhr.responseText +  " ";
    }
  };
  var urlQ = "http://localhost:5000/?query=" + query;
  xhr.open("GET", urlQ, true);
  xhr.send();
}

// Sound Handling

var lang = 'en',
  sayIt = document.getElementById("say"),
  audio = document.getElementById("speech"),
  arToEn = document.getElementById("ar"),
  enToAr = document.getElementById("en");

enToAr.addEventListener('click', () => {
  lang = 'en';
  Input.setAttribute('placeholder', 'Your English Word.');
  arOutput.setAttribute('placeholder', 'Arabic Translation.');
  // enToAr.setAttribute('class', 'active');
  // arToEn.removeAttribute('class');
  // console.log(lang);
});

arToEn.addEventListener('click', () => {
  lang = 'ar';
  Input.setAttribute('placeholder', 'Your Arabic Word.');
  arOutput.setAttribute('placeholder', 'English Translation.');
  // arToEn.setAttribute('class', 'active');
  // enToAr.removeAttribute('class');
  // console.log(lang);
});

sayIt.addEventListener('click', (e) => {
  e.preventDefault();
  var text = arOutput.value;
  text = encodeURIComponent(text);
  // console.log(text);

  var url;
  if(lang == 'en')    // en to ar
    url = "https://translate.google.com/translate_tts?ie=UTF-8&q=" + text + "&tl=ar&client=tw-ob";
  else if(lang == 'ar')   // ar to en
    url = "http://translate.google.com/translate_tts?tl=en&q=" + text + "&client=tw-ob";

  audio.setAttribute("src", url);
  audio.play();

  // charTalking();

});


// Character Talking

function charTalking(){

  // javascript_abort();

  text = dataForm.dataOuput.value;  // to take the value as a string
  var arr1 = ['ا', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'ن', 'ه'];


  for(var i=0; i<text.length; i++){
    console.log(text[i]);
    if(text[i] == 'و' && (text[i+1] == 'ى' || text[i+1] == 'ي') ) {
      character.setAttribute('src', 'testing/o2e.gif');
      console.log("test1");
    }
    else if((text[i] == 'ى' || text[i] == 'ي') && text[i+1] == 'و'){
      character.setAttribute('src', 'testing/e2o.gif');
      console.log("test2");
    }
    else if(text[i] == 'و' && arr1.includes(text[i+1])){
      character.setAttribute('src', 'testing/o2a.gif');
    }
    else if(arr1.includes(text[i]) && text[i+1] == 'و'){
      character.setAttribute('src', 'testing/a2o.gif');
    }
    else{
      character.setAttribute('src', 'testing/a2o.gif');
    }
  }
  character.setAttribute('src', 'testing/character.jpg');
  
}

function javascript_abort() {
   throw new Error('This is not an error. This is just to abort javascript');
}
