import { useState ,useEffect} from 'react';
import Que from './components/Question';

function  App() {
const [btnStyle,setBtnStyle] = useState({display:"none"});
const [qList,setQList] = useState([]);
const [isCorrect,checkAns] = useState("");
const [qObj,setQObj] = useState({question:"",correct_answer:""});
const [qNum,changeQNum] = useState(0);
const [score,setScore] = useState(0);
const [startBtn,setStartBtn] = useState({style:{display:"inline-block", background:"#153448"},title:"Start Quiz"});
function startQuiz(){
  changeQNum(0);  
  setBtnStyle(()=>{return{display:"inline-block"}});
  fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean')
    .then(res => res.json())
    .then(data => setQList(data.results));
    setStartBtn(()=>{return {style:{display:"None"},title:"Restart Quiz"}});
    setBtnStyle(()=>{return {display:"inline-block"}});
  }

  function processData(){
    if (qList.length == 10){
      if(qNum < 10){
        setQObj((preObj)=>{
         var txt = document.createElement('textarea');
         txt.innerHTML =  qList[qNum].question;
         var qText =  txt.value;
         var aText = qList[qNum].correct_answer;
         console.log(qText,aText);
         return{question:qText,correct_answer:aText};
        });
      }else{
        setBtnStyle(()=>{return{display:"none"}});
        setStartBtn(()=>{return{style:{display:"inline-block",background:"#153448"},title:"Restart Quiz"}});
        setQObj(()=>{
          return{question:`You have completed the Quiz Challenge!\nYour final score is:${score}`,correct_answer:""};
        })
      }
    }
  }
  useEffect(processData,[qList,score]);


  function handleClick(e){
    const name = e.target.name;
    console.log(name);
    if(name==qObj.correct_answer){
      console.log(qObj.correct_answer);
      setScore(score+1);
      changeQNum(qNum+1);
      checkAns("Last Answer: ✅Correct");
      }else{
        changeQNum(qNum+1);
        setScore(preScore=>preScore-0.5);
        checkAns("Last Answer: ❌Wrong");
      }
    }
  return (
    <div className="App">
      <header className="App-header">        
        <h2>Chrome Trivia</h2>
          <button className="btnTrue" style={startBtn.style} onClick={startQuiz}>{startBtn.title}</button>
      </header>
      
      <Que q={qObj.question}/>
      
      <button style={btnStyle} name="True" onClick={handleClick} className="btnTrue">True</button>
      <button style={btnStyle} name="False" onClick={handleClick} className="btnFalse">False</button>
      <p><code>Score: {score}</code></p>
      <h2>{isCorrect}</h2>
      <footer>Created by <a target="_blank" href="http://narendra.great-site.net">Narendra Kashikar</a>.Some rights reserved. 2024</footer>
    </div>
  );
}

export default App;
