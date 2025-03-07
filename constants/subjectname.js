const subjectNames = {
  //s1&s2
  MAT101: "Mathematics I",
  PHT100: "Engineering Physics",
  CYT100: "Engineering Chemistry",
  CET101: "Engineering Mechanics",
  BET101: "Introduction to Engineering",
  BET102: "Introduction to Sustainable Engineering",
  CET100: "Basics of Civil Engineering",
  MET100: "Basics of Mechanical Engineering",
  EET100: "Basics of Electrical Engineering",
  ECT100: "Basics of Electronics",
  PHL103: "Engineering Physics Lab",
  CYL103: "Engineering Chemistry Lab",
  CEL104: "Civil Engineering Workshop",
  MEL104: "Mechanical Engineering Workshop",
  EEL104: "Electrical Engineering Workshop",
  ECL104: "Electronics Engineering Workshop",
  MAT102: "Mathematics II",
  MET102: "Engineering Graphics",
  BET103: "Design and Engineering",
  //ec
  MAT201: "PARTIAL DIFFERENTIAL EQUATION AND COMPLEX ANALYSIS",
  ECT201: "SOLID STATE DEVICES",
  ECT203: "LOGIC CIRCUIT DESIGN",
  ECT205: "NETWORK THEORY",
  EST200: "DESIGN AND ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN201: "SUSTAINABLE ENGINEERING",
  ECL201: "SCIENTIFIC COMPUTING LAB",
  ECL203: "LOGIC DESIGN LAB",

  MAT204: "PROBABILITY, RANDOM PROCESSES AND NUMERICAL METHODS",
  EET202: "DC MACHINES AND TRANSFORMERS",
  EET204: "ELECTROMAGNETIC THEORY",
  EET206: "DIGITAL ELECTRONICS",
  EST200: "DESIGN & ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN202: "CONSTITUTION OF INDIA",
  EEL202: "ELECTRICAL MACHINES LAB I",
  EEL204: "DIGITAL ELECTRONICS LAB",

  EET301: "POWER SYSTEMS I",
  EET303: "MICROPROCESSORS AND MICROCONTROLLERS",
  EET305: "SIGNALS AND SYSTEMS",
  EET307: "SYNCHRONOUS AND INDUCTION MACHINES",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  MCN301: "DISASTER MANAGEMENT",
  EEL331: "MICROPROCESSORS AND MICROCONTROLLERS LAB",
  EEL333: "ELECTRICAL MACHINES LAB II",

  EET302: "LINEAR CONTROL SYSTEMS",
  EET304: "POWER SYSTEMS II",
  EET306: "POWER ELECTRONICS",
  EETXXX: "PROGRAM ELECTIVE I",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  EET308: "COMREHENSIVE COURSE WORK",
  EEL332: "POWER SYSTEMS LAB",
  EEL334: "POWER ELECTRONICS LAB",

  EET401: "ADVANCED CONTROL SYSTEMS",
  EETXXX: "PROGRAM ELECTIVE II",
  EETXXX: "OPEN ELECTIVE",
  MCN401: "INDUSTRIAL SAFETY ENGINEERING",
  EEL411: "CONTROL SYSTEMS LAB",
  EEQ413: "SEMINAR",
  EED415: "PROJECT PHASE I",

  EET402: "ELECTRICAL SYSTEM DESIGN AND ESTIMATION",
  EETXXX: "PROGRAM ELECTIVE III",
  EETXXX: "PROGRAM ELECTIVE IV",
  EETXXX: "PROGRAM ELECTIVE V",
  EET404: "COMPREHENSIVE COURSE VIVA",
  EED416: "PROJECT PHASE II",
  //cs
  MAT101: "Linear Algebra & Calculus",
  PHT100: "Engineering Physics A",
  CYT100: "Engineering Chemistry",
  EST100: "Engineering Mechanics",
  EST110: "Engineering Graphics",
  EST120: "Basics of Civil & Mechanical Engineering",
  EST130: "Basics of Electrical & Electronics Engineering",
  HUN101: "Life Skills",
  PHL120: "Engineering Physics Lab",
  CYL120: "Engineering Chemistry Lab",
  ESL120: "Civil & Mechanical Workshop",
  ESL130: "Electrical & Electronics Engineering Workshop",
  MAT102: "Vector Calculus, Differential Equations & Transforms",
  PHT100: "Engineering Physics A",
  CYT100: "Engineering Chemistry",
  EST100: "Engineering Mechanics",
  EST110: "Engineering Graphics",
  EST120: "Basics of Civil & Mechanical Engineering",
  EST130: "Basics of Electrical & Electronics Engineering",
  HUN102: "Professional Communcation",
  EST102: "Programming in C",
  PHL120: "Engineering Physics Lab",
  CYL120: "Engineering Chemistry Lab",
  ESL120: "Civil & Mechanical Workshop",
  ESL130: "Electrical & Electronics Engineering Workshop",
  MAT203: "Discrete Mathematical Structures",
  CST201: "Data Structures",
  CST203: "Logic System Design",
  CST205: "Object Oriented Programming using Java",
  EST200: "Design Engineering",
  HUT200: "Professional Ethics",
  MCN201: "Sustainable Engineering",
  CSL201: "Data Structures",
  CSL203: "Object Oriented Programming Lab(in Java)",
  MAT206: "Graph Theory",
  CST202: "Computer Organization And Architecture",
  CST204: "Database Management Systems",
  CST206: "Operating Systems",
  EST200: "Design & Engineering",
  HUT200: "Professional Ethics",
  MCN202: "Constitution Of India",
  CSL202: "Digital Lab",
  CSL204: "Operating Systems Lab",
  CST301: "Formal Languages And Automata Theory",
  CST303: "Computer Networks",
  CST305: "System Software",
  CST307: "Microprocessors And Microcontrollers",
  CST309: "Management Of Software Systems",
  MCN301: "Disaster Management",
  CSL331: "System Software And Microprocessors Lab",
  CSL333: "Database Management Systems Lab",
  CST302: "Compiler Design",
  CST304: "Computer Graphics And Image Processing",
  CST306: "Algorithm Analysis And Design",
  CSTxxx: "Program Elective I",
  HUT300: "Industrial Economics & Foreign Trade",
  CST308: "Comprehensive Course Work",
  CSL332: "Networking Lab",
  CSD334: "Miniproject",
  CST312: "Foundations Of Machine Learning",
  CST322: "Data Analytics",
  CST332: "Foundations Of Security In Computing",
  CST342: "Automated Verification",
  CST352: "Introduction To Ia32 Architecture",
  CST362: "Programming In Python",
  CST372: "Data And Computer Communication",
  CST401: "Artificial Intelligence",
  CSTxxx: "Program Elective II",
  MCN401: "Industrial Safety Engineering",
  CSL411: "Compiler Lab",
  CSQ413: "Seminar",
  CSD415: "Project Phase I",
  CST413: "Machine Learning",
  CST423: "Cloud Computing",
  CST433: "Security In Computing",
  CST443: "Model Based Software Development",
  CST453: "Advanced Topics In Ia32 Architecture",
  CST463: "Web Programming",
  CST473: "Natural Language Processing",
  CST415: "Introduction To Mobile Computing",
  CST425: "Introduction To Deep Learning",
  CST435: "Computer Graphics",
  CST445: "Python For Engineers",
  CST455: "Object Oriented Concepts",
  CST402: "Distributed Computing",
  CST404: "Comprehensive Course Viva",
  CSD416: "Project Phase II",
  CST414: "Deep Learning",
  CST424: "Programming Paradigms",
  CST434: "Cryptography",
  CST444: "Soft Computing",
  CST454: "Fuzzy Set Theory And Applications",
  CST464: "Embedded Systems",
  CST474: "Computer Vision",
  CST416: "Formal Methods And Tools In Software Engineering",
  CST426: "Client Server Architecture",
  CST436: "Parallel Computing",
  CST446: "Data Compression Techniques",
  CST456: "Unified Extended Firmware Interface",
  CST466: "Data Mining",
  CST476: "Mobile Computing",
  CST418: "High Performance Computing",
  CST428: "Blockchain Technologies",
  CST438: "Image Processing Technique",
  CST448: "Internet Of Things",
  CST458: "Software Testing",
  CST468: "Bioinformatics",
  CST478: "Computational Linguistics",
  //mech
  MAT201: "Partial Differential Equation and Complex Analysis",
  MET201: "Mechanics of Solids",
  MET203: "Mechanics of Fluids",
  MET205: "Metallurgy & Material Science",
  EST200: "Design and Engineering",
  HUT200: "Professional Ethics",
  MCN201: "Sustainable Engineering",
  MEL201: "Computer Aided Machine Drawing",
  MEL203: "Materials Testing Lab",
  MAT202: "Probability, Statistics and Numerical Methods",
  MET202: "Engineering Thermodynamics",
  MET204: "Manufacturing Process",
  MET206: "Fluid Machinery",
  MCN202: "Constitution of India",
  MEL202: "FM & HM Lab",
  MEL204: "Machine Tools Lab-I",
  MET301: "Mechanics of Machinery",
  MET303: "Thermal Engineering",
  MET305: "Industrial & Systems Engineering",
  MET307: "Machine Tools and Metrology",
  HUT300: "Industrial Economics and Management",
  HUT310: "Foreign Trade for Engineers",
  MCN301: "Disaster Management",
  MEL331: "Machine Tools Lab-II",
  MEL333: "Thermal Engineering Lab-I",
  MET312: "Non-Destructive Testing",
  MET322: "Data Analytics for Engineers",
  MET332: "Advanced Mechanics of Solids",
  MET342: "IC Engine Combustion and Pollution",
  MET352: "Automobile Engineering",
  MET362: "Product Design and Development",
  MET372: "Advanced Metal Joining Techniques",
  MET401: "Design of Machine Elements",
  METXXX: "Program Elective II",
  METXXX: "Open Elective",
  MCN401: "Industrial Safety Engineering",
  MEL411: "Mechanical Engineering Lab",
  MEQ413: "Seminar",
  MED415: "Project Phase I",
  MET415: "Introduction to Business Analytics",
  MET425: "Quantitative Techniques for Engineers",
  MET435: "Automotive Technology",
  MET445: "Renewable Energy Engineering",
  MET455: "Quality Engineering and Management",
  MET402: "Mechatronics",
  METXXX: "Program Elective III",
  METXXX: "Program Elective IV",
  METXXX: "Program Elective V",
  MET404: "Comprehensive Viva Voce",
  MED416: "Project Phase II",
  MET414: "Quality Management",
  MET424: "Decisions with Metaheuristics",
  MET434: "Pressure Vessel and Piping Design",
  MET444: "Computational Fluid Dynamics",
  MET454: "Industrial Tribology",
  MET464: "Micro and Nano Manufacturing",
  MET474: "Heating and Ventilation Systems",
  MET416: "Composite Materials",
  MET426: "Artificial Intelligence and Machine Learning",
  MET436: "Acoustics and Noise Control",
  MET446: "Heat Transfer Equipment Design",
  MET456: "Robotics and Automation",
  MET466: "Technology Management",
  MET476: "Cryogenic Engineering",
  //auto
  MAT201: "PARTIAL DIFFERENTIAL EQUATION AND COMPLEX ANALYSIS",
  MET201: "MECHANICS OF SOLIDS",
  AUT201: "AUTOMOTIVE CHASSIS",
  AUT203: "ENGINEERING THERMODYNAMICS",
  EST200: "DESIGN & ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN201: "SUSTAINABLE ENGINEERING",
  AUL201: "AUTOMOBILE LAB I",
  MEL203: "MATERIALS TESTING LAB",
  MAT202: "PROBABILITY, STATISTICS AND NUMERICAL METHODS",
  AUT202: "FLUID MECHANICS AND MACHINERY",
  AUT204: "AUTO POWER PLANT",
  AUT206: "AUTOMOTIVE TRANSMISSION",
  EST200: "DESIGN & ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN202: "CONSTITUTION OF INDIA",
  MEL202: "FM & HM LAB",
  AUL202: "AUTOMOBILE LAB II",
  AUT301: "THEORY OF MACHINES",
  AUT303: "MANUFACTURING PROCESS",
  AUT305: "HYBRID AND FUEL CELL VEHICLES",
  AUT307: "MATERIAL SCIENCE AND METALLURGY",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  MCN301: "DISASTER MANAGEMENT",
  MUL331: "PRODUCTION ENGINEERING LAB",
  MEL333: "THERMAL ENGINEERING LAB-I",
  MET302: "HEAT & MASS TRANSFER",
  AUT304: "AUTOMOTIVE ELECTRICAL AND ELECTRONICS",
  AUT306: "AUTOMOTIVE COMPONENTS DESIGN",
  AUTXXX: "PROGRAM ELECTIVE I",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  AUT308: "COMPREHENSIVE COURSE WORK",
  MEL332: "COMPUTER AIDED DESIGN & ANALYSIS LAB",
  AUT401: "ADVANCED IC ENGINES",
  AUTXXX: "PROGRAM ELECTIVE II",
  AUTXXX: "OPEN ELECTIVE",
  MCN401: "INDUSTRIAL SAFETY ENGINEERING",
  AUL411: "AUTOMOBILE LAB IV",
  AUQ413: "SEMINAR",
  AUD415: "PROJECT PHASE I",
  AUT402: "VEHICLE DYNAMICS",
  AUTXXX: "PROGRAM ELECTIVE III",
  AUTXXX: "PROGRAM ELECTIVE IV",
  AUTXXX: "PROGRAM ELECTIVE V",
  AUT404: "COMPREHENSIVE COURSE VIVA",
  AUD416: "PROJECT PHASE II",
  //BT
  MAT202: "PROBABILITY, STATISTICS AND NUMERICAL METHODS",
  BTT202: "CHEMICAL AND BIOLOGICAL REACTION ENGINEERING",
  BTT204: "PRINCIPLES OF BIOCHEMISTRY",
  BTT206: "BIOPROCESS ENGINEERING",
  EST200: "DESIGN & ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN202: "CONSTITUTION OF INDIA",
  BTL202: "BIOCHEMISTRY LAB",
  BTL204: "ANALYTICAL TECHNIQUES IN BIOTECHNOLOGY LAB",
  MAT201: "PARTIAL DIFFERENTIAL EQUATION AND COMPLEX ANALYSIS",
  BTT201: "BIOPROCESS CALCULATIONS",
  BTT203: "MICROBIOLOGY",
  BTT205: "FLUID FLOW AND PARTICLE TECHNOLOGY",
  EST200: "DESIGN & ENGINEERING",
  HUT200: "PROFESSIONAL ETHICS",
  MCN201: "SUSTAINABLE ENGINEERING",
  BTL201: "MICROBIOLOGY LAB",
  BTL203: "FLUID FLOW AND PARTICLE TECHNOLOGY LAB",
  BTT301: "INDUSTRIAL BIOPROCESS TECHNOLOGY",
  BTT303: "MASS TRANSFER OPERATIONS",
  BTT305: "MOLECULAR BIOLOGY",
  BTT307: "THERMODYNAMICS AND HEAT TRANSFER",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  MCN301: "DISASTER MANAGEMENT",
  BTL331: "BIOPROCESS ENGINEERING LAB",
  BTL333: "MOLECULAR BIOLOGY LAB",
  BTT302: "BIOINFORMATICS",
  BTT304: "DOWNSTREAM PROCESSING",
  BTT306: "BIOREACTOR CONTROL AND INSTRUMENTATION",
  BTTXXX: "PROGRAM ELECTIVE I",
  HUT300: "INDUSTRIAL ECONOMICS & FOREIGN TRADE",
  HUT310: "MANAGEMENT FOR ENGINEERS",
  BTT308: "COMPREHENSIVE COURSE WORK",
  BTL332: "DOWNSTREAM PROCESSING LAB",
  BTL334: "HEAT AND MASS TRANSFER LAB",
  BTT401: "PROCESS EQUIPMENT AND PLANT DESIGN",
  BTTXXX: "PROGRAM ELECTIVE II",
  BTTXXX: "OPEN ELECTIVE",
  MCN401: "INDUSTRIAL SAFETY ENGINEERING",
  BTL411: "REACTION ENGINEERING AND PROCESS CONTROL LAB",
  BTQ413: "SEMINAR",
  BTD415: "PROJECT PHASE I",
  BTT402: "ENVIRONMENTAL BIOTECHNOLOGY",
  BTTXXX: "PROGRAM ELECTIVE III",
  BTTXXX: "PROGRAM ELECTIVE IV",
  BTTXXX: "PROGRAM ELECTIVE V",
  BTT404: "COMPREHENSIVE COURSE VIVA",
  BTD416: "PROJECT PHASE II",
  //ec
  MAT201: "Partial Differential Equation and Complex Analysis",
  ECT201: "Solid State Devices",
  ECT203: "Logic Circuit Design",
  ECT205: "Network Theory",
  EST200: "Design and Engineering",
  HUT200: "Professional Ethics",
  MCN201: "Sustainable Engineering",
  ECL201: "Scientific Computing Lab",
  ECL203: "Logic Design Lab",
  VAC: "Remedial/Minor Course",
  MAT204: "Probability, Random Process and Numerical Methods",
  ECT202: "Analog Circuits",
  ECT204: "Signals and Systems",
  ECT206: "Computer Architecture and Microcontrollers",
  EST200: "Design and Engineering",
  HUT200: "Professional Ethics",
  MCN202: "Constitution of India",
  ECL202: "Analog Circuits and Simulation Lab",
  ECL204: "Microcontroller Lab",
  VAC: "Remedial/Minor/Honours Course",
  ECT301: "Linear Integrated Circuits",
  ECT303: "Digital Signal Processing",
  ECT305: "Analog and Digital Communication",
  ECT307: "Control Systems",
  HUT300: "Industrial Economics and Foreign Trade",
  HUT310: "Management for Engineers",
  MCN301: "Disaster Management",
  ECL331: "Analog Integrated Circuits and Simulation Lab",
  ECL333: "Digital Signal Processing Lab",
  VAC: "Remedial/Minor/Honours Course",
  ECT302: "Electromagnetics",
  ECT304: "VLSI Circuit Design",
  ECT306: "Information Theory and Coding",
  ECTXXX: "Program Elective I",
  HUT300: "Industrial Economics and Foreign Trade",
  HUT310: "Management for Engineers",
  ECT308: "Comprehensive Course Work",
  ECL332: "Communication Lab",
  ECD334: "Miniproject",
  VAC: "Remedial/Minor/Honours course",
  ECT312: "Digital System Design",
  ECT322: "Power Electronics",
  ECT332: "Data Analysis",
  ECT342: "Embedded Systems",
  ECT352: "Digital Image Processing",
  ECT362: "Introduction to MEMS",
  ECT372: "Quantum Computing",
  ECT401: "Wireless Communication",
  ECTXXX: "Program Elective II",
  OPEN_ELECTIVE: "Open Elective",
  MCN401: "Industrial Safety Engineering",
  ECL411: "Electromagnetics Lab",
  ECQ413: "Seminar",
  ECD415: "Project Phase I",
  VAC: "Remedial/Minor/Honors course",
  ECT413: "Optical Fiber Communication",
  ECT423: "Computer Networks",
  ECT433: "Opto-electronic Devices",
  ECT443: "Antenna and Wave Propagation",
  ECT453: "Error Control Codes",
  ECT463: "Machine Learning",
  ECT473: "DSP Architectures",
  ECT402: "Instrumentation",
  ECTXXX: "Program Elective IV",
  ECT408: "Comprehensive Viva Voce",
  ECD416: "Project Phase II",
  VAC: "Remedial/Minor/Honors course",
  ECT424: "Biomedical Engineering",
  ECT434: "Satellite Communication",
  ECT444: "Speech Processing",
  ECT454: "Pattern Recognition",
  ECT464: "VLSI Signal Processing",
  ECT474: "IoT based System Design",
  ECT414: "Modern Computing Systems",
  ECT424: "Real Time Operating Systems",
  ECT434: "Mixed Signal Circuits",
  ECT444: "Programmable Devices",
  ECT454: "Analog CMOS Design",
  ECT464: "Robotics",
  ECT418: "Mechatronics",
  ECT428: "Computer Techniques in Power System",
  ECT438: "Embedded Systems",
  ECT448: "Digital System Testing",
  ECT458: "Power Electronics",
  ECT468: "Digital Image Processing",
  ECT478: "Signal Integrity and Design",
  ECT488: "Quantum Computing",
  // 2024 scheme
  //a&b
  GYMAT101: "Group Specific Mathematics -1",
  GYPHT121: "Physics for Engineers",
  GYCYT122: "Chemistry for Engineers",
  GYEST103: "Engineering Graphics and Computer Aided Drawing",
  GYEST104:
    "Introduction to Electrical & Electronics Engineering (Part 1: Electrical Engineering, Part 2: Electronics Engineering)",
  UCEST105: "Algorithmic Thinking with Python",
  GYESL106: "Basic Electrical and Electronics Engineering Workshop",
  UCPST127: "Health and Safety",
  UCHUT128: "Life Skills and Universal Human Values",
  UCSEM129: "Skill Enhancement Course: Digital 101 (30 Hours, NASSCOM)",
  //c
  GCMAT101: "Group Specific Mathematics -1",
  GCPHT121: "Physics for Engineers",
  GCCYT122: "Chemistry for Engineers",
  GCEST103: "Engineering Mechanics",
  GCEST104:
    "Introduction to Mechanical Engineering & Civil Engineering (Part 1: Mechanical Engineering, Part 2: Civil Engineering)",
  UCEST105: "Algorithmic Thinking with Python",
  GCESL106: "Engineering Workshop",
  UCPST127: "Health and Safety",
  UCHUT128: "Life Skills and Universal Human Values",
  UCSEM129: "Skill Enhancement Course: Digital 101 (30 Hours, NASSCOM)",
  //d
  GDMAT101: "Group Specific Mathematics -1",
  GDPHT121: "Physics for Engineers",
  GDCYT122: "Chemistry for Engineers",
  GDEST103: "Engineering Graphics and Computer Aided Drawing",
  GDXXT104:
    "Introduction to Biotechnology/Food Technology/Agriculture Engineering",
  UCEST105: "Algorithmic Thinking with Python",
  GDXXL106:
    "Foundations of Biotechnology/Food Technology/Agriculture Engineering Lab",
  UCPST127: "Health and Safety",
  UCHUT128: "Life Skills and Universal Human Values",
  UCSEM129: "Skill Enhancement Course: Digital 101 (30 Hours, NASSCOM)",

  Total: "Total Attendance",
  Percentage: "Attendance Percentage",
};

module.exports = { subjectNames };
