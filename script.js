document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultContainer = document.getElementById('result');

    // Excel 檔案中的題目
    const questions = [
        {
            question: "1+1=?",
            answers: {
                a: "1",
                b: "2",
                c: "3",
                d: "4"
            },
            correctAnswer: "b"
        },
        {
            question: "3+3=?",
            answers: {
                a: "4",
                b: "5",
                c: "6",
                d: "7"
            },
            correctAnswer: "c"
        },
        {
            question: "4+6=?",
            answers: {
                a: "10",
                b: "11",
                c: "12",
                d: "13"
            },
            correctAnswer: "a"
        },
        {
            question: "5*5=",
            answers: {
                a: "5",
                b: "10",
                c: "20",
                d: "25"
            },
            correctAnswer: "d"
        }
    ];

    function buildQuiz() {
        const output = [];
        questions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                if (currentQuestion.answers[letter]) {
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter.toUpperCase()} :
                            ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }
            }
            output.push(
                `<div class="question">
                    <p>${questionNumber + 1}. ${currentQuestion.question}</p>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        let numCorrect = 0;
        questions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = quizContainer.querySelectorAll('.answers')[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
                numCorrect++;
            }
        });

        const score = (numCorrect / questions.length) * 100;
        let message = `得分：${score} 分\n`;
        
        if (score === 100) {
            message += "太棒了！";
        } else if (score < 60) {
            message += "請加油！";
        }
        
        resultContainer.innerHTML = message;
    }

    buildQuiz();
    submitButton.addEventListener('click', showResults);
});