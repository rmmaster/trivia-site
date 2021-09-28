import React, { useState } from 'react';
import QUESTIONS from './questions.json';

export default function App() {
	const questions = {QUESTIONS};

	const [currentQuestion, setCurrentQuestion] = useState(0);

	const handleAnswerClick = (isCorrect) => {
		if (isCorrect) {
			alert("Correct!")
			setScore(score+1);
		} else {
			alert("Incorrect!")
		}
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	}

	const [showScore, setShowScore] = useState(false);

	const [score, setScore] = useState(0);

	const isScorePerfect = (score) => {
		if (score === questions.length) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className='app'>
			{showScore ? (
				<div 
				className='score-section'>You scored {score} out of {questions.length}
				{isScorePerfect(score) ? (
					<div className='congratulations'>A perfect score! Great job!</div>
				) : (
					<div className='good-try'>Thanks for playing!</div>
				)
				
			}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion+1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, index) => (
							<button onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
