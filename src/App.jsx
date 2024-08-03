import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
   var [length,setLength] = useState(8)
   var [numberAllowed,setNumberAllowed] = useState(false)
   var [characterAllowed, setCharacterAllowed] = useState(false);
   var [password,setPassword] = useState()
   const passwordRef = useRef(null)
   
   const passGenerator = useCallback(()=>{
      var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzyz"
      if(numberAllowed) str += "1234567890"
      if (characterAllowed) str += "!@#$%^&*()-_=+{}[]|:;\"'<>,.?/";
      var pra = ""
      for(let i=1;i<length;i++){
          pra += str.charAt(Math.floor(Math.random() * str.length+1));
      }
      setPassword(pra)
   },[length,numberAllowed,characterAllowed])

  const copyPassword = ()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password); 
  }

    useEffect(()=> passGenerator(), [length, numberAllowed, characterAllowed]);

  return (
    <div className="bg-slate-900 text-white w-screen h-screen flex items-center justify-center">
      <div className="bg-zinc-700 h-3/6 w-2/6">
        <h1 className="text-white text-center mt-10 text-3xl mb-4">
          Password Generator
        </h1>
        <div className="flex gap-4 items-center justify-center p-8">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="password"
            ref={passwordRef}
            name=""
            id=""
            className="w-4/6 p-2 text-black outline-none"
          />
          <button
            className="border-none bg-sky-800 hover:bg-blue-700 p-3 rounded-lg"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-4 items-center justify-center p-8">
          <div>
            <input
              type="range"
              value={length}
              min="6"
              max="50"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="password length" className="pl-2">
              {length}
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              value={numberAllowed}
              name=""
              id=""
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="Password_NumberAllowed" className="pl-1">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterinput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
