import React, { useState, useRef } from "react";

// ─── WORKOUT DATA ────────────────────────────────────────────────────────────
const DAYS = [
  {
    id: "monday", label: "MON", title: "Rest + APT Stretch", type: "rest", color: "#c084fc", icon: "🧘",
    stretches: [
      { name: "Kneeling Hip Flexor Stretch", reps: "60s each side", note: "The single most important APT correction stretch. Get into a half-kneeling lunge with your back knee on the floor. Squeeze the glute of the back leg and gently push your hips forward until you feel a deep stretch at the front of the hip. The psoas — your deepest hip flexor — is the primary driver of APT. Prolonged sitting shortens it chronically. Do this one even if you skip everything else." },
      { name: "Couch Stretch", reps: "45s each side", note: "Kneel facing away from a wall. Place the top of your back foot up on the surface behind you, front foot forward in a lunge. Slowly bring your torso upright. You will feel an intense stretch through the quad and deep hip flexor. The discomfort means it is working — this is one of the tightest areas in people who sit. Breathe through it and hold." },
      { name: "Child's Pose", reps: "60s", note: "Kneel and sit back toward your heels, arms stretched forward on the floor. Let your lower back completely decompress — it should feel like space opening between your vertebrae. Breathe deeply into your lower back on each inhale." },
      { name: "Lying Hamstring Stretch", reps: "45s each side", note: "Lie on your back. Loop a resistance band around the arch of one foot and hold both ends. Slowly straighten the leg toward the ceiling until you feel a firm pull in the back of the thigh. Keep the opposite leg flat on the floor." },
      { name: "Pigeon Pose / Figure-4", reps: "60s each side", note: "For figure-4: lie on your back, cross one ankle over the opposite knee and pull the uncrossed leg toward your chest. Both target the glute and piriformis — a tight piriformis limits glute activation, worsening APT." },
    ]
  },
  {
    id: "tuesday", label: "TUE", title: "Push + Core", type: "training", color: "#34d399", icon: "💪",
    warmup: [
      { name: "Wrist Extensor Stretch", sets: 2, reps: "30s each", note: "Extend one arm straight in front of you, palm facing down. Use your other hand to gently pull your fingers downward toward the floor until you feel a stretch along the top of the forearm." },
      { name: "Reverse Wrist Curl", sets: 2, reps: 15, note: "Loop a light band under your foot. Rest your forearm on your thigh with palm facing down. Slowly curl your wrist upward, hold for a beat, then lower with control." },
      { name: "Towel Twist", sets: 2, reps: "10 each dir", note: "Hold a small towel with both hands at shoulder width. Slowly wring it as if squeezing out water — twist in both directions for 10 reps each." },
    ],
    exercises: [
      { name: "Standing Chest Press", sets: 3, reps: "12-15", anchor: "Step on band, press forward", muscles: "Chest · Triceps · Front Delts", desc: "Stand with feet shoulder-width apart, both feet on the band. Hold a handle in each hand at chest height with elbows bent at roughly 90 degrees. Press both hands forward until arms are nearly straight, then slowly return.", tip: "Keep elbows slightly below shoulder height. Wrists must stay neutral at all times. Exhale as you press, inhale as you return. Slow the return to 3 seconds.", search: "resistance band chest press standing" },
      { name: "Overhead Press", sets: 3, reps: 12, anchor: "Step on band, press overhead", muscles: "Shoulders · Triceps · Upper Traps", desc: "Stand on the band with feet hip-width apart. Hold handles at shoulder height, elbows pointing slightly forward. Press both hands straight overhead until arms are fully extended.", tip: "Do not press with a wide grip — keep elbows forward. Use an open palm or loose grip to protect your elbows. Engage your core and do not arch your lower back.", search: "resistance band overhead shoulder press" },
      { name: "Lateral Raises", sets: 3, reps: 15, anchor: "Step on band, raise arms to sides", muscles: "Side Deltoids", desc: "Stand on the band. Hold handles at your sides with a slight bend in the elbows. Raise both arms out to the sides until they reach shoulder height, then lower with control.", tip: "Lead the movement with your elbows. Stop at shoulder height. Keep your torso completely still.", search: "resistance band lateral raise" },
      { name: "Tricep Pushdown", sets: 3, reps: 12, anchor: "Hold band overhead, push down", muscles: "Triceps", desc: "Loop the band above you or hold it overhead with one hand. Keep your upper arm pinned against your side. Extend your forearm downward until fully straight, squeezing the tricep at the bottom.", tip: "Upper arms do not move. Wrist stays completely neutral — critical for tennis elbow management.", search: "resistance band tricep pushdown" },
    ],
    core: [
      { name: "Posterior Pelvic Tilt Hold", sets: 3, reps: "20s", note: "Lie on your back, knees bent, feet flat. Flatten your lower back completely into the floor by simultaneously contracting your abs and squeezing your glutes." },
      { name: "Hollow Body Hold", sets: 3, reps: "20-30s", note: "Lie on your back, extend arms overhead and legs straight out low. Press your entire lower back into the ground and brace your core." },
      { name: "Plank Hold", sets: 3, reps: "30-40s", note: "Forearm plank with elbows directly under shoulders. Squeeze your glutes aggressively. Your body should form a perfectly straight line from head to heels." },
    ]
  },
  {
    id: "wednesday", label: "WED", title: "Run 5km", type: "cardio", color: "#38bdf8", icon: "🏃",
    note: "Easy-moderate pace, ~25 min. You should be able to hold a conversation — this is aerobic base building, not a race. Keep your hands and fists completely relaxed throughout.",
    preRun: [
      { name: "Kneeling Hip Flexor Stretch", reps: "60s each side", note: "Half-kneeling lunge, back knee on the floor. Running with tight hip flexors causes your pelvis to tilt forward (APT) and overloads your lower back." },
      { name: "Leg Swings", reps: "15 each leg", note: "Stand holding a wall for balance. Swing one leg forward and backward like a pendulum, gradually increasing the range over the reps. Then swing side to side." },
    ]
  },
  {
    id: "thursday", label: "THU", title: "Pull + Core", type: "training", color: "#fb7185", icon: "🔴",
    warmup: [
      { name: "Wrist Extensor Stretch", sets: 2, reps: "30s each", note: "Non-negotiable before any pulling session. Extend arm straight, palm down, and pull fingers toward you with the other hand." },
      { name: "Theraband Wrist Flexion", sets: 2, reps: 15, note: "Loop a light band under your foot. Hold with palm facing up, forearm resting on your thigh. Curl your wrist upward through its full range." },
      { name: "Reverse Wrist Curl", sets: 2, reps: 15, note: "Same setup but palm faces down. This directly loads the extensor carpi radialis — the primary tendon affected by tennis elbow." },
    ],
    exercises: [
      { name: "Seated Row", sets: 3, reps: "12-15", anchor: "Sit on floor, band around both feet", muscles: "Lats · Rhomboids · Biceps · Rear Delts", desc: "Sit on the floor with legs extended, band looped around both feet. Drive your elbows back past your torso, squeezing your shoulder blades together at the end.", tip: "OPEN PALM GRIP is essential. Take 3 full seconds to return your arms forward.", search: "resistance band seated row" },
      { name: "Face Pull", sets: 3, reps: 15, anchor: "Hold band at face height, pull toward forehead", muscles: "Rear Delts · Rotator Cuff · Upper Back", desc: "Hold the band at face height. Pull toward your forehead while flaring your elbows high and wide — hands end up beside your ears at finish.", tip: "Elbows must travel high. Wrists stay completely neutral throughout. Use a lighter band than feels necessary.", search: "resistance band face pull" },
      { name: "Hammer Curl", sets: 3, reps: 12, anchor: "Both feet on band, thumbs pointing up", muscles: "Biceps · Brachialis · Brachioradialis", desc: "Stand on the band. Hold handles with a neutral grip — thumbs pointing up. Curl both hands toward your shoulders keeping elbows pinned.", tip: "Neutral wrist throughout. Do not swing the elbows forward at the top. Slow 3-second descent.", search: "resistance band hammer curl" },
      { name: "Bent Over Row", sets: 3, reps: 12, anchor: "Both feet on band, hinge to 45 degrees", muscles: "Lats · Rhomboids · Rear Delts", desc: "Stand on the band, feet hip-width. Hinge forward at the hips to about 45 degrees, back flat. Row both handles toward your hips, driving elbows back.", tip: "Open palm grip only. Back must stay flat. Two seconds up, three seconds down.", search: "resistance band bent over row" },
    ],
    core: [
      { name: "Dead Bug", sets: 3, reps: "10 each side", note: "Lie on your back with arms pointing at the ceiling and knees bent at 90 degrees in the air. Slowly lower your right arm overhead while simultaneously extending your left leg." },
      { name: "Bicycle Crunch", sets: 3, reps: 20, note: "Lie on your back, hands lightly behind your head. Bring one knee toward your chest while rotating your opposite elbow toward it. The rotation trains the obliques." },
      { name: "Posterior Pelvic Tilt Hold", sets: 3, reps: "20s", note: "Lie on your back, knees bent. Flatten your entire lower back into the floor by contracting your abs and glutes simultaneously." },
    ]
  },
  {
    id: "friday", label: "FRI", title: "Lower Body", type: "training", color: "#fb923c", icon: "🦵",
    warmup: [
      { name: "Glute Bridge (activation)", sets: 2, reps: 15, note: "Lie on your back, knees bent, feet flat. Drive through your heels to lift your hips, squeezing your glutes hard at the top." },
      { name: "Clamshells with Band", sets: 2, reps: "15 each", note: "Lie on your side, band around thighs. Keeping feet together, rotate your top knee upward. This activates the glute medius." },
      { name: "Bird Dog", sets: 2, reps: "10 each side", note: "On hands and knees. Simultaneously extend your right arm forward and left leg back. Hold 2 seconds, return, repeat opposite side." },
      { name: "Bodyweight Squat", sets: 2, reps: 10, note: "Slow bodyweight squat. At the bottom position deliberately tuck your pelvis slightly — posterior tilt at depth. Take 3 seconds to lower." },
    ],
    exercises: [
      { name: "Banded Squat", sets: 3, reps: 15, anchor: "Both feet on band, handles at shoulders", muscles: "Quads · Glutes · Hamstrings · Core", desc: "Stand on the band with feet shoulder-width apart, toes slightly turned out. Sit back and down into a squat, keeping your chest tall.", tip: "Chest tall throughout. Knees must track over your second toe. At the bottom, the slight posterior pelvic tilt is the most important cue.", search: "resistance band squat" },
      { name: "Romanian Deadlift", sets: 3, reps: 12, anchor: "Both feet on band, hinge at hips", muscles: "Hamstrings · Glutes · Lower Back", desc: "Stand on the band. Push your hips back as far as possible while keeping your back completely flat, letting handles travel down your thighs.", tip: "Hips go back, not down. Keep handles close to your body. If your lower back rounds, reduce the range.", search: "resistance band romanian deadlift" },
      { name: "Lateral Band Walk", sets: 3, reps: "15 each way", anchor: "Band around ankles, constant tension", muscles: "Glute Medius · Hip Abductors · Quads", desc: "Band around your ankles, feet hip-width. Quarter-squat position. Step sideways maintaining constant band tension.", tip: "Maintain the quarter-squat throughout every step. Band must stay taut at all times.", search: "resistance band lateral walk" },
      { name: "Glute Bridge with Band", sets: 3, reps: 15, anchor: "Band across hips, ends held to floor", muscles: "Glutes · Hamstrings · Core · Hip Stabilisers", desc: "Lie on your back, band across hip bones. Drive through your heels to lift your hips, squeezing your glutes hard at the top.", tip: "The squeeze at the top is everything — hold it for a full second every rep. If hamstrings cramp, move feet further away.", search: "resistance band glute bridge" },
      { name: "Standing Hip Abduction", sets: 3, reps: "12 each leg", anchor: "Step on band with standing foot", muscles: "Glute Medius · Hip Abductors", desc: "Stand on the band with one foot. Raise the free leg out to the side in a controlled arc, leading with the heel.", tip: "Do not lean your torso to the side. Keep your pelvis level throughout.", search: "resistance band standing hip abduction" },
    ],
    apt: [
      { name: "Kneeling Hip Flexor Stretch", reps: "60s each side", note: "Half-kneeling on the floor, back knee down. Squeeze the glute of the back leg — this activation cue makes the stretch far more effective." },
      { name: "Couch Stretch", reps: "45s each side", note: "Facing away from a wall, place the top of one foot elevated on the surface behind you. This is the deepest hip flexor stretch available without equipment." },
    ]
  },
  {
    id: "saturday", label: "SAT", title: "Run or Rest", type: "cardio", color: "#94a3b8", icon: "😴",
    note: "Intentional buffer day before Sunday soccer. If you feel good, a light 5km run is beneficial. If your legs feel heavy or sore, take full rest. Showing up to soccer fatigued limits your performance and increases injury risk.",
    preRun: [
      { name: "Hip Flexor Stretch", reps: "60s each side", note: "Half-kneeling stretch. After Friday's lower body session your hip flexors may still be carrying residual tension." },
      { name: "Leg Swings", reps: "15 each leg", note: "Dynamic swing forward-back then side-to-side. Lubricates the hip joint and fires up the hip flexors and glutes before the run demands them." },
    ]
  },
  {
    id: "sunday", label: "SUN", title: "Soccer", type: "sport", color: "#fbbf24", icon: "⚽",
    note: "Soccer is full-body conditioning — sprinting, lateral cutting, jumping, and sustained aerobic effort all in one session. It counts as both your cardio and active recovery for the week. Be mindful of throw-ins: use a controlled wrist motion rather than snapping aggressively.",
    preRun: [
      { name: "Glute Bridge", reps: "2 × 15", note: "15 controlled glute bridges before stepping on the pitch. This fires the glute-brain connection so your glutes contribute to your first sprint." },
      { name: "Clamshells", reps: "2 × 15 each", note: "Activates the glute medius — your primary hip stabiliser during single-leg landing, cutting, and kicking." },
      { name: "Leg Swings", reps: "15 each leg", note: "Forward-back and side-to-side dynamic swings to mobilise the hip joint before explosive movement." },
    ]
  }
];

