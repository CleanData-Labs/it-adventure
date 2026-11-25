/* IT Adventure – course content (Romanian + English) */
'use strict';
const T = (ro, en) => ({ ro, en });

const UI = {
  tagline: T('Platforma de învățare IT pentru copii curioși', 'The IT learning platform for curious kids'),
  welcome: T('Bine ai venit în aventură!', 'Welcome to the adventure!'),
  welcomeText: T('Învață cum funcționează calculatoarele, cum să fii în siguranță pe internet și cum gândesc programatorii – prin lecții scurte și jocuri.', 'Learn how computers work, how to stay safe online and how programmers think – with short lessons and games.'),
  enterName: T('Cum te numești?', 'What is your name?'),
  namePh: T('Scrie numele tău', 'Type your name'),
  pickAvatar: T('Alege-ți un personaj', 'Pick your avatar'),
  start: T('Începe aventura! 🚀', 'Start the adventure! 🚀'),
  continueAs: T('Continuă ca:', 'Continue as:'),
  orNew: T('…sau creează un jucător nou', '…or create a new player'),
  needName: T('Te rog scrie-ți numele (minim 2 litere).', 'Please type your name (at least 2 letters).'),
  hello: T('Salut, {name}!', 'Hi, {name}!'),
  mapTitle: T('Harta aventurii', 'Adventure map'),
  mapSub: T('Alege un curs. Fiecare lecție se termină cu un joc. Termină toate lecțiile și testul final ca să primești diploma!', 'Choose a course. Every lesson ends with a game. Finish all lessons and the final quiz to earn your certificate!'),
  level: T('Nivel', 'Level'),
  xp: T('XP', 'XP'),
  stars: T('Stele', 'Stars'),
  badges: T('Insigne', 'Badges'),
  lessons: T('lecții', 'lessons'),
  lesson: T('Lecția', 'Lesson'),
  locked: T('Blocat', 'Locked'),
  lockedMsg: T('Termină lecția anterioară ca să deblochezi aceasta.', 'Finish the previous lesson to unlock this one.'),
  startBtn: T('Începe', 'Start'),
  replay: T('Din nou', 'Replay'),
  next: T('Mai departe ➜', 'Next ➜'),
  prev: T('⟵ Înapoi', '⟵ Back'),
  play: T('La joc! 🎮', "Let's play! 🎮"),
  backMap: T('⟵ Harta', '⟵ Map'),
  backCourse: T('⟵ Curs', '⟵ Course'),
  finalQuiz: T('Testul final', 'Final quiz'),
  quizLocked: T('Termină toate lecțiile ca să deblochezi testul final.', 'Finish all lessons to unlock the final quiz.'),
  certificate: T('Diplomă', 'Certificate'),
  certLocked: T('Diploma se deblochează după testul final.', 'The certificate unlocks after the final quiz.'),
  getCert: T('Vezi diploma 🎓', 'View certificate 🎓'),
  funFact: T('Știai că?', 'Did you know?'),
  check: T('Verifică', 'Check'),
  tryAgain: T('Mai încearcă!', 'Try again!'),
  correct: T('Corect! 🎉', 'Correct! 🎉'),
  wrong: T('Nu chiar…', 'Not quite…'),
  wellDone: T('Bravo, {name}!', 'Well done, {name}!'),
  lessonDone: T('Ai terminat lecția!', 'You finished the lesson!'),
  earned: T('Ai câștigat', 'You earned'),
  continue: T('Continuă', 'Continue'),
  backToCourse: T('Înapoi la curs', 'Back to course'),
  nextLesson: T('Lecția următoare ➜', 'Next lesson ➜'),
  newBadge: T('Insignă nouă!', 'New badge!'),
  progress: T('Progres', 'Progress'),
  completed: T('Terminat', 'Completed'),
  sound: T('Sunet', 'Sound'),
  parents: T('Părinți', 'Parents'),
  switchPlayer: T('Schimbă jucătorul', 'Switch player'),
  question: T('Întrebarea', 'Question'),
  of: T('din', 'of'),
  quizPassed: T('Ai trecut testul! 🎉', 'You passed the quiz! 🎉'),
  quizFailed: T('Aproape! Ai nevoie de cel puțin {need} răspunsuri corecte. Recitește lecțiile și mai încearcă.', 'Almost! You need at least {need} correct answers. Review the lessons and try again.'),
  score: T('Scor', 'Score'),
  retry: T('Încearcă din nou', 'Try again'),
  certTitle: T('DIPLOMĂ', 'CERTIFICATE'),
  certOf: T('de absolvire', 'of completion'),
  certGiven: T('Această diplomă se acordă cu mândrie', 'This certificate is proudly presented to'),
  certFor: T('pentru finalizarea cu succes a cursului', 'for successfully completing the course'),
  certDate: T('Data', 'Date'),
  certSign: T('Robotul Bit, ghidul aventurii', 'Bit the Robot, adventure guide'),
  print: T('🖨️ Printează / Salvează PDF', '🖨️ Print / Save as PDF'),
  download: T('⬇️ Descarcă imaginea', '⬇️ Download image'),
  parentsTitle: T('Zona părinților și profesorilor', 'Parents & teachers area'),
  parentsGate: T('Pentru adulți: cât face {a} × {b}?', 'For grown-ups: what is {a} × {b}?'),
  enter: T('Intră', 'Enter'),
  wrongAnswer: T('Răspuns greșit.', 'Wrong answer.'),
  player: T('Jucător', 'Player'),
  lastActive: T('Ultima activitate', 'Last active'),
  reset: T('Resetează progresul', 'Reset progress'),
  del: T('Șterge jucătorul', 'Delete player'),
  confirmReset: T('Sigur resetezi progresul pentru {name}?', 'Really reset progress for {name}?'),
  confirmDel: T('Sigur ștergi jucătorul {name}?', 'Really delete player {name}?'),
  export: T('Exportă datele (JSON)', 'Export data (JSON)'),
  parentsInfo: T('Progresul se salvează doar în acest browser (localStorage). Nu se trimit date nicăieri.', 'Progress is saved only in this browser (localStorage). No data is sent anywhere.'),
  noPlayers: T('Nu există jucători încă.', 'No players yet.'),
  badgesTitle: T('Insignele mele', 'My badges'),
  lockedBadge: T('încă nu', 'not yet'),
  mascotTips: [
    T('Eu sunt Bit, robotul tău ghid! Alege un curs ca să începem.', "I'm Bit, your robot guide! Pick a course to begin."),
    T('Fiecare lecție îți aduce stele ⭐ și XP. Adună-le pe toate!', 'Every lesson gives you stars ⭐ and XP. Collect them all!'),
    T('Greșelile sunt normale – așa învață și programatorii!', 'Mistakes are normal – that is how programmers learn too!'),
    T('Ia o pauză din când în când și uită-te în depărtare ca să-ți odihnești ochii. 👀', 'Take a break now and then and look far away to rest your eyes. 👀')
  ],
  levelNames: [T('Începător', 'Beginner'), T('Explorator', 'Explorer'), T('Detectiv digital', 'Digital detective'), T('Inventator', 'Inventor'), T('Programator junior', 'Junior coder'), T('Maestru IT', 'IT master')],
  // games
  dragHint: T('Trage fiecare element la locul potrivit (sau atinge elementul, apoi locul).', 'Drag each item to the right place (or tap the item, then the place).'),
  robotHint: T('Construiește programul cu săgețile, apoi apasă ▶ Pornește. Atinge o săgeată din program ca să o rotești, × ca să o ștergi.', 'Build the program with the arrows, then press ▶ Run. Tap an arrow in the program to turn it, × to delete it.'),
  run: T('▶ Pornește', '▶ Run'),
  clear: T('🗑️ Șterge tot', '🗑️ Clear'),
  repeat: T('🔁 Repetă', '🔁 Repeat'),
  endRepeat: T('✔ Gata repetarea', '✔ End repeat'),
  times: T('ori', 'times'),
  program: T('Programul tău', 'Your program'),
  blocks: T('blocuri', 'blocks'),
  maxBlocks: T('Folosește cel mult {n} blocuri', 'Use at most {n} blocks'),
  tooMany: T('Programul are prea multe blocuri! Folosește 🔁 Repetă.', 'Too many blocks! Use 🔁 Repeat.'),
  hitWall: T('Bum! Robotul s-a lovit de un obstacol. Verifică programul.', 'Bonk! The robot hit an obstacle. Check your program.'),
  notGoal: T('Robotul nu a ajuns la steag. Mai adaugă sau schimbă pași.', "The robot didn't reach the flag. Add or change some steps."),
  needGems: T('Adună toate diamantele 💎 înainte de steag!', 'Collect all the gems 💎 before the flag!'),
  levelX: T('Nivelul {n}', 'Level {n}'),
  levelDone: T('Nivel terminat! 🎉', 'Level complete! 🎉'),
  debugHint: T('Programul are un „bug”. Găsește greșeala și repar-o!', 'This program has a bug. Find the mistake and fix it!'),
  typeHint: T('Scrie cuvântul care apare. Literele devin verzi când le scrii corect.', 'Type the word you see. Letters turn green when typed correctly.'),
  typeHere: T('Scrie aici…', 'Type here…'),
  pwHint: T('Creează o parolă foarte puternică. Bifează toate regulile!', 'Create a very strong password. Tick every rule!'),
  pwRules: {
    len: T('Cel puțin 12 caractere', 'At least 12 characters'),
    upper: T('O literă mare (A–Z)', 'An uppercase letter (A–Z)'),
    lower: T('O literă mică (a–z)', 'A lowercase letter (a–z)'),
    digit: T('O cifră (0–9)', 'A number (0–9)'),
    symbol: T('Un simbol (! ? # @ …)', 'A symbol (! ? # @ …)'),
    common: T('Fără cuvinte ușor de ghicit (numele tău, „parola”, 1234…)', 'No easy guesses (your name, "password", 1234…)')
  },
  pwLevels: [T('Foarte slabă', 'Very weak'), T('Slabă', 'Weak'), T('Medie', 'Okay'), T('Puternică', 'Strong'), T('Foarte puternică! 💪', 'Very strong! 💪')],
  pwCrack: T('Timp estimat de spargere:', 'Estimated time to crack:'),
  pwWhich: T('Care parolă este mai puternică?', 'Which password is stronger?'),
  pwDone: T('Parola ta e super! Nu uita: n-o spune nimănui, doar părinților.', 'Your password is great! Remember: share it with no one except your parents.'),
  memoryHint: T('Întoarce câte două cărți și găsește perechile.', 'Flip two cards at a time and find the pairs.'),
  moves: T('Mutări', 'Moves'),
  flagsHint: T('Fii detectiv! Atinge părțile suspecte din mesaj. Găsește {n} semne de pericol.', 'Be a detective! Tap the suspicious parts of the message. Find {n} red flags.'),
  found: T('Găsite', 'Found'),
  orderHint: T('Pune pașii în ordinea corectă folosind săgețile ▲ ▼.', 'Put the steps in the right order using the ▲ ▼ arrows.'),
  sortHint: T('Sortează cutiile de la cea mai mică la cea mai mare. Atinge două cutii vecine ca să le schimbi.', 'Sort the boxes from smallest to largest. Tap two neighbouring boxes to swap them.'),
  swaps: T('Schimbări', 'Swaps'),
  binaryHint: T('Aprinde cărțile (1) ca suma lor să fie egală cu numărul cerut.', 'Turn cards on (1) so their sum equals the target number.'),
  target: T('Numărul țintă', 'Target number'),
  pixelHint: T('Citește codul fiecărui rând și colorează pixelii. Exemplu: „2⬜ 3🟥” = 2 albi, apoi 3 roșii.', 'Read each row code and colour the pixels. Example: "2⬜ 3🟥" = 2 white, then 3 red.'),
  ifHint: T('Citește regula și alege unde merge fiecare obiect.', 'Read the rule and choose where each object goes.'),
  ifRule: T('Regula', 'Rule'),
  round: T('Runda', 'Round')
};

