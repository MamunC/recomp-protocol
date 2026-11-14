import React, { useState, useEffect, useRef } from "react";

const DAYS = [
  {
    id: "monday",
    label: "MON",
    title: "Rest + APT Stretch",
    type: "rest",
    color: "#c084fc",
    icon: "🧘",
    stretches: [
      {
        name: "Kneeling Hip Flexor Stretch",
        reps: "60s each side",
        note: "The single most important APT correction stretch. Get into a half-kneeling lunge with your back knee on the floor. Squeeze the glute of the back leg and gently push your hips forward until you feel a deep stretch at the front of the hip. The psoas — your deepest hip flexor — is the primary driver of APT. Prolonged sitting shortens it chronically. Do this one even if you skip everything else."
      },
      {
        name: "Couch Stretch",
        reps: "45s each side",
        note: "Kneel facing away from a wall. Place the top of your back foot up on the surface behind you, front foot forward in a lunge. Slowly bring your torso upright. You will feel an intense stretch through the quad and deep hip flexor. The discomfort means it is working — this is one of the tightest areas in people who sit. Breathe through it and hold."
      },
      {
        name: "Child's Pose",
        reps: "60s",
        note: "Kneel and sit back toward your heels, arms stretched forward on the floor. Let your lower back completely decompress — it should feel like space opening between your vertebrae. Breathe deeply into your lower back on each inhale. This counteracts the compression your spine accumulates throughout the day and from training."
      },
      {
        name: "Lying Hamstring Stretch",
        reps: "45s each side",
        note: "Lie on your back. Loop a resistance band around the arch of one foot and hold both ends. Slowly straighten the leg toward the ceiling until you feel a firm pull in the back of the thigh. Keep the opposite leg flat on the floor. Tight hamstrings contribute to APT by pulling the pelvis out of neutral. Do not force the range — hold a comfortable but firm stretch."
      },
      {
        name: "Pigeon Pose / Figure-4",
        reps: "60s each side",
        note: "For figure-4: lie on your back, cross one ankle over the opposite knee and pull the uncrossed leg toward your chest. For pigeon: bring one shin forward across your body and extend the back leg behind. Both target the glute and piriformis — a tight piriformis limits glute activation, worsening APT. This stretch also benefits the hip rotation needed for soccer."
      }
    ],
    note: "The day after night soccer: recovery comes first. Take an easy 20-30 minute walk, drink plenty of water, get protein at every meal, and keep stretches gentle. Do not force range if your hamstrings, calves or inner thighs feel sore."
  },
  {
    id: "tuesday",
    label: "TUE",
    title: "Upper A + Core",
    type: "training",
    color: "#34d399",
    icon: "💪",
    warmup: [
      {
        name: "Wrist Extensor Stretch",
        sets: 2,
        reps: "30s each",
        note: "Extend one arm straight in front of you, palm facing down. Use your other hand to gently pull your fingers downward toward the floor until you feel a stretch along the top of the forearm. This directly stretches the extensor tendons involved in tennis elbow. Never skip this before any push or pull session."
      },
      {
        name: "Reverse Wrist Curl",
        sets: 2,
        reps: 15,
        note: "Loop a light band under your foot. Rest your forearm on your thigh with palm facing down. Slowly curl your wrist upward, hold for a beat, then lower with control. This is an eccentric strengthening exercise for the lateral epicondyle — the exact tendon affected by tennis elbow."
      },
      {
        name: "Towel Twist",
        sets: 2,
        reps: "10 each dir",
        note: "Hold a small towel with both hands at shoulder width. Slowly wring it as if squeezing out water — twist in both directions for 10 reps each. This activates the forearm pronators and supinators, warming up the full range of wrist rotation used during pressing movements."
      }
    ],
    exercises: [
      {
        name: "Standing Chest Press",
        sets: 3,
        reps: "12-15",
        anchor: "Step on band, press forward",
        muscles: "Chest · Triceps · Front Delts",
        desc: "Stand with feet shoulder-width apart, both feet on the band. Hold a handle in each hand at chest height with elbows bent at roughly 90 degrees. Press both hands forward until arms are nearly straight, then slowly return. The band creates continuous tension throughout the movement and gets harder as you extend.",
        tip: "Keep elbows slightly below shoulder height — going too high shifts stress to the shoulder joint. Wrists must stay neutral at all times. Exhale as you press, inhale as you return. Slow the return to 3 seconds for maximum muscle stimulus.",
        search: "resistance band chest press standing"
      },
      {
        name: "Overhead Press",
        sets: 3,
        reps: 12,
        anchor: "Step on band, press overhead",
        muscles: "Shoulders · Triceps · Upper Traps",
        desc: "Stand on the band with feet hip-width apart. Hold handles at shoulder height, elbows pointing slightly forward. Press both hands straight overhead until arms are fully extended, then slowly lower back to shoulder height. The band provides ascending resistance — light at the bottom where the shoulder is mechanically weaker.",
        tip: "Do not press with a wide grip — keep elbows forward to reduce shoulder impingement risk. Use an open palm or loose grip to protect your elbows. Engage your core throughout and do not arch your lower back as you press up.",
        search: "resistance band overhead shoulder press"
      },
      {
        name: "Seated Row",
        sets: 3,
        reps: "12-15",
        anchor: "Sit on floor, band around both feet",
        muscles: "Lats · Rhomboids · Biceps · Rear Delts",
        desc: "Sit on the floor with legs extended, band looped around both feet. Start with arms extended and a slight forward lean, then drive your elbows back past your torso, squeezing your shoulder blades together at the end. Slowly return the arms forward with control over 3 seconds.",
        tip: "OPEN PALM GRIP is essential — loop the band over your palm rather than gripping tightly. A tight grip combined with elbow flexion is the exact mechanism that aggravates tennis elbow. Take 3 full seconds to return your arms forward.",
        search: "resistance band seated row"
      },
      {
        name: "Face Pull",
        sets: 3,
        reps: 15,
        anchor: "Hold band at face height, pull toward forehead",
        muscles: "Rear Delts · Rotator Cuff · Upper Back",
        desc: "Hold the band at face height with both hands, palms facing down. Pull the band toward your forehead while flaring your elbows high and wide — hands should end up beside your ears at the finish position. This builds the rear deltoids and external rotators, which are chronically weak and underworked in most people.",
        tip: "Elbows must travel high — if they drop, you lose the rear delt and rotator cuff stimulus. Wrists stay completely neutral throughout; any deviation risks elbow aggravation. Use a lighter band than feels necessary.",
        search: "resistance band face pull"
      }
    ],
    core: [
      {
        name: "Posterior Pelvic Tilt Hold",
        sets: 3,
        reps: "20s",
        note: "Lie on your back, knees bent, feet flat. Flatten your lower back completely into the floor by simultaneously contracting your abs and squeezing your glutes — there should be zero gap between your spine and the floor. Hold and breathe. This is the exact opposite movement to anterior pelvic tilt."
      },
      {
        name: "Plank Hold",
        sets: 3,
        reps: "30-40s",
        note: "Forearm plank with elbows directly under shoulders. Squeeze your glutes aggressively — this is the most important cue, not optional. Brace your abs as if you expect to be punched. Your body should form a perfectly straight line from head to heels."
      }
    ]
  },
  {
    id: "wednesday",
    label: "WED",
    title: "Lower A",
    type: "training",
    color: "#fb923c",
    icon: "🦵",
    warmup: [
      {
        name: "Glute Bridge (activation)",
        sets: 2,
        reps: 15,
        note: "Lie on your back, knees bent, feet flat. Drive through your heels to lift your hips, squeezing your glutes hard at the top. Hold for a beat, then lower. The purpose here is activation not fatigue — you are firing a neuromuscular signal to wake the glutes up before loading them."
      },
      {
        name: "Clamshells with Band",
        sets: 2,
        reps: "15 each",
        note: "Lie on your side with hips stacked, knees bent, band around your thighs above the knees. Keeping feet together, rotate your top knee upward like a clamshell opening. Hold briefly and lower with control. This activates the glute medius — responsible for hip stability during single-leg movements."
      },
      {
        name: "Bird Dog",
        sets: 2,
        reps: "10 each side",
        note: "On hands and knees with a neutral spine. Simultaneously extend your right arm forward and left leg back until both are parallel to the floor. Hold 2 seconds, return, repeat opposite side. This trains glute activation alongside core stability."
      },
      {
        name: "Bodyweight Squat",
        sets: 2,
        reps: 10,
        note: "Slow bodyweight squat, and at the bottom position deliberately tuck your pelvis slightly — performing a posterior tilt at depth. This rewires your squat pattern to avoid excessive anterior tilt under load. Take 3 seconds to lower and 1 second to stand."
      }
    ],
    exercises: [
      {
        name: "Banded Squat",
        sets: 3,
        reps: 15,
        anchor: "Both feet on band, handles at shoulders",
        muscles: "Quads · Glutes · Hamstrings · Core",
        desc: "Stand on the band with feet shoulder-width apart, toes slightly turned out. Hold the handles at your shoulders with elbows forward. Sit back and down into a squat, keeping your chest tall and weight through your heels. At the bottom, push knees out and think about your pelvis slightly tucking.",
        tip: "Chest tall throughout — if your torso pitches excessively forward, ankle mobility may need work. Knees must track over your second toe and not cave inward at any point. At the bottom, the slight posterior pelvic tilt is the most important cue in this exercise for your specific goals.",
        search: "resistance band squat"
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: 12,
        anchor: "Both feet on band, hinge at hips",
        muscles: "Hamstrings · Glutes · Lower Back",
        desc: "Stand on the band, feet hip-width. Hold handles at hip height. Maintain a soft bend in the knees throughout — this is a hinge, not a squat. Push your hips back as far as possible while keeping your back completely flat, letting the handles travel down your thighs toward the floor. You should feel a deep stretch in your hamstrings.",
        tip: "Hips go back, not down — imagine pushing a door shut behind you with your hips. Keep the band handles close to your body throughout. If your lower back rounds at the bottom, you have gone too far — reduce the range until hamstring flexibility improves.",
        search: "resistance band romanian deadlift"
      },
      {
        name: "Glute Bridge with Band",
        sets: 3,
        reps: 15,
        anchor: "Band across hips, ends held to floor",
        muscles: "Glutes · Hamstrings · Core · Hip Stabilisers",
        desc: "Lie on your back, knees bent, feet flat hip-width apart. Lay the band across your hip bones and hold each end to the floor beside you. Drive through your heels to lift your hips, squeezing your glutes hard at the top. Hold for a full second, then lower slowly.",
        tip: "The squeeze at the top is everything — hold it for a full second every single rep. Your body should form a straight line from knees to shoulders at the peak. If you feel your hamstrings cramping rather than your glutes working, move your feet slightly further from your body.",
        search: "resistance band glute bridge"
      }
    ],
    apt: [
      {
        name: "Kneeling Hip Flexor Stretch",
        reps: "60s each side",
        note: "Half-kneeling on the floor, back knee down, front foot forward. Squeeze the glute of the back leg — this activation cue reciprocally relaxes the hip flexor and makes the stretch far more effective. Gently push hips forward until you feel the stretch at the front of the hip."
      },
      {
        name: "Couch Stretch",
        reps: "45s each side",
        note: "Facing away from a wall, place the top of one foot elevated on the surface behind you. Front leg in a lunge, torso upright. You will feel a deep pull through the quad and hip flexor. This is the deepest hip flexor stretch available without equipment and is particularly effective after squats when the quad is already warm."
      }
    ]
  },
  {
    id: "thursday",
    label: "THU",
    title: "Upper B + Core",
    type: "training",
    color: "#fb7185",
    icon: "🔴",
    warmup: [
      {
        name: "Wrist Extensor Stretch",
        sets: 2,
        reps: "30s each",
        note: "Non-negotiable before any pulling session. Extend arm straight, palm down, and pull fingers toward you with the other hand until you feel the stretch across the top of the forearm. Pulling movements require grip and wrist stability — warming up the extensor tendons reduces the chance of aggravating your tennis elbow."
      },
      {
        name: "Theraband Wrist Flexion",
        sets: 2,
        reps: 15,
        note: "Loop a light band under your foot. Hold with palm facing up, forearm resting on your thigh. Curl your wrist upward through its full range, hold briefly, then lower slowly. This strengthens the wrist flexors — the antagonists to the tight extensors involved in tennis elbow."
      },
      {
        name: "Reverse Wrist Curl",
        sets: 2,
        reps: 15,
        note: "Same setup but palm faces down. Lift your wrist upward against the band and lower with control. This directly loads the extensor carpi radialis — the primary tendon affected by tennis elbow. Eccentric loading of this tendon is the most clinically validated treatment for lateral epicondylitis."
      }
    ],
    exercises: [
      {
        name: "Bent Over Row",
        sets: 3,
        reps: 12,
        anchor: "Both feet on band, hinge to 45 degrees",
        muscles: "Lats · Rhomboids · Rear Delts",
        desc: "Stand on the band, feet hip-width. Hinge forward at the hips to about 45 degrees, keeping your back flat and core braced. Row both handles toward your hips simultaneously, driving elbows back and squeezing the shoulder blades together at the top. Lower with control.",
        tip: "Open palm grip only — critical for elbow safety. Back must stay flat — if it rounds, reduce resistance or reduce the hinge angle. Think chest pointing toward the floor throughout the set. Two seconds up, three seconds down.",
        search: "resistance band bent over row"
      },
      {
        name: "Push-Up",
        sets: 3,
        reps: "8-15",
        anchor: "Floor, or hands elevated on a sturdy surface",
        muscles: "Chest · Triceps · Front Delts · Core",
        desc: "Hands slightly wider than shoulders, body in one straight line from head to heels. Lower your chest to about a fist's height from the floor, then press back up. If you cannot do 8 clean reps, raise your hands on a bench or sturdy counter.",
        tip: "Use fists or push-up handles to keep your wrists neutral and spare the forearm extensors. Elbows about 45 degrees from your torso. Squeeze your glutes so your lower back does not sag into anterior tilt. Stop 2 reps short of failure.",
        search: "push up form"
      },
      {
        name: "Lateral Raises",
        sets: 3,
        reps: 15,
        anchor: "Step on band, raise arms to sides",
        muscles: "Side Deltoids",
        desc: "Stand on the band with one or both feet. Hold handles at your sides with a slight bend in the elbows. Raise both arms out to the sides simultaneously until they reach shoulder height, then lower with control. This isolates the medial deltoid — the muscle responsible for shoulder width and roundness.",
        tip: "Lead the movement with your elbows, not your hands — imagine pouring water out of a jug as you raise. Stop at shoulder height; going higher shifts the work to the traps. Keep your torso completely still.",
        search: "resistance band lateral raise"
      },
      {
        name: "Tricep Pushdown",
        sets: 3,
        reps: 12,
        anchor: "Hold band overhead, push down",
        muscles: "Triceps",
        desc: "Loop the band above you or hold it overhead with one hand while the other works. Keep your upper arm pinned against your side, elbow at 90 degrees. Extend your forearm downward until your arm is fully straight, squeezing the tricep hard at the bottom, then slowly return.",
        tip: "The golden rule: upper arms do not move. If your elbow drifts forward or backward during the rep, you are using momentum rather than the tricep. Wrist stays completely neutral — critical for tennis elbow management.",
        search: "resistance band tricep pushdown"
      },
      {
        name: "Hammer Curl",
        sets: 3,
        reps: 12,
        anchor: "Both feet on band, thumbs pointing up",
        muscles: "Biceps · Brachialis · Brachioradialis",
        desc: "Stand on the band with feet hip-width. Hold handles with a neutral grip — thumbs pointing up, palms facing each other. Curl both hands toward your shoulders keeping elbows pinned at your sides, then lower with control. The neutral grip shifts emphasis to the brachialis and dramatically reduces rotational stress on the elbow.",
        tip: "Neutral wrist throughout the entire movement — this is what makes it safe for tennis elbow. Do not swing the elbows forward at the top; keep them stationary at your sides. A slow 3-second descent is where much of the muscle-building stimulus comes from.",
        search: "resistance band hammer curl"
      }
    ],
    core: [
      {
        name: "Dead Bug",
        sets: 3,
        reps: "10 each side",
        note: "Lie on your back with arms pointing at the ceiling and knees bent at 90 degrees in the air. Slowly lower your right arm overhead while simultaneously extending your left leg toward the floor — both hovering just above the surface. Return and repeat on the opposite side. Your lower back must remain completely flat against the floor the entire time."
      },
      {
        name: "Bicycle Crunch",
        sets: 3,
        reps: 20,
        note: "Lie on your back, hands lightly behind your head — do not pull on your neck. Bring one knee toward your chest while rotating your opposite elbow toward it, extending the other leg straight and low. Alternate sides in a slow, deliberate pedalling motion. The rotation trains the obliques which are essential for spinal stability."
      }
    ]
  },
  {
    id: "friday",
    label: "FRI",
    title: "Lower B · Soccer Prep",
    type: "training",
    color: "#a3e635",
    icon: "🛡️",
    note: "Deliberately lighter: this session is 2 days before night soccer. Work at a moderate effort (stop about 3 reps short of failure) so you build hip, calf and groin resilience without carrying soreness into the game.",
    warmup: [
      {
        name: "Glute Bridge (activation)",
        sets: 2,
        reps: 15,
        note: "Lie on your back, knees bent, feet flat. Drive through your heels to lift your hips, squeezing your glutes hard at the top. Hold for a beat, then lower. The purpose here is activation not fatigue — you are firing a neuromuscular signal to wake the glutes up before loading them."
      },
      {
        name: "Clamshells with Band",
        sets: 2,
        reps: "15 each",
        note: "Lie on your side with hips stacked, knees bent, band around your thighs above the knees. Keeping feet together, rotate your top knee upward like a clamshell opening. Hold briefly and lower with control. This activates the glute medius — responsible for hip stability during single-leg movements."
      },
      {
        name: "Bird Dog",
        sets: 2,
        reps: "10 each side",
        note: "On hands and knees with a neutral spine. Simultaneously extend your right arm forward and left leg back until both are parallel to the floor. Hold 2 seconds, return, repeat opposite side. This trains glute activation alongside core stability."
      }
    ],
    exercises: [
      {
        name: "Lateral Band Walk",
        sets: 3,
        reps: "15 each way",
        anchor: "Band around ankles, constant tension",
        muscles: "Glute Medius · Hip Abductors · Quads",
        desc: "Band around your ankles, feet hip-width apart to create tension. Get into a quarter-squat — slight knee bend, hips back, chest up. Step sideways with one foot then bring the other to follow, maintaining constant band tension and never letting feet come together.",
        tip: "Maintain the quarter-squat throughout every step — this is where most people cheat by standing upright to rest. Band must stay taut at all times; if it goes slack, your feet are too close together. Keep toes pointing forward throughout.",
        search: "resistance band lateral walk"
      },
      {
        name: "Standing Hip Abduction",
        sets: 3,
        reps: "12 each leg",
        anchor: "Step on band with standing foot",
        muscles: "Glute Medius · Hip Abductors",
        desc: "Stand on the band with one foot. Keep your standing leg slightly bent and torso completely upright. Raise the free leg out to the side in a controlled arc, leading with the heel. Lower slowly and repeat.",
        tip: "Do not lean your torso to the side as the leg rises — that is compensation, not the exercise working. Keep your pelvis level throughout the entire movement. Raise only as high as you can without the torso tipping.",
        search: "resistance band standing hip abduction"
      },
      {
        name: "Single-Leg Calf Raise",
        sets: 3,
        reps: "12 each",
        anchor: "Standing, one hand on a wall for balance",
        muscles: "Calves · Achilles",
        desc: "Stand on one foot. Rise onto the ball of your foot, pause 1 second at the top, then lower over 3 seconds. Use the edge of a step for more range once the floor version feels easy.",
        tip: "The slow lowering builds calf and Achilles resilience for sprinting and cutting. Keep it smooth and stop well short of any pulling sensation in the calf.",
        search: "single leg calf raise"
      },
      {
        name: "Side-Lying Adductor Raise",
        sets: 3,
        reps: "12 each",
        anchor: "Floor, top leg bent with foot planted in front",
        muscles: "Inner Thigh · Adductors",
        desc: "Lie on your side with the top knee bent and foot planted in front of you. Raise the bottom leg straight up toward the ceiling, pause, then lower slowly.",
        tip: "Strong adductors protect against inner-thigh strains in cutting and kicking. Keep your hips stacked and the effort moderate, not maximal.",
        search: "side lying adduction exercise"
      }
    ],
    apt: [
      {
        name: "Kneeling Hip Flexor Stretch",
        reps: "60s each side",
        note: "Half-kneeling on the floor, back knee down, front foot forward. Squeeze the glute of the back leg — this activation cue reciprocally relaxes the hip flexor and makes the stretch far more effective. Gently push hips forward until you feel the stretch at the front of the hip."
      },
      {
        name: "Couch Stretch",
        reps: "45s each side",
        note: "Facing away from a wall, place the top of one foot elevated on the surface behind you. Front leg in a lunge, torso upright. You will feel a deep pull through the quad and hip flexor. This is the deepest hip flexor stretch available without equipment and is particularly effective after squats when the quad is already warm."
      }
    ]
  },
  {
    id: "saturday",
    label: "SAT",
    title: "Shoulders + Arms (Light)",
    type: "training",
    color: "#38bdf8",
    icon: "💪",
    note: "A short, deliberately easy upper-body session: 2 sets per exercise, stop 3-4 reps short of failure, and do not chase heavier bands. Legs stay fresh for tomorrow night's game. If your elbow feels irritated, skip the curls and pushdowns.",
    warmup: [
      {
        name: "Wrist Extensor Stretch",
        sets: 2,
        reps: "30s each",
        note: "Extend one arm straight in front of you, palm facing down. Use your other hand to gently pull your fingers downward toward the floor until you feel a stretch along the top of the forearm. This directly stretches the extensor tendons involved in tennis elbow. Never skip this before any push or pull session."
      },
      {
        name: "Reverse Wrist Curl",
        sets: 2,
        reps: 15,
        note: "Loop a light band under your foot. Rest your forearm on your thigh with palm facing down. Slowly curl your wrist upward, hold for a beat, then lower with control. This is an eccentric strengthening exercise for the lateral epicondyle — the exact tendon affected by tennis elbow."
      }
    ],
    exercises: [
      {
        name: "Lateral Raises",
        sets: 2,
        reps: 15,
        anchor: "Step on band, raise arms to sides",
        muscles: "Side Deltoids",
        desc: "Stand on the band with one or both feet. Hold handles at your sides with a slight bend in the elbows. Raise both arms out to the sides simultaneously until they reach shoulder height, then lower with control. This isolates the medial deltoid — the muscle responsible for shoulder width and roundness.",
        tip: "Lead the movement with your elbows, not your hands — imagine pouring water out of a jug as you raise. Stop at shoulder height; going higher shifts the work to the traps. Keep your torso completely still.",
        search: "resistance band lateral raise"
      },
      {
        name: "Tricep Pushdown",
        sets: 2,
        reps: 12,
        anchor: "Hold band overhead, push down",
        muscles: "Triceps",
        desc: "Loop the band above you or hold it overhead with one hand while the other works. Keep your upper arm pinned against your side, elbow at 90 degrees. Extend your forearm downward until your arm is fully straight, squeezing the tricep hard at the bottom, then slowly return.",
        tip: "The golden rule: upper arms do not move. If your elbow drifts forward or backward during the rep, you are using momentum rather than the tricep. Wrist stays completely neutral — critical for tennis elbow management.",
        search: "resistance band tricep pushdown"
      },
      {
        name: "Face Pull",
        sets: 2,
        reps: 15,
        anchor: "Hold band at face height, pull toward forehead",
        muscles: "Rear Delts · Rotator Cuff · Upper Back",
        desc: "Hold the band at face height with both hands, palms facing down. Pull the band toward your forehead while flaring your elbows high and wide — hands should end up beside your ears at the finish position. This builds the rear deltoids and external rotators, which are chronically weak and underworked in most people.",
        tip: "Elbows must travel high — if they drop, you lose the rear delt and rotator cuff stimulus. Wrists stay completely neutral throughout; any deviation risks elbow aggravation. Use a lighter band than feels necessary.",
        search: "resistance band face pull"
      },
      {
        name: "Hammer Curl",
        sets: 2,
        reps: 12,
        anchor: "Both feet on band, thumbs pointing up",
        muscles: "Biceps · Brachialis · Brachioradialis",
        desc: "Stand on the band with feet hip-width. Hold handles with a neutral grip — thumbs pointing up, palms facing each other. Curl both hands toward your shoulders keeping elbows pinned at your sides, then lower with control. The neutral grip shifts emphasis to the brachialis and dramatically reduces rotational stress on the elbow.",
        tip: "Neutral wrist throughout the entire movement — this is what makes it safe for tennis elbow. Do not swing the elbows forward at the top; keep them stationary at your sides. A slow 3-second descent is where much of the muscle-building stimulus comes from.",
        search: "resistance band hammer curl"
      }
    ],
    apt: [
      {
        name: "Kneeling Hip Flexor Stretch",
        reps: "60s each side",
        note: "Half-kneeling on the floor, back knee down, front foot forward. Squeeze the glute of the back leg — this activation cue reciprocally relaxes the hip flexor and makes the stretch far more effective. Gently push hips forward until you feel the stretch at the front of the hip."
      },
      {
        name: "Child's Pose",
        reps: "60s",
        note: "Kneel and sit back toward your heels, arms stretched forward on the floor. Let your lower back completely decompress — it should feel like space opening between your vertebrae. Breathe deeply into your lower back on each inhale. This counteracts the compression your spine accumulates throughout the day and from training."
      }
    ]
  },
  {
    id: "sunday",
    label: "SUN",
    title: "Soccer",
    type: "sport",
    color: "#fbbf24",
    icon: "⚽",
    note: "Night kickoff, so keep the day easy. Eat carbs at lunch and a light carb-plus-protein meal 2-3 hours before the game, and sip water through the afternoon. Do the activation drills about 15 minutes before you play. Afterwards have protein and carbs, then sleep: tomorrow is recovery. Throw-ins: use a controlled wrist motion rather than snapping.",
    preRun: [
      {
        name: "Glute Bridge",
        reps: "2 × 15",
        note: "15 controlled glute bridges before stepping on the pitch. This is a neuromuscular activation drill — it fires the glute-brain connection so your glutes contribute to your first sprint rather than waiting to wake up."
      },
      {
        name: "Clamshells",
        reps: "2 × 15 each",
        note: "Side-lying knee raises with or without a band. Activates the glute medius — your primary hip stabiliser during single-leg landing, cutting, and kicking. A warm glute medius means more stable knees when you plant and cut."
      },
      {
        name: "Leg Swings",
        reps: "15 each leg",
        note: "Forward-back and side-to-side dynamic swings to mobilise the hip joint before explosive movement. Soccer demands instant full-range hip movement — sprinting, kicking, and cutting — and cold hip flexors and adductors are the most commonly strained muscles in field sport."
      }
    ]
  }
];