const PROGRESS_KEY = "workout_tracker_progress_v3";
const NUTRITION_KEY = "nutrition_log_v1";
function loadProgress() { try { const r = localStorage.getItem(PROGRESS_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveProgress(d) { try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(d)); } catch {} }
function loadNutrition() { try { const r = localStorage.getItem(NUTRITION_KEY); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveNutrition(d) { try { localStorage.setItem(NUTRITION_KEY, JSON.stringify(d)); } catch {} }

const TYPE_META = {
  training: { label: "STRENGTH" },
  cardio:   { label: "CARDIO" },
  rest:     { label: "RECOVERY" },
  sport:    { label: "SPORT" },
};

const DAILY_TARGETS = { calories: 2100, protein: 192, carbs: 210, fat: 70 };

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function WorkoutApp() {
  const [activeDay, setActiveDay] = useState("tuesday");
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedEx, setExpandedEx] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeSection, setActiveSection] = useState("workout");
  const [nutritionLog, setNutritionLog] = useState(loadNutrition);
  const scrollRef = useRef(null);

  const day = DAYS.find(d => d.id === activeDay) || DAYS[0];

  const getWeekKey = () => {
    const now = new Date(); now.setDate(now.getDate() + weekOffset * 7);
    const jan1 = new Date(now.getFullYear(), 0, 1);
    const week = Math.ceil(((now - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    return `${now.getFullYear()}-W${week}`;
  };
  const weekKey = getWeekKey();

  const getLog = (dayId, exName, set) => progress?.[weekKey]?.[dayId]?.[exName]?.[set] || { reps: "", weight: "" };
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
    setActiveDay(id); setActiveTab("plan"); setExpandedEx(null);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateNutrition = (dateKey, entries) => {
    const updated = { ...nutritionLog, [dateKey]: entries };
    setNutritionLog(updated);
    saveNutrition(updated);
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
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .slide-up { animation: slideUp 0.25s ease forwards; }
        .ex-expand { animation: fadeIn 0.2s ease forwards; }
        .inp:focus { outline: none; border-color: rgba(52,211,153,0.5) !important; background: rgba(52,211,153,0.04) !important; }
        .spinning { animation: spin 1s linear infinite; }
        .shimmer-bg {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      <div style={{ height: "env(safe-area-inset-top, 0px)", background: "#080810" }} />

      {/* TOP HEADER */}
      <div style={{ background: "#080810", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 16px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: "#fff" }}>
              Recomp Protocol
            </div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 1, letterSpacing: "0.3px" }}>
              42M · 144 lbs · 17.7% → 14%
            </div>
          </div>
          {activeSection === "workout" && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button onClick={() => setWeekOffset(w => w - 1)} className="ripple" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <div style={{ fontSize: 11, color: "#64748b", minWidth: 54, textAlign: "center" }}>
                {weekOffset === 0 ? "This week" : weekOffset > 0 ? `+${weekOffset}w` : `${weekOffset}w`}
              </div>
              <button onClick={() => setWeekOffset(w => w + 1)} className="ripple" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>
          )}
          {activeSection === "nutrition" && (
            <div style={{ fontSize: 11, color: "#64748b" }}>{new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</div>
          )}
        </div>

        {activeSection === "workout" && (
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
        )}

        {activeSection === "nutrition" && (
          <div style={{ paddingBottom: 12 }}>
            <NutritionDayTabs nutritionLog={nutritionLog} />
          </div>
        )}
      </div>

      {/* SCROLLABLE CONTENT */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {activeSection === "workout" && (
          <div style={{ padding: "12px 14px 24px" }}>
            {/* DAY HERO */}
            <div className="slide-up" style={{
              borderRadius: 20, padding: "18px 20px", marginBottom: 14,
              background: `linear-gradient(135deg, ${day.color}18 0%, ${day.color}08 100%)`,
              border: `1px solid ${day.color}30`, position: "relative", overflow: "hidden"
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
                    {day.type === "training" ? `${day.exercises?.length || 0} exercises · 3 rounds · ~25 min` :
                      day.type === "cardio" ? "~25 min · 5km aerobic base" :
                      day.type === "sport" ? "60–90 min · full body" : "Active recovery · 10 min"}
                  </div>
                </div>
              </div>
              {day.note && <div style={{ marginTop: 12, fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, borderTop: `1px solid ${day.color}20`, paddingTop: 12 }}>{day.note}</div>}
            </div>

            {day.type === "training" && (
              <div style={{ display: "flex", gap: 4, marginBottom: 14, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4 }}>
                {[{ id: "plan", label: "Exercises", icon: "📋" }, { id: "track", label: "Log Sets", icon: "📊" }].map(tab => (
                  <button key={tab.id} className="ripple" onClick={() => setActiveTab(tab.id)} style={{
                    flex: 1, padding: "10px", border: "none", borderRadius: 11,
                    background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
                    color: activeTab === tab.id ? "#fff" : "#64748b",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    boxShadow: activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                    transition: "all 0.2s"
                  }}>{tab.icon} {tab.label}</button>
                ))}
              </div>
            )}

            {day.warmup && <SectionBlock title="Warm-Up" icon="🔥" color="#fbbf24">{day.warmup.map((w, i) => <MiniCard key={i} item={w} color="#fbbf24" />)}</SectionBlock>}
            {day.preRun && <SectionBlock title="Pre-Activity" icon="🔥" color="#38bdf8">{day.preRun.map((w, i) => <MiniCard key={i} item={w} color="#38bdf8" />)}</SectionBlock>}

            {(activeTab === "plan" || day.type !== "training") && day.exercises && (
              <SectionBlock title="Main Lifts" icon="💪" color={day.color}>
                {day.exercises.map((ex, i) => (
                  <ExCard key={i} ex={ex} expanded={expandedEx === ex.name}
                    onToggle={() => setExpandedEx(expandedEx === ex.name ? null : ex.name)}
                    color={day.color} index={i} />
                ))}
              </SectionBlock>
            )}

            {activeTab === "track" && day.type === "training" && day.exercises && (
              <SectionBlock title="Log Sets" icon="📊" color={day.color}>
                {day.exercises.map((ex, i) => (
                  <TrackCard key={i} ex={ex} dayId={day.id} getLog={getLog} updateLog={updateLog} color={day.color} />
                ))}
              </SectionBlock>
            )}

            {day.core && <SectionBlock title="Core + APT" icon="🔲" color="#c084fc">{day.core.map((c, i) => <MiniCard key={i} item={c} color="#c084fc" />)}</SectionBlock>}
            {day.apt && <SectionBlock title="APT Stretches" icon="🧘" color="#c084fc">{day.apt.map((s, i) => <MiniCard key={i} item={s} color="#c084fc" />)}</SectionBlock>}
            {day.stretches && (
              <SectionBlock title="APT Stretch Routine" icon="🧘" color="#c084fc" badge="10 min">
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10, padding: "8px 12px", background: "rgba(192,132,252,0.07)", borderRadius: 10 }}>
                  Most important session of the week for fixing anterior pelvic tilt.
                </div>
                {day.stretches.map((s, i) => <MiniCard key={i} item={s} color="#c084fc" />)}
              </SectionBlock>
            )}
          </div>
        )}

        {activeSection === "stats" && (
          <StatsView completedDays={completedDays} trainingDays={trainingDays} />
        )}

        {activeSection === "nutrition" && (
          <NutritionView nutritionLog={nutritionLog} updateNutrition={updateNutrition} />
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ background: "#0c0c18", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", paddingBottom: "env(safe-area-inset-bottom, 0px)", flexShrink: 0 }}>
        {[
          { id: "workout", icon: "⚡", label: "Workout" },
          { id: "nutrition", icon: "🍽️", label: "Nutrition" },
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

// ─── NUTRITION VIEW ──────────────────────────────────────────────────────────
function NutritionDayTabs({ nutritionLog }) {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const label = i === 0 ? "Today" : d.toLocaleDateString("en-GB", { weekday: "short" });
    const hasEntries = (nutritionLog[key]?.length || 0) > 0;
    days.push({ key, label, hasEntries, isToday: i === 0 });
  }
  return (
    <div style={{ display: "flex", gap: 6, overflowX: "auto", msOverflowStyle: "none", scrollbarWidth: "none" }}>
      {days.map(d => (
        <div key={d.key} style={{
          flexShrink: 0, padding: "6px 12px", borderRadius: 16,
          background: d.isToday ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${d.isToday ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)"}`,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.5px",
          color: d.isToday ? "#34d399" : d.hasEntries ? "#94a3b8" : "#475569",
          display: "flex", alignItems: "center", gap: 4
        }}>
          {d.hasEntries && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />}
          {d.label}
        </div>
      ))}
    </div>
  );
}

function NutritionView({ nutritionLog, updateNutrition }) {
  const dateKey = todayKey();
  const entries = nutritionLog[dateKey] || [];

  const totals = entries.reduce((acc, e) => ({
    calories: acc.calories + (e.calories || 0),
    protein: acc.protein + (e.protein || 0),
    carbs: acc.carbs + (e.carbs || 0),
    fat: acc.fat + (e.fat || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addEntry = (entry) => {
    const updated = [...entries, { ...entry, id: Date.now() }];
    updateNutrition(dateKey, updated);
  };

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id);
    updateNutrition(dateKey, updated);
  };

  return (
    <div style={{ padding: "12px 14px 24px" }}>
      {/* Macro Summary Ring */}
      <MacroSummaryCard totals={totals} />

      {/* AI Photo Scanner */}
      <PhotoMacroScanner onAdd={addEntry} />

      {/* Manual Entry */}
      <ManualEntryCard onAdd={addEntry} />

      {/* Manual Entry — fallback */}
      <ManualEntryCard onAdd={addEntry} />

      {/* Food Log */}
      {entries.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: "#64748b", marginBottom: 10, textTransform: "uppercase" }}>Today's Log</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {entries.map(entry => (
              <FoodEntryCard key={entry.id} entry={entry} onDelete={() => deleteEntry(entry.id)} />
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div style={{ textAlign: "center", padding: "32px 0", color: "#334155" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🍽️</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>No meals logged yet</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Describe any food or meal above to get macros</div>
        </div>
      )}
    </div>
  );
}

function MacroSummaryCard({ totals }) {
  const pct = (val, target) => Math.min(100, Math.round((val / target) * 100));
  const macros = [
    { label: "Protein", val: totals.protein, target: DAILY_TARGETS.protein, unit: "g", color: "#fb7185" },
    { label: "Carbs", val: totals.carbs, target: DAILY_TARGETS.carbs, unit: "g", color: "#38bdf8" },
    { label: "Fat", val: totals.fat, target: DAILY_TARGETS.fat, unit: "g", color: "#fbbf24" },
  ];
  const calPct = pct(totals.calories, DAILY_TARGETS.calories);

  return (
    <div className="slide-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "16px 18px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 28, color: "#fff", lineHeight: 1 }}>
            {Math.round(totals.calories)}
            <span style={{ fontSize: 14, color: "#475569", fontWeight: 400, marginLeft: 4 }}>/ {DAILY_TARGETS.calories} kcal</span>
          </div>
          <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{calPct}% of daily target</div>
        </div>
        <div style={{ position: "relative", width: 60, height: 60 }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="5" />
            <circle cx="30" cy="30" r="24" fill="none" stroke={calPct >= 100 ? "#fb923c" : "#34d399"} strokeWidth="5"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - calPct / 100)}`}
              strokeLinecap="round" transform="rotate(-90 30 30)" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: calPct >= 100 ? "#fb923c" : "#34d399" }}>{calPct}%</div>
        </div>
      </div>

      {macros.map(m => (
        <div key={m.label} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 12, color: "#64748b" }}>{m.label}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: m.color }}>{Math.round(m.val)}{m.unit} <span style={{ color: "#334155", fontWeight: 400 }}>/ {m.target}{m.unit}</span></span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct(m.val, m.target)}%`, background: m.color, borderRadius: 4, transition: "width 0.5s ease", opacity: 0.85 }} />
          </div>
        </div>
      ))}

      {totals.protein < DAILY_TARGETS.protein * 0.7 && (
        <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: 10, fontSize: 12, color: "#fb7185" }}>
          ⚠️ Protein is critical for recomp — aim for {DAILY_TARGETS.protein}g before bed
        </div>
      )}
    </div>
  );
}

