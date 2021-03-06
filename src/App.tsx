import React, { useState } from 'react';
import questions from './assets/questions.json';

export function RenderQuestion(): JSX.Element {
	return <div>{questions[0].answerOptions}</div>
}

export default function App(): JSX.Element {

	const [currentQuestion, setCurrentQuestion] = useState<number>(0);

	const handleAnswerClick = (isCorrect: boolean) => {
		if (isCorrect) {
			alert("Correct! " + questions[currentQuestion].reason)
			setScore(score+1);
		} else {
			alert("Incorrect! " + questions[currentQuestion].reason)
		}
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	}

	const [showScore, setShowScore] = useState<boolean>(false);

	const [score, setScore] = useState<number>(0);

	const isScorePerfect = (score: number) => {
		if (score === questions.length) {
			return true;
		} else {
			return false;
		}
	}

	const [atMainMenu, setAtMainMenu] = useState<boolean>(true)

	const handleStartClick = () => {
		setAtMainMenu(false)
	}

	return (
		<div className='app'>
			{atMainMenu ?
				<div className= 'main-menu'>
					<h1 className = 'title-text'>Riyara's Video Game Trivia</h1>
					<h2 className = 'subtitle-text'>CISC275 F2021</h2>
					<button className = 'start-button' onClick={() => handleStartClick()}>{<strong>Start</strong>}</button>
				</div>
				:null 
			}
			{showScore ? (
				<div 
				className='score-section'>You scored {score} out of {questions.length}
				{isScorePerfect(score) ? (
					<div className='congratulations'>A perfect score! Great job!</div>
				) : (
					<div className='good-try'>Thanks for playing!</div>
				)}
				</div>
			) : (
				<>
				{!atMainMenu ?
					<>
					<div className='question-section'>
								<div className='question-count'>
									<span>Question {currentQuestion + 1}</span>/{questions.length}
									<h3>Game: {questions[currentQuestion].gameSource}</h3>
								</div>
								<div className='question-text'>{questions[currentQuestion].questionText}</div>
							</div><div className='answer-section'>
									{questions[currentQuestion].answerOptions.map((answerOption, index) => (
										<button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
									))}
							</div>
						</>
					:null
					}
				</>
			)}
		</div>
	);
}
