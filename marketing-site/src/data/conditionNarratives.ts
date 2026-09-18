export interface ConditionNarrativeBeat {
  label: string;
  title: string;
  body: string;
}

export interface ConditionNarrative {
  afterTitle: string;
  recordTitle: string;
  recordIntro: string;
  recordBeats: ConditionNarrativeBeat[];
  researchTitle: string;
  researchIntro: string;
  questionTitle: string;
  questionIntro: string;
  handoffTitle: string;
}

export const conditionNarratives: Record<string, ConditionNarrative> = {
  'kidney-disease': {
    afterTitle: 'A diagnosis starts a history, not a single number.',
    recordTitle: 'The question changes when every draw has context.',
    recordIntro:
      'Kidney values become more useful when the original report, the laboratory range, the date, and what was happening around the draw stay together. BarkLens builds that view from your dog’s own record.',
    recordBeats: [
      {
        label: 'Add',
        title: 'Keep every blood and urine report intact.',
        body: 'BarkLens reads BUN, creatinine, SDMA, phosphorus, potassium, urine results, units, ranges, and dates from the reports you add.'
      },
      {
        label: 'Connect',
        title: 'Place the numbers beside the surrounding history.',
        body: 'Medication and food labels, blood pressure, weight, hydration, appetite, and owner-confirmed observations remain attached to the same period.'
      },
      {
        label: 'Ask',
        title: 'Start with the sequence your dog actually has.',
        body: 'Ask about movement across draws and the related records instead of beginning with a generic kidney-disease summary.'
      }
    ],
    researchTitle: 'The values answer different parts of the kidney question.',
    researchIntro:
      'Published veterinary sources do not treat one flagged value as the whole kidney story. BarkLens gives you the source context while keeping the original reports available for comparison.',
    questionTitle: 'Ask about the change, not only the newest value.',
    questionIntro:
      'A useful question carries the relevant draws, ranges, dates, food and medication labels, and owner observations with it. BarkLens assembles that context before the question is asked.',
    handoffTitle: 'Let the next veterinarian see the same sequence.'
  },
  'liver-disease': {
    afterTitle: 'A liver diagnosis does not turn every flagged enzyme into the same finding.',
    recordTitle: 'The order of the values matters as much as the values themselves.',
    recordIntro:
      'ALT, AST, ALP, GGT, bilirubin, and creatine kinase can move for different reasons. BarkLens keeps each result in sequence and places it beside the records that may help your veterinarian read the timeline.',
    recordBeats: [
      {
        label: 'Add',
        title: 'Bring in every chemistry panel with its own range.',
        body: 'BarkLens preserves the value, unit, laboratory range, and draw date rather than replacing them with a universal range.'
      },
      {
        label: 'Connect',
        title: 'Put medications, supplements, meals, and imaging on the same timeline.',
        body: 'A start date, stop date, procedure, illness, or food change can remain visible beside the liver results recorded around it.'
      },
      {
        label: 'Ask',
        title: 'Ask about the pattern shown by your dog’s reports.',
        body: 'The question can include which values moved first, which stayed elevated, and what else was recorded during the same period.'
      }
    ],
    researchTitle: 'Each liver value contributes different information.',
    researchIntro:
      'The research distinguishes markers of liver-cell injury, bile-system context, muscle contribution, and other possible influences. BarkLens helps you read those distinctions against your dog’s dated record.',
    questionTitle: 'Ask with the panel and the surrounding dates attached.',
    questionIntro:
      'Instead of copying one result into a search box, ask from the complete sequence BarkLens has read from the reports, labels, imaging, and observations you added.',
    handoffTitle: 'Send the liver timeline, not a recollection of it.'
  },
  pancreatitis: {
    afterTitle: 'The diagnosis may name the episode. It does not reconstruct what led to it.',
    recordTitle: 'The useful history begins before the flare and continues after it.',
    recordIntro:
      'Meals, treats, labels, medications, vomiting, appetite, stool, hydration, laboratory work, imaging, and previous episodes may live in different places. BarkLens brings their dates into one history.',
    recordBeats: [
      {
        label: 'Capture',
        title: 'Photograph the exact food, treat, and supplement labels.',
        body: 'BarkLens keeps the ingredients, nutrition information, and printed units with the episode instead of relying on a remembered description.'
      },
      {
        label: 'Connect',
        title: 'Place the days around the flare beside the clinical record.',
        body: 'Owner-confirmed meals and observations can sit beside pancreatic lipase, chemistry panels, imaging, discharge instructions, and visit notes.'
      },
      {
        label: 'Compare',
        title: 'See this episode beside the earlier history.',
        body: 'BarkLens can show what was similar or different across recorded episodes without claiming that they had the same cause.'
      }
    ],
    researchTitle: 'The laboratory work, food record, and timing answer different questions.',
    researchIntro:
      'Published sources describe limits around individual tests and around broad labels such as “high fat.” BarkLens keeps the printed facts and the episode timeline available when you ask what those sources mean.',
    questionTitle: 'Ask from the episode your dog actually experienced.',
    questionIntro:
      'The question can carry the food labels, dates, laboratory reports, imaging, and owner notes that belong to this episode rather than asking about pancreatitis in the abstract.',
    handoffTitle: 'Share the whole episode with the next person caring for your dog.'
  },
  'cushings-disease': {
    afterTitle: 'The diagnosis has a name. The testing and daily history still need context.',
    recordTitle: 'Keep the routine panel, dedicated tests, medications, and home record connected.',
    recordIntro:
      'A raised ALP, endocrine testing, steroid exposure, other conditions, and changes noticed at home belong to a dated sequence. BarkLens keeps that sequence available before and after diagnosis.',
    recordBeats: [
      {
        label: 'Add',
        title: 'Keep routine panels and dedicated test results together.',
        body: 'BarkLens reads ALP, glucose, urine findings, and repeated results while preserving the dates, ranges, and original reports.'
      },
      {
        label: 'Capture',
        title: 'Photograph every medication label, including steroids.',
        body: 'The exact product and its recorded timing can remain beside the testing history and your veterinarian’s instructions.'
      },
      {
        label: 'Record',
        title: 'Add the daily changes a laboratory report cannot contain.',
        body: 'Owner-confirmed notes about water intake, urination, appetite, panting, skin, coat, weight, sleep, and energy become part of the same history.'
      }
    ],
    researchTitle: 'Routine findings, dedicated tests, and timing do not mean the same thing.',
    researchIntro:
      'The published sources separate a suggestive routine finding from tests designed for Cushing’s and explain why medications, other illness, and timing belong in the conversation.',
    questionTitle: 'Ask with the testing history and daily record in view.',
    questionIntro:
      'BarkLens attaches the relevant laboratory results, labels, dates, other recorded conditions, and owner observations so the question begins with your dog’s actual sequence.',
    handoffTitle: 'Give a specialist or new clinic the testing history that came before today.'
  },
  diabetes: {
    afterTitle: 'The diagnosis begins a shared daily record.',
    recordTitle: 'Meals, prescribed medication events, laboratory work, and home observations belong on one clock.',
    recordIntro:
      'Diabetes unfolds across the day and across the people providing care. BarkLens connects only the events a person confirms, preserving the veterinarian’s instructions without originating or changing them.',
    recordBeats: [
      {
        label: 'Confirm',
        title: 'Record what actually happened and when.',
        body: 'Meals, veterinarian-prescribed medication events, water intake, appetite, weight, energy, and other observations are added by the owner or invited Care Circle.'
      },
      {
        label: 'Connect',
        title: 'Place the daily record beside the laboratory history.',
        body: 'Glucose curves, fructosamine, urine results, albumin, chemistry panels, and appointment notes remain visible beside the surrounding dates.'
      },
      {
        label: 'Share',
        title: 'Let everyone work from the same confirmed history.',
        body: 'A partner, sitter, family member, or clinic can see the current instructions, recorded events, recent results, and emergency contacts.'
      }
    ],
    researchTitle: 'A snapshot, a longer-period marker, and the owner record provide different context.',
    researchIntro:
      'Published veterinary sources distinguish blood and urine glucose from fructosamine and place the owner’s daily record at the beginning of the veterinary conversation.',
    questionTitle: 'Ask from the same timeline your Care Circle is using.',
    questionIntro:
      'BarkLens brings the meals, confirmed medication events, water, weight, observations, and laboratory results into the question without assessing control or changing a dose.',
    handoffTitle: 'Make the confirmed daily history available wherever your dog is cared for.'
  },
  thyroid: {
    afterTitle: 'A thyroid result can lose meaning when its timing is missing.',
    recordTitle: 'Keep the draw, medication event, and changes at home in the same history.',
    recordIntro:
      'Total T4, free T4, TSH, the time of the blood draw, veterinarian-provided medication instructions, weight, coat, skin, and energy can all belong to the same question.',
    recordBeats: [
      {
        label: 'Add',
        title: 'Preserve every thyroid report and its original range.',
        body: 'BarkLens reads total T4, free T4, TSH, chemistry, and blood-count results with their dates and printed laboratory context.'
      },
      {
        label: 'Confirm',
        title: 'Keep medication and draw times with the result.',
        body: 'Owner-confirmed timing remains attached to the veterinarian-provided instructions and the report produced from that draw.'
      },
      {
        label: 'Compare',
        title: 'See laboratory values beside weight, coat, skin, and energy.',
        body: 'Dated photos and observations can be reviewed with repeated thyroid results rather than reconstructed from memory at the next visit.'
      }
    ],
    researchTitle: 'The test name, surrounding health, and timing all affect the question.',
    researchIntro:
      'Published sources explain the roles and limits of total T4, free T4, and TSH and why medication and draw timing should remain attached to a post-pill result.',
    questionTitle: 'Ask with the value and the timing that produced it.',
    questionIntro:
      'BarkLens carries the exact report, medication label, confirmed times, photos, weight, and observations into the question while leaving dose decisions to the veterinarian.',
    handoffTitle: 'Share the thyroid timeline without losing the timing around each result.'
  },
  'heart-disease': {
    afterTitle: 'The diagnosis names the condition. The history shows what changed.',
    recordTitle: 'A murmur, an image, a medication, and a home observation belong in one view.',
    recordIntro:
      'Heart care can produce listening notes, imaging, rhythm testing, blood pressure, medication changes, kidney values, electrolytes, weight, and breathing records. BarkLens keeps those records connected by date.',
    recordBeats: [
      {
        label: 'Add',
        title: 'Bring in the reports that describe structure and rhythm.',
        body: 'Imaging reports, ECG notes, blood-pressure records, appointment summaries, and the stage recorded by the veterinarian remain part of the same history.'
      },
      {
        label: 'Connect',
        title: 'Place medication labels beside laboratory results.',
        body: 'BarkLens keeps start dates and veterinarian-provided instructions beside kidney values, electrolytes, weight, and the surrounding visit record.'
      },
      {
        label: 'Record',
        title: 'Add what your veterinarian asks you to observe at home.',
        body: 'Sleeping-breath counts and notes about coughing, exercise, fainting, appetite, sleep, and weight are owner-confirmed and dated.'
      }
    ],
    researchTitle: 'Stage, imaging, laboratory context, and home observations answer different questions.',
    researchIntro:
      'Published veterinary sources separate what can be learned by listening, imaging, electrical recording, laboratory work, and the history reported by the owner. BarkLens keeps those parts available together.',
    questionTitle: 'Ask with the imaging, medication, laboratory work, and home record attached.',
    questionIntro:
      'A question about change becomes more specific when BarkLens can attach the veterinarian-recorded stage, recent imaging, medication history, related laboratory results, and dated observations.',
    handoffTitle: 'Bring the same heart history into routine, specialist, and urgent visits.'
  },
  arthritis: {
    afterTitle: 'Arthritis is lived in ordinary moments between appointments.',
    recordTitle: 'The gradual changes are easier to show when they are dated.',
    recordIntro:
      'Difficulty rising, hesitation on stairs, a shorter walk, weight, medication changes, videos, imaging, and related laboratory work may happen weeks apart. BarkLens keeps those moments in one history.',
    recordBeats: [
      {
        label: 'Capture',
        title: 'Record the same movements in a consistent way.',
        body: 'Short dated videos and notes can show rising, stairs, walking, getting into the car, sleep, pace, activity, and hesitation.'
      },
      {
        label: 'Connect',
        title: 'Place medications and laboratory work beside movement.',
        body: 'Medication and supplement labels, kidney and liver panels, weight, body-condition records, imaging, and veterinarian-provided instructions stay together.'
      },
      {
        label: 'Compare',
        title: 'Review this month beside the earlier history.',
        body: 'BarkLens makes gradual movement and routine changes easier to show without scoring pain, judging severity, or selecting treatment.'
      }
    ],
    researchTitle: 'Movement, owner observations, treatment records, and laboratory work play different roles.',
    researchIntro:
      'Published sources describe the value of consistent owner observations and the broader records veterinarians may consider alongside osteoarthritis care.',
    questionTitle: 'Ask with the videos, dates, labels, weight, and laboratory history in view.',
    questionIntro:
      'BarkLens attaches the record behind the question so the next conversation can begin with what changed and when, rather than whether your dog simply seems better or worse.',
    handoffTitle: 'Show the movement history instead of describing one unusually good or bad day.'
  }
};