// ─── AI MACRO PARSER ─────────────────────────────────────────────────────────
// Accepts any free-text food description, calls Claude to parse macros
async function parseMacrosWithAI(description) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 600,
      system: `You are a precise nutrition database for a 42-year-old Bangladeshi male doing body recomposition: 2100 kcal/day target, 185-200g protein/day.

The user will describe a meal, snack, or food item in plain English — including quantities, combinations, and restaurant dishes from any cuisine.

Return ONLY a valid JSON object, no markdown, no backticks, no explanation:
{
  "foodName": "concise display name for the full entry",
  "servingDescription": "restate what was described as a portion summary",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "note": "one practical sentence about this food relative to recomp goals — protein density, timing, or swap suggestion"
}

Rules:
- When multiple items are listed (e.g. "yogurt with strawberries and almonds"), sum ALL their macros into ONE result
- Use standard USDA / nutrition database values for each component
- For restaurant dishes (shawarma, biryani, pad thai etc.) use typical restaurant portion values
- For vague quantities like "some nuts" or "a handful", use 30g as default
- For "1/2 cup" use ~120ml volume equivalent in grams for the food type
- Round all numbers to nearest whole integer`,
      messages: [{ role: "user", content: description }],
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API ${res.status}`);
  }
  const data = await res.json();
  const text = data.content?.map(c => c.text || "").join("") || "";
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── FOOD MACRO SCANNER ───────────────────────────────────────────────────────
function PhotoMacroScanner({ onAdd }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | result | error
  const [result, setResult] = useState(null);
  const [edit, setEdit] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const QUICK_PICKS = [
    "2 scrambled eggs on toast",
    "Chicken shawarma wrap",
    "½ cup Greek yogurt with 5 strawberries and almonds",
    "Dal and rice, home cooked",
    "Chicken biryani, restaurant",
    "Protein shake with banana",
    "3 roti with bhuna chicken",
    "Oats with milk and honey",
    "Grilled salmon 150g",
    "Caesar salad with chicken",
  ];

  const handleLookup = async (q) => {
    const text = (q || query).trim();
    if (!text) return;
    setStatus("loading");
    setResult(null);
    setErrorMsg("");
    try {
      const parsed = await parseMacrosWithAI(text);
      setResult(parsed);
      setEdit({ ...parsed });
      setStatus("result");
    } catch (err) {
      console.error(err);
      setErrorMsg("Couldn't calculate macros. Check your connection and try again.");
      setStatus("error");
    }
  };

  const handleAdd = () => {
    if (!edit) return;
    onAdd({
      foodName: edit.foodName,
      servingDescription: edit.servingDescription,
      calories: Number(edit.calories) || 0,
      protein: Number(edit.protein) || 0,
      carbs: Number(edit.carbs) || 0,
      fat: Number(edit.fat) || 0,
      source: "ai",
      notes: result?.note,
    });
    setQuery(""); setStatus("idle"); setResult(null); setEdit(null); setErrorMsg("");
  };

  const handleReset = () => {
    setStatus("idle"); setResult(null); setEdit(null); setErrorMsg("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: "#64748b", marginBottom: 8, textTransform: "uppercase" }}>🤖 AI Macro Calculator</div>

      {/* Input — always show unless viewing result */}
      {status !== "result" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              ref={inputRef}
              className="inp"
              placeholder='Describe anything — "chicken shawarma" or "½ cup yogurt with strawberries and nuts"'
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && status !== "loading" && handleLookup()}
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: 13, padding: "12px 14px", color: "#e2e8f0", fontSize: 14,
                fontFamily: "'DM Sans'", lineHeight: 1.4,
              }}
            />
            <button
              onClick={() => handleLookup()}
              disabled={!query.trim() || status === "loading"}
              className="ripple"
              style={{
                padding: "12px 16px", borderRadius: 13, border: "none", flexShrink: 0,
                background: query.trim() && status !== "loading" ? "rgba(52,211,153,0.18)" : "rgba(255,255,255,0.05)",
                color: query.trim() && status !== "loading" ? "#34d399" : "#334155",
                cursor: query.trim() && status !== "loading" ? "pointer" : "default",
                fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
              {status === "loading"
                ? <span className="spinning" style={{ display: "inline-block", fontSize: 16 }}>⚙️</span>
                : "→"}
            </button>
          </div>

          {/* Quick picks */}
          {status === "idle" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {QUICK_PICKS.map(p => (
                <button key={p} onClick={() => { setQuery(p); handleLookup(p); }} className="ripple" style={{
                  padding: "4px 11px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)", color: "#64748b", cursor: "pointer",
                  fontSize: 11, fontWeight: 500, transition: "all 0.15s",
                }}>{p}</button>
              ))}
            </div>
          )}

          {/* Loading skeleton */}
          {status === "loading" && (
            <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
              <div className="shimmer-bg" style={{ height: 11, borderRadius: 5, width: "55%", marginBottom: 9 }} />
              <div className="shimmer-bg" style={{ height: 9, borderRadius: 5, width: "35%", marginBottom: 14 }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                {[1,2,3,4].map(i => <div key={i} className="shimmer-bg" style={{ height: 32, borderRadius: 8 }} />)}
              </div>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div style={{ padding: "12px 14px", background: "rgba(251,113,133,0.07)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: 12 }}>
              <div style={{ fontSize: 12.5, color: "#fb7185", marginBottom: 8, lineHeight: 1.5 }}>{errorMsg}</div>
              <button onClick={handleReset} className="ripple" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 14px", color: "#94a3b8", cursor: "pointer", fontSize: 12 }}>Try again</button>
            </div>
          )}
        </>
      )}

      {/* Result card */}
      {status === "result" && edit && (
        <div className="slide-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 16, overflow: "hidden" }}>
          {/* Summary header */}
          <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0", marginBottom: 2 }}>{edit.foodName}</div>
                <div style={{ fontSize: 11.5, color: "#475569" }}>{edit.servingDescription}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 24, color: "#34d399", lineHeight: 1 }}>{edit.calories}</div>
                <div style={{ fontSize: 10, color: "#475569" }}>kcal</div>
              </div>
            </div>
            {result?.note && (
              <div style={{ marginTop: 9, fontSize: 12, color: "#64748b", fontStyle: "italic", lineHeight: 1.55 }}>💡 {result.note}</div>
            )}
          </div>

          {/* Editable macro grid */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "1px", marginBottom: 10 }}>ADJUST IF NEEDED</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { key: "calories", label: "Cal", color: "#34d399", unit: "kcal" },
                { key: "protein", label: "Protein", color: "#fb7185", unit: "g" },
                { key: "carbs", label: "Carbs", color: "#38bdf8", unit: "g" },
                { key: "fat", label: "Fat", color: "#fbbf24", unit: "g" },
              ].map(f => (
                <div key={f.key} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "#475569", marginBottom: 5, fontWeight: 600 }}>{f.label}</div>
                  <input className="inp" type="number" value={edit[f.key]}
                    onChange={e => setEdit(r => ({ ...r, [f.key]: e.target.value }))}
                    style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: `1px solid ${f.color}35`, borderRadius: 10, padding: "8px 3px", color: f.color, fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk'", textAlign: "center" }} />
                  <div style={{ fontSize: 9, color: "#334155", marginTop: 3 }}>{f.unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex" }}>
            <button onClick={handleReset} className="ripple" style={{ flex: 1, padding: "14px", background: "transparent", border: "none", color: "#475569", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>← Search again</button>
            <button onClick={handleAdd} className="ripple" style={{ flex: 2, padding: "14px", background: "rgba(52,211,153,0.11)", border: "none", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "#34d399", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>+ Add to Log</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MANUAL ENTRY ────────────────────────────────────────────────────────────
function ManualEntryCard({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ foodName: "", calories: "", protein: "", carbs: "", fat: "" });

  const handleAdd = () => {
    if (!form.foodName || !form.calories) return;
    onAdd({
      foodName: form.foodName,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fat: Number(form.fat) || 0,
      source: "manual",
    });
    setForm({ foodName: "", calories: "", protein: "", carbs: "", fat: "" });
    setOpen(false);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      {!open ? (
        <button onClick={() => setOpen(true)} className="ripple" style={{
          width: "100%", padding: "12px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
          background: "rgba(255,255,255,0.03)", cursor: "pointer", color: "#64748b",
          display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500
        }}>
          <span style={{ fontSize: 16 }}>✏️</span> Enter macros manually
        </button>
      ) : (
        <div className="slide-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", letterSpacing: "1px", marginBottom: 10 }}>MANUAL ENTRY</div>
          <input className="inp" placeholder="Food name *" value={form.foodName}
            onChange={e => setForm(f => ({ ...f, foodName: e.target.value }))}
            style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 12px", color: "#e2e8f0", fontSize: 14, marginBottom: 8, fontFamily: "'DM Sans'" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { key: "calories", label: "Kcal", color: "#34d399" },
              { key: "protein", label: "Protein g", color: "#fb7185" },
              { key: "carbs", label: "Carbs g", color: "#38bdf8" },
              { key: "fat", label: "Fat g", color: "#fbbf24" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 10, color: "#475569", marginBottom: 4 }}>{f.label}</div>
                <input className="inp" type="number" placeholder="0" value={form[f.key]}
                  onChange={e => setForm(ff => ({ ...ff, [f.key]: e.target.value }))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${f.color}25`, borderRadius: 8, padding: "8px", color: f.color, fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk'" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setOpen(false)} className="ripple" style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#64748b", cursor: "pointer", fontSize: 13 }}>Cancel</button>
            <button onClick={handleAdd} className="ripple" style={{ flex: 2, padding: "10px", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 10, color: "#34d399", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>+ Add Entry</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FOOD ENTRY CARD ─────────────────────────────────────────────────────────
function FoodEntryCard({ entry, onDelete }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 12 }}>{entry.source === "photo" ? "📸" : entry.source === "ai" ? "🤖" : "✏️"}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{entry.foodName}</span>
        </div>
        {entry.servingDescription && <div style={{ fontSize: 11, color: "#475569", marginBottom: 6 }}>{entry.servingDescription}</div>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#34d399", fontFamily: "'Space Grotesk'" }}>{entry.calories} kcal</span>
          <span style={{ fontSize: 11, color: "#fb7185" }}>P: {entry.protein}g</span>
          <span style={{ fontSize: 11, color: "#38bdf8" }}>C: {entry.carbs}g</span>
          <span style={{ fontSize: 11, color: "#fbbf24" }}>F: {entry.fat}g</span>
        </div>
      </div>
      <button onClick={onDelete} className="ripple" style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", color: "#475569", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
    </div>
  );
}

