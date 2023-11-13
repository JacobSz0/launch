import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import YoutubeEmbed from "./YoutubeEmbed";
import arrow from "./img/arrow.webp"
import thumbs_up from "./img/thumbs-up.png"
import "./Training.css"


function Training() {
  const [trainingData, setTrainingData] = useState([{"show_video": false}]);
  const [currentTraining, setCurrentTraining] = useState(0)
  const [showArrows, setShowArrows] = useState({"back":false,"forward":true})
  const [selectedAnswer, setSelectedAnswer] = useState({"number": null, "ans":null})
  const [ansCorrect, setAnsCorrect] = useState(false)
  const navigate = useNavigate();

  function DecreaseTraining(){
    setCurrentTraining(currentTraining-1)
  }

  function IncreaseTraining(){
    if (currentTraining>=trainingData.length-1){
      navigate("/congrats");
    }
    else{setCurrentTraining(currentTraining+1)}
  }


  function selectAnswer(num,answer){
    setSelectedAnswer({"number": num, "ans":answer});
  }

  function checkAnswer(){
    if (selectedAnswer["ans"]===trainingData[currentTraining]["correct_answer"]){
      setAnsCorrect(true)
      var newShowArrows=showArrows
      newShowArrows["forward"]=true
      setShowArrows(newShowArrows)
    }
    else{console.log("YUUU SUK")}
  }

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_DATABASE}trainings`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        var trainings=data.trainings
        for (var i of trainings){
            if (i.video!=="string"){
                var video_id=i.video.split("https://www.youtube.com/watch?v=")
                video_id=video_id[1]
                i["video_id"]=video_id
                i["show_video"]=true
            }
            else{
                i.video_id=null
                i.show_video=false
            }
            if (i.question!=="string"){
              i.show_question=true
              var answers=i.answers.split(",")
              i.answer_array=answers
            }
            else{
              i.show_question=false
          }
        }
        console.log(trainings)
        setTrainingData(data.trainings)
      }
    }
    fetchData()
  }, []);

  function Refresh(ct){
    if (currentTraining>trainingData.length){
    }
    setAnsCorrect(false)
    setSelectedAnswer({"number":null, "ans":null})
    if (trainingData[ct]["show_question"]===true){
      var newShowArrows=showArrows
      newShowArrows["forward"]=false
      setShowArrows(newShowArrows)
    }
    else{
      var newShowArrows=showArrows
      newShowArrows["forward"]=true
      setShowArrows(newShowArrows)
    }
    if (ct<1){
      var newShowArrows=showArrows
      newShowArrows["back"]=false
      setShowArrows(newShowArrows)
    }
    else{
      var newShowArrows=showArrows
      newShowArrows["back"]=true
      setShowArrows(newShowArrows)
    }
  }

  useEffect(() => {
    Refresh(currentTraining)
  }, [currentTraining]);

  return (
    <div>
      {/* Video */}
      {trainingData[currentTraining]["show_video"] ? (
        <div className="padding">
            <YoutubeEmbed embedId={trainingData[currentTraining]["video_id"]} />
        </div>
      ) : null}

        {/* Quiz */}
        {trainingData[currentTraining]["show_question"] ? (
          <div>
            <h2 className="text">{trainingData[currentTraining]["question"]}?</h2>
            <div>
              {trainingData[currentTraining]["answer_array"].map((i,num) => {
                return(
                  <div key={i} className="outer-answer-border">
                    {ansCorrect && num === selectedAnswer.number ? (
                      <img className="thumbs-up"src={thumbs_up}></img>
                    ) : null}
                    <div
                      className={`answer-border text ${num === selectedAnswer.number ? 'answer-select' : 'answer-border'}`}
                      onClick={()=> selectAnswer(num, i)}
                    >
                      {i}
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={checkAnswer}>Check answer</button>
          </div>
        ) : null}

        {/* Arrows */}
        <div className="arrow-border">
          {showArrows["back"] ? (
            <img className="arrow-left"src={arrow} onClick={() => DecreaseTraining()}></img>
          ) : null}
          {showArrows["forward"] ? (
            <img className="arrow-right"src={arrow} onClick={() => IncreaseTraining()}></img>
          ) : null}
        </div>
    </div>
  );
}

export default Training;
