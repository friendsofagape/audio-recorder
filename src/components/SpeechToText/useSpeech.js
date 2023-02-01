import { useState } from "react";

export default function useSpeech(language,intermediateTranscript){
  const [transcript,setTranscript]=useState('');
  const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
  // eslint-disable-next-line prefer-const
  let sr = new Speech();
  sr.continuous = true;
  // sr.interimResults = true;
  sr.lang = language;


  const startfunc =()=> {
    sr.start();
  }

  const stopfunc= () =>{
    sr.stop();
    sr.onresult = (e) => {
      // if (intermediateTranscript!=='intermediate'){
      const text = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
      setTranscript(text)
      // }
    }
  }
  // sr.onresult = (e) => {
  //   if (intermediateTranscript==='intermediate'){
  //     var interim_transcript = "";
  //     var final_transcript = "";
  //     if (typeof e.results == "undefined") {
  //       sr.onend = null;
  //       sr.stop();
  //       return;
  //     }
  //     for (var i = e.resultIndex; i < e.results.length; ++i) {
  //       if (e.results[i].isFinal) {
  //         final_transcript += e.results[i][0].transcript;
  //         console.log(e.results[i][0].transcript,"+++",final_transcript);
  //         setTranscript(final_transcript)
  //       } else {
  //         interim_transcript += e.results[i][0].transcript;
  //         console.log(e.results[i][0].transcript,"%%%",interim_transcript,sr);
  //         setTranscript(interim_transcript)
  //       }
  //     }
  //     // final_transcript = capitalize(final_transcript);
  //     // setTranscript(final_transcript)
  //     // final_span.innerHTML = linebreak(final_transcript);
  //     // interim_span.innerHTML = linebreak(interim_transcript);
  //     // if (final_transcript || interim_transcript) {
  //     //   showButtons("inline-block");
  //     // }
  //   } 
  // };
  sr.onerror = (e) => {
    console.log('error : ', e.error);
  };
  return {startfunc,stopfunc,transcript}
}