// ─── EXISTING COMPONENTS ─────────────────────────────────────────────────────
function SectionBlock({ title, icon, color, badge, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color, textTransform: "uppercase" }}>{title}</span>
        {badge && <span style={{ fontSize: 10, background: `${color}20`, color, borderRadius: 6, padding: "1px 7px", fontWeight: 700 }}>{badge}</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function MiniCard({ item, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => item.note && setOpen(o => !o)} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px", cursor: item.note ? "pointer" : "default" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0" }}>{item.name}</div>
          {item.sets && <div style={{ fontSize: 11, color, marginTop: 3 }}>{item.sets} sets × {item.reps}</div>}
          {!item.sets && item.reps && <div style={{ fontSize: 11, color, marginTop: 3 }}>{item.reps}</div>}
        </div>
        {item.note && <span style={{ color: "#475569", fontSize: 14, marginLeft: 8, flexShrink: 0, transition: "transform 0.2s", display: "inline-block", transform: open ? "rotate(180deg)" : "none" }}>⌄</span>}
      </div>
      {open && item.note && (
        <div className="ex-expand" style={{ marginTop: 10, fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 10 }}>{item.note}</div>
      )}
    </div>
  );
}

function ExCard({ ex, expanded, onToggle, color, index }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.035)", border: `1px solid ${expanded ? color + "40" : "rgba(255,255,255,0.07)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
      <button onClick={onToggle} className="ripple" style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 13, color }}>{index + 1}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{ex.muscles}</div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color }}>{ex.sets}×{ex.reps}</div>
          <span style={{ fontSize: 18, color: "#475569", display: "block", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "none" }}>⌄</span>
        </div>
      </button>
      {expanded && (
        <div className="ex-expand" style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.search)}`} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, marginBottom: 12, padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#fca5a5", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
            <span style={{ fontSize: 18 }}>▶</span>
            <div><div>Watch on YouTube</div><div style={{ fontSize: 11, color: "#ef4444", marginTop: 1, fontWeight: 400 }}>{ex.search}</div></div>
          </a>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>SETUP</div>
            <div style={{ fontSize: 13, color: "#94a3b8" }}>{ex.anchor}</div>
          </div>
          {ex.desc && <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>ABOUT</div>
            <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{ex.desc}</div>
          </div>}
          <div style={{ background: `${color}0d`, border: `1px solid ${color}30`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color, letterSpacing: "1px", marginBottom: 4, fontWeight: 700 }}>💡 COACHING TIP</div>
            <div style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.65 }}>{ex.tip}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TrackCard({ ex, dayId, getLog, updateLog, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 14px" }}>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#e2e8f0" }}>{ex.name}</div>
      <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr", gap: 6, marginBottom: 6 }}>
        <div /><div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.8px", fontWeight: 700 }}>REPS</div>
        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.8px", fontWeight: 700 }}>RESISTANCE</div>
      </div>
      {Array.from({ length: ex.sets }).map((_, si) => {
        const log = getLog(dayId, ex.name, si);
        const done = log.reps !== "";
        return (
          <div key={si} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr", gap: 6, marginBottom: 7, alignItems: "center" }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: done ? `${color}25` : "rgba(255,255,255,0.05)", border: `1.5px solid ${done ? color : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done ? color : "#475569" }}>{si + 1}</div>
            <input className="inp" type="number" placeholder={ex.reps.toString()} value={log.reps}
              onChange={e => updateLog(dayId, ex.name, si, "reps", e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 10px", color: "#e2e8f0", fontSize: 14, width: "100%", fontFamily: "'DM Sans'" }} />
            <input className="inp" type="text" placeholder="band / lvl" value={log.weight}
              onChange={e => updateLog(dayId, ex.name, si, "weight", e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 10px", color: "#e2e8f0", fontSize: 14, width: "100%", fontFamily: "'DM Sans'" }} />
          </div>
        );
      })}
    </div>
  );
}

