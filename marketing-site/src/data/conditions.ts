export interface ConditionSource {
  label: string;
  url: string;
}

export interface ConditionSection {
  title: string;
  paragraphs: string[];
  source?: ConditionSource;
}

export interface ConditionPageData {
  slug: string;
  title: string;
  seoTitle: string;
  subject: string;
  description: string;
  image: string;
  imageAlt: string;
  intro: string[];
  sections: ConditionSection[];
  instrumentTitle: string;
  instrumentIntro: string;
  instrumentItems: string[];
  questions: string[];
  sources: ConditionSource[];
  urgent?: string;
}

export const conditionPages: ConditionPageData[] = [
  {
    slug: 'kidney-disease',
    title: 'Kidney values in dogs',
    seoTitle: 'Kidney Disease in Dogs — What the Numbers Mean',
    subject: 'Kidney disease in dogs',
    description: 'A high creatinine isn’t a diagnosis — staging needs two draws. What to track at home, and what to ask your vet.',
    image: '/images/conditions/kidney-disease.webp',
    imageAlt: 'A dog standing beside its owner on a foggy coastal overlook',
    intro: [
      'Your veterinarian mentioned your dog’s kidney numbers, or you are holding a panel with BUN and creatinine on it. These values are usually read together and alongside urine, not one at a time.',
      'BarkLens keeps each result with the range printed on its original report and places repeated draws into one history.'
    ],
    sections: [
      {
        title: 'What the markers measure',
        paragraphs: [
          'BUN is a waste product the kidneys help clear. It can also move with hydration, diet, and gastrointestinal bleeding, so one result has limited context.',
          'Creatinine is more specific to filtration but is affected by muscle mass. SDMA is less affected by muscle mass. Urine specific gravity shows how concentrated the urine is.'
        ]
      },
      {
        title: 'Why urine changes the conversation',
        paragraphs: [
          'Raised waste products mean something different when urine is concentrated than when urine is dilute. This is why a veterinarian may ask for a urine sample beside the blood panel.'
        ],
        source: { label: 'Cornell eClinPath, concentrating ability', url: 'https://eclinpath.com/urinalysis/concentrating-ability/' }
      },
      {
        title: 'What is read together',
        paragraphs: [
          'IRIS guidance stages chronic kidney disease using fasting creatinine, fasting SDMA, or preferably both, then adds protein in the urine and blood pressure.',
          'Phosphorus, calcium, potassium, red blood cells, medications, hydration, and the dates of each result can add context to the same conversation.'
        ],
        source: { label: 'IRIS staging guidelines', url: 'https://www.iris-kidney.com/s/IRIS_staging_guidelines-2026.pdf' }
      }
    ],
    instrumentTitle: 'Build the kidney conversation',
    instrumentIntro: 'Put these four parts together before the next appointment.',
    instrumentItems: ['The latest BUN, creatinine, and SDMA results', 'Urine concentration and urine protein results', 'Blood-pressure readings and medication changes', 'Questions about what changed between draws'],
    questions: ['Which value matters most in my dog’s case?', 'Is a urine sample or blood-pressure reading missing?', 'Could hydration, diet, muscle mass, or medication affect this result?', 'When should these values be repeated?'],
    sources: [
      { label: 'Merck Veterinary Manual, renal dysfunction', url: 'https://www.merckvetmanual.com/urinary-system/noninfectious-diseases-of-the-urinary-system-in-small-animals/renal-dysfunction-in-dogs-and-cats' },
      { label: 'Cornell eClinPath, concentrating ability', url: 'https://eclinpath.com/urinalysis/concentrating-ability/' },
      { label: 'IRIS staging guidelines', url: 'https://www.iris-kidney.com/s/IRIS_staging_guidelines-2026.pdf' },
      { label: 'ACVIM consensus statement', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6271319/' }
    ]
  },
  {
    slug: 'heart-disease',
    title: 'Heart disease in dogs',
    seoTitle: 'Heart Disease in Dogs — What the Numbers Mean',
    subject: 'Heart disease in dogs',
    description: 'A murmur is a sound, not a sentence. How to count your dog’s sleeping breathing rate, the number cardiologists use.',
    image: '/images/conditions/heart-disease.webp',
    imageAlt: 'A senior dog resting beside its owner outdoors',
    intro: [
      'Bloodwork cannot show a murmur, valve shape, chamber size, or heart rhythm. A normal blood panel can exist beside meaningful heart disease because listening, imaging, and electrical recordings answer different questions.',
      'BarkLens keeps the imaging history, medication list, laboratory results, and owner observations in one record.'
    ],
    sections: [
      {
        title: 'What blood tests can show',
        paragraphs: [
          'NT-proBNP is released when heart muscle is stretched. Cardiac troponin I can rise with heart muscle injury. Kidney values and electrolytes also matter because heart medications can affect them.'
        ]
      },
      {
        title: 'Why heart disease is described in stages',
        paragraphs: [
          'ACVIM guidance separates dogs at risk from dogs with structural disease and from dogs with signs of heart failure. The date a murmur was first heard and what the most recent imaging showed help preserve that history.',
          'A recommendation to watch and repeat testing can be a plan rather than inaction. Keep the stage, imaging date, and next scheduled check together.'
        ],
        source: { label: 'ACVIM consensus guidelines for MMVD', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6524084/' }
      },
      {
        title: 'What owners are often asked to record',
        paragraphs: [
          'A veterinarian may ask for sleeping respiratory rate, exercise tolerance, coughing, or details around a fainting episode. The owner records the observation; BarkLens keeps it beside the chart.'
        ]
      }
    ],
    instrumentTitle: 'Create a heart-history log',
    instrumentIntro: 'Use the number or instructions your veterinarian gives you, not a number invented by the app.',
    instrumentItems: ['Sleeping-breath counts with date and time', 'Coughing, exercise, or fainting observations', 'Medication starts, stops, and label instructions', 'Imaging reports, kidney values, electrolytes, and blood pressure'],
    questions: ['What stage is recorded for my dog?', 'What should I count or write down at home?', 'Which medication changes require laboratory follow-up?', 'What would make you want to see my dog sooner?'],
    sources: [
      { label: 'ACVIM consensus guidelines for MMVD', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6524084/' },
      { label: 'Merck Veterinary Manual, heart failure in dogs', url: 'https://www.merckvetmanual.com/dog-owners/heart-and-blood-vessel-disorders-of-dogs/heart-failure-in-dogs' },
      { label: 'Salix label, DailyMed', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9ad8eb8a-7c65-4746-9c03-1d6136b5892c' }
    ],
    urgent: 'If you believe your dog is having a breathing or other medical emergency, contact a veterinarian or emergency clinic now.'
  },
  {
    slug: 'diabetes',
    title: 'Diabetes in dogs',
    seoTitle: 'Diabetes in Dogs — What the Numbers Mean',
    subject: 'Diabetes in dogs',
    description: 'Water, weight, appetite, and every dose — the log your vet reads first. What to record, and what to ask.',
    image: '/images/conditions/diabetes.webp',
    imageAlt: 'A dog resting on a blanket while its owner keeps notes nearby',
    intro: [
      '“Did someone already give the dose?” is exactly the kind of question a shared daily record should answer. Diabetes is a condition where the owner log matters beside the laboratory numbers.',
      'BarkLens keeps the human-confirmed record. It does not originate or change a dose or schedule.'
    ],
    sections: [
      {
        title: 'What the markers measure',
        paragraphs: [
          'Blood glucose is a snapshot and can rise with stress. Merck describes diagnosis as requiring persistent high blood glucose and glucose in the urine, not one reading.',
          'Fructosamine reflects average glucose over roughly the previous two to three weeks. Albumin can affect how a fructosamine result is read.'
        ],
        source: { label: 'Merck Veterinary Manual, diabetes mellitus', url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats' }
      },
      {
        title: 'What is read together',
        paragraphs: [
          'Blood glucose, fructosamine, urine glucose, albumin, weight, water intake, meals, and the owner’s observations often sit on different records and different dates.',
          'Putting them into one timeline makes it easier to show the veterinarian what happened before and after a change.'
        ],
        source: { label: 'Cornell eClinPath, urinalysis', url: 'https://eclinpath.com/urinalysis/chemical-constituents/' }
      },
      {
        title: 'The daily record',
        paragraphs: [
          'The record should reflect what a person confirmed: the meal, the prescribed medication event, who logged it, and what the owner noticed. BarkLens suggests organization; the owner confirms what occurred.'
        ]
      }
    ],
    instrumentTitle: 'Use one shared diabetes log',
    instrumentIntro: 'Keep the prescribed plan, meals, confirmed medication events, and observations in one place.',
    instrumentItems: ['Meal time and what was eaten', 'Medication event exactly as prescribed and confirmed by a person', 'Water intake, weight, energy, and other observations', 'Glucose curves, fructosamine, urine results, and appointment notes'],
    questions: ['What should everyone in the household record?', 'Which result shows one moment and which reflects a longer period?', 'Could another illness or medication affect these values?', 'What should prompt us to contact the clinic?'],
    sources: [
      { label: '2018 AAHA diabetes guidelines', url: 'https://www.aaha.org/resources/2018-aaha-diabetes-management-guideline-for-dogs-and-cats/protocols/' },
      { label: 'Merck Veterinary Manual, diabetes mellitus', url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats' },
      { label: 'Cornell eClinPath, fructosamine', url: 'https://eclinpath.com/chemistry/energy-metabolism/fructosamine/' },
      { label: 'Cornell eClinPath, urinalysis', url: 'https://eclinpath.com/urinalysis/chemical-constituents/' }
    ],
    urgent: 'Do not wait for BarkLens in an emergency. Contact a veterinarian or emergency clinic now.'
  },
  {
    slug: 'liver-disease',
    title: 'Liver enzymes in dogs',
    seoTitle: 'Liver Disease in Dogs — What the Numbers Mean',
    subject: 'Liver disease in dogs',
    description: 'A high ALT or ALP is a starting point, not a finding. Why the recheck matters, and what to bring to it.',
    image: '/images/conditions/liver-disease.webp',
    imageAlt: 'A dog standing beside its owner on a wooded path',
    intro: [
      'A routine panel can contain several values connected to the liver, but they do not all measure the same thing. Two point toward liver cells, while others provide context about bile flow.',
      'BarkLens keeps each value with its report, reference range, date, and the medication history around it.'
    ],
    sections: [
      {
        title: 'Liver cells: ALT and AST',
        paragraphs: [
          'Cornell eClinPath describes ALT as fairly liver-specific in dogs and cats. AST is not organ-specific and can also come from skeletal muscle, heart muscle, red blood cells, kidneys, and brain tissue.',
          'When AST and creatine kinase move on different timelines, their timing can add context that one isolated result cannot show.'
        ],
        source: { label: 'Cornell eClinPath, ALT', url: 'https://eclinpath.com/chemistry/liver/liver-injury/alanine-aminotransferase/' }
      },
      {
        title: 'The bile system: ALP, GGT, and bilirubin',
        paragraphs: [
          'ALP can rise for several reasons, including steroid exposure and normal bone growth in young dogs. GGT and bilirubin add different information about the bile system.',
          'The order in which these values move can matter, which is why the timeline and the original report belong together.'
        ],
        source: { label: 'Cornell eClinPath, bilirubin', url: 'https://eclinpath.com/chemistry/liver/cholestasis/bilirubin/' }
      },
      {
        title: 'What enzyme height does and does not show',
        paragraphs: [
          'The height of an enzyme result does not by itself establish the cause or the severity of a condition. A veterinarian may add bile acids, imaging, or other testing rather than simply repeating the same panel.'
        ]
      }
    ],
    instrumentTitle: 'Build the liver timeline',
    instrumentIntro: 'Keep the values and the events around them in date order.',
    instrumentItems: ['ALT, AST, ALP, GGT, and bilirubin with original ranges', 'Creatine kinase when it was measured', 'Medication and supplement starts or stops', 'Symptoms, meals, procedures, and follow-up imaging'],
    questions: ['Which result is most useful in this situation?', 'Could muscle, medication, age, or another condition affect it?', 'Does the timing of the values change the picture?', 'What test would answer the next question?'],
    sources: [
      { label: 'Cornell eClinPath, ALT', url: 'https://eclinpath.com/chemistry/liver/liver-injury/alanine-aminotransferase/' },
      { label: 'Cornell eClinPath, AST', url: 'https://eclinpath.com/chemistry/liver/liver-injury/aspartate-aminotransferase/' },
      { label: 'Cornell eClinPath, creatine kinase', url: 'https://eclinpath.com/chemistry/muscle/creatine-kinase/' },
      { label: 'Cornell eClinPath, bilirubin', url: 'https://eclinpath.com/chemistry/liver/cholestasis/bilirubin/' }
    ]
  },
  {
    slug: 'thyroid',
    title: 'Thyroid values in dogs',
    seoTitle: 'Thyroid Disease in Dogs — What the Numbers Mean',
    subject: 'Thyroid disease in dogs',
    description: 'A post-pill T4 only means something if you know the dose time. What to log before the recheck, and what to ask.',
    image: '/images/conditions/thyroid.webp',
    imageAlt: 'A senior dog looking toward its owner in warm window light',
    intro: [
      'Dogs commonly develop hypothyroidism, where the thyroid produces too little hormone. The tests are straightforward to name, but one result rarely tells the whole story.',
      'BarkLens keeps thyroid results beside medication timing, weight, coat observations, and related conditions.'
    ],
    sections: [
      {
        title: 'What the markers measure',
        paragraphs: [
          'Total T4 is often the first thyroid test run and can be lowered by age, breed, medication, illness, or stress. Free T4 measures the unbound portion. TSH is the signal from the pituitary asking the thyroid to work.',
          'AAHA guidance says an isolated low total T4 should not be the only criterion used to diagnose hypothyroidism.'
        ],
        source: { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines' }
      },
      {
        title: 'What is read together',
        paragraphs: [
          'Total T4, free T4, and TSH are interpreted as a combination. Other illness and some medications can change thyroid results, so the chart around the test matters.',
          'Cholesterol, red blood cell results, weight, coat changes, and medication timing may belong in the same veterinary conversation.'
        ],
        source: { label: 'Cornell Animal Health Diagnostic Center, thyroid testing', url: 'https://www.vet.cornell.edu/animal-health-diagnostic-center/testing/testing-protocols-interpretations/thyroid-testing-interpretation' }
      },
      {
        title: 'What owners often notice',
        paragraphs: [
          'Weight change, energy, coat and skin changes, seeking warm places, and recurrent skin or ear problems are observations worth dating rather than trying to remember later.'
        ]
      }
    ],
    instrumentTitle: 'Build the thyroid testing timeline',
    instrumentIntro: 'Preserve the draw, medication, and observation dates together.',
    instrumentItems: ['Total T4, free T4, and TSH with original ranges', 'Medication name and veterinarian-provided timing instructions', 'Weight, coat, skin, energy, and temperature-seeking notes', 'Cholesterol and red blood cell results'],
    questions: ['Could illness, age, breed, or medication affect this result?', 'Were all three thyroid values measured?', 'Does the timing of medication and the blood draw matter?', 'What change should be recorded before the next test?'],
    sources: [
      { label: 'Cornell Riney Canine Health Center, hypothyroidism', url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/hypothyroidism' },
      { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines' },
      { label: 'Cornell Animal Health Diagnostic Center, thyroid testing', url: 'https://www.vet.cornell.edu/animal-health-diagnostic-center/testing/testing-protocols-interpretations/thyroid-testing-interpretation' },
      { label: 'Cornell eClinPath, cholesterol', url: 'https://eclinpath.com/chemistry/energy-metabolism/cholesterol/' }
    ]
  },
  {
    slug: 'pancreatitis',
    title: 'Pancreatitis in dogs',
    seoTitle: 'Pancreatitis in Dogs — What the Numbers Mean',
    subject: 'Pancreatitis in dogs',
    description: 'There’s no agreed definition of a high-fat diet. What to photograph, what to record, and what to ask your vet.',
    image: '/images/conditions/pancreatitis.webp',
    imageAlt: 'A dog resting beside its owner on a sofa',
    intro: [
      'Pancreatitis is one of the conditions where one blood result is not enough on its own. The physical exam, history, pancreatic lipase, other laboratory results, and sometimes imaging are read together.',
      'The daily record often includes meals, treats, medications, and what the owner noticed.'
    ],
    sections: [
      {
        title: 'What the markers measure',
        paragraphs: [
          'Amylase and total lipase can move for reasons other than pancreatitis. Specific canine pancreatic lipase is more specific to the pancreas and is commonly considered beside the rest of the clinical picture.',
          'Liver enzymes, glucose, triglycerides, hydration, and the timing of the blood draw can add context.'
        ]
      },
      {
        title: 'Why fasting before a blood draw matters',
        paragraphs: [
          'Cornell eClinPath explains that fat in a blood sample can interfere with several measurements and recommends fasting before scheduled blood sampling when the veterinarian instructs it.',
          'Whether your dog ate before the appointment is worth recording and mentioning.'
        ],
        source: { label: 'Cornell eClinPath, triglycerides', url: 'https://eclinpath.com/chemistry/energy-metabolism/triglycerides/' }
      },
      {
        title: 'Why the history should not reset',
        paragraphs: [
          'Merck notes that chronic pancreatitis can affect both exocrine and endocrine pancreatic function. Keeping glucose, digestion, diet, and previous episodes in one history makes the next conversation easier to prepare for.'
        ],
        source: { label: 'Merck Veterinary Manual, pancreatitis', url: 'https://www.merckvetmanual.com/digestive-system/the-exocrine-pancreas/pancreatitis-in-dogs-and-cats' }
      }
    ],
    instrumentTitle: 'Keep a food and episode log',
    instrumentIntro: 'Record what happened without asking the app to diagnose the cause.',
    instrumentItems: ['Meals, treats, and changes in food', 'Medication and supplement labels', 'Vomiting, appetite, stool, energy, and pain observations', 'Pancreatic lipase, other labs, imaging, and visit notes'],
    questions: ['Which test is most useful for my dog?', 'Could eating before the draw affect this sample?', 'What should I record about meals and treats?', 'What would make you want to repeat testing or imaging?'],
    sources: [
      { label: 'Cornell eClinPath, triglycerides', url: 'https://eclinpath.com/chemistry/energy-metabolism/triglycerides/' },
      { label: 'Merck Veterinary Manual, pancreatitis', url: 'https://www.merckvetmanual.com/digestive-system/the-exocrine-pancreas/pancreatitis-in-dogs-and-cats' },
      { label: 'Merck Veterinary Manual, diabetes mellitus', url: 'https://www.merckvetmanual.com/endocrine-system/the-pancreas/diabetes-mellitus-in-dogs-and-cats' }
    ]
  },
  {
    slug: 'arthritis',
    title: 'Arthritis in dogs',
    seoTitle: 'Arthritis in Dogs — What the Numbers Mean',
    subject: 'Arthritis in dogs',
    description: 'Stiff mornings are data. The mobility score vets use, plus the bloodwork nobody remembers to schedule.',
    image: '/images/conditions/arthritis.webp',
    imageAlt: 'A senior dog walking carefully beside its owner',
    intro: [
      'There is no blood test for arthritis. What an owner sees at home, the physical examination, imaging, and the dog’s response over time each contribute different information.',
      'Short dated notes and videos can be more useful than trying to reconstruct several months from memory.'
    ],
    sections: [
      {
        title: 'What bloodwork is for',
        paragraphs: [
          'Bloodwork does not diagnose arthritis. Veterinarians may use it to understand kidney and liver values before and during some pain medications or to investigate other conditions.',
          'Keep the medication label, laboratory report, and date together rather than relying on a copied number.'
        ]
      },
      {
        title: 'Why care has several moving parts',
        paragraphs: [
          'Canine osteoarthritis care can include medication, weight, activity, rehabilitation, environmental changes, and sometimes supplements. Each part creates observations and records worth keeping together.'
        ],
        source: { label: 'COAST consensus recommendations', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10436090/' }
      },
      {
        title: 'What owners often notice',
        paragraphs: [
          'Stiffness after rest, hesitation on stairs or jumping, slower walks, difficulty rising, licking at a joint, sleep-position changes, and reluctance on slick floors are useful when dated.'
        ]
      }
    ],
    instrumentTitle: 'Build a movement record',
    instrumentIntro: 'Use the same few observations repeatedly so change is easier to show.',
    instrumentItems: ['Short videos of rising, stairs, and walking', 'Dated notes about stiffness, pace, and activity', 'Weight and body-condition records', 'Medication, supplement, and laboratory history'],
    questions: ['What should I record between visits?', 'Which movements are most useful to film?', 'What laboratory work belongs with this medication?', 'What change should prompt an earlier appointment?'],
    sources: [
      { label: 'Merck Veterinary Manual, osteoarthritis', url: 'https://www.merckvetmanual.com/musculoskeletal-system/osteoarthritis-in-dogs-and-cats/osteoarthritis-in-dogs-and-cats' },
      { label: '2022 AAHA pain management guidelines', url: 'https://www.aaha.org/wp-content/uploads/2022/02/2022-aaha-pain-management-guidelines-for-dog-and-cats_updated_060622.pdf' },
      { label: 'COAST consensus recommendations', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10436090/' },
      { label: 'Merck, when to see a veterinarian', url: 'https://www.merckvetmanual.com/multimedia/table/when-to-see-a-veterinarian' }
    ]
  },
  {
    slug: 'cushings-disease',
    title: 'Cushing’s disease in dogs',
    seoTitle: 'Cushing’s Disease in Dogs — What the Numbers Mean',
    subject: 'Cushing’s disease in dogs',
    description: 'A high ALP alone isn’t Cushing’s — and steroid drops can invalidate the test. What to track, and when to test.',
    image: '/images/conditions/cushings-disease.webp',
    imageAlt: 'A senior dog standing beside its owner in a quiet field',
    intro: [
      'Many owners arrive here because a routine panel showed a high ALP and someone mentioned Cushing’s. A raised ALP can be a reason to ask a question, but it is not the answer on its own.',
      'Cushing’s testing is ordered deliberately and interpreted beside the dog’s history, medications, other conditions, and observations.'
    ],
    sections: [
      {
        title: 'Why the routine panel is not the answer',
        paragraphs: [
          'ALP can be raised in dogs with Cushing’s, but it can also move with steroid exposure, growth, and other conditions. A routine panel does not confirm Cushing’s.',
          'Keep the ALP result with the original range, urine results, glucose, medications, and the owner’s observations.'
        ]
      },
      {
        title: 'What actually tests for it',
        paragraphs: [
          'An ACTH stimulation test measures the adrenal response to a stimulating hormone. A low-dose dexamethasone suppression test measures whether cortisol suppresses as expected.',
          'AAHA describes the urine cortisol-to-creatinine ratio as sensitive but nonspecific. A negative result may help rule the condition out, while a positive result does not confirm it.'
        ],
        source: { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines' }
      },
      {
        title: 'Why timing and context matter',
        paragraphs: [
          'AAHA recommends trying to stabilize or resolve known related conditions before pursuing Cushing’s testing when possible. Recent steroid exposure and other illnesses can change the testing conversation.',
          '“Not yet” can be a clinical plan rather than a delay. Keep the reason, timing, and next step in the chart.'
        ]
      }
    ],
    instrumentTitle: 'Prepare the testing context',
    instrumentIntro: 'Bring the routine results and the reasons the veterinarian is considering a dedicated test.',
    instrumentItems: ['ALP, glucose, and urine results with dates and ranges', 'Current and recent steroid medications', 'Water intake, urination, appetite, panting, skin, and coat notes', 'Other diagnosed conditions and the testing plan'],
    questions: ['What makes Cushing’s worth testing for in my dog?', 'Could medication or another condition affect the result?', 'Which dedicated test are you considering and why?', 'Does anything need to happen before the test?'],
    sources: [
      { label: '2023 AAHA endocrinopathies guidelines', url: 'https://www.aaha.org/wp-content/uploads/globalassets/02-guidelines/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines' },
      { label: 'Cornell eClinPath, glucose', url: 'https://eclinpath.com/chemistry/energy-metabolism/glucose/' },
      { label: 'Merck Veterinary Manual, Cushing disease', url: 'https://www.merckvetmanual.com/endocrine-system/the-pituitary-gland/cushing-disease-pituitary-dependent-hyperadrenocorticism-in-animals' }
    ]
  }
];

export const conditionBySlug = new Map(conditionPages.map((page) => [page.slug, page]));
