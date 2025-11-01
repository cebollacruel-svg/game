document.addEventListener('DOMContentLoaded', () => {

  // --- Vocabulary Data ---
  const vocabList = [
    { word: "adolescent", context: "To an adolescent, nothing is more embarrassing than a parent.", definition: "A young teenager (age 13-16)" },
    { word: "upheaval", context: "Adolescence represents an inner emotional upheaval.", definition: "A period of great conflict and change" },
    { word: "struggle", context: "A struggle between the wish to cling to the past and the wish to get on with the future.", definition: "A conflict or fight" },
    { word: "cling to", context: "The eternal human wish to cling to the past.", definition: "To hold on tightly" },
    { word: "overprotective", context: "Is he overprotective?", definition: "Limiting a person's freedom, usually a child" },
    { word: "move out", context: "They can't wait to move out and be on their own.", definition: "To live independently" },
    { word: "discrimination", context: "You can experience discrimination.", definition: "Not being treated equally by other students" },
    { word: "distract", context: "They can distract you from learning.", definition: "To cause you to lose your focus" },
    { word: "carefree", context: "In Kazakhstan, I was carefree!", definition: "Without responsibilities or worries" },
    { word: "ego identity", context: "The development of ego identity.", definition: "The conscious sense of self that we develop through social interaction" },
    { word: "self-absorbed", context: "Kids going through this are very self-absorbed.", definition: "Completely focused on one's self; worried about being socially accepted" },
    { word: "maturation", context: "This is the time of physical maturation.", definition: "The process of becoming an adult" },
    { word: "moratorium", context: "During this moratorium the not-yet-adult is allowed to rebel.", definition: "A suspension of action or responsibility" },
    { word: "rebel", context: "The not-yet-adult is allowed to rebel.", definition: "To act against authority or established ways" },
    { word: "settle down", context: "You know how to settle down.", definition: "Get a job, buy a house, get married, etc." },
    { word: "receptive", context: "Much more receptive to new ideas.", definition: "Open; willing to accept new ideas" }
  ];

  // --- Game Scenario Data ---
  const gameData = [
    {
      level: 1,
      imageTag: "https://images.pexels.com/photos/7110041/pexels-photo-7110041.jpeg?auto=compress&cs=tinysrgb&w=300",
      profile: "I'm so confused. One minute I want my mom to help me, the next I can't stand her. I feel like I'm in a constant <strong>struggle</strong> with myself. My body is changing, and I feel totally <strong>self-absorbed</strong>, like everyone is watching me. It's a total emotional <strong>upheaval</strong>.",
      options: ["The Teen Years", "Young Adulthood", "Late Adulthood"],
      correctAnswer: "The Teen Years",
      explanation: "<strong>This is The Teen Years.</strong> The profile describes the 'inner emotional <strong>upheaval</strong>' and '<strong>struggle</strong>' that Erik Erikson's theory discusses. The feeling of being '<strong>self-absorbed</strong>' is also a key challenge of this stage."
    },
    {
      level: 2,
      imageTag: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=300",
      profile: "Life is full of big decisions right now. I just graduated and I'm trying to find a job and <strong>move out</strong> of my parents' house. It's exciting, but I'm also worried about my career and whether I should try to <strong>settle down</strong> or just stay <strong>carefree</strong> for a while.",
      options: ["The Teen Years", "Young Adulthood", "Middle Adulthood"],
      correctAnswer: "Young Adulthood",
      explanation: "<strong>This is Young Adulthood.</strong> The text describes this as a 'time of many difficult but exciting decisions', such as choosing a career, deciding where to live, and whether to '<strong>settle down</strong>'."
    },
    {
      level: 3,
      imageTag: "https://images.pexels.com/photos/5195648/pexels-photo-5195648.jpeg?auto=compress&cs=tinysrgb&w=300",
      profile: "I feel like I'm stuck. My kids are <strong>adolescents</strong> now and they think I'm 'so embarrassing.' They want to <strong>rebel</strong>, but I'm just trying to be a good parent, not <strong>overprotective</strong>. At the same time, my own parents are getting older and need my help. It's a lot.",
      options: ["Young Adulthood", "Middle Adulthood", "Late Adulthood"],
      correctAnswer: "Middle Adulthood",
      explanation: "<strong>This is Middle Adulthood.</strong> The text describes this stage as bringing 'other changes and challenges', such as when 'our children and our parents are entering new stages of life'."
    },
    {
      level: 4,
      imageTag: "https://images.pexels.com/photos/2105104/pexels-photo-2105104.jpeg?auto=compress&cs=tinysrgb&w=300",
      profile: "My parents gave me this period as a kind of <strong>moratorium</strong>—a time before I have *real* responsibility. They want me to just focus on school, but really I'm trying to figure out who I am. It's all about finding my <strong>ego identity</strong>.",
      options: ["The Teen Years", "Middle Adulthood", "Late Adulthood"],
      correctAnswer: "The Teen Years",
      explanation: "<strong>This is The Teen Years.</strong> The profile uses two key concepts from the text: '<strong>moratorium</strong>' (a 'suspension of action' before responsibility) and the primary challenge of this stage, developing an '<strong>ego identity</strong>'."
    },
    {
      level: 5,
      imageTag: "https://images.pexels.com/photos/6781353/pexels-photo-6781353.jpeg?auto=compress&cs=tinysrgb&w=300",
      profile: "These are the best years. My body has slowed down, but I'm more <strong>receptive</strong> to new ideas than ever. My children are independent, and I have time for hobbies and my grandchildren. I finally feel I have no responsibilities, just like when I was a child—I'm totally <strong>carefree</strong>!",
      options: ["Young Adulthood", "Middle Adulthood", "Late Adulthood"],
      correctAnswer: "Late Adulthood",
      explanation: "<strong>This is Late Adulthood.</strong> The text mentions that 'late adulthood brings its own rewards', such as 'time to enjoy grandchildren, hobbies, and travel'. The speaker feels '<strong>carefree</strong>', or without responsibilities."
    }
  ];

  // --- Get DOM Elements ---
  const screens = document.querySelectorAll('.screen');
  const startBtn = document.getElementById('start-btn'); // CRITICAL: This must match the HTML ID
  const vocabContainer = document.getElementById('vocab-container');
  const startGameBtn = document.getElementById('start-game-btn');
  const gameContainer = document.getElementById('game-container');
  const levelTitle = document.getElementById('level-title');
  const scenarioImage = document.getElementById('scenario-image');
  const scenarioText = document.getElementById('scenario-text');
  const optionsContainer = document.getElementById('options-container');
  const feedbackBox = document.getElementById('feedback-box');
  const nextBtn = document.getElementById('next-btn');
  const finalScreen = document.getElementById('final-screen');
  const restartBtn = document.getElementById('restart-btn');

  let currentLevel = 0;
  let answered = false;

  // --- Functions ---

  // Function to switch which screen is visible
  function showScreen(screenId) {
    screens.forEach(screen => {
      screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
  }

  // Function to load the vocabulary cards
  function loadVocabulary() {
    vocabContainer.innerHTML = '';
    vocabList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.innerHTML = `
        <div class="vocab-word">${item.word}</div>
        <div class="vocab-context"><em>"${item.context}"</em></div>
        <div class="vocab-definition"><strong>Definition:</strong> ${item.definition}</div>
      `;
      // Add click event to toggle definition
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
      vocabContainer.appendChild(card);
    });
  }

  // Function to load a game level
  function loadLevel(level) {
    answered = false;
    const data = gameData[level];
    
    levelTitle.textContent = `Profile ${level + 1} of ${gameData.length}`;
    
    // Uses the real image URL
    scenarioImage.innerHTML = `<img src="${data.imageTag}" alt="Scenario Image">`;
    
    scenarioText.innerHTML = `<p>${data.profile}</p>`;
    
    optionsContainer.innerHTML = '';
    data.options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.answer = option;
      btn.textContent = option;
      btn.addEventListener('click', handleOptionClick);
      optionsContainer.appendChild(btn);
    });

    feedbackBox.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // Function to handle clicking an answer
  function handleOptionClick(e) {
    if (answered) return;
    answered = true;

    const selectedAnswer = e.target.dataset.answer;
    const data = gameData[currentLevel];

    // Disable all option buttons
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === data.correctAnswer) {
        btn.style.borderColor = "#3c763d";
        btn.style.background = "#dff0d8";
      }
    });

    // Show feedback
    if (selectedAnswer === data.correctAnswer) {
      feedbackBox.innerHTML = `<strong>✅ Correct!</strong> ${data.explanation}`;
      feedbackBox.className = 'correct';
    } else {
      feedbackBox.innerHTML = `<strong>❌ Not quite.</strong> The correct answer is <strong>${data.correctAnswer}</strong>. <p>${data.explanation}</p>`;
      feedbackBox.className = 'incorrect';
      e.target.style.borderColor = "#a94442";
      e.target.style.background = "#f2dede";
    }
    feedbackBox.style.display = 'block';

    // Show 'Next' or 'Finish' button
    if (currentLevel < gameData.length - 1) {
      nextBtn.textContent = 'Next Profile';
    } else {
      nextBtn.textContent = 'Go to Final Discussion';
    }
    nextBtn.style.display = 'block';
  }

  // Function to move to next level or end
  function handleNextClick() {
    currentLevel++;
    if (currentLevel < gameData.length) {
      loadLevel(currentLevel);
    } else {
      showScreen('final-screen');
    }
  }

  // Function to restart the game
  function handleRestartClick() {
    currentLevel = 0;
    loadLevel(0);
    showScreen('start-screen');
  }

  // --- Event Listeners ---
  // CRITICAL: This listener links the start button to the showScreen function
  startBtn.addEventListener('click', () => showScreen('vocab-screen'));
  
  startGameBtn.addEventListener('click', () => {
    loadLevel(0);
    showScreen('game-container');
  });
  nextBtn.addEventListener('click', handleNextClick);
  restartBtn.addEventListener('click', handleRestartClick);

  // --- Initial Setup ---
  loadVocabulary();
  showScreen('start-screen'); // Show the start screen first
});
