export interface ConditionSource {
  label: string;
  url: string;
}

export interface ConditionResearchSection {
  title: string;
  paragraphs: string[];
}

export interface ConditionPageData {
  slug: string;
  title: string;
  seoTitle: string;
  subject: string;
  description: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  heroDescription: string;
  opening: string[];
  research: ConditionResearchSection[];
  features: string[];
  exampleQuestion: string;
  exampleBoundary: string;
  questions: string[];
  sharing: string[];
  sources: ConditionSource[];
  urgent?: string;
}

export const conditionPages: ConditionPageData[] = [
  {
    slug: 'kidney-disease',
    title: 'Kidney disease is the diagnosis. Their history is the context.',
    seoTitle: 'Kidney Disease in Dogs — What the Numbers Mean',
    subject: 'Kidney disease in dogs',
    description: 'A high creatinine isn’t a diagnosis — staging needs two draws. What to track at home, and what to ask your vet.',
    image: '/images/conditions/kidney-disease.webp',
    imageAlt: 'An owner holding a fluffy dog in a warmly lit room',
    heroDescription:
      'A kidney diagnosis can leave you staring at creatinine, BUN, SDMA, urine results, phosphorus, blood pressure, medications, food, and water intake as if they are separate stories. BarkLens reads them as one history and explains what published veterinary sources say veterinarians commonly consider together.',
    opening: [
      'One result is one moment. Kidney care is discussed across repeated blood draws, urine results, blood pressure, medications, diet, hydration, weight, appetite, and what you notice at home.',
      'BarkLens reads each uploaded report with the date, value, unit, and range printed by that laboratory. It places repeated draws beside medication changes, food labels, visit notes, and owner-confirmed observations so the history does not restart with every appointment.'
    ],
    research: [
      {
        title: 'BUN, creatinine, and SDMA',
        paragraphs: [
          'BUN is a waste product the kidneys help clear, but it can also move with hydration, diet, and gastrointestinal bleeding. Creatinine is more specific to filtration but is affected by muscle mass. SDMA is less affected by muscle mass. These values provide more context when they are read across time rather than as an isolated number.'
        ]
      },
      {
        title: 'Urine concentration and protein',
        paragraphs: [
          'Urine specific gravity shows how concentrated the urine is. Protein in the urine adds another part of the kidney picture. Raised waste products can carry different context when the urine is concentrated than when it is dilute.'
        ]
      },
      {
        title: 'Blood pressure and the rest of the panel',
        paragraphs: [
          'IRIS guidance stages chronic kidney disease using fasting creatinine, fasting SDMA, or preferably both, then adds urine protein and blood pressure. Phosphorus, calcium, potassium, red blood cells, hydration, medications, and the dates of each result may also belong in the same veterinary conversation.'
        ]
      }
    ],
    features: [
      'Photograph or upload each blood and urine report. BarkLens reads the values with the original units and laboratory ranges.',
      'Put every creatinine, BUN, SDMA, phosphorus, potassium, and urine result into one dated view.',
      'See how a value has moved across repeated draws without treating the trend as a diagnosis.',
      'Photograph food, medication, and supplement labels so the printed information sits beside the kidney history.',
      'Add owner-confirmed notes about water intake, appetite, weight, vomiting, energy, and other changes at home.',
      'Connect a result to the medication, food, illness, or appointment recorded around the same time.',
      'Ask a question that begins with your dog’s actual chart rather than a generic kidney-disease summary.'
    ],
    exampleQuestion:
      'Charlie’s creatinine and SDMA have moved across three draws. What do published veterinary sources say veterinarians commonly consider alongside those changes?',
    exampleBoundary:
      'The answer should show the relevant dates and records, explain the source material, and trace the explanation to published sources. It must not state the dog’s stage, prognosis, treatment, or next dose.',
    questions: [
      'Which value matters most in my dog’s case?',
      'How have creatinine, SDMA, phosphorus, weight, and appetite moved across the same period?',
      'Is a urine concentration, urine-protein result, or blood-pressure reading missing from this history?',
      'Could hydration, diet, muscle mass, medication, or another recorded event add context to this result?',
      'What should I record before the next draw?',
      'When does my veterinarian want these values repeated?'
    ],
    sharing: [
      'Share the kidney history before a specialist visit, open the QR code at an emergency clinic, or export the relevant reports for a new veterinarian.',
      'The person receiving it can see current medications, recent laboratory results, previous draws, and the dated observations that led to the visit.'
    ],
    sources: [
      { label: 'Merck Veterinary Manual, renal dysfunction', url: 'https://www.merckvetmanual.com/urinary-system/noninfectious-diseases-of-the-urinary-system-in-small-animals/renal-dysfunction-in-dogs-and-cats' },
      { label: 'Cornell eClinPath, concentrating ability', url: 'https://eclinpath.com/urinalysis/concentrating-ability/' },
      { label: 'IRIS staging guidelines', url: 'https://www.iris-kidney.com/s/IRIS_staging_guidelines-2026.pdf' },
      { label: 'ACVIM consensus statement', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6271319/' }
    ],
  },
  {
    slug: 'liver-disease',
    title: 'Liver disease has more than one number.',
    seoTitle: 'Liver Disease in Dogs — What the Numbers Mean',
    subject: 'Liver disease in dogs',
    description: 'A high ALT or ALP is a starting point, not a finding. Why the recheck matters, and what to bring to it.',
    image: '/images/conditions/liver-disease.webp',
    imageAlt: 'A dog standing beside its owner on a wooded path',
    heroDescription:
      'ALT, AST, ALP, GGT, bilirubin, creatine kinase, medications, supplements, imaging, and the timing of each change can belong to the same story. BarkLens reads the reports together and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'Liver values do not all measure the same thing. Some point toward liver-cell injury, some add context about bile flow, and some can move for reasons outside the liver. The useful history includes the original results, their ranges, the order in which they changed, and the events recorded around them.',
      'BarkLens reads each report and puts the values beside medication and supplement changes, meals, procedures, symptoms, imaging, and follow-up notes. The owner can see the sequence instead of trying to reconstruct it from separate portals and PDFs.'
    ],
    research: [
      {
        title: 'ALT and AST',
        paragraphs: [
          'Cornell eClinPath describes ALT as fairly liver-specific in dogs and cats. AST is not organ-specific and can also come from skeletal muscle, heart muscle, red blood cells, kidneys, and brain tissue. Creatine kinase can provide additional context when muscle is part of the question.'
        ]
      },
      {
        title: 'ALP, GGT, and bilirubin',
        paragraphs: [
          'ALP can rise for several reasons, including steroid exposure and normal bone growth in young dogs. GGT and bilirubin add different information about the bile system. Their sequence across time can be more informative to the veterinary conversation than a copied result without its date and range.'
        ]
      },
      {
        title: 'The height of an enzyme',
        paragraphs: [
          'The height of an enzyme result does not by itself establish the cause or severity of a condition. A veterinarian may consider bile acids, imaging, medication history, or other testing rather than reading one number alone.'
        ]
      }
    ],
    features: [
      'Upload each chemistry panel and preserve ALT, AST, ALP, GGT, bilirubin, creatine kinase, units, ranges, and dates.',
      'Put repeated draws into one view so you can see which values moved first and what happened around them.',
      'Photograph medication and supplement labels and connect their recorded start or stop dates to the laboratory timeline.',
      'Add dated notes about appetite, vomiting, stool, energy, meals, procedures, and other owner observations.',
      'Place imaging and visit notes beside the laboratory history instead of leaving them in a separate portal.',
      'Ask what published veterinary sources say about the combination appearing in your dog’s record.'
    ],
    exampleQuestion:
      'Charlie’s ALP rose after a medication change while ALT and bilirubin followed different paths. What do the cited sources say veterinarians commonly consider when reading these values together?',
    exampleBoundary:
      'The answer should point to the records and timing that prompted the question. It must not name the cause, determine severity, or propose treatment.',
    questions: [
      'Which result is most useful in my dog’s case?',
      'How have ALT, AST, ALP, GGT, bilirubin, and creatine kinase moved across the same period?',
      'Did any medication, supplement, illness, meal change, or procedure occur near the change?',
      'Could muscle, age, medication, or another condition add context?',
      'Does the timing of the values change the veterinary conversation?',
      'What test or record would answer the next question?'
    ],
    sharing: [
      'Send the liver timeline before a specialist visit or export the reports for a second clinic.',
      'The recipient can see the original panels, medication and supplement labels, imaging history, and the owner’s dated observations in one continuous record.'
    ],
    sources: [
      { label: 'Cornell eClinPath, ALT', url: 'https://eclinpath.com/chemistry/liver/liver-injury/alanine-aminotransferase/' },
      { label: 'Cornell eClinPath, AST', url: 'https://eclinpath.com/chemistry/liver/liver-injury/aspartate-aminotransferase/' },
      { label: 'Cornell eClinPath, creatine kinase', url: 'https://eclinpath.com/chemistry/muscle/creatine-kinase/' },
      { label: 'Cornell eClinPath, bilirubin', url: 'https://eclinpath.com/chemistry/liver/cholestasis/bilirubin/' }
    ],
  },
  {
    slug: 'pancreatitis',
    title: 'A pancreatitis flare has a before, during, and after.',
    seoTitle: 'Pancreatitis in Dogs — What the Numbers Mean',
    subject: 'Pancreatitis in dogs',
    description: 'There’s no agreed definition of a high-fat diet. What to photograph, what to record, and what to ask your vet.',
    image: '/images/conditions/pancreatitis.webp',
    imageAlt: 'A dog resting beside its owner on a sofa',
    heroDescription:
      'The laboratory results are one part of the history. Meals, treats, food labels, medications, vomiting, appetite, stool, hydration, imaging, and previous episodes may sit on different dates and in different places. BarkLens connects those records and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'Pancreatitis is not explained by one result alone. The physical examination, history, pancreatic lipase, other laboratory results, and sometimes imaging are read together by the veterinarian.',
      'BarkLens gives the owner one continuous view of what was eaten, what was given, what changed at home, what the laboratory reported, and how the current episode compares with earlier ones.'
    ],
    research: [
      {
        title: 'Pancreatic and related laboratory values',
        paragraphs: [
          'Amylase and total lipase can move for reasons other than pancreatitis. Specific canine pancreatic lipase is more specific to the pancreas and is commonly considered beside the rest of the clinical picture. Liver enzymes, glucose, triglycerides, hydration, and timing may add context.'
        ]
      },
      {
        title: 'Food and fasting history',
        paragraphs: [
          'There is no single agreed definition of a high-fat diet that applies to every dog. Record the exact food or treat rather than labeling it “high fat” yourself. Cornell eClinPath explains that fat in a blood sample can interfere with several measurements and recommends fasting before scheduled blood sampling when the veterinarian instructs it.'
        ]
      },
      {
        title: 'Previous episodes',
        paragraphs: [
          'Merck notes that chronic pancreatitis can affect both exocrine and endocrine pancreatic function. Previous episodes, digestion, glucose, food changes, and the veterinary plan should remain part of the same history.'
        ]
      }
    ],
    features: [
      'Photograph food, treat, medication, and supplement labels so the printed ingredients and nutrition information stay with the episode.',
      'Upload pancreatic lipase results, chemistry panels, imaging, discharge instructions, and visit notes.',
      'Add owner-confirmed notes about meals, vomiting, appetite, stool, energy, discomfort, and hydration.',
      'Place the hours and days before the flare beside the laboratory and visit timeline.',
      'Compare the current episode with previous episodes without claiming they have the same cause.',
      'Ask what published veterinary sources say about the tests, food records, and timing shown in your dog’s chart.'
    ],
    exampleQuestion:
      'Charlie had a food change before this episode, and his pancreatic lipase and liver values were recorded two days later. What do the cited sources say veterinarians commonly consider when reviewing this history?',
    exampleBoundary:
      'The answer should explain the relevant records and source material. It must not identify the cause of the episode or recommend a diet or treatment.',
    questions: [
      'Which test is most useful in my dog’s case?',
      'What was recorded in the days before this episode?',
      'Could eating before the blood draw affect this sample?',
      'Which exact foods, treats, medications, or supplements should I bring to the conversation?',
      'How does this episode compare with the previous history?',
      'What does my veterinarian want recorded during recovery?'
    ],
    sharing: [
      'Share the episode history with an emergency clinic, specialist, sitter, or family member.',
      'Current medications, food labels, recent results, discharge instructions, and owner-confirmed observations can travel with the dog instead of remaining in separate messages and portals.'
    ],
    sources: [
      { label: 'Cornell eClinPath, triglycerides', url: 'https://eclinpath.com/chemistry/energy-metabolism/triglycerides/' },
      { label: 'Merck Veterinary Manual, pancreatitis', url: 'https://www.merckvetmanual.com/digestive-system/the-exocrine-pancreas/pancreatitis-in-dogs-and-cats' },
      { label: 'Merck Veterinary Manual, diabetes mellitus', url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats' }
    ],
  },
  {
    slug: 'cushings-disease',
    title: 'Cushing’s has a name. Your dog still has their own history.',
    seoTitle: 'Cushing’s Disease in Dogs — What the Numbers Mean',
    subject: 'Cushing’s disease in dogs',
    description: 'A high ALP alone isn’t Cushing’s — and steroid drops can invalidate the test. What to track, and when to test.',
    image: '/images/conditions/cushings-disease.webp',
    mobileImage: '/images/conditions/mobile/cushings-disease.webp',
    imageAlt: 'A black-and-white close-up of a resting dog’s nose and face',
    heroDescription:
      'The diagnosis does not replace the timeline that led to it or the record that follows. BarkLens reads laboratory results, dedicated testing, medications, water intake, urination, appetite, panting, skin, coat, weight, and other conditions together, then explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'Many owners first hear “Cushing’s” after a routine panel shows a high ALP. A raised ALP can be part of the history, but it is not the whole history. Dedicated testing, medications, other illnesses, and owner observations provide additional context.',
      'After diagnosis, BarkLens keeps the testing history connected to subsequent laboratory results, medication labels, veterinarian-provided instructions, and what the owner records at home. This makes it easier to ask about change without asking the app to make a clinical judgment.'
    ],
    research: [
      {
        title: 'The routine panel',
        paragraphs: [
          'ALP can be raised in dogs with Cushing’s, but it can also move with steroid exposure, growth, and other conditions. Glucose and urine results may also be part of the surrounding record.'
        ]
      },
      {
        title: 'Dedicated testing',
        paragraphs: [
          'An ACTH stimulation test measures the adrenal response to a stimulating hormone. A low-dose dexamethasone suppression test measures whether cortisol suppresses as expected. AAHA describes the urine cortisol-to-creatinine ratio as sensitive but nonspecific: a negative result may help rule the condition out, while a positive result does not confirm it.'
        ]
      },
      {
        title: 'Timing, medication, and other conditions',
        paragraphs: [
          'AAHA recommends trying to stabilize or resolve known related conditions before pursuing Cushing’s testing when possible. Recent steroid exposure and other illnesses can change the testing conversation. Keep the reason for a test, the timing, the result, and the next veterinary step together.'
        ]
      }
    ],
    features: [
      'Upload routine panels, ACTH stimulation results, suppression-test results, urine results, imaging, and visit notes.',
      'See ALP, glucose, urine findings, weight, and other repeated results across time.',
      'Photograph medication labels and preserve veterinarian-provided schedules without BarkLens changing them.',
      'Add owner-confirmed notes about water intake, urination, appetite, panting, skin, coat, sleep, and energy.',
      'Connect a test or result to recent steroid medications and other conditions recorded in the chart.',
      'Ask what the published sources say about the combination and timing appearing in your dog’s history.'
    ],
    exampleQuestion:
      'Charlie’s water intake and panting changed after a medication adjustment, and his next laboratory results are now in the chart. What do the cited sources say veterinarians commonly consider when reviewing these records together?',
    exampleBoundary:
      'The answer should explain the recorded timing and relevant source material. It must not assess whether the medication is working, change a dose, or determine the next test.',
    questions: [
      'Which results and observations matter most in my dog’s case?',
      'How have water intake, appetite, panting, weight, glucose, urine results, and ALP changed across the same period?',
      'Could a current or recent steroid medication affect this result or test?',
      'How do my dog’s other diagnosed conditions affect the veterinary conversation?',
      'What should everyone in the household record consistently?',
      'What test or recheck is already part of the veterinarian’s plan?'
    ],
    sharing: [
      'Give a specialist or new clinic access to the original testing history, current medication list, repeated laboratory results, and dated observations.',
      'A partner or sitter can use the same Care Circle record to confirm what they observed or whether a prescribed medication event occurred.'
    ],
    sources: [
      { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/' },
      { label: 'Cornell eClinPath, glucose', url: 'https://eclinpath.com/chemistry/energy-metabolism/glucose/' },
      { label: 'Merck Veterinary Manual, Cushing disease', url: 'https://www.merckvetmanual.com/endocrine-system/the-pituitary-gland/cushing-disease-pituitary-dependent-hyperadrenocorticism-in-animals' }
    ],
  },
  {
    slug: 'diabetes',
    title: 'Diabetes happens across the whole day. The history should, too.',
    seoTitle: 'Diabetes in Dogs — What the Numbers Mean',
    subject: 'Diabetes in dogs',
    description: 'Water, weight, appetite, and every dose — the log your vet reads first. What to record, and what to ask.',
    image: '/images/conditions/diabetes.webp',
    mobileImage: '/images/conditions/mobile/diabetes.webp',
    imageAlt: 'A dog together with its owner',
    heroDescription:
      'Meals, prescribed insulin events, glucose results, fructosamine, urine results, water intake, weight, appetite, energy, and the people providing care all belong to the same record. BarkLens connects that human-confirmed history and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      '“Did someone already give the dose?” is exactly the kind of question a shared daily record should answer. The record must reflect what a person confirmed, not what an app assumed.',
      'BarkLens connects meals, veterinarian-prescribed medication events, daily observations, glucose curves, laboratory results, and appointment notes. It never originates or changes a dose or schedule.'
    ],
    research: [
      {
        title: 'Blood glucose and urine glucose',
        paragraphs: [
          'Blood glucose is a snapshot and can rise with stress. Merck describes diagnosis as requiring persistent high blood glucose and glucose in the urine, not one reading.'
        ]
      },
      {
        title: 'Fructosamine',
        paragraphs: [
          'Fructosamine reflects average glucose over roughly the previous two to three weeks. Albumin can affect how a fructosamine result is read.'
        ]
      },
      {
        title: 'The owner record',
        paragraphs: [
          'Blood glucose, fructosamine, urine glucose, albumin, weight, water intake, meals, prescribed medication events, and owner observations often occur on different dates. AAHA diabetes guidance begins with information from the owner’s log because the daily history provides context that a single appointment cannot.'
        ]
      }
    ],
    features: [
      'Upload glucose curves, fructosamine, urine results, chemistry panels, and appointment notes.',
      'Photograph the medication label and preserve the veterinarian-provided instructions exactly as printed or entered.',
      'Record each medication event only after a person confirms it occurred.',
      'Record meal time, what was eaten, water intake, appetite, weight, energy, and other observations.',
      'Let Sarah, Mark, or another invited Care Circle member contribute to the same human-confirmed daily record.',
      'Compare laboratory results with the meals, medication events, and observations recorded around them.',
      'Ask a question based on your dog’s complete diabetes history and trace the answer to published sources.'
    ],
    exampleQuestion:
      'Charlie’s meals and prescribed medication events stayed consistent, but his water intake, weight, and fructosamine changed across this period. What do the cited sources say veterinarians commonly consider together?',
    exampleBoundary:
      'The answer should point to the records and explain the source material. It must not assess control, alter insulin, establish a target, or recommend a dose.',
    questions: [
      'What should everyone in the household confirm in the daily record?',
      'Which result shows one moment and which reflects a longer period?',
      'How do meals, prescribed medication events, water intake, weight, and laboratory results line up across time?',
      'Could another illness or medication add context to these values?',
      'What does my veterinarian want recorded before the next curve or appointment?',
      'What should prompt us to contact the clinic?'
    ],
    sharing: [
      'Share the current prescribed instructions, recent medication events, meals, glucose records, laboratory history, and emergency contacts with another caregiver or clinic.',
      'Anyone entering information must confirm what actually happened.'
    ],
    sources: [
      { label: '2018 AAHA diabetes guidelines', url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/protocols/' },
      { label: 'Merck Veterinary Manual, diabetes mellitus', url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats' },
      { label: 'Cornell eClinPath, fructosamine', url: 'https://eclinpath.com/chemistry/energy-metabolism/fructosamine/' },
      { label: 'Cornell eClinPath, urinalysis', url: 'https://eclinpath.com/urinalysis/chemical-constituents/' }
    ],
    urgent: 'If you believe your dog may be experiencing a medical emergency, do not wait for BarkLens. Contact a veterinarian or emergency clinic now.'
  },
  {
    slug: 'thyroid',
    title: 'The thyroid result needs the timing around it.',
    seoTitle: 'Thyroid Disease in Dogs — What the Numbers Mean',
    subject: 'Thyroid disease in dogs',
    description: 'A post-pill T4 only means something if you know the dose time. What to log before the recheck, and what to ask.',
    image: '/images/conditions/thyroid.webp',
    imageAlt: 'A senior dog looking toward its owner in warm window light',
    heroDescription:
      'Total T4, free T4, TSH, medication timing, the time of the blood draw, weight, coat, skin, energy, and other illnesses may all belong to the same conversation. BarkLens connects those records and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'A thyroid diagnosis begins an ongoing record. A laboratory value without the draw time, medication history, and surrounding observations can leave out the context the veterinarian needs.',
      'BarkLens reads thyroid reports, preserves the original ranges and dates, and places them beside the veterinarian-provided medication instructions, owner-confirmed medication events, weight, coat photos, and dated observations.'
    ],
    research: [
      {
        title: 'Total T4, free T4, and TSH',
        paragraphs: [
          'Total T4 is often the first thyroid test run and can be lowered by age, breed, medication, illness, or stress. Free T4 measures the unbound portion. TSH is the signal from the pituitary asking the thyroid to work. AAHA guidance says an isolated low total T4 should not be the only criterion used to diagnose hypothyroidism.'
        ]
      },
      {
        title: 'Medication and draw timing',
        paragraphs: [
          'The timing of thyroid medication and the blood draw can affect how a post-pill result is read. Preserve the veterinarian’s instructions, the owner-confirmed medication time, and the draw time together.'
        ]
      },
      {
        title: 'The observations around the result',
        paragraphs: [
          'Weight, energy, coat and skin changes, temperature-seeking behavior, recurrent skin or ear problems, cholesterol, red blood cell results, other illnesses, and some medications may belong in the same veterinary conversation.'
        ]
      }
    ],
    features: [
      'Upload total T4, free T4, TSH, chemistry, and blood-count reports with their original ranges.',
      'Photograph the medication label and preserve the veterinarian-provided instructions.',
      'Confirm medication and blood-draw times so the result retains its timing.',
      'Add weight, coat photos, skin changes, energy, sleep, and temperature-seeking observations with dates.',
      'Compare thyroid values across repeated draws and place them beside medication timing and other conditions.',
      'Ask what the published sources say about the combination recorded in your dog’s chart.'
    ],
    exampleQuestion:
      'Charlie’s post-pill T4 was drawn at a different interval than his previous result, and his weight and coat notes changed during the same period. What context do the cited sources say veterinarians commonly consider?',
    exampleBoundary:
      'The answer should explain the recorded timing and source material. It must not judge whether the dose is correct or propose a medication change.',
    questions: [
      'Were total T4, free T4, and TSH all measured?',
      'What time was the prescribed medication confirmed, and what time was the blood drawn?',
      'Could age, breed, illness, stress, or another medication add context to this result?',
      'How have weight, coat, skin, energy, cholesterol, and red blood cell results changed across the same period?',
      'What does my veterinarian want recorded before the next draw?',
      'Does the next test require specific timing instructions?'
    ],
    sharing: [
      'Share the thyroid timeline with a new veterinarian, specialist, family member, or sitter.',
      'They can see the current label, veterinarian-provided instructions, recent laboratory results, weight history, and dated coat or energy observations without starting from zero.'
    ],
    sources: [
      { label: 'Cornell Riney Canine Health Center, hypothyroidism', url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/hypothyroidism' },
      { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/' },
      { label: 'Cornell Animal Health Diagnostic Center, thyroid testing', url: 'https://www.vet.cornell.edu/animal-health-diagnostic-center/testing/testing-protocols-interpretations/thyroid-testing-interpretation' },
      { label: 'Cornell eClinPath, cholesterol', url: 'https://eclinpath.com/chemistry/energy-metabolism/cholesterol/' }
    ],
  },
  {
    slug: 'heart-disease',
    title: 'Heart disease lives across more than one record.',
    seoTitle: 'Heart Disease in Dogs — What the Numbers Mean',
    subject: 'Heart disease in dogs',
    description: 'A murmur is a sound, not a sentence. How to count your dog’s sleeping breathing rate, the number cardiologists use.',
    image: '/images/conditions/heart-disease.webp',
    mobileImage: '/images/conditions/mobile/heart-disease.webp',
    imageAlt: 'A dog together with their owner',
    heroDescription:
      'The murmur date, stage, imaging, rhythm testing, medications, kidney values, electrolytes, blood pressure, weight, breathing records, and what you notice at home may all tell different parts of the history. BarkLens connects them and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'Bloodwork cannot show a murmur, valve shape, chamber size, or heart rhythm. A normal blood panel can exist beside meaningful heart disease because listening, imaging, electrical recordings, laboratory work, and owner observations answer different questions.',
      'BarkLens connects imaging history, medication labels, laboratory results, breathing records, weight, and dated owner observations. That history remains available across routine visits, specialist appointments, and urgent care.'
    ],
    research: [
      {
        title: 'Stage and imaging history',
        paragraphs: [
          'ACVIM guidance separates dogs at risk from dogs with structural disease and dogs with signs of heart failure. The date a murmur was first heard, the stage recorded by the veterinarian, and what the most recent imaging showed should remain connected.'
        ]
      },
      {
        title: 'Laboratory context',
        paragraphs: [
          'NT-proBNP is released when heart muscle is stretched. Cardiac troponin I can rise with heart muscle injury. Kidney values and electrolytes may matter because some heart medications can affect them.'
        ]
      },
      {
        title: 'What owners are asked to record',
        paragraphs: [
          'A veterinarian may ask for sleeping respiratory rate, exercise tolerance, coughing, weight, appetite, or details around a fainting episode. The owner records the observation. BarkLens places it beside imaging, medication, and laboratory history.'
        ]
      }
    ],
    features: [
      'Upload imaging reports, ECG notes, laboratory panels, blood-pressure records, and appointment summaries.',
      'Photograph medication labels and preserve start dates and veterinarian-provided instructions.',
      'Record sleeping-breath counts only according to the veterinarian’s instructions, with date and time.',
      'Add owner-confirmed notes about coughing, exercise, fainting, appetite, sleep, and weight.',
      'See kidney values and electrolytes beside the medication and imaging history.',
      'Ask what published veterinary sources say about the records and changes shown in your dog’s chart.'
    ],
    exampleQuestion:
      'Charlie’s veterinarian recorded a new stage, changed a medication, and requested sleeping-breath counts. What do the cited sources say veterinarians commonly consider alongside these records?',
    exampleBoundary:
      'The answer should point to the relevant history and sources. It must not assign a stage, establish a breathing threshold, assess urgency, or change medication.',
    questions: [
      'What stage has my veterinarian recorded for my dog?',
      'What does the most recent imaging show compared with the previous report?',
      'What should I count or write down at home, and exactly how does my veterinarian want it recorded?',
      'Which medication changes belong beside kidney values, electrolytes, and blood pressure?',
      'How have weight, breathing records, coughing, exercise, and appetite changed across the same period?',
      'What would make my veterinarian want to see my dog sooner?'
    ],
    sharing: [
      'Open the QR code at an emergency clinic or send the share link before a cardiology visit.',
      'Current medications, recent imaging, laboratory history, sleeping-breath records, and emergency contacts can arrive with the dog.'
    ],
    sources: [
      { label: 'ACVIM consensus guidelines for MMVD', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6524084/' },
      { label: 'Merck Veterinary Manual, heart failure in dogs', url: 'https://www.merckvetmanual.com/dog-owners/heart-and-blood-vessel-disorders-of-dogs/heart-failure-in-dogs' },
      { label: 'Salix label, DailyMed', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9ad8eb8a-7c65-4746-9c03-1d6136b5892c' }
    ],
    urgent: 'If you believe your dog is having a breathing or other medical emergency, contact a veterinarian or emergency clinic now.'
  },
  {
    slug: 'arthritis',
    title: 'Arthritis shows up in ordinary moments.',
    seoTitle: 'Arthritis in Dogs — What the Numbers Mean',
    subject: 'Arthritis in dogs',
    description: 'Stiff mornings are data. The mobility score vets use, plus the bloodwork nobody remembers to schedule.',
    image: '/images/conditions/arthritis.webp',
    mobileImage: '/images/conditions/mobile/arthritis.webp',
    imageAlt: 'A black-and-white dog outdoors',
    heroDescription:
      'The difficulty rising, the hesitation before a stair, the shorter walk, the medication change, the weight record, and the kidney or liver panel may happen weeks apart. BarkLens connects those moments and explains what published veterinary sources say veterinarians commonly consider.',
    opening: [
      'There is no blood test for arthritis. What the owner sees at home, the physical examination, imaging, weight, medication history, and the dog’s response over time contribute different parts of the record.',
      'BarkLens puts short dated videos and observations beside medication and supplement labels, weight, body-condition records, imaging, and laboratory results. That makes gradual change easier to show than a memory reconstructed in the exam room.'
    ],
    research: [
      {
        title: 'Movement and owner observations',
        paragraphs: [
          'Stiffness after rest, hesitation on stairs or jumping, slower walks, difficulty rising, licking at a joint, changes in sleeping position, and reluctance on slick floors are useful when dated and recorded consistently.'
        ]
      },
      {
        title: 'Several parts of care',
        paragraphs: [
          'Canine osteoarthritis care can include medication, weight, activity, rehabilitation, environmental changes, and sometimes supplements. Each part produces records and observations that may belong in the same veterinary conversation.'
        ]
      },
      {
        title: 'Laboratory work',
        paragraphs: [
          'Bloodwork does not diagnose arthritis. Veterinarians may use kidney and liver values before and during some pain medications or to investigate other conditions. Keep the medication label, laboratory report, date, and veterinarian-provided plan connected.'
        ]
      }
    ],
    features: [
      'Capture short videos of rising, stairs, walking, getting into the car, or another movement your veterinarian asks to see.',
      'Add dated notes about stiffness, pace, activity, sleep, and hesitation.',
      'Photograph medication and supplement labels and preserve veterinarian-provided instructions.',
      'Place kidney and liver panels beside the medication history.',
      'Compare weight, body-condition records, movement videos, and owner observations across time.',
      'Let a partner, sitter, or family member add what they observed to the same human-confirmed record.',
      'Ask what published veterinary sources say about the combination shown in your dog’s history.'
    ],
    exampleQuestion:
      'Charlie’s morning stiffness and hesitation on stairs increased after his activity changed, while his weight, medication, and laboratory records are shown here. What do the cited sources say veterinarians commonly consider together?',
    exampleBoundary:
      'The answer should explain the relevant records and sources. It must not score pain, assess severity, select treatment, or state whether a medication is safe.',
    questions: [
      'Which movements are most useful for me to film consistently?',
      'How have rising, stairs, walking pace, activity, sleep, and weight changed across time?',
      'Which medication and supplement labels should be part of the record?',
      'What kidney or liver laboratory work belongs with the veterinarian’s medication plan?',
      'What should every Care Circle member record in the same way?',
      'What change should prompt me to contact the clinic earlier?'
    ],
    sharing: [
      'Share the movement history before an appointment or specialist visit.',
      'The recipient can see the videos, dates, current medications, supplements, weight history, and related laboratory work instead of relying on a description of one unusually good or bad day.'
    ],
    sources: [
      { label: 'Merck Veterinary Manual, osteoarthritis', url: 'https://www.merckvetmanual.com/musculoskeletal-system/osteoarthritis-in-dogs-and-cats/osteoarthritis-in-dogs-and-cats' },
      { label: '2022 AAHA pain management guidelines', url: 'https://www.aaha.org/wp-content/uploads/2022/02/2022-aaha-pain-management-guidelines-for-dog-and-cats_updated_060622.pdf' },
      { label: 'COAST consensus recommendations', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10436090/' },
      { label: 'Merck, when to see a veterinarian', url: 'https://www.merckvetmanual.com/multimedia/table/when-to-see-a-veterinarian' }
    ],
  }
];

export const conditionBySlug = new Map(conditionPages.map((page) => [page.slug, page]));
