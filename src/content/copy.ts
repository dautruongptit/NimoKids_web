/** Text that depends on game state. Kept in one place so wording (or translation) changes touch one file. */
export const copy = {
  feedback: {
    correct: 'Yay! You got it! 🎉',
    wrong: 'Almost! Keep exploring 💕',
    timeout: "Oops! Time's up! ⏰",
  },
  buddy: {
    correct: "You're a little superstar!",
    answered: 'Every try is a little discovery!',
    open: 'Take a peek. You can do it!',
    comingNext: 'Here comes another little adventure…',
    cheering: 'Your bear buddy is cheering you on.',
  },
  result: {
    great: 'Amazing, little explorer!',
    encourage: 'Look at you learning!',
    /** Score from which the "great" headline is used. */
    greatFromScore: 3,
  },
  speech: {
    start: (prompt: string) => `Let's play! ${prompt}`,
    correct: 'Yay! Great job!',
    wrong: (correctText: string) => `It's a ${correctText}. You're doing great!`,
    finished: 'You did great!',
  },
  loadingTopics: 'Loading little adventures…',
  errors: {
    topics: "We couldn't load the adventures.",
    start: "We couldn't start the game.",
    answer: "We couldn't send your answer.",
    result: "We couldn't load your result.",
    retry: 'Try again',
  },
};