const AVATARS = ['🦊', '🐼', '🦁', '🐸', '🐵', '🦄', '🐯', '🐙', '🐧', '🐨', '🦖', '🚀'];

/* ---------------- COURSES ---------------- */
const COURSES = [
/* ========== 1. COMPUTER BASICS ========== */
{
  id: 'computer', emoji: '💻', color: '#3b82f6', color2: '#60a5fa',
  title: T('Calculatorul pe înțelese', 'Computer Basics'),
  desc: T('Părțile calculatorului, mouse-ul, tastatura și fișierele.', 'Computer parts, mouse, keyboard and files.'),
  lessons: [
    {
      id: 'parts', emoji: '🖥️',
      title: T('Părțile calculatorului', 'Parts of a computer'),
      slides: [
        { e: '💻🖥️⌨️🖱️', title: T('O echipă de piese', 'A team of parts'),
          text: T('Un calculator este făcut din mai multe părți care lucrează împreună, ca jucătorii unei echipe. Fiecare parte are treaba ei.', 'A computer is made of several parts that work together, like players on a team. Each part has its own job.') },
        { e: '🖥️ ⌨️ 🖱️ 🔊', title: T('Piesele pe care le vezi', 'The parts you can see'),
          text: T('<b>Monitorul</b> 🖥️ îți arată imagini și texte. <b>Tastatura</b> ⌨️ te ajută să scrii. <b>Mouse-ul</b> 🖱️ mută săgeata pe ecran. <b>Boxele</b> 🔊 redau sunetele.', 'The <b>monitor</b> 🖥️ shows pictures and text. The <b>keyboard</b> ⌨️ lets you type. The <b>mouse</b> 🖱️ moves the pointer on the screen. The <b>speakers</b> 🔊 play sounds.') },
        { e: '⌨️🎤 ➜ 🧠 ➜ 🖥️🖨️', title: T('Intrare și ieșire', 'Input and output'),
          text: T('<b>Dispozitivele de intrare</b> trimit informații în calculator: tastatura, mouse-ul, microfonul 🎤, camera 📷. <b>Dispozitivele de ieșire</b> ne arată rezultatul: monitorul, boxele, imprimanta 🖨️.', '<b>Input devices</b> send information into the computer: keyboard, mouse, microphone 🎤, camera 📷. <b>Output devices</b> show us the result: monitor, speakers, printer 🖨️.'),
          fact: T('Primele calculatoare erau cât o cameră întreagă și cântăreau cât 6 elefanți! 🐘', 'The first computers filled a whole room and weighed as much as 6 elephants! 🐘') }
      ],
      activity: { type: 'match',
        title: T('Potrivește piesa cu treaba ei', 'Match each part to its job'),
        pairs: [
          { item: T('🖥️ Monitor', '🖥️ Monitor'), target: T('Arată imagini și texte', 'Shows pictures and text') },
          { item: T('⌨️ Tastatură', '⌨️ Keyboard'), target: T('Scrii litere și cifre', 'Types letters and numbers') },
          { item: T('🖱️ Mouse', '🖱️ Mouse'), target: T('Mută săgeata și dă clic', 'Moves the pointer and clicks') },
          { item: T('🔊 Boxe', '🔊 Speakers'), target: T('Redau muzică și sunete', 'Play music and sounds') },
          { item: T('🖨️ Imprimantă', '🖨️ Printer'), target: T('Pune documentele pe hârtie', 'Puts documents on paper') },
          { item: T('🎤 Microfon', '🎤 Microphone'), target: T('Înregistrează vocea ta', 'Records your voice') }
        ] }
    },
    {
      id: 'mouse', emoji: '⌨️',
      title: T('Mouse-ul și tastatura', 'Mouse and keyboard'),
      slides: [
        { e: '🖱️👆', title: T('Cum folosești mouse-ul', 'How to use the mouse'),
          text: T('<b>Un clic</b> cu butonul din stânga selectează. <b>Dublu-clic</b> (două clicuri rapide) deschide un program sau un fișier. <b>Clic dreapta</b> deschide un meniu. <b>Rotița</b> te ajută să derulezi pagina.', '<b>One click</b> with the left button selects. A <b>double-click</b> (two quick clicks) opens a program or file. A <b>right-click</b> opens a menu. The <b>wheel</b> scrolls the page.') },
        { e: '⌨️ ⇧ ↵ ⌫ ␣', title: T('Taste importante', 'Important keys'),
          text: T('<b>Space</b> (bara lungă) pune un spațiu între cuvinte. <b>Enter</b> ↵ trece la rândul următor. <b>Backspace</b> ⌫ șterge litera din stânga. <b>Shift</b> ⇧ ținut apăsat scrie LITERE MARI.', '<b>Space</b> (the long bar) adds a space between words. <b>Enter</b> ↵ goes to a new line. <b>Backspace</b> ⌫ deletes the letter on the left. Holding <b>Shift</b> ⇧ types CAPITAL LETTERS.') },
        { e: '🧍‍♀️💺✋', title: T('Stai corect!', 'Sit properly!'),
          text: T('Stai drept, cu picioarele pe podea și ecranul la o lungime de braț. Pe tastele <b>F</b> și <b>J</b> sunt mici umflături – acolo își găsesc locul degetele arătătoare.', 'Sit up straight with your feet on the floor and the screen an arm\'s length away. The <b>F</b> and <b>J</b> keys have small bumps – that is where your index fingers rest.'),
          fact: T('Literele de pe tastatură nu sunt în ordine alfabetică. Aranjarea se numește QWERTY, după primele 6 litere de pe rândul de sus.', 'The letters on a keyboard are not in alphabetical order. The layout is called QWERTY, after the first 6 letters on the top row.') }
      ],
      activity: { type: 'typing',
        title: T('Jocul tastelor rapide', 'Speedy keys game'),
        words: { ro: ['cod', 'joc', 'robot', 'ecran', 'mouse', 'date', 'laptop', 'video', 'program', 'internet'],
                 en: ['code', 'game', 'robot', 'screen', 'mouse', 'click', 'laptop', 'email', 'program', 'internet'] } }
    },
    {
      id: 'files', emoji: '📁',
      title: T('Fișiere și foldere', 'Files and folders'),
      slides: [
        { e: '📄🖼️🎵', title: T('Ce este un fișier?', 'What is a file?'),
          text: T('Un <b>fișier</b> este ca o foaie pe care calculatorul păstrează ceva: un desen, o poveste, o melodie sau un film. Fiecare fișier are un nume.', 'A <b>file</b> is like a sheet of paper where the computer keeps something: a drawing, a story, a song or a movie. Every file has a name.') },
        { e: '📁🎒', title: T('Ce este un folder?', 'What is a folder?'),
          text: T('Un <b>folder</b> este ca un sertar sau un ghiozdan în care pui fișierele ca să fie în ordine. Un folder poate avea în el și alte foldere.', 'A <b>folder</b> is like a drawer or a backpack where you keep files tidy. A folder can also contain other folders.') },
        { e: '.jpg .mp3 .docx .mp4', title: T('Extensiile', 'File extensions'),
          text: T('Literele de după punct ne spun ce fel de fișier este: <b>.jpg</b> și <b>.png</b> = imagini, <b>.mp3</b> = muzică, <b>.docx</b>, <b>.txt</b> și <b>.pdf</b> = documente, <b>.mp4</b> = video.', 'The letters after the dot tell us what kind of file it is: <b>.jpg</b> and <b>.png</b> = images, <b>.mp3</b> = music, <b>.docx</b>, <b>.txt</b> and <b>.pdf</b> = documents, <b>.mp4</b> = video.'),
          fact: T('Scurtătura Ctrl + S salvează lucrul tău. Folosește-o des!', 'The shortcut Ctrl + S saves your work. Use it often!') }
      ],
      activity: { type: 'sort',
        title: T('Pune fiecare fișier în folderul potrivit', 'Put each file in the right folder'),
        bins: [ { id: 'img', label: T('🖼️ Imagini', '🖼️ Images') }, { id: 'mus', label: T('🎵 Muzică', '🎵 Music') }, { id: 'doc', label: T('📄 Documente', '📄 Documents') }, { id: 'vid', label: T('🎬 Video', '🎬 Video') } ],
        items: [
          { label: T('vacanta.jpg', 'holiday.jpg'), bin: 'img' }, { label: T('desen.png', 'drawing.png'), bin: 'img' },
          { label: T('cantec.mp3', 'song.mp3'), bin: 'mus' }, { label: T('tema.docx', 'homework.docx'), bin: 'doc' },
          { label: T('poveste.txt', 'story.txt'), bin: 'doc' }, { label: T('diploma.pdf', 'award.pdf'), bin: 'doc' },
          { label: T('film_pisici.mp4', 'cat_movie.mp4'), bin: 'vid' }, { label: T('melodie.mp3', 'tune.mp3'), bin: 'mus' }
        ] }
    },
    {
      id: 'inside', emoji: '🧠',
      title: T('În interiorul calculatorului', 'Inside the computer'),
      slides: [
        { e: '🧠⚡', title: T('Procesorul – creierul', 'The processor – the brain'),
          text: T('<b>Procesorul</b> (CPU) face toate calculele și urmează instrucțiunile. Poate face miliarde de operații pe secundă!', 'The <b>processor</b> (CPU) does all the calculations and follows instructions. It can do billions of operations every second!') },
        { e: '📝💾', title: T('Memoria RAM și stocarea', 'RAM and storage'),
          text: T('<b>Memoria RAM</b> este memoria de scurtă durată: ține minte ce faci acum, dar uită tot când oprești calculatorul. <b>Stocarea</b> (SSD sau hard disk) păstrează fișierele chiar și când calculatorul e oprit.', '<b>RAM</b> is short-term memory: it remembers what you are doing now, but forgets everything when the computer turns off. <b>Storage</b> (SSD or hard disk) keeps your files even when the computer is off.') },
        { e: '🔩 vs 📀', title: T('Hardware și software', 'Hardware and software'),
          text: T('<b>Hardware</b> înseamnă piesele pe care le poți atinge: placa de bază, procesorul, tastatura. <b>Software</b> înseamnă programele: jocuri, browserul, aplicațiile. Fără software, hardware-ul nu știe ce să facă!', '<b>Hardware</b> is the parts you can touch: motherboard, processor, keyboard. <b>Software</b> is the programs: games, the browser, apps. Without software, hardware does not know what to do!'),
          fact: T('Placa de bază este ca un oraș cu „străzi” mici de metal pe care circulă informația între piese.', 'The motherboard is like a city with tiny metal "streets" that carry information between the parts.') }
      ],
      activity: { type: 'memory',
        title: T('Cărțile memoriei', 'Memory cards'),
        pairs: [
          [T('🧠 Procesor', '🧠 Processor'), T('Face calculele', 'Does the calculations')],
          [T('📝 RAM', '📝 RAM'), T('Memorie de scurtă durată', 'Short-term memory')],
          [T('💾 SSD', '💾 SSD'), T('Păstrează fișierele', 'Keeps your files')],
          [T('🔌 Placa de bază', '🔌 Motherboard'), T('Leagă toate piesele', 'Connects all parts')],
          [T('🔩 Hardware', '🔩 Hardware'), T('Piese pe care le atingi', 'Parts you can touch')],
          [T('📀 Software', '📀 Software'), T('Programe și aplicații', 'Programs and apps')]
        ] }
    }
  ],
  quiz: [
    { q: T('Ce dispozitiv folosești ca să scrii litere?', 'Which device do you use to type letters?'), a: [T('Tastatura', 'Keyboard'), T('Boxele', 'Speakers'), T('Monitorul', 'Monitor')], c: 0 },
    { q: T('Care este un dispozitiv de IEȘIRE?', 'Which one is an OUTPUT device?'), a: [T('Microfonul', 'Microphone'), T('Imprimanta', 'Printer'), T('Mouse-ul', 'Mouse')], c: 1 },
    { q: T('Ce face un dublu-clic pe un fișier?', 'What does double-clicking a file do?'), a: [T('Îl șterge', 'Deletes it'), T('Îl deschide', 'Opens it'), T('Îl printează', 'Prints it')], c: 1 },
    { q: T('Ce tastă șterge litera din stânga cursorului?', 'Which key deletes the letter left of the cursor?'), a: [T('Enter', 'Enter'), T('Shift', 'Shift'), T('Backspace', 'Backspace')], c: 2 },
    { q: T('Ce fel de fișier este „poza.jpg”?', 'What kind of file is "photo.jpg"?'), a: [T('Muzică', 'Music'), T('Imagine', 'Image'), T('Video', 'Video')], c: 1 },
    { q: T('Ce este un folder?', 'What is a folder?'), a: [T('Un loc unde păstrăm fișiere în ordine', 'A place to keep files tidy'), T('Un fel de virus', 'A kind of virus'), T('O parte a mouse-ului', 'A part of the mouse')], c: 0 },
    { q: T('Care piesă este „creierul” calculatorului?', 'Which part is the "brain" of the computer?'), a: [T('Boxele', 'Speakers'), T('Procesorul', 'Processor'), T('Tastatura', 'Keyboard')], c: 1 },
    { q: T('Un joc pe calculator este…', 'A computer game is…'), a: [T('Hardware', 'Hardware'), T('Software', 'Software'), T('O placă de bază', 'A motherboard')], c: 1 }
  ]
},
/* ========== 2. INTERNET SAFETY ========== */
{
  id: 'safety', emoji: '🛡️', color: '#16a34a', color2: '#4ade80',
  title: T('Siguranța pe internet', 'Internet Safety'),
  desc: T('Parole puternice, străini, informații personale și știri false.', 'Strong passwords, strangers, privacy and fake news.'),
  lessons: [
    {
      id: 'passwords', emoji: '🔐',
      title: T('Parole puternice', 'Strong passwords'),
      slides: [
        { e: '🔑🏠', title: T('Parola este o cheie', 'A password is a key'),
          text: T('O <b>parolă</b> este ca o cheie de la casa ta: deschide contul tău de joc, e-mailul sau tableta. Dacă cineva îți află cheia, poate intra peste tine!', 'A <b>password</b> is like the key to your house: it opens your game account, e-mail or tablet. If someone gets your key, they can walk right in!') },
        { e: '💪 Aa1!', title: T('Ce face o parolă puternică', 'What makes a password strong'),
          text: T('O parolă puternică este <b>lungă</b> (cel puțin 12 caractere) și amestecă <b>litere mari</b>, <b>litere mici</b>, <b>cifre</b> și <b>simboluri</b>. Truc: alege 3 cuvinte amuzante + o cifră + un simbol, de exemplu <code>Girafa!Verde7Nori</code>.', 'A strong password is <b>long</b> (at least 12 characters) and mixes <b>capital letters</b>, <b>small letters</b>, <b>numbers</b> and <b>symbols</b>. Trick: choose 3 funny words + a number + a symbol, like <code>Giraffe!Green7Cloud</code>.') },
        { e: '🙅‍♂️ 123456', title: T('Ce să NU faci', 'What NOT to do'),
          text: T('Nu folosi numele tău, ziua de naștere, „123456” sau „parola”. Nu spune parola prietenilor – doar părinților. Folosește parole diferite pentru conturi diferite.', 'Don\'t use your name, your birthday, "123456" or "password". Don\'t tell your password to friends – only to your parents. Use different passwords for different accounts.'),
          fact: T('„123456” este de ani de zile una dintre cele mai folosite parole din lume – și se ghicește într-o secundă!', '"123456" has been one of the most used passwords in the world for years – and it can be guessed in under a second!') }
      ],
      activity: { type: 'password',
        title: T('Atelierul de parole', 'Password workshop'),
        rounds: [
          [T('pisica', 'kitty'), T('P1sic@Zbur@toare!', 'Fly1ng-K1tty-Moon!')],
          [T('Tiger!Pizza9Lun@', 'Tiger!Pizza9Mo0n'), T('12345678', '12345678')],
          [T('Andrei2015', 'Emma2015'), T('Nor#Ciocolat@42Mare', 'Cloud#Choc0late42Sea')]
        ] }
    },
    {
      id: 'strangers', emoji: '🕵️',
      title: T('Străinii de pe internet', 'Strangers online'),
      slides: [
        { e: '🎭💻', title: T('Nu toți sunt cine spun că sunt', 'Not everyone is who they say'),
          text: T('Pe internet, oricine poate pretinde că este altcineva. Un „copil de 10 ani” din joc poate fi de fapt un adult. De aceea, cei pe care îi știi doar online rămân <b>străini</b>.', 'On the internet anyone can pretend to be someone else. A "10-year-old" in a game might really be an adult. That is why people you only know online are still <b>strangers</b>.') },
        { e: '🛑 🚫 🗣️', title: T('STOP – BLOCHEAZĂ – SPUNE', 'STOP – BLOCK – TELL'),
          text: T('Dacă cineva îți scrie ceva urât, îți cere poze, adresa sau să păstrezi un secret: <b>oprește</b> conversația, <b>blochează</b> persoana și <b>spune</b> imediat unui adult în care ai încredere.', 'If someone writes something mean, asks for photos, your address or to keep a secret: <b>stop</b> chatting, <b>block</b> them and <b>tell</b> a trusted adult right away.') },
        { e: '💬❤️', title: T('Fii bun și online', 'Be kind online too'),
          text: T('În spatele fiecărui ecran este un om cu sentimente. Nu scrie ce nu ai spune față în față. Dacă vezi pe cineva tratat urât, spune unui adult.', 'Behind every screen there is a person with feelings. Don\'t write what you wouldn\'t say face to face. If you see someone being bullied, tell an adult.'),
          fact: T('Nu vei avea niciodată probleme pentru că ai spus unui adult ce s-a întâmplat online. Ai făcut ce trebuia!', 'You will never be in trouble for telling an adult what happened online. You did the right thing!') }
      ],
      activity: { type: 'sort',
        title: T('Sigur sau nesigur?', 'Safe or unsafe?'),
        bins: [ { id: 'safe', label: T('✅ Sigur', '✅ Safe') }, { id: 'unsafe', label: T('⛔ Nesigur', '⛔ Unsafe') } ],
        items: [
          { label: T('Un necunoscut îți cere adresa de acasă', 'A stranger asks for your home address'), bin: 'unsafe' },
          { label: T('Joci cu colegii de clasă, cu acordul părinților', 'Playing with classmates, with your parents\' OK'), bin: 'safe' },
          { label: T('Cineva îți promite monede gratis dacă îi dai parola', 'Someone promises free coins for your password'), bin: 'unsafe' },
          { label: T('Spui părinților că cineva te-a jignit', 'Telling your parents someone was mean to you'), bin: 'safe' },
          { label: T('Un străin vrea să vă întâlniți în secret', 'A stranger wants to meet you in secret'), bin: 'unsafe' },
          { label: T('Blochezi pe cineva care îți scrie urât', 'Blocking someone who writes mean things'), bin: 'safe' },
          { label: T('Trimiți o poză cu tine unui necunoscut', 'Sending a photo of yourself to a stranger'), bin: 'unsafe' },
          { label: T('Folosești un pseudonim în jocuri, nu numele real', 'Using a nickname in games, not your real name'), bin: 'safe' }
        ] }
    },
    {
      id: 'privacy', emoji: '🔒',
      title: T('Informațiile personale', 'Personal information'),
      slides: [
        { e: '🏠📞🏫', title: T('Ce sunt informațiile personale?', 'What is personal information?'),
          text: T('Sunt lucrurile care spun cine ești și unde te găsești: <b>numele complet</b>, <b>adresa</b>, <b>numărul de telefon</b>, <b>școala</b>, <b>parolele</b> și pozele cu casa ta.', 'These are things that tell who you are and where to find you: your <b>full name</b>, <b>address</b>, <b>phone number</b>, <b>school</b>, <b>passwords</b> and photos of your house.') },
        { e: '🎨🐶🎮', title: T('Ce poți spune', 'What you can share'),
          text: T('Poți vorbi despre culoarea preferată, animalul preferat sau jocul tău favorit – acestea nu arată unde locuiești. Tot ce postezi poate rămâne pe internet <b>pentru totdeauna</b>, așa că gândește-te înainte!', 'You can talk about your favourite colour, animal or game – those don\'t show where you live. Anything you post can stay on the internet <b>forever</b>, so think first!') },
        { e: '📍⚙️👨‍👩‍👧', title: T('Setările de confidențialitate', 'Privacy settings'),
          text: T('Cere-le părinților să te ajute să faci contul <b>privat</b> și să oprești <b>locația</b> în aplicații. Așa doar prietenii adevărați văd ce postezi.', 'Ask your parents to help make your account <b>private</b> and turn off <b>location</b> in apps. That way only real friends see what you post.'),
          fact: T('Și o poză poate „vorbi”: uniforma școlii sau numărul casei din fundal pot spune unde ești.', 'Even a photo can "talk": a school uniform or the house number in the background can reveal where you are.') }
      ],
      activity: { type: 'sort',
        title: T('Păstrez secret sau pot spune?', 'Keep secret or OK to share?'),
        bins: [ { id: 'secret', label: T('🔒 Păstrez secret', '🔒 Keep secret') }, { id: 'ok', label: T('👍 Pot spune', '👍 OK to share') } ],
        items: [
          { label: T('🏠 Adresa de acasă', '🏠 Home address'), bin: 'secret' }, { label: T('🎨 Culoarea preferată', '🎨 Favourite colour'), bin: 'ok' },
          { label: T('🔑 Parola contului', '🔑 Account password'), bin: 'secret' }, { label: T('📞 Numărul de telefon', '📞 Phone number'), bin: 'secret' },
          { label: T('🐶 Animalul preferat', '🐶 Favourite animal'), bin: 'ok' }, { label: T('🏫 Numele școlii', '🏫 Name of your school'), bin: 'secret' },
          { label: T('🎮 Jocul favorit', '🎮 Favourite game'), bin: 'ok' }, { label: T('📍 Unde ești acum', '📍 Where you are right now'), bin: 'secret' }
        ] }
    },
    {
      id: 'fakenews', emoji: '🔎',
      title: T('Știri false și capcane', 'Fake news and scams'),
      slides: [
        { e: '📰❓', title: T('Nu tot ce e online e adevărat', 'Not everything online is true'),
          text: T('Oricine poate scrie orice pe internet. Unele știri sunt inventate ca să ne sperie, să ne păcălească sau să obțină clicuri.', 'Anyone can write anything online. Some stories are made up to scare us, trick us or get clicks.') },
        { e: '🕵️‍♀️✅', title: T('Verifică precum un detectiv', 'Check like a detective'),
          text: T('Întreabă-te: <b>Cine</b> a scris asta? Mai spun și alte site-uri de încredere același lucru? Sună <b>prea bine ca să fie adevărat</b>? Are multe semne de exclamare și LITERE MARI?', 'Ask yourself: <b>Who</b> wrote this? Do other trusted sites say the same? Does it sound <b>too good to be true</b>? Does it have lots of exclamation marks and CAPITAL LETTERS?') },
        { e: '🎣📧', title: T('Mesajele-capcană (phishing)', 'Trap messages (phishing)'),
          text: T('Unele mesaje se prefac că vin de la un joc sau o firmă ca să îți fure parola. Semne de pericol: <b>grabă</b> („în 10 minute!”), <b>premii gratuite</b>, <b>link-uri ciudate</b>, <b>greșeli de scriere</b> și cereri de <b>parolă</b>.', 'Some messages pretend to come from a game or a company to steal your password. Red flags: <b>hurry</b> ("in 10 minutes!"), <b>free prizes</b>, <b>strange links</b>, <b>spelling mistakes</b> and asking for your <b>password</b>.'),
          fact: T('Se numește „phishing” de la cuvântul englezesc „fishing” (pescuit) – escrocii „pescuiesc” parole!', 'It is called "phishing" from "fishing" – scammers go "fishing" for passwords!') }
      ],
      activity: { type: 'flags',
        title: T('Detectivul de mesaje', 'Message detective'),
        messages: [
          { from: T('De la: Echipa-Oficiala-Joc 🎮', 'From: Official-Game-Teem 🎮'),
            parts: [
              { t: T('FELICITĂRI!!! ', 'CONGRATULATIONS!!! '), f: 1, why: T('Prea multe semne de exclamare și litere mari', 'Too many exclamation marks and capitals') },
              { t: T('Ai câștigat 10.000 de diamante gratuite! ', 'You won 10,000 free gems! '), f: 1, why: T('Premiu prea bun ca să fie adevărat', 'A prize that is too good to be true') },
              { t: T('Ca să le primești, ', 'To get them, '), f: 0 },
              { t: T('răspunde în 10 minute, ', 'reply within 10 minutes, '), f: 1, why: T('Te grăbește ca să nu gândești', 'It rushes you so you don\'t think') },
              { t: T('intră pe ', 'go to '), f: 0 },
              { t: T('www.diamante-gratis-123.xyz ', 'www.free-gems-123.xyz '), f: 1, why: T('Link ciudat, nu e site-ul oficial', 'A strange link, not the official site') },
              { t: T('și scrie ', 'and type '), f: 0 },
              { t: T('parola contului tău. ', 'your account password. '), f: 1, why: T('Nimeni de încredere nu îți cere parola', 'No one trustworthy asks for your password') },
              { t: T('Mulțumim, echipa jocului.', 'Thanks, the game team.'), f: 0 }
            ] },
          { from: T('De la: Banca Copiilor 🏦', 'From: Kids Bank 🏦'),
            parts: [
              { t: T('Dragă client, ', 'Dear customer, '), f: 0 },
              { t: T('contul tau a fost blocat ', 'you account has been blokked '), f: 1, why: T('Greșeli de scriere', 'Spelling mistakes') },
              { t: T('și va fi șters ASTĂZI! ', 'and will be deleted TODAY! '), f: 1, why: T('Te sperie și te grăbește', 'It scares and rushes you') },
              { t: T('Apasă aici: ', 'Click here: '), f: 0 },
              { t: T('bit.ly/deblocare-urgenta ', 'bit.ly/unlock-urgent '), f: 1, why: T('Link scurtat, nu știi unde duce', 'A shortened link – you can\'t see where it goes') },
              { t: T('Cu stimă, Banca.', 'Regards, the Bank.'), f: 0 }
            ] }
        ] }
    }
  ],
  quiz: [
    { q: T('Care parolă este cea mai puternică?', 'Which password is the strongest?'), a: [T('maria2016', 'emma2016'), T('Ploaie!Verde7Castel', 'Rain!Green7Castle'), T('123456', '123456')], c: 1 },
    { q: T('Cui poți spune parola ta?', 'Who can you tell your password to?'), a: [T('Celui mai bun prieten', 'Your best friend'), T('Părinților', 'Your parents'), T('Oricui o cere frumos', 'Anyone who asks nicely')], c: 1 },
    { q: T('Un prieten din joc vrea să vă vedeți în secret. Ce faci?', 'A friend from a game wants to meet in secret. What do you do?'), a: [T('Mă duc, pare de treabă', 'Go, they seem nice'), T('Nu mă duc și le spun părinților', 'Don\'t go and tell my parents'), T('Îi dau adresa mea', 'Give them my address')], c: 1 },
    { q: T('Ce este o informație personală?', 'Which one is personal information?'), a: [T('Culoarea preferată', 'Favourite colour'), T('Adresa de acasă', 'Home address'), T('Desenul animat preferat', 'Favourite cartoon')], c: 1 },
    { q: T('Ce înseamnă STOP – BLOCHEAZĂ – SPUNE?', 'What does STOP – BLOCK – TELL mean?'), a: [T('Oprești, blochezi persoana și spui unui adult', 'Stop, block the person and tell an adult'), T('Oprești calculatorul pentru totdeauna', 'Turn off the computer forever'), T('Spui tuturor prietenilor parola', 'Tell all your friends your password')], c: 0 },
    { q: T('Un mesaj spune: „Ai câștigat un telefon! Trimite parola în 5 minute!” Este…', 'A message says: "You won a phone! Send your password in 5 minutes!" It is…'), a: [T('Un premiu real', 'A real prize'), T('O capcană (phishing)', 'A trap (phishing)'), T('Un mesaj de la școală', 'A message from school')], c: 1 },
    { q: T('Cum verifici dacă o știre e adevărată?', 'How do you check if a story is true?'), a: [T('Văd dacă și alte surse de încredere spun la fel', 'See if other trusted sources say the same'), T('O cred dacă are multe semne „!!!”', 'Believe it if it has lots of "!!!"'), T('O trimit imediat tuturor', 'Send it to everyone right away')], c: 0 },
    { q: T('Ce poți face ca să fii mai în siguranță în aplicații?', 'What can make you safer in apps?'), a: [T('Cont public și locația pornită', 'A public account and location on'), T('Cont privat și locația oprită', 'A private account and location off'), T('Aceeași parolă peste tot', 'The same password everywhere')], c: 1 }
  ]
},
/* ========== 3. CODING LOGIC ========== */
{
  id: 'logic', emoji: '🤖', color: '#ea580c', color2: '#fb923c',
  title: T('Logica programării', 'Coding Logic'),
  desc: T('Secvențe, bucle, condiții și depanare cu robotul Bit.', 'Sequences, loops, conditions and debugging with Bit the robot.'),
  lessons: [
    {
      id: 'sequence', emoji: '➡️',
      title: T('Secvențe: pas cu pas', 'Sequences: step by step'),
      slides: [
        { e: '🤖📋', title: T('Calculatoarele urmează instrucțiuni', 'Computers follow instructions'),
          text: T('Un calculator nu ghicește ce vrei. Face <b>exact</b> ce îi spui, în ordinea în care îi spui. Lista de instrucțiuni se numește <b>program</b>.', 'A computer does not guess what you want. It does <b>exactly</b> what you tell it, in the order you tell it. The list of instructions is called a <b>program</b>.') },
        { e: '🍞🧈🍓', title: T('Ordinea contează', 'Order matters'),
          text: T('O <b>secvență</b> este o listă de pași în ordine. Gândește-te la un sandviș: întâi iei pâinea, apoi pui untul, apoi gemul. Dacă schimbi ordinea, iese un dezastru! 😄', 'A <b>sequence</b> is a list of steps in order. Think of a sandwich: first take the bread, then add butter, then jam. Change the order and it\'s a mess! 😄') },
        { e: '⬆️⬇️⬅️➡️', title: T('Programează-l pe Bit', 'Program Bit'),
          text: T('În joc, fiecare săgeată îl mută pe robotul Bit cu <b>un pătrățel</b>. Pune săgețile în ordine ca să ajungă la steag 🚩 fără să se lovească de pietre 🪨.', 'In the game, each arrow moves Bit the robot <b>one square</b>. Put the arrows in order so it reaches the flag 🚩 without bumping into rocks 🪨.'),
          fact: T('Roverul Perseverance de pe Marte primește și el programe cu pași de la oamenii de pe Pământ! 🚀', 'The Perseverance rover on Mars also gets step-by-step programs from people on Earth! 🚀') }
      ],
      activity: { type: 'robot', title: T('Drumul lui Bit', "Bit's journey"), loops: false,
        levels: [
          { grid: ['.....', 'S...G', '.....'] },
          { grid: ['S.#..', '..#..', '....G'] },
          { grid: ['S...#', '###.#', 'G...#'] }
        ] }
    },
    {
      id: 'loops', emoji: '🔁',
      title: T('Buclele: repetă!', 'Loops: repeat!'),
      slides: [
        { e: '🔁', title: T('Ce este o buclă?', 'What is a loop?'),
          text: T('În loc să scrii ➡️➡️➡️➡️➡️, poți scrie <b>„Repetă de 5 ori ➡️”</b>. Asta se numește <b>buclă</b>: o instrucțiune care repetă alți pași.', 'Instead of writing ➡️➡️➡️➡️➡️ you can write <b>"Repeat 5 times ➡️"</b>. That is called a <b>loop</b>: an instruction that repeats other steps.') },
        { e: '🪥🎵🏃', title: T('Bucle în viața de zi cu zi', 'Loops in everyday life'),
          text: T('Când te speli pe dinți, repeți mișcarea periuței. Refrenul unui cântec se repetă. Un alergător face mai multe ture de pistă. Toate sunt bucle!', 'When you brush your teeth you repeat the brushing move. A song\'s chorus repeats. A runner does several laps. All of these are loops!') },
        { e: '😎⏱️', title: T('Programatorii „leneși”', '"Lazy" programmers'),
          text: T('Buclele fac programele mai scurte și mai ușor de citit. În joc, unele niveluri îți permit doar puține blocuri – folosește <b>🔁 Repetă</b>, alege de câte ori și adaugă pașii în ea.', 'Loops make programs shorter and easier to read. In the game some levels allow only a few blocks – use <b>🔁 Repeat</b>, choose how many times and add steps inside it.'),
          fact: T('Un calculator poate repeta o buclă de milioane de ori fără să se plictisească!', 'A computer can repeat a loop millions of times without getting bored!') }
      ],
      activity: { type: 'robot', title: T('Bucle cu Bit', 'Loops with Bit'), loops: true,
        levels: [
          { grid: ['.......', 'S.....G', '.......'], max: 3 },
          { grid: ['S.#..', '#..#.', '.#..#', '..#..', '...#G'], max: 4 },
          { grid: ['S.*..', '####.', 'G.*..'], max: 6 }
        ] }
    },
    {
      id: 'conditions', emoji: '🔀',
      title: T('Condiții: dacă… atunci', 'Conditions: if… then'),
      slides: [
        { e: '🌧️☂️ / ☀️🧢', title: T('Dacă… atunci… altfel', 'If… then… else'),
          text: T('<b>DACĂ</b> plouă, <b>ATUNCI</b> iau umbrela, <b>ALTFEL</b> iau șapca. O <b>condiție</b> este o întrebare cu răspuns DA sau NU, care decide ce se întâmplă mai departe.', '<b>IF</b> it is raining, <b>THEN</b> I take an umbrella, <b>ELSE</b> I take a cap. A <b>condition</b> is a yes-or-no question that decides what happens next.') },
        { e: '🎮🪙', title: T('Condiții în jocuri', 'Conditions in games'),
          text: T('Jocurile sunt pline de condiții: <b>dacă</b> personajul atinge o monedă, <b>atunci</b> scorul crește. <b>Dacă</b> viețile ajung la 0, <b>atunci</b> jocul se termină.', 'Games are full of conditions: <b>if</b> the character touches a coin, <b>then</b> the score goes up. <b>If</b> lives reach 0, <b>then</b> the game is over.') },
        { e: '✅ / ❌', title: T('Adevărat sau fals', 'True or false'),
          text: T('Calculatorul verifică dacă o condiție este <b>adevărată</b> sau <b>falsă</b>. În joc vei fi tu calculatorul: citește regula și sortează obiectele!', 'The computer checks whether a condition is <b>true</b> or <b>false</b>. In the game you are the computer: read the rule and sort the objects!'),
          fact: T('Semaforul folosește condiții: dacă e roșu, mașinile stau; altfel, merg. 🚦', 'Traffic lights use conditions: if red, cars stop; else, they go. 🚦') }
      ],
      activity: { type: 'ifthen', title: T('Mașina de sortat', 'The sorting machine'),
        rounds: [
          { rule: T('DACĂ fructul este roșu ATUNCI ➜ 🧺 coș, ALTFEL ➜ 📦 cutie', 'IF the fruit is red THEN ➜ 🧺 basket, ELSE ➜ 📦 box'), yes: '🧺', no: '📦',
            items: [['🍎', 1], ['🍌', 0], ['🍓', 1], ['🍇', 0], ['🍒', 1], ['🍋', 0]] },
          { rule: T('DACĂ numărul este mai mare decât 5 ATUNCI ➜ 🚀, ALTFEL ➜ 🐢', 'IF the number is greater than 5 THEN ➜ 🚀, ELSE ➜ 🐢'), yes: '🚀', no: '🐢',
            items: [['7', 1], ['2', 0], ['9', 1], ['5', 0], ['6', 1], ['3', 0]] },
          { rule: T('DACĂ animalul poate zbura ATUNCI ➜ ☁️ cer, ALTFEL ➜ 🌳 pământ', 'IF the animal can fly THEN ➜ ☁️ sky, ELSE ➜ 🌳 ground'), yes: '☁️', no: '🌳',
            items: [['🦅', 1], ['🐶', 0], ['🐝', 1], ['🐢', 0], ['🦋', 1], ['🐱', 0]] }
        ] }
    },
    {
      id: 'debug', emoji: '🐞',
      title: T('Depanarea: vânătoarea de bug-uri', 'Debugging: bug hunting'),
      slides: [
        { e: '🐞💻', title: T('Ce este un bug?', 'What is a bug?'),
          text: T('Un <b>bug</b> este o greșeală într-un program, care îl face să nu meargă cum trebuie. Găsirea și repararea greșelilor se numește <b>depanare</b> (debugging).', 'A <b>bug</b> is a mistake in a program that makes it behave wrongly. Finding and fixing mistakes is called <b>debugging</b>.') },
        { e: '🦋📓', title: T('Primul „bug” adevărat', 'The first real "bug"'),
          text: T('În 1947, echipa lui <b>Grace Hopper</b> a găsit o molie prinsă într-un calculator uriaș. Au lipit-o în jurnal și au scris: „primul bug adevărat găsit”! 😄', 'In 1947, <b>Grace Hopper</b>\'s team found a moth stuck inside a giant computer. They taped it into their logbook and wrote: "first actual case of bug being found"! 😄') },
        { e: '▶️👀🔧🔁', title: T('Cum depanezi', 'How to debug'),
          text: T('1. <b>Rulează</b> programul. 2. <b>Urmărește</b> unde greșește. 3. <b>Repară</b> un singur lucru. 4. <b>Testează</b> din nou. Greșelile sunt normale – chiar și programatorii experți au bug-uri în fiecare zi!', '1. <b>Run</b> the program. 2. <b>Watch</b> where it goes wrong. 3. <b>Fix</b> one thing. 4. <b>Test</b> again. Mistakes are normal – even expert programmers find bugs every day!'),
          fact: T('În joc, atinge o săgeată din program ca s-o rotești, sau atinge numărul unei bucle ca să-l schimbi.', 'In the game, tap an arrow in the program to turn it, or tap a loop\'s number to change it.') }
      ],
      activity: { type: 'robot', title: T('Vânătorul de bug-uri', 'Bug hunter'), loops: true, debug: true,
        levels: [
          { grid: ['.....', 'S...G', '.....'], program: ['R', 'R', 'U', 'R', 'R'] },
          { grid: ['S...#', '###.#', 'G...#'], program: ['R', 'R', 'R', 'D', 'D', 'L', 'L', 'R'] },
          { grid: ['S.#..', '#..#.', '.#..#', '..#..', '...#G'], program: [{ loop: 3, body: ['R', 'D'] }] }
        ] }
    }
  ],
  quiz: [
    { q: T('Ce este un program?', 'What is a program?'), a: [T('O listă de instrucțiuni pentru calculator', 'A list of instructions for a computer'), T('O piesă a calculatorului', 'A computer part'), T('Un fel de joc de masă', 'A kind of board game')], c: 0 },
    { q: T('Ce înseamnă o secvență?', 'What is a sequence?'), a: [T('Pași puși la întâmplare', 'Steps in random order'), T('Pași în ordinea corectă', 'Steps in the right order'), T('Un singur pas', 'A single step')], c: 1 },
    { q: T('Robotul trebuie să meargă de 6 ori la dreapta. Ce folosești?', 'The robot must move right 6 times. What do you use?'), a: [T('O condiție', 'A condition'), T('O buclă: Repetă 6 ori ➡️', 'A loop: Repeat 6 times ➡️'), T('Un bug', 'A bug')], c: 1 },
    { q: T('„DACĂ e frig, ATUNCI iau geaca.” Ce fel de instrucțiune este?', '"IF it is cold, THEN I wear a jacket." What kind of instruction is it?'), a: [T('Condiție', 'Condition'), T('Buclă', 'Loop'), T('Fișier', 'File')], c: 0 },
    { q: T('Ce este un bug?', 'What is a bug?'), a: [T('O greșeală în program', 'A mistake in a program'), T('Un program foarte rapid', 'A very fast program'), T('O tastă specială', 'A special key')], c: 0 },
    { q: T('Programul nu merge. Care e primul pas bun?', 'Your program doesn\'t work. What is a good first step?'), a: [T('Șterg tot și renunț', 'Delete everything and give up'), T('Îl rulez și urmăresc unde greșește', 'Run it and watch where it goes wrong'), T('Schimb totul deodată', 'Change everything at once')], c: 1 },
    { q: T('Câte pătrățele merge robotul cu programul „Repetă de 3 ori: ➡️ ➡️”?', 'How many squares does the robot move with "Repeat 3 times: ➡️ ➡️"?'), a: [T('3', '3'), T('5', '5'), T('6', '6')], c: 2 },
    { q: T('Cine a lucrat în echipa care a găsit primul „bug” adevărat?', 'Who worked on the team that found the first real "bug"?'), a: [T('Grace Hopper', 'Grace Hopper'), T('Albert Einstein', 'Albert Einstein'), T('Leonardo da Vinci', 'Leonardo da Vinci')], c: 0 }
  ]
},
/* ========== 4. ALGORITHMS & CREATIVITY ========== */
{
  id: 'algo', emoji: '🧩', color: '#9333ea', color2: '#c084fc',
  title: T('Algoritmi și creativitate digitală', 'Algorithms & Digital Creativity'),
  desc: T('Algoritmi, sortare, numere binare și pixel art.', 'Algorithms, sorting, binary numbers and pixel art.'),
  lessons: [
    {
      id: 'algorithm', emoji: '📜',
      title: T('Ce este un algoritm?', 'What is an algorithm?'),
      slides: [
        { e: '📜👩‍🍳', title: T('O rețetă pentru probleme', 'A recipe for problems'),
          text: T('Un <b>algoritm</b> este o listă clară de pași care rezolvă o problemă. O rețetă de clătite este un algoritm! Drumul tău spre școală este tot un algoritm.', 'An <b>algorithm</b> is a clear list of steps that solves a problem. A pancake recipe is an algorithm! Your route to school is an algorithm too.') },
        { e: '🎯📏🏁', title: T('Un algoritm bun', 'A good algorithm'),
          text: T('Un algoritm bun este <b>clar</b> (oricine îl înțelege la fel), are pașii în <b>ordinea corectă</b> și se <b>termină</b> la un moment dat.', 'A good algorithm is <b>clear</b> (everyone understands it the same way), has its steps in the <b>right order</b> and <b>finishes</b> at some point.') },
        { e: '🔍🗺️', title: T('Algoritmi peste tot', 'Algorithms everywhere'),
          text: T('Când cauți ceva pe internet sau aplicația de hărți îți arată drumul, în spate lucrează algoritmi foarte deștepți.', 'When you search the internet or a maps app shows you the way, very clever algorithms are working behind the scenes.'),
          fact: T('Cuvântul „algoritm” vine de la numele unui matematician persan, Al-Khwarizmi, care a trăit acum peste 1.000 de ani.', 'The word "algorithm" comes from the name of a Persian mathematician, Al-Khwarizmi, who lived over 1,000 years ago.') }
      ],
      activity: { type: 'order', title: T('Pune pașii în ordine', 'Put the steps in order'),
        rounds: [
          { name: T('🪥 Spălatul pe dinți', '🪥 Brushing your teeth'), steps: [T('Iau periuța de dinți', 'Pick up the toothbrush'), T('Pun pastă pe periuță', 'Put toothpaste on the brush'), T('Periez dinții 2 minute', 'Brush my teeth for 2 minutes'), T('Clătesc gura cu apă', 'Rinse my mouth with water'), T('Spăl periuța și o pun la loc', 'Wash the brush and put it away')] },
          { name: T('🌱 Plantarea unei semințe', '🌱 Planting a seed'), steps: [T('Pun pământ în ghiveci', 'Fill the pot with soil'), T('Fac o gropiță cu degetul', 'Make a small hole with my finger'), T('Pun sămânța în gropiță', 'Put the seed in the hole'), T('Acopăr sămânța cu pământ', 'Cover the seed with soil'), T('Ud ghiveciul cu apă', 'Water the pot')] }
        ] }
    },
    {
      id: 'sorting', emoji: '📊',
      title: T('Algoritmi de sortare', 'Sorting algorithms'),
      slides: [
        { e: '🔤📇', title: T('Calculatoarele sortează mereu', 'Computers sort all the time'),
          text: T('Contactele din telefon sunt în ordine alfabetică, clasamentul unui joc e ordonat după scor. Pentru asta, calculatorul folosește un <b>algoritm de sortare</b>.', 'Phone contacts are in alphabetical order, a game leaderboard is ordered by score. For that the computer uses a <b>sorting algorithm</b>.') },
        { e: '🫧 5 ⇄ 3', title: T('Sortarea cu bule', 'Bubble sort'),
          text: T('Un algoritm simplu: compară <b>două elemente vecine</b>. Dacă sunt în ordinea greșită, <b>schimbă-le</b>. Repetă de la început până nu mai e nimic de schimbat. Numerele mari „urcă” spre capăt ca niște bule! 🫧', 'A simple algorithm: compare <b>two neighbours</b>. If they are in the wrong order, <b>swap them</b>. Repeat from the start until nothing needs swapping. Big numbers "bubble up" to the end! 🫧') },
        { e: '⚡🏆', title: T('Mai puține mutări = mai rapid', 'Fewer moves = faster'),
          text: T('Programatorii caută algoritmi care fac <b>cât mai puține mutări</b>. În joc, încearcă să sortezi cutiile cu cât mai puține schimbări!', 'Programmers look for algorithms that make <b>as few moves as possible</b>. In the game, try to sort the boxes with as few swaps as you can!'),
          fact: T('Unele algoritme pot sorta un milion de numere în mai puțin de o secundă.', 'Some algorithms can sort a million numbers in less than a second.') }
      ],
      activity: { type: 'swap', title: T('Sortează cutiile', 'Sort the boxes'), rounds: [[4, 2, 5, 1, 3], [6, 3, 1, 5, 2, 4]] }
    },
    {
      id: 'binary', emoji: '0️⃣',
      title: T('Limba calculatoarelor: binar', 'Computer language: binary'),
      slides: [
        { e: '💡 0 / 1', title: T('Doar 0 și 1', 'Only 0 and 1'),
          text: T('În interior, calculatorul înțelege doar două „cuvinte”: <b>0</b> (stins) și <b>1</b> (aprins), ca un întrerupător de lumină. O astfel de cifră se numește <b>bit</b>.', 'Inside, a computer understands only two "words": <b>0</b> (off) and <b>1</b> (on), like a light switch. One such digit is called a <b>bit</b>.') },
        { e: '8 4 2 1', title: T('Cărțile binare', 'Binary cards'),
          text: T('Imaginează-ți cărți cu valorile <b>8, 4, 2, 1</b>. Aprinzi doar cărțile de care ai nevoie și aduni. De exemplu, <b>5 = 4 + 1</b>, deci în binar 5 se scrie <b>0101</b>.', 'Imagine cards with values <b>8, 4, 2, 1</b>. Turn on only the cards you need and add them up. For example <b>5 = 4 + 1</b>, so in binary 5 is <b>0101</b>.') },
        { e: '🔤 ➜ 01000001', title: T('Totul devine numere', 'Everything becomes numbers'),
          text: T('Literele, culorile, sunetele – totul este transformat în șiruri de 0 și 1. De exemplu, litera <b>A</b> este <b>01000001</b>.', 'Letters, colours, sounds – everything is turned into strings of 0s and 1s. For example the letter <b>A</b> is <b>01000001</b>.'),
          fact: T('8 biți formează un byte (octet). Un film poate avea miliarde de bytes!', '8 bits make one byte. A movie can contain billions of bytes!') }
      ],
      activity: { type: 'binary', title: T('Aprinde cărțile', 'Light up the cards'), rounds: [{ bits: 4, n: 5 }, { bits: 4, n: 9 }, { bits: 4, n: 14 }, { bits: 5, n: 19 }, { bits: 5, n: 27 }] }
    },
    {
      id: 'pixels', emoji: '🎨',
      title: T('Pixel art: imagini din cod', 'Pixel art: pictures from code'),
      slides: [
        { e: '🟥🟧🟨🟩🟦', title: T('Ce este un pixel?', 'What is a pixel?'),
          text: T('Imaginile de pe ecran sunt făcute din pătrățele foarte mici numite <b>pixeli</b>. Fiecare pixel are o singură culoare. Uită-te de foarte aproape la un ecran și poate îi vezi!', 'Pictures on a screen are made of tiny squares called <b>pixels</b>. Each pixel has just one colour. Look very closely at a screen and you might see them!') },
        { e: '🎨 = 🔢', title: T('Culorile sunt numere', 'Colours are numbers'),
          text: T('Calculatorul păstrează fiecare culoare ca pe un număr. O imagine este deci o listă lungă de numere – adică <b>date</b>.', 'The computer stores each colour as a number. So a picture is a long list of numbers – that is, <b>data</b>.') },
        { e: '2⬜ 3🟥', title: T('Codul pe rânduri', 'Row codes'),
          text: T('Ca să economisească loc, putem scrie „<b>2⬜ 3🟥</b>” în loc de „alb, alb, roșu, roșu, roșu”. Acum tu ești calculatorul: citește codul și desenează imaginea!', 'To save space, we can write "<b>2⬜ 3🟥</b>" instead of "white, white, red, red, red". Now you are the computer: read the code and draw the picture!'),
          fact: T('Personajele din primele jocuri video, precum Pac-Man, erau desenate din doar câțiva pixeli.', 'Characters in early video games, like Pac-Man, were drawn with just a few pixels.') }
      ],
      activity: { type: 'pixel', title: T('Decodează imaginea', 'Decode the picture'),
        images: [
          { name: T('inimă', 'heart'), color: '#ef4444', sym: '🟥', rows: ['0110110', '1111111', '1111111', '0111110', '0011100', '0001000'] },
          { name: T('extraterestru', 'alien'), color: '#22c55e', sym: '🟩', rows: ['00100100', '00011000', '00111100', '01011010', '11111111', '10111101', '10000001', '01000010'] }
        ] }
    }
  ],
  quiz: [
    { q: T('Ce este un algoritm?', 'What is an algorithm?'), a: [T('O listă clară de pași care rezolvă o problemă', 'A clear list of steps that solves a problem'), T('Un tip de calculator', 'A type of computer'), T('Un joc video', 'A video game')], c: 0 },
    { q: T('Care este un exemplu de algoritm din viața reală?', 'Which is a real-life algorithm?'), a: [T('O rețetă de clătite', 'A pancake recipe'), T('O culoare', 'A colour'), T('Un nume', 'A name')], c: 0 },
    { q: T('În sortarea cu bule, ce faci cu două numere vecine în ordinea greșită?', 'In bubble sort, what do you do with two neighbours in the wrong order?'), a: [T('Le ștergi', 'Delete them'), T('Le schimbi între ele', 'Swap them'), T('Le aduni', 'Add them')], c: 1 },
    { q: T('Ce cifre folosește calculatorul în limbajul binar?', 'Which digits does a computer use in binary?'), a: [T('0 și 1', '0 and 1'), T('1 și 2', '1 and 2'), T('Toate de la 0 la 9', 'All from 0 to 9')], c: 0 },
    { q: T('Cât face 0110 în binar (cărțile 8 4 2 1)?', 'What is 0110 in binary (cards 8 4 2 1)?'), a: [T('3', '3'), T('6', '6'), T('10', '10')], c: 1 },
    { q: T('Cum se numește un pătrățel colorat dintr-o imagine digitală?', 'What is a tiny coloured square in a digital picture called?'), a: [T('Pixel', 'Pixel'), T('Bug', 'Bug'), T('Folder', 'Folder')], c: 0 },
    { q: T('Ce înseamnă codul „3⬜ 2🟥”?', 'What does the code "3⬜ 2🟥" mean?'), a: [T('3 roșii, 2 albi', '3 red, 2 white'), T('3 albi, apoi 2 roșii', '3 white, then 2 red'), T('5 albi', '5 white')], c: 1 },
    { q: T('Câți biți are un byte (octet)?', 'How many bits are in a byte?'), a: [T('2', '2'), T('8', '8'), T('100', '100')], c: 1 }
  ]
}
];