function StatsView({ completedDays, trainingDays }) {
  const stats = [
    { label: "Current Weight", val: "144 lbs", sub: "starting point", color: "#38bdf8" },
    { label: "Target Weight", val: "145 lbs", sub: "net +1 lb", color: "#34d399" },
    { label: "Current Body Fat", val: "17.7%", sub: "~25.5 lbs fat", color: "#fb923c" },
    { label: "Target Body Fat", val: "≤14%", sub: "lose ~5–6 lbs fat", color: "#34d399" },
    { label: "Lean Mass Now", val: "118.5 lbs", sub: "baseline", color: "#38bdf8" },
    { label: "Lean Mass Target", val: "~124.7 lbs", sub: "gain ~6 lbs", color: "#34d399" },
    { label: "Daily Calories", val: "~2,100", sub: "near maintenance", color: "#fbbf24" },
    { label: "Daily Protein", val: "185–200g", sub: "non-negotiable", color: "#fb7185" },
  ];

  return (
    <div style={{ padding: "16px 14px 32px" }}>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 4 }}>Recomp Targets</div>
      <div style={{ fontSize: 12, color: "#475569", marginBottom: 18 }}>5–8 month timeline · Scale barely moves</div>
      <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 20, padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#34d399", letterSpacing: "1px", marginBottom: 12 }}>WEEKLY COMPLETION</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="5" />
              <circle cx="36" cy="36" r="28" fill="none" stroke="#34d399" strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - completedDays / trainingDays)}`}
                strokeLinecap="round" transform="rotate(-90 36 36)" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#34d399", fontFamily: "'Space Grotesk'" }}>{completedDays}</span>
              <span style={{ fontSize: 9, color: "#64748b" }}>/ {trainingDays}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>{completedDays === trainingDays ? "Week complete! 🎉" : `${trainingDays - completedDays} session${trainingDays - completedDays !== 1 ? "s" : ""} left`}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Training days logged this week</div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6, fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'Space Grotesk'" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: "1px", marginBottom: 8 }}>REMEMBER</div>
        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>The scale will barely move — that's the point of recomp. Track your waist measurement and how clothes fit. Muscle gain and fat loss happening simultaneously shows up in the mirror, not on the scale.</div>
      </div>
    </div>
  );
}
