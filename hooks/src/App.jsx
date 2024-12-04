import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [inputData, setInputData] = useState("");

  // Ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(isNumber) str += "0123456789";
    if(isCharacter) str += "!@#$%&*_-=/\|><?~{}[]";

    for (let i=1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setInputData(pass);

  }, [isNumber, isCharacter, length, setInputData]);

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();  // select All the text from input field
    passwordRef.current?.setSelectRange(0, length-1); // select only limited field range
    window.navigator.clipboard.writeText(inputData);
  }, [inputData])

  useEffect(()=>{
    passwordGenerator();
  }, [isNumber, isCharacter, length])

  return (
    <>
      <div className='w-full flex flex-col gap-5 max-w-xl mx-auto shadow-md rounded-lg my-8 px-4 text-orange-400 bg-gray-700'>
      <h1 className='text-3xl font-bold text-center py-2'>Password Generator</h1>
        <div className='flex shadow overflow-hidden mb-4 bg-black rounded-lg text-white'>
          <input 
            readOnly
            type='text'
            value={inputData}
            className='outline-none w-full text-white px-3 py-2 bg-transparent'
            placeholder='password?'
            ref={passwordRef}
          />
          <button onClick={copyPassword} className='bg-blue-600 px-4 py-2 rounded-md focus:bg-blue-700 focus:scale-95 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <input type='range' min={6} max={50} 
              value={length} className='cursor-pointer rounded-full p-2' 
                onChange={(e)=>setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
              <input type='checkbox' 
                defaultChecked={isNumber} id='numberInput' 
                onChange={()=> setIsNumber(prev => !prev)}
              />
              <label htmlFor='numberInput'>Include Numbers</label>
          </div>
          
          <div className='flex items-center gap-x-2'>
              <input type='checkbox' 
                defaultChecked={isNumber} id='charInput' 
                onChange={()=> setIsCharacter(prev => !prev)}
              />
              <label htmlFor='charInput'>Include Numbers</label>
          </div>
        </div>
      </div>  
    </>
  )
}

export default App
