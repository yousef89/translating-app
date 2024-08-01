"use client"
import { useState , useEffect } from "react";

export default function TranslateFrom({segment , setSegment ,data , setData , secLanguage}) {
  
  const [firstLanguage , setFirstLanguage] = useState("en");
  const [showMessage, setShowMessage] = useState(false);
  const [other , setOther] = useState(false);
  

  function handleOther(){
    setOther(!other);
  }

  useEffect(() => {
    async function fetchData() {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${segment}&langpair=${firstLanguage}|${secLanguage}`);
        const data = await response.json();
        setData(data);
    }
 
    fetchData();
  }, [segment]);

  function segHandler(event){
    setSegment(event.target.value);
  }
  console.log(data);

  function copyToClipboard() {
    navigator.clipboard.writeText(segment);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1000);
  }

  function readText() {
    const utterance = new SpeechSynthesisUtterance(segment);
    // Optionally set the language
    utterance.lang = firstLanguage; // or dynamically set based on firstLanguage
    window.speechSynthesis.speak(utterance);
  }

    return (
      <div className="w-[560px] z-10 font-dm-sans font-semibold flex flex-col justify-center items-center bg-[#121826cc] rounded-[20px] bg-opacity-5">
        
        <div className="flex justify-center items-center pl-7 mr-auto">
          <div className="flex text-[15px] text-[#626874] gap-x-[5px]  text-opacity-70 mr-auto">
           
            
            <button 
            onClick={() => {
              setFirstLanguage("en");

            }} className={firstLanguage === "en" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>English</button>
            
            <button onClick={() => {
              setFirstLanguage("fr");

            }} className={firstLanguage === "fr" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>French</button>
            
            <button onClick={() => {
              setFirstLanguage("es");

            }} className={firstLanguage === "es" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>Spanish</button>
          </div>
          <svg onClick={() => handleOther()} className="ml-[10px] cursor-pointer"  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6L8 10L4 6" stroke="#6C727F" stroke-width="2"/>
          </svg>
          {other && (
              <div className="z-10 absolute top-[285px] left-[410px] text-[11px] bg-gray-800 text-[#f4f6f8] p-2 rounded-md shadow-md opacity-100 duration-1000">
                  <button 
              onClick={() => {
                setFirstLanguage("ar");

              }} className={firstLanguage === "ar" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>Arabic</button>
              
              <button onClick={() => {
                setFirstLanguage("it");

              }} className={firstLanguage === "it" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>Italian</button>
              
              <button onClick={() => {
                setFirstLanguage("pt");

              }} className={firstLanguage === "pt" ? "bg-[#4d5461] text-[#f4f6f8] rounded-[10px] py-2 px-2" :"hover:bg-[#4d5461] hover:text-[#f4f6f8] rounded-[10px] py-2 px-2 duration-300"}>Portuguese</button>
            
            </div>
          )}
        </div>
        <hr className="border-t border-[#384150] w-[500px] my-6 opacity-50" />
        
        <input 
          className="text-[#F1F2F3] border-none outline-none w-[480px]  text-opacity-80 bg-[#121826] pb-[124px] mx-7 mr-auto rounded-md bg-opacity-0"
          type="text"
          maxLength={500}
          value={segment}
          onChange={segHandler}
        />

        <div className="flex items-center justify-center px-5 py-5  w-[550px]">
          <div className="flex gap-x-2 mr-auto">
            <div className="flex border-[2px] border-gray-600 border-opacity-40 p-[4px] rounded-[6px] hover:border-[#838383] hover:bg-[#838383] active:bg-[#727272] duration-500 cursor-pointer">
              <svg onClick={readText} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.46532 11.6089C2.87114 10.6186 2.87114 9.38143 3.46532 8.39114C3.64663 8.08895 3.94701 7.87726 4.29258 7.80815L5.70344 7.52598C5.78749 7.50917 5.86326 7.46409 5.91814 7.39824L7.17085 5.89498C8.3534 4.47592 8.94468 3.76638 9.47234 3.95742C10 4.14846 10 5.07207 10 6.91928L10 13.0807C10 14.9279 10 15.8515 9.47234 16.0426C8.94468 16.2336 8.3534 15.5241 7.17085 14.105L5.91814 12.6018C5.86326 12.5359 5.78749 12.4908 5.70344 12.474L4.29258 12.1918C3.94701 12.1227 3.64663 11.9111 3.46532 11.6089Z" fill="#4D5562"/>
                <path d="M12.1129 7.05373C12.8903 7.83111 13.329 8.88422 13.3333 9.9836C13.3376 11.083 12.9073 12.1395 12.1361 12.923" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
                <path d="M15.5474 5.28596C16.7912 6.52977 17.493 8.21475 17.4999 9.97375C17.5069 11.7327 16.8183 13.4232 15.5844 14.6768" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div  className="flex items-center border-[2px] border-gray-600 border-opacity-40 p-[4px] rounded-[6px] hover:border-[#838383] hover:bg-[#838383] active:bg-[#727272] duration-500 cursor-pointer " onClick={copyToClipboard}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 5.83334V5.83334C11.6667 5.36869 11.6667 5.13636 11.6282 4.94316C11.4704 4.14978 10.8502 3.52959 10.0569 3.37177C9.86366 3.33334 9.63133 3.33334 9.16668 3.33334H7.33334C5.44773 3.33334 4.50492 3.33334 3.91913 3.91913C3.33334 4.50492 3.33334 5.44773 3.33334 7.33335V9.16668C3.33334 9.63133 3.33334 9.86366 3.37177 10.0569C3.52959 10.8502 4.14978 11.4704 4.94316 11.6282C5.13636 11.6667 5.36869 11.6667 5.83334 11.6667V11.6667" stroke="#4D5562" stroke-width="2"/>
                <rect x="8.33334" y="8.33334" width="8.33333" height="8.33333" rx="2" stroke="#4D5562" stroke-width="2"/>
              </svg>
              {showMessage && (
              <div className="z-10 absolute top-[485px] left-[195px] text-[11px] bg-gray-800 text-[#f4f6f8] p-2 rounded-md shadow-md opacity-100 duration-1000">
                Text copied!
              </div>
              )}
            </div>
            
          </div>
          <p className="text-[#626874] text-opacity-70 text-[13px] ml-auto pr-6">{segment.length}/500</p>
        </div>
      </div>
    );
  }
  