const PROGRESS_KEY = "workout_tracker_progress_v3";
function loadProgress() { try { const r = localStorage.getItem(PROGRESS_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveProgress(d) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(d)); } catch {} }

const TYPE_META = {
  training: { glow: "rgba(52,211,153,0.12)", accent: "rgba(52,211,153,0.25)", label: "STRENGTH" },
  cardio:   { glow: "rgba(56,189,248,0.12)", accent: "rgba(56,189,248,0.25)", label: "CARDIO" },
  rest:     { glow: "rgba(192,132,252,0.12)", accent: "rgba(192,132,252,0.25)", label: "RECOVERY" },
  sport:    { glow: "rgba(251,191,36,0.12)",  accent: "rgba(251,191,36,0.25)",  label: "SPORT" },
};

const DAY_MAP = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

export default function WorkoutApp() {
  const [activeDay, setActiveDay] = useState(() => DAY_MAP[new Date().getDay()]);
  const [expandedEx, setExpandedEx] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeSection, setActiveSection] = useState("workout"); // "workout" | "stats"
  const scrollRef = useRef(null);

  const day = DAYS.find(d => d.id === activeDay) || DAYS[0];

  const getWeekKey = () => {
    const now = new Date(); now.setDate(now.getDate() + weekOffset * 7);
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  };
  const weekKey = getWeekKey();

  const getWeekKeyOffset = (offset) => {
    const now = new Date(); now.setDate(now.getDate() + (weekOffset + offset) * 7);
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  };
  const lastWeekKey = getWeekKeyOffset(-1);

  const getLog = (dayId, exName, set) => progress?.[weekKey]?.[dayId]?.[exName]?.[set] || { reps: "", weight: "" };
  const getLastWeekLog = (dayId, exName, set) => progress?.[lastWeekKey]?.[dayId]?.[exName]?.[set] || { reps: "", weight: "" };
  const updateLog = (dayId, exName, set, field, value) => {
    const updated = JSON.parse(JSON.stringify(progress));
    if (!updated[weekKey]) updated[weekKey] = {};
    if (!updated[weekKey][dayId]) updated[weekKey][dayId] = {};
    if (!updated[weekKey][dayId][exName]) updated[weekKey][dayId][exName] = {};
    if (!updated[weekKey][dayId][exName][set]) updated[weekKey][dayId][exName][set] = { reps: "", weight: "" };
    updated[weekKey][dayId][exName][set][field] = value;
    setProgress(updated); saveProgress(updated);
  };

  const isDayComplete = (dayId) => {
    const d = DAYS.find(x => x.id === dayId);
    if (!d?.exercises?.length) return false;
    return d.exercises.every(ex => Array.from({ length: ex.sets }).every((_, i) => getLog(dayId, ex.name, i).reps !== ""));
  };

  const completedDays = DAYS.filter(d => isDayComplete(d.id)).length;
  const trainingDays = DAYS.filter(d => d.exercises?.length).length;

  const switchDay = (id) => {
    setActiveDay(id); setExpandedEx(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#080810", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@500;600;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        input[type=number]::-webkit-inner-spin-button { display: none; }
        input { -webkit-appearance: none; }
        .ripple { position: relative; overflow: hidden; }
        .ripple::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.06); opacity: 0; transition: opacity 0.15s; border-radius: inherit; }
        .ripple:active::after { opacity: 1; }
        @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        .slide-up { animation: slideUp 0.25s ease forwards; }
        .ex-expand { animation: fadeIn 0.2s ease forwards; }
        .inp:focus { outline: none; border-color: rgba(52,211,153,0.5) !important; background: rgba(52,211,153,0.04) !important; }
      `}</style>

      {/* STATUS BAR SPACER */}
      <div style={{ height: "env(safe-area-inset-top, 0px)", background: "#080810" }} />

      {/* TOP HEADER */}
      <div style={{ background: "#080810", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 16px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: "#fff" }}>
              Recomp Protocol
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 1, letterSpacing: "0.3px" }}>
              43M · 143 lbs · 17.7% → 12%
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <button onClick={() => setWeekOffset(w => w - 1)} className="ripple" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <div style={{ fontSize: 11, color: "#64748b", minWidth: 54, textAlign: "center" }}>
              {weekOffset === 0 ? "This week" : weekOffset > 0 ? `+${weekOffset}w` : `${weekOffset}w`}
            </div>
            <button onClick={() => setWeekOffset(w => w + 1)} className="ripple" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </div>
        </div>

        {/* DAY PILL STRIP */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 12, msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {DAYS.map(d => {
            const complete = isDayComplete(d.id);
            const isActive = activeDay === d.id;
            return (
              <button key={d.id} onClick={() => switchDay(d.id)} className="ripple" style={{
                flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: "none",
                background: isActive ? d.color : "rgba(255,255,255,0.05)",
                color: isActive ? "#000" : "#64748b",
                cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: "0.8px",
                display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.2s",
                boxShadow: isActive ? `0 0 16px ${d.color}55` : "none",
              }}>
                <span style={{ fontSize: 13 }}>{complete ? "✓" : d.icon}</span>
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {activeSection === "workout" ? (
          <div style={{ padding: "12px 14px 24px" }}>

            {/* DAY HERO CARD */}
            <div className="slide-up" style={{
              borderRadius: 20, padding: "18px 20px", marginBottom: 14,
              background: `linear-gradient(135deg, ${day.color}18 0%, ${day.color}08 100%)`,
              border: `1px solid ${day.color}30`,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -20, right: -10, fontSize: 80, opacity: 0.08, lineHeight: 1 }}>{day.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${day.color}22`, border: `1.5px solid ${day.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{day.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 17, color: "#fff" }}>{day.title}</div>
                    <span style={{ fontSize: 10, background: `${day.color}25`, color: day.color, borderRadius: 6, padding: "2px 7px", fontWeight: 700, letterSpacing: "0.5px" }}>{TYPE_META[day.type].label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
                    {day.type === "training" ? `${day.exercises?.length || 0} exercises · ~25 min` :
                      day.type === "cardio" ? "~25 min · 5km aerobic base" :
                      day.type === "sport" ? "60–90 min · full body" : "Active recovery · 10 min"}
                  </div>
                </div>
              </div>
              {day.note && <div style={{ marginTop: 12, fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, borderTop: `1px solid ${day.color}20`, paddingTop: 12 }}>{day.note}</div>}
            </div>



            {/* WARMUP */}
            {day.warmup && <SectionBlock title="Warm-Up" icon="🔥" color="#fbbf24">
              {day.warmup.map((w, i) => <MiniCard key={i} item={w} color="#fbbf24" />)}
            </SectionBlock>}

            {day.preRun && <SectionBlock title="Pre-Activity" icon="🔥" color="#38bdf8">
              {day.preRun.map((w, i) => <MiniCard key={i} item={w} color="#38bdf8" />)}
            </SectionBlock>}

            {/* EXERCISES - unified card with inline logging */}
            {day.exercises && (
              <SectionBlock title="Main Lifts" icon="💪" color={day.color}>
                {day.exercises.map((ex, i) => (
                  <ExCard key={i} ex={ex} expanded={expandedEx === ex.name}
                    onToggle={() => setExpandedEx(expandedEx === ex.name ? null : ex.name)}
                    color={day.color} index={i}
                    dayId={day.id} getLog={getLog} updateLog={updateLog} getLastWeekLog={getLastWeekLog}
                    isTraining={day.type === "training"} />
                ))}
              </SectionBlock>
            )}

            {/* CORE */}
            {day.core && <SectionBlock title="Core + APT" icon="🔲" color="#c084fc">
              {day.core.map((c, i) => <MiniCard key={i} item={c} color="#c084fc" />)}
            </SectionBlock>}

            {/* APT */}
            {day.apt && <SectionBlock title="APT Stretches" icon="🧘" color="#c084fc">
              {day.apt.map((s, i) => <MiniCard key={i} item={s} color="#c084fc" />)}
            </SectionBlock>}

            {/* REST STRETCHES */}
            {day.stretches && <SectionBlock title="APT Stretch Routine" icon="🧘" color="#c084fc" badge="10 min">
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10, padding: "8px 12px", background: "rgba(192,132,252,0.07)", borderRadius: 10 }}>
                Most important session of the week for fixing anterior pelvic tilt. The hip flexor stretch alone is worth doing daily.
              </div>
              {day.stretches.map((s, i) => <MiniCard key={i} item={s} color="#c084fc" />)}
            </SectionBlock>}

          </div>
        ) : (
          <StatsView completedDays={completedDays} trainingDays={trainingDays} />
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ background: "#0c0c18", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", paddingBottom: "env(safe-area-inset-bottom, 0px)", flexShrink: 0 }}>
        {[
          { id: "workout", icon: "⚡", label: "Workout" },
          { id: "stats", icon: "📈", label: "Progress" },
        ].map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} className="ripple" style={{
            flex: 1, padding: "12px 0 10px", border: "none", background: "transparent",
            color: activeSection === s.id ? "#34d399" : "#475569",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            transition: "color 0.2s"
          }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.5px" }}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionBlock({ title, icon, color, badge, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color, textTransform: "uppercase" }}>{title}</span>
        {badge && <span style={{ fontSize: 10, background: `${color}20`, color, borderRadius: 6, padding: "1px 7px", fontWeight: 700 }}>{badge}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function MiniCard({ item, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => item.note && setOpen(o => !o)} style={{
      background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "12px 14px", cursor: item.note ? "pointer" : "default",
      transition: "background 0.15s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>{item.name}</div>
          {item.sets && <div style={{ fontSize: 11, color, marginTop: 3 }}>{item.sets} sets × {item.reps}</div>}
          {!item.sets && item.reps && <div style={{ fontSize: 11, color, marginTop: 3 }}>{item.reps}</div>}
        </div>
        {item.note && <span style={{ color: "#475569", fontSize: 14, marginLeft: 8, flexShrink: 0, transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(180deg)" : "none" }}>⌄</span>}
      </div>
      {open && item.note && (
        <div className="ex-expand" style={{ marginTop: 10, fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>
          {item.note}
        </div>
      )}
    </div>
  );
}

function ExCard({ ex, expanded, onToggle, color, index, dayId, getLog, updateLog, getLastWeekLog, isTraining }) {
  const setsLogged = isTraining ? Array.from({ length: ex.sets }).filter((_, i) => getLog(dayId, ex.name, i).reps !== "").length : 0;
  const allDone = isTraining && setsLogged === ex.sets;

  return (
    <div style={{
      background: "rgba(255,255,255,0.035)", border: `1px solid ${expanded ? color + "40" : allDone ? color + "30" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <button onClick={onToggle} className="ripple" style={{
        width: "100%", padding: "14px 16px", background: "transparent",
        border: "none", cursor: "pointer", textAlign: "left",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: allDone ? `${color}30` : `${color}18`, border: `1px solid ${allDone ? color + "80" : color + "33"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 13, color }}>{allDone ? "✓" : index + 1}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{ex.muscles}</div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color }}>{ex.sets}×{ex.reps}</div>
          {isTraining && (
            <div style={{ fontSize: 10, color: allDone ? color : "#475569", marginTop: 2 }}>
              {allDone ? "done" : setsLogged > 0 ? `${setsLogged}/${ex.sets} sets` : ""}
            </div>
          )}
          <span style={{ fontSize: 18, color: "#475569", display: "block", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "none" }}>⌄</span>
        </div>
      </button>

      {expanded && (
        <div className="ex-expand" style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {/* YouTube link */}
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.search)}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, marginBottom: 12, padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#fca5a5", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
            <span style={{ fontSize: 18 }}>▶</span>
            <div>
              <div>Watch on YouTube</div>
              <div style={{ fontSize: 11, color: "#ef4444", marginTop: 1, fontWeight: 400 }}>{ex.search}</div>
            </div>
          </a>

          {/* Setup */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>SETUP</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>{ex.anchor}</div>
          </div>

          {/* About */}
          {ex.desc && <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>ABOUT</div>
            <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{ex.desc}</div>
          </div>}

          {/* Tip */}
          <div style={{ background: `${color}0d`, border: `1px solid ${color}30`, borderRadius: 10, padding: "10px 12px", marginBottom: isTraining ? 12 : 0 }}>
            <div style={{ fontSize: 10, color, letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>💡 COACHING TIP</div>
            <div style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.65 }}>{ex.tip}</div>
          </div>

          {/* Inline set logging */}
          {isTraining && (
            <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "12px 12px 8px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 10, color, letterSpacing: "1px", fontWeight: 700, marginBottom: 10 }}>📊 LOG SETS</div>
              <div style={{ display: "grid", gridTemplateColumns: "26px 1fr 1fr", gap: 6, marginBottom: 6 }}>
                <div />
                <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "0.8px" }}>REPS</div>
                <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "0.8px" }}>RESISTANCE</div>
              </div>
              {Array.from({ length: ex.sets }).map((_, si) => {
                const log = getLog(dayId, ex.name, si);
                const lastLog = getLastWeekLog(dayId, ex.name, si);
                const done = log.reps !== "";
                const hasLastWeek = lastLog.weight !== "" || lastLog.reps !== "";
                return (
                  <div key={si} style={{ marginBottom: 9 }}>
                    {hasLastWeek && (
                      <div style={{ fontSize: 10, color: "#475569", marginBottom: 3, paddingLeft: 32, fontStyle: "italic" }}>
                        last week: {lastLog.reps && `${lastLog.reps} reps`}{lastLog.reps && lastLog.weight && " · "}{lastLog.weight && lastLog.weight}
                      </div>
                    )}
                    <div style={{ display: "grid", gridTemplateColumns: "26px 1fr 1fr", gap: 6, alignItems: "center" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 7, background: done ? `${color}25` : "rgba(255,255,255,0.05)", border: `1.5px solid ${done ? color : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: done ? color : "#475569" }}>{si + 1}</div>
                      <input className="inp" type="number" placeholder={lastLog.reps || ex.reps.toString()}
                        value={log.reps}
                        onChange={e => updateLog(dayId, ex.name, si, "reps", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "7px 10px", color: "#e2e8f0", fontSize: 14, width: "100%", fontFamily: "'DM Sans'" }} />
                      <input className="inp" type="text" placeholder={lastLog.weight || "band / lvl"}
                        value={log.weight}
                        onChange={e => updateLog(dayId, ex.name, si, "weight", e.target.value)}
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "7px 10px", color: "#e2e8f0", fontSize: 14, width: "100%", fontFamily: "'DM Sans'" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


const BODY_KEY = "recomp_body_log_v1";
const START = { weight: 143, bf: 17.7 };
const TARGET_BF = 12;
function loadBody() { try { const r = localStorage.getItem(BODY_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveBody(d) { try { localStorage.setItem(BODY_KEY, JSON.stringify(d)); } catch {} }
const isoDay = (d = new Date()) => d.toLocaleDateString("en-CA");
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return isoDay(d); };
const avg = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
const fmt = (v, dp = 1) => v == null ? "–" : v.toFixed(dp);

function StatsView({ completedDays, trainingDays }) {
  const [log, setLog] = useState(loadBody);
  const [form, setForm] = useState({ date: isoDay(), weight: "", waist: "", bf: "", cal: "", protein: "" });
  const FIELDS = [["weight", "Weight (lbs)"], ["waist", "Waist (in)"], ["bf", "Body fat %"], ["cal", "Calories"], ["protein", "Protein (g)"]];

  const save = () => {
    const entry = {};
    FIELDS.forEach(([k]) => { const v = parseFloat(form[k]); if (!isNaN(v)) entry[k] = v; });
    if (!Object.keys(entry).length) return;
    const next = { ...log, [form.date]: { ...log[form.date], ...entry } };
    setLog(next); saveBody(next);
    setForm(f => ({ ...f, weight: "", waist: "", bf: "", cal: "", protein: "" }));
  };

  const sorted = Object.entries(log).sort(([a], [b]) => (a < b ? -1 : 1));
  const vals = (key, fromAgo, toAgo) => sorted.filter(([d, e]) => d > daysAgo(fromAgo) && d <= daysAgo(toAgo) && e[key] != null).map(([, e]) => e[key]);
  const latest = key => { const r = [...sorted].reverse().find(([, e]) => e[key] != null); return r ? r[1][key] : null; };
  const first = key => { const r = sorted.find(([, e]) => e[key] != null); return r ? r[1][key] : null; };

  const wNow = avg(vals("weight", 7, 0)), wPrev = avg(vals("weight", 14, 7));
  const change = wNow != null && wPrev != null ? wNow - wPrev : null;
  const calAvg = avg(vals("cal", 7, 0)), proAvg = avg(vals("protein", 7, 0));
  const w0 = latest("weight") ?? START.weight, bf0 = latest("bf") ?? START.bf;
  const goalWeight = (w0 * (1 - bf0 / 100)) / (1 - TARGET_BF / 100);
  const bfPct = Math.max(0, Math.min(100, ((START.bf - bf0) / (START.bf - TARGET_BF)) * 100));
  const waistNow = latest("waist"), waistFirst = first("waist");

  let verdict = { text: "Log weigh-ins for two weeks to see your weekly pace.", color: "#64748b" };
  if (change != null) {
    if (change <= -1) verdict = { text: "Losing faster than 1 lb a week. Add about 200 kcal a day to protect muscle.", color: "#fb923c" };
    else if (change <= -0.4) verdict = { text: "On pace for a steady fat loss. Keep going.", color: "#34d399" };
    else verdict = { text: "Flat or slow. Check your logging (oils, drinks, weekends) before cutting calories further.", color: "#fbbf24" };
  }

  const pts = sorted.filter(([, e]) => e.weight != null).slice(-28).map(([, e]) => e.weight);
  let spark = null;
  if (pts.length >= 2) {
    const lo = Math.min(...pts), hi = Math.max(...pts), span = hi - lo || 1;
    spark = pts.map((p, i) => `${(i / (pts.length - 1)) * 296 + 2},${56 - ((p - lo) / span) * 50}`).join(" ");
  }

  const card = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px" };
  const lbl = { fontSize: 10, color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6, fontWeight: 700 };
  const big = c => ({ fontSize: 20, fontWeight: 700, color: c, fontFamily: "'Space Grotesk'" });
  const sub = { fontSize: 11, color: "#475569", marginTop: 2 };
  const cells = [
    { l: "Body fat", v: `${fmt(bf0)}%`, s: `goal ${TARGET_BF}%`, c: "#fb923c" },
    { l: "Goal weight", v: `${fmt(goalWeight)} lbs`, s: "if lean mass is kept", c: "#34d399" },
    { l: "Waist", v: waistNow != null ? `${fmt(waistNow)} in` : "–", s: waistNow != null && waistFirst != null ? `${waistNow - waistFirst > 0 ? "+" : ""}${fmt(waistNow - waistFirst)} since start` : "log to track", c: "#38bdf8" },
    { l: "Avg calories (7d)", v: calAvg != null ? Math.round(calAvg).toLocaleString() : "–", s: "target 1,900–2,100", c: "#fbbf24" },
    { l: "Avg protein (7d)", v: proAvg != null ? `${Math.round(proAvg)} g` : "–", s: "target 125–145 g", c: "#fb7185" },
    { l: "Fat to lose", v: `${fmt(Math.max(0, w0 - goalWeight))} lbs`, s: "to reach 12%", c: "#c084fc" },
  ];
  const recent = [...sorted].reverse().slice(0, 7);

  return (
    <div style={{ padding: "16px 14px 32px" }}>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 4 }}>Cut Progress</div>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 18 }}>Goal 12% body fat · judge the 7-day average, not a single weigh-in</div>

      {/* Weekly pace */}
      <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "18px 20px", marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: "1px", marginBottom: 10 }}>7-DAY AVERAGE WEIGHT</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={big("#fff")}>{wNow != null ? `${fmt(wNow)} lbs` : "–"}</span>
          {change != null && <span style={{ fontSize: 13, color: verdict.color, fontWeight: 600 }}>{change > 0 ? "+" : ""}{fmt(change)} lbs vs last week</span>}
        </div>
        <div style={{ fontSize: 12.5, color: verdict.color, marginTop: 8, lineHeight: 1.55 }}>{verdict.text}</div>
        {spark && <svg viewBox="0 0 300 60" style={{ width: "100%", height: 60, marginTop: 12 }}><polyline points={spark} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" /></svg>}
      </div>

      {/* Body fat progress */}
      <div style={{ ...card, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", ...lbl }}><span>Body fat progress</span><span>{START.bf}% → {TARGET_BF}%</span></div>
        <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ width: `${bfPct}%`, height: "100%", background: "#fb923c", transition: "width 0.3s" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {cells.map((c, i) => (
          <div key={i} style={card}><div style={lbl}>{c.l}</div><div style={big(c.c)}>{c.v}</div><div style={sub}>{c.s}</div></div>
        ))}
      </div>

      {/* Log form */}
      <div style={{ ...card, marginBottom: 12, padding: "14px 16px" }}>
        <div style={{ ...lbl, color: "#64748b", marginBottom: 10 }}>Log an entry</div>
        <input className="inp" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          style={{ width: "100%", marginBottom: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2e8f0", padding: "9px 10px", fontSize: 14 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {FIELDS.map(([k, name]) => (
            <input key={k} className="inp" type="number" inputMode="decimal" step="any" placeholder={name} value={form[k]}
              onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2e8f0", padding: "9px 10px", fontSize: 14, minWidth: 0 }} />
          ))}
        </div>
        <button onClick={save} className="ripple" style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 12, border: "none", background: "#34d399", color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save entry</button>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 8, lineHeight: 1.5 }}>Weigh in each morning under the same conditions. Fill only what you have; saving the same date again updates that day.</div>
      </div>

      {recent.length > 0 && (
        <div style={{ ...card, marginBottom: 12, padding: "12px 16px" }}>
          <div style={{ ...lbl, color: "#64748b" }}>Recent entries</div>
          {recent.map(([d, e]) => (
            <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", padding: "5px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span>{d}</span>
              <span>{[e.weight != null && `${e.weight} lb`, e.waist != null && `${e.waist}"`, e.bf != null && `${e.bf}%`, e.cal != null && `${e.cal} kcal`, e.protein != null && `${e.protein} g`].filter(Boolean).join(" · ")}</span>
            </div>
          ))}
        </div>
      )}

      {/* Training completion */}
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
        <div style={big("#34d399")}>{completedDays}/{trainingDays}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{completedDays === trainingDays ? "Week complete 🎉" : `${trainingDays - completedDays} session${trainingDays - completedDays !== 1 ? "s" : ""} left`}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Strength sessions logged this week</div>
        </div>
      </div>
    </div>
  );
}