/* ---------------- BADGES ---------------- */
const BADGES = [
  { id: 'first', e: '🌱', name: T('Primul pas', 'First step'), desc: T('Termină prima lecție', 'Finish your first lesson') },
  { id: 'stars25', e: '⭐', name: T('Colecționar de stele', 'Star collector'), desc: T('Adună 25 de stele', 'Collect 25 stars') },
  { id: 'typist', e: '⌨️', name: T('Degete rapide', 'Speedy fingers'), desc: T('Termină jocul tastelor', 'Finish the typing game') },
  { id: 'pwpro', e: '🔐', name: T('Maestrul parolelor', 'Password pro'), desc: T('3 stele la parole puternice', '3 stars in Strong passwords') },
  { id: 'robot', e: '🤖', name: T('Prietenul roboților', 'Robot friend'), desc: T('Termină lecțiile cu robotul Bit', 'Finish all robot lessons') },
  { id: 'detective', e: '🕵️', name: T('Detectiv digital', 'Digital detective'), desc: T('Prinde toate capcanele din mesaje', 'Catch every trap in the messages') },
  { id: 'perfect', e: '💯', name: T('Test perfect', 'Perfect quiz'), desc: T('Răspunde corect la toate întrebările unui test', 'Answer every question of a quiz correctly') },
  { id: 'grad_computer', e: '💻', name: T('Expert în calculatoare', 'Computer expert'), desc: T('Diploma: Calculatorul pe înțelese', 'Certificate: Computer Basics') },
  { id: 'grad_safety', e: '🛡️', name: T('Erou al siguranței', 'Safety hero'), desc: T('Diploma: Siguranța pe internet', 'Certificate: Internet Safety') },
  { id: 'grad_logic', e: '🧠', name: T('Gânditor logic', 'Logical thinker'), desc: T('Diploma: Logica programării', 'Certificate: Coding Logic') },
  { id: 'grad_algo', e: '🧩', name: T('Inventator de algoritmi', 'Algorithm inventor'), desc: T('Diploma: Algoritmi și creativitate', 'Certificate: Algorithms & Creativity') },
  { id: 'champion', e: '🏆', name: T('Campionul IT Adventure', 'IT Adventure champion'), desc: T('Toate cele 4 diplome', 'All 4 certificates') }
];
