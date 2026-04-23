import { useState } from "react";

const EVENTS = [
  { id:0,  date:"Aug 2, 2025",        phase:"Beginning",      type:"milestone",
    desc:"Sophia and Henrique meet for the first time." },
  { id:1,  date:"Aug 9, 2025",        phase:"Beginning",      type:"milestone",
    desc:"Their first official date — the relationship begins." },
  { id:2,  date:"Aug 17, 2025",       phase:"Beginning",      type:"milestone",
    desc:"First church mass attended together, followed by pizza with friends Giles and Nova." },
  { id:3,  date:"Aug 23, 2025",       phase:"Beginning",      type:"milestone",
    desc:"Sophia meets Henrique's first friend, Mike." },
  { id:4,  date:"Aug 31, 2025",       phase:"Beginning",      type:"milestone",
    desc:"Henrique meets Sophia's mom for the first time." },
  { id:5,  date:"Sep 1, 2025",        phase:"Early",          type:"milestone",
    desc:"First hike together with Minnie." },
  { id:6,  date:"Sep 3, 2025",        phase:"Early",          type:"ex",   sev:"minor",    awd:false, role:"Initiated the conversation", rupNum:1,
    desc:"First boundaries conversation about Henrique's exes and female connections on social media, held after a DOPO dinner during an evening walk with Minnie on 4th Street." },
  { id:7,  date:"Sep 13, 2025",       phase:"Early",          type:"milestone",
    desc:"First pickleball game played together." },
  { id:8,  date:"Sep 14, 2025",       phase:"Early",          type:"ex",   sev:"minor",    awd:false, role:"Initiated the conversation", rupNum:2,
    desc:"Second boundaries conversation, held at the confessions bench. On this same occasion, Henrique said 'I love you' to Sophia for the first time.",
    milestoneNote:"💛 First 'I love you' from Henrique." },
  { id:9,  date:"Sep 21, 2025",       phase:"Early",          type:"milestone",
    desc:"Henrique meets Sophia's dad for the first time." },
  { id:10, date:"Sep 24, 2025",       phase:"Early",          type:"ex",   sev:"moderate", awd:true,  role:"Direct confrontation", rupNum:3,
    desc:"Third boundaries conversation, following pickleball at Lindsay Park. During the discussion, Henrique asked 'Are we done?' for the first time — an expression of frustration rather than a deliberate withdrawal from the relationship.",
    awdNote:"AWD #1 — A frustrated reaction to the boundary conversation. Not yet a pattern." },
  { id:11, date:"Oct 1, 2025",        phase:"Building",       type:"milestone",
    desc:"First BTS concert attended together — Henrique's first experience of the show." },
  { id:12, date:"Oct 6, 2025",        phase:"Building",       type:"ex",   sev:"moderate", awd:false, role:"Initiated the conversation", rupNum:4,
    desc:"Fourth boundaries conversation, held over coffee at a Yemeni café." },
  { id:13, date:"Oct 11, 2025",       phase:"Building",       type:"milestone",
    desc:"Thanksgiving — a warm and connected day together." },
  { id:14, date:"Oct 17, 2025",       phase:"Building",       type:"ex",   sev:"moderate", awd:false, role:"Initiated the conversation", rupNum:5,
    desc:"Fifth boundaries conversation, during the Rocky Mountain Fest." },
  { id:15, date:"Oct 18–19, 2025",    phase:"Building",       type:"milestone",
    desc:"First overnight trip together — hot springs camping. A meaningful stress test that helped deepen trust between them." },
  { id:16, date:"Oct 23, 2025",       phase:"Building",       type:"ex",   sev:"major",    awd:true,  role:"Confronted directly; set explicit boundary", rupNum:6,
    desc:"Sixth boundaries conversation, which escalated into a significant fight after pickleball. Henrique said 'Are we done?' for the second time. Following this incident, Sophia explicitly asked him never to threaten withdrawal from the relationship when feeling insecure — and he agreed.",
    awdNote:"AWD #2 — Sophia set an explicit boundary: never do this again. He agreed." },
  { id:17, date:"Oct 24, 2025",       phase:"Building",       type:"milestone",
    desc:"First dance class taken together." },
  { id:18, date:"Oct 26, 2025",       phase:"Building",       type:"ex",   sev:"moderate", awd:false, role:"Initiated the conversation", rupNum:7,
    desc:"Seventh boundaries conversation, held in the car — a resolution attempt in the days following the October 23rd fight." },
  { id:19, date:"Nov 1, 2025",        phase:"Building",       type:"milestone",
    desc:"First somatic yoga class attended together." },
  { id:20, date:"Nov 2, 2025",        phase:"Building",       type:"ex",   sev:"major",    awd:false, role:"Fight escalated", rupNum:8,
    desc:"Eighth boundaries conversation about exes, which escalated into a fight at Fonda Fora restaurant." },
  { id:21, date:"Nov 5, 2025",        phase:"Building",       type:"milestone",
    desc:"First gym workout done together." },
  { id:22, date:"Nov 30–Dec 5, 2025", phase:"Fall",           type:"abuse",sev:"major",    awd:false, role:"Confronted the deception", rupNum:9, abuseNum:1,
    desc:"A fight following a church service led to a major rupture when Sophia discovered that Henrique had misled her about the timeline of his breakup with his ex — he had ended that relationship only hours before their first meeting, and had concealed this from Sophia for months.",
    abuseNote:"EMOTIONAL ABUSE #1 — Sustained lying and manipulation about the ex's breakup timeline. An active deception by omission maintained across the first months of the relationship." },
  { id:23, date:"Dec 10, 2025",       phase:"Fall",           type:"milestone",
    desc:"First sleepover at Sophia's home." },
  { id:24, date:"Dec 11, 2025",       phase:"Fall",           type:"milestone",
    desc:"First time volunteering together." },
  { id:25, date:"Dec 12, 2025",       phase:"Fall",           type:"socials",sev:"major",  awd:false, role:"Confronted scanning; snapped during the evening", rupNum:10,
    desc:"At Patrick's party, Sophia noticed Henrique scanning other women in the room and became upset. The evening escalated into the 'Barbarella fight' — a confrontation about his ex nephew-in-law still appearing on his social media. Sophia snapped during the interaction.",
    reactionNote:"Sophia snapped in response to the scanning behaviour observed at the party." },
  { id:26, date:"Dec 21–23, 2025",    phase:"Fall",           type:"ex",   sev:"major",    awd:false, role:"Confronted directly", rupNum:11,
    desc:"A trust rupture over female contacts and a person named Tom. The conflict remained unresolved for several days before the two met at Deville Coffee on December 23rd to work through it." },
  { id:27, date:"Jan 22, 2026",       phase:"Escalation",     type:"milestone",
    desc:"First overseas trip together — to Argentina." },
  { id:28, date:"Jan 30, 2026",       phase:"Escalation",     type:"milestone",
    desc:"Sophia meets Henrique's family for the first time." },
  { id:29, date:"Feb 2, 2026",        phase:"Escalation",     type:"milestone",
    desc:"Sophia meets Henrique's father." },
  { id:30, date:"Feb 17, 2026",       phase:"Escalation",     type:"abuse",sev:"redline",  awd:true,  role:"Issued a direct ultimatum", rupNum:12, abuseNum:2,
    desc:"A significant rupture following a Darwin Dogma event. Henrique said 'Are we done?' for the third time — a direct violation of the explicit boundary Sophia had set after the second incident in October 2025.",
    abuseNote:"EMOTIONAL ABUSE #2 — Henrique weaponised 'Are we done?' after Sophia had explicitly asked him never to do this again. He knew the boundary and chose to violate it.",
    awdNote:"AWD #3 — This is no longer frustration. Violating an explicit, agreed boundary is emotional abuse." },
  { id:31, date:"Feb 18, 2026",       phase:"Escalation",     type:"milestone",
    desc:"Sophia meets Henrique's mother." },
  { id:32, date:"Feb 20, 2026",       phase:"Escalation",     type:"lying",sev:"redline",  awd:false, role:"Left behind without resolution", rupNum:13,
    desc:"A major rupture during which Sophia was abandoned at Julian's house — left without support or resolution during an active conflict." },
  { id:33, date:"Feb 24, 2026",       phase:"Escalation",     type:"lying",sev:"major",    awd:false, role:"Confronted the gaslighting", rupNum:14,
    desc:"A fight about Henrique adding and re-adding women on Instagram, which he denied or minimised despite evidence. The conversation devolved into gaslighting." },
  { id:34, date:"Feb 25, 2026",       phase:"Escalation",     type:"milestone",
    desc:"Sophia and Henrique get matching couples tattoos together." },
  { id:35, date:"Mar 1, 2026",        phase:"Escalation",     type:"reaction",sev:"moderate",awd:false,role:"Reacted to the cumulative pattern", rupNum:15,
    desc:"Sophia snapped at Henrique while in Sao Lourenco — a reaction to the accumulation of unresolved tensions from the weeks prior." },
  { id:36, date:"Mar 3, 2026",        phase:"Escalation",     type:"reaction",sev:"moderate",awd:false,role:"Reacted to the cumulative pattern", rupNum:16,
    desc:"Sophia snapped at Henrique before a gym session — a further reactive episode driven by the ongoing unresolved pattern." },
  { id:37, date:"Mar 7, 2026",        phase:"Escalation",     type:"reaction",sev:"moderate",awd:false,role:"Reacted to the cumulative pattern", rupNum:17,
    desc:"Sophia snapped at Henrique while travelling in Campos do Jordão — a third reactive episode during the trip." },
  { id:38, date:"Mar 20, 2026",       phase:"Escalation",     type:"socials",sev:"major",   awd:false, role:"Confronted directly", rupNum:18,
    desc:"A rupture over Henrique's continued connection with his ex sister-in-law on Facebook — the same pattern of maintaining digital ties to ex-adjacent women that had been raised throughout the relationship." },
  { id:39, date:"Mar 28–29, 2026",    phase:"Breaking Point", type:"reaction",sev:"major",  awd:false, role:"Snapped over broken commitments", rupNum:19,
    desc:"Sophia snapped after Henrique failed to follow through on commitments he had made regarding a book and his social media boundaries. The rupture reflected her frustration with a recurring pattern of promises made but not kept." },
  { id:40, date:"Mar 30, 2026",       phase:"Breaking Point", type:"abuse",sev:"redline",   awd:false, role:"Confronted the betrayal", rupNum:20, abuseNum:3,
    desc:"Sophia discovered that Henrique had exchanged contact information with another woman the day prior — a direct act of emotional betrayal and a clear crossing of a core relationship boundary.",
    abuseNote:"EMOTIONAL ABUSE #3 — Active emotional betrayal. Henrique exchanged contact information with another woman the day before Sophia discovered it." },
  { id:41, date:"Mar 31–Apr 4, 2026", phase:"Breaking Point", type:"abuse",sev:"redline",   awd:false, role:"Named the patterns of abuse directly", rupNum:21, abuseNum:4,
    desc:"A confrontation lasting over seven hours, primarily at the Calgary Tower, during which Sophia explicitly named the patterns of emotional abuse, gaslighting, lies, manipulation, and lies by omission that had built throughout the relationship. Henrique responded with defensiveness and further manipulation rather than accountability. This was the longest and most severe single incident in the relationship.",
    abuseNote:"EMOTIONAL ABUSE #4 — Defensive manipulation and gaslighting deployed as a response to being confronted about the betrayal. Accountability was refused." },
  { id:42, date:"Apr 4, 2026",        phase:"Reconciliation", type:"milestone",
    desc:"The two reconciled. Sophia asked Henrique to plan a romantic date in the near future as a step toward reconnection." },
  { id:43, date:"Apr 5, 2026",        phase:"Reconciliation", type:"milestone",
    desc:"Henrique met Sophia's extended family on Tomb Sweeping Day — a meaningful cultural occasion shared together." },
  { id:44, date:"Apr 19 – Present",   phase:"Reconciliation", type:"ex",   sev:"major",    awd:false, role:"Expressed an unmet need", rupNum:22, ongoing:true,
    desc:"A rupture beginning on Sophia's birthday, April 19th, during which she felt her emotional investment was not being reciprocated. The conflict remains ongoing and unresolved as of April 22, 2026." },
];

const TYPE_CONFIG = {
  ex:        { label:"Ex / Female Connections", color:"#E53935", bg:"#FFEBEE", dot:"#E53935" },
  lying:     { label:"Lying / Omission",         color:"#AD1457", bg:"#FCE4EC", dot:"#AD1457" },
  socials:   { label:"Scanning / Socials",        color:"#E65100", bg:"#FFF3E0", dot:"#E65100" },
  abuse:     { label:"Emotional Abuse",            color:"#4A148C", bg:"#EDE7F6", dot:"#7B1FA2" },
  reaction:  { label:"Sophia's Reaction",          color:"#880E4F", bg:"#FDE8F0", dot:"#F48FB1" },
  milestone: { label:"Positive Milestone",         color:"#1B5E20", bg:"#E8F5E9", dot:"#4CAF50" },
};

const SEV_CONFIG = {
  redline:  { label:"Red Line", bg:"#B71C1C", fg:"#fff" },
  major:    { label:"Major",    bg:"#E53935", fg:"#fff" },
  moderate: { label:"Moderate", bg:"#FB8C00", fg:"#fff" },
  minor:    { label:"Minor",    bg:"#43A047", fg:"#fff" },
};

const PHASE_COLORS = {
  "Beginning":"#4CAF50","Early":"#81C784","Building":"#FFB300",
  "Fall":"#F4511E","Escalation":"#C62828","Breaking Point":"#880E4F","Reconciliation":"#6A1B9A",
};

const MONTHLY = [
  {month:"Sep '25",ruptures:3,reactions:0},{month:"Oct '25",ruptures:3,reactions:0},
  {month:"Nov '25",ruptures:1,reactions:0},{month:"Dec '25",ruptures:2,reactions:1},
  {month:"Jan '26",ruptures:0,reactions:0},{month:"Feb '26",ruptures:3,reactions:0},
  {month:"Mar '26",ruptures:4,reactions:4},{month:"Apr '26",ruptures:2,reactions:0},
];

const ABUSE_EVENTS = EVENTS.filter(e => e.abuseNum);

export default function App() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("timeline");

  const filtered = filter==="all" ? EVENTS
    : filter==="ruptures" ? EVENTS.filter(e=>e.type!=="milestone")
    : filter==="milestones" ? EVENTS.filter(e=>e.type==="milestone")
    : EVENTS.filter(e=>e.type===filter);

  const totalRuptures   = EVENTS.filter(e=>e.type!=="milestone").length;
  const totalMilestones = EVENTS.filter(e=>e.type==="milestone").length;
  const awdCount        = EVENTS.filter(e=>e.awd).length;
  const reactionCount   = EVENTS.filter(e=>e.type==="reaction").length;
  const maxMonthly      = Math.max(...MONTHLY.map(m=>m.ruptures+m.reactions));

  return (
    <div style={{fontFamily:"'Georgia',serif",background:"#FAFAFA",minHeight:"100vh",color:"#1A1A2E"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#1A1A2E 0%,#16213E 60%,#0F3460 100%)",padding:"28px 24px 20px",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <p style={{color:"#9FA8DA",fontSize:11,letterSpacing:3,textTransform:"uppercase",margin:"0 0 6px"}}>Relationship Pattern Analysis</p>
          <h1 style={{color:"#fff",fontSize:22,fontWeight:"normal",margin:"0 0 3px",fontStyle:"italic"}}>Sophia & Henrique</h1>
          <p style={{color:"#7986CB",fontSize:12,margin:"0 0 16px",letterSpacing:1}}>Aug 2, 2025 — Present · Apr 22, 2026 (Ongoing)</p>
          <div style={{display:"flex",gap:4}}>
            {["timeline","summary","frequency"].map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{background:tab===t?"#E8EAF6":"transparent",color:tab===t?"#1A1A2E":"#9FA8DA",border:"none",borderRadius:6,padding:"6px 16px",fontSize:12,cursor:"pointer",textTransform:"capitalize",fontFamily:"inherit",letterSpacing:1}}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:880,margin:"0 auto",padding:"20px 16px"}}>

        {/* TIMELINE */}
        {tab==="timeline" && <>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
            {[
              ["all",       "All Events",         "#546E7A"],
              ["milestones","Milestones ✦",        "#2E7D32"],
              ["ruptures",  "All Ruptures",        "#B71C1C"],
              ["ex",        "Ex / Female",          "#E53935"],
              ["lying",     "Lying / Omission",     "#AD1457"],
              ["socials",   "Scanning",             "#E65100"],
              ["abuse",     "Emotional Abuse",      "#4A148C"],
              ["reaction",  "Sophia's Reactions",   "#880E4F"],
            ].map(([key,label,color])=>(
              <button key={key} onClick={()=>setFilter(key)} style={{background:filter===key?color:"#fff",color:filter===key?"#fff":color,border:`1.5px solid ${color}`,borderRadius:20,padding:"4px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:filter===key?"bold":"normal",transition:"all 0.15s"}}>{label}</button>
            ))}
          </div>

          <div style={{position:"relative",paddingLeft:32}}>
            <div style={{position:"absolute",left:14,top:0,bottom:0,width:2,background:"linear-gradient(to bottom,#4CAF50,#E53935,#880E4F)"}}/>

            {filtered.map((event,idx)=>{
              const tc=TYPE_CONFIG[event.type]||TYPE_CONFIG.milestone;
              const sc=event.sev?SEV_CONFIG[event.sev]:null;
              const isSel=selected===event.id;
              const isMilestone=event.type==="milestone";
              const showPhase=event.phase!==(idx>0?filtered[idx-1]?.phase:null);
              return (
                <div key={event.id}>
                  {showPhase&&(
                    <div style={{display:"flex",alignItems:"center",gap:10,margin:"18px 0 10px -32px",paddingLeft:32}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:PHASE_COLORS[event.phase],flexShrink:0}}/>
                      <span style={{fontSize:10,fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",color:PHASE_COLORS[event.phase]}}>{event.phase}</span>
                      <div style={{flex:1,height:1,background:`${PHASE_COLORS[event.phase]}40`}}/>
                    </div>
                  )}
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:isMilestone?5:9,cursor:"pointer"}} onClick={()=>setSelected(isSel?null:event.id)}>
                    <div style={{width:isMilestone?10:14,height:isMilestone?10:14,borderRadius:"50%",background:event.ongoing?"#FF1744":event.abuseNum?"#7B1FA2":event.awd?"#B71C1C":isMilestone?"#4CAF50":tc.dot,border:event.ongoing?"3px solid #FF6D00":event.abuseNum?"3px solid #4A148C":event.awd?"3px solid #FF1744":`2px solid ${tc.dot}`,flexShrink:0,marginTop:isMilestone?5:4,marginLeft:isMilestone?-36:-39,boxShadow:event.ongoing?"0 0 12px #FF174480":event.abuseNum?"0 0 10px #7B1FA280":event.sev==="redline"?`0 0 8px ${tc.dot}80`:"none",zIndex:1,position:"relative"}}/>
                    <div style={{flex:1,background:event.ongoing?"#FFF8E1":event.abuseNum?(isSel?"#EDE7F6":"#F3E5F5"):isMilestone?(isSel?"#C8E6C9":"#F1F8E9"):isSel?tc.bg:"#fff",border:`1.5px solid ${event.ongoing?"#FF6D00":event.abuseNum?"#7B1FA2":isMilestone?"#4CAF5040":isSel?tc.dot:event.sev==="redline"?"#B71C1C":"#E0E0E0"}`,borderRadius:8,padding:isMilestone?"7px 12px":"10px 14px",boxShadow:event.abuseNum?"0 2px 8px #7B1FA230":event.ongoing?"0 2px 12px #FF6D0040":isSel?`0 2px 12px ${tc.dot}30`:"0 1px 3px rgba(0,0,0,0.06)",transition:"all 0.15s"}}>
                      {isMilestone?(
                        <div style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                          <span style={{fontSize:10,fontWeight:"bold",color:"#2E7D32",fontFamily:"monospace",flexShrink:0}}>✦ {event.date}</span>
                          <span style={{fontSize:12,color:"#1B5E20",lineHeight:1.5}}>{event.desc}</span>
                          {event.milestoneNote&&<span style={{fontSize:11,color:"#4CAF50",fontStyle:"italic"}}>{event.milestoneNote}</span>}
                        </div>
                      ):(
                        <>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                            <div style={{flex:1}}>
                              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:4}}>
                                <span style={{fontSize:11,fontWeight:"bold",color:"#546E7A",fontFamily:"monospace"}}>{event.date}</span>
                                {event.ongoing&&<span style={{fontSize:9,background:"#FF6D00",color:"#fff",padding:"1px 8px",borderRadius:10,fontWeight:"bold"}}>● ONGOING</span>}
                                {event.abuseNum&&<span style={{fontSize:9,background:"#4A148C",color:"#fff",padding:"1px 8px",borderRadius:10,fontWeight:"bold"}}>⚡ Abuse #{event.abuseNum}</span>}
                                <span style={{fontSize:9,color:tc.color,background:tc.bg,padding:"1px 7px",borderRadius:10,border:`1px solid ${tc.dot}40`}}>{tc.label}</span>
                                {event.awd&&<span style={{fontSize:9,background:"#B71C1C",color:"#fff",padding:"1px 7px",borderRadius:10,fontWeight:"bold"}}>⚠ Are We Done?</span>}
                                {event.rupNum&&<span style={{fontSize:10,color:"#90A4AE"}}>#{event.rupNum}</span>}
                              </div>
                              <p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.6}}>{event.desc}</p>
                              {event.abuseNote&&<p style={{margin:"7px 0 0",fontSize:11,color:"#4A148C",fontStyle:"italic",lineHeight:1.5,background:"#EDE7F6",padding:"5px 9px",borderRadius:5,borderLeft:"3px solid #7B1FA2"}}>{event.abuseNote}</p>}
                              {event.reactionNote&&<p style={{margin:"7px 0 0",fontSize:11,color:"#880E4F",fontStyle:"italic",lineHeight:1.5,background:"#FDE8F0",padding:"5px 9px",borderRadius:5,borderLeft:"3px solid #F48FB1"}}>{event.reactionNote}</p>}
                              {event.awdNote&&isSel&&<p style={{margin:"7px 0 0",fontSize:11,color:"#B71C1C",fontStyle:"italic",lineHeight:1.5,background:"#FFEBEE",padding:"5px 9px",borderRadius:5,borderLeft:"3px solid #E53935"}}>{event.awdNote}</p>}
                            </div>
                            {sc&&<div style={{background:sc.bg,color:sc.fg,fontSize:9,fontWeight:"bold",padding:"3px 8px",borderRadius:10,flexShrink:0,letterSpacing:1,textTransform:"uppercase"}}>{sc.label}</div>}
                          </div>
                          {isSel&&event.role&&<div style={{marginTop:8,paddingTop:8,borderTop:"1px dashed #CFD8DC",fontSize:12,color:"#546E7A",fontStyle:"italic"}}><strong>Sophia's role:</strong> {event.role}</div>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12,marginLeft:-32,paddingLeft:32}}>
              <div style={{width:12,height:12,borderRadius:"50%",background:"#FF6D00",boxShadow:"0 0 8px #FF6D0080",flexShrink:0}}/>
              <span style={{fontSize:11,color:"#FF6D00",fontStyle:"italic",fontWeight:"bold"}}>Apr 22, 2026 — Present · Unresolved</span>
            </div>
          </div>
        </>}

        {/* SUMMARY */}
        {tab==="summary" && <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:16}}>
            {[
              {label:"Total Events Tracked",      value:EVENTS.length,       color:"#37474F",bg:"#ECEFF1"},
              {label:"Positive Milestones",        value:totalMilestones,     color:"#1B5E20",bg:"#E8F5E9"},
              {label:"Rupture / Fight Events",    value:totalRuptures,        color:"#B71C1C",bg:"#FFEBEE"},
              {label:"Confirmed Emotional Abuse",  value:ABUSE_EVENTS.length, color:"#4A148C",bg:"#EDE7F6"},
              {label:"'Are We Done?' Moments",    value:awdCount,             color:"#880E4F",bg:"#FCE4EC"},
              {label:"Sophia's Reactive Snaps",   value:reactionCount,        color:"#AD1457",bg:"#FDE8F0"},
            ].map(s=>(
              <div key={s.label} style={{background:s.bg,borderRadius:10,padding:"14px",border:`1px solid ${s.color}30`}}>
                <div style={{fontSize:30,fontWeight:"bold",color:s.color,fontFamily:"monospace"}}>{s.value}</div>
                <div style={{fontSize:12,color:"#546E7A",marginTop:2,lineHeight:1.3}}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{background:"#FFF8E1",borderRadius:10,padding:14,marginBottom:14,border:"1.5px solid #FF6D00"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#FF6D00"}}/>
              <span style={{fontSize:10,fontWeight:"bold",color:"#FF6D00",letterSpacing:2,textTransform:"uppercase"}}>Currently Active</span>
            </div>
            <p style={{margin:0,fontSize:13,color:"#37474F",lineHeight:1.5}}>The April 19th birthday rupture is <strong>ongoing as of April 22, 2026</strong>. Sophia felt her emotional investment was not being reciprocated. This remains unresolved and is the context for this document.</p>
          </div>

          <div style={{background:"#F3E5F5",borderRadius:10,padding:16,marginBottom:14,border:"1.5px solid #7B1FA2"}}>
            <h3 style={{margin:"0 0 12px",fontSize:12,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase",color:"#4A148C"}}>Confirmed Emotional Abuse — 4 Incidents</h3>
            {ABUSE_EVENTS.map(e=>(
              <div key={e.id} style={{marginBottom:10,padding:"10px 12px",background:"#EDE7F6",borderRadius:8,borderLeft:"3px solid #7B1FA2"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:10,fontWeight:"bold",color:"#fff",background:"#4A148C",padding:"1px 8px",borderRadius:10}}>#{e.abuseNum}</span>
                  <span style={{fontSize:11,fontWeight:"bold",color:"#4A148C",fontFamily:"monospace"}}>{e.date}</span>
                </div>
                <p style={{margin:0,fontSize:12,color:"#2A1018",lineHeight:1.5,fontStyle:"italic"}}>{e.abuseNote}</p>
              </div>
            ))}
          </div>

          <div style={{background:"#fff",borderRadius:10,padding:16,marginBottom:14,border:"1px solid #E0E0E0"}}>
            <h3 style={{margin:"0 0 12px",fontSize:12,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase",color:"#546E7A"}}>'Are We Done?' — Why Context Matters</h3>
            {[
              {num:"#1",date:"Sep 24, 2025",label:"Frustration",     color:"#FB8C00",desc:"A reactive expression of frustration during a boundary conversation. Upsetting, but not yet a pattern."},
              {num:"#2",date:"Oct 23, 2025",label:"Boundary Set",    color:"#E53935",desc:"After this incident, Sophia explicitly asked Henrique never to threaten withdrawal when feeling insecure. He agreed."},
              {num:"#3",date:"Feb 17, 2026",label:"Emotional Abuse", color:"#4A148C",desc:"He repeated the behaviour he had explicitly agreed not to repeat. Knowingly violating an agreed boundary is emotional abuse."},
            ].map(item=>(
              <div key={item.num} style={{display:"flex",gap:10,marginBottom:10,padding:"9px 12px",background:"#FAFAFA",borderRadius:8,borderLeft:`3px solid ${item.color}`}}>
                <div style={{width:36,flexShrink:0}}>
                  <div style={{fontSize:12,fontWeight:"bold",color:item.color}}>{item.num}</div>
                  <div style={{fontSize:9,color:"#90A4AE",fontFamily:"monospace",marginTop:2}}>{item.date}</div>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:"bold",color:item.color,marginBottom:2}}>{item.label}</div>
                  <div style={{fontSize:12,color:"#546E7A",lineHeight:1.5}}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{background:"#fff",borderRadius:10,padding:16,border:"1px solid #E0E0E0"}}>
            <h3 style={{margin:"0 0 12px",fontSize:12,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase",color:"#546E7A"}}>Frequency — The Real Numbers</h3>
            {[
              ["Average gap between incidents","10.9 days  (~every 1.5 weeks)","#B71C1C"],
              ["Median gap","8 days","#E53935"],
              ["Shortest gap","1 day  (Mar 30 → Mar 31, 2026)","#B71C1C"],
              ["Longest gap","57 days  (Dec 22, 2025 → Feb 17, 2026)","#4CAF50"],
              ["Back-to-back clusters (≤ 3 days)","7 incidents","#E53935"],
            ].map(([label,value,color])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #F5F5F5"}}>
                <span style={{fontSize:12,color:"#546E7A"}}>{label}</span>
                <span style={{fontSize:13,fontWeight:"bold",color,fontFamily:"monospace"}}>{value}</span>
              </div>
            ))}
            <div style={{marginTop:12,padding:"10px 12px",background:"#FFF8E1",borderRadius:8,border:"1px solid #FFB300"}}>
              <p style={{margin:0,fontSize:12,color:"#37474F",lineHeight:1.6}}>The frequency of ruptures <strong>nearly doubled</strong> across the relationship — from an average of 10.5 days in the Early phase, to 5.2 days in Escalation, to <strong>1.5 days</strong> at Breaking Point. The 57-day gap over January 2026 was the only sustained breathing room in nine months — and it did not reset the pattern.</p>
            </div>
          </div>
        </div>}

        {/* FREQUENCY */}
        {tab==="frequency" && <div>
          <div style={{background:"#fff",borderRadius:10,padding:20,border:"1px solid #E0E0E0",marginBottom:14}}>
            <h3 style={{margin:"0 0 20px",fontSize:12,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase",color:"#546E7A"}}>Monthly Rupture Frequency</h3>
            <div style={{display:"flex",alignItems:"flex-end",gap:8,height:160}}>
              {MONTHLY.map(m=>{
                const total=m.ruptures+m.reactions;
                const color=total>=6?"#B71C1C":total>=3?"#E53935":total===0?"#4CAF50":"#FB8C00";
                return (
                  <div key={m.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{fontSize:11,fontWeight:"bold",color}}>{total>0?total:"—"}</div>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",height:120,gap:1}}>
                      {m.reactions>0&&<div style={{width:"100%",background:"#F48FB1",borderRadius:"4px 4px 0 0",height:`${(m.reactions/maxMonthly)*120}px`}}/>}
                      <div style={{width:"100%",background:color,borderRadius:m.reactions>0?0:"4px 4px 0 0",height:`${(m.ruptures/maxMonthly)*120}px`,minHeight:total>0?4:0}}/>
                    </div>
                    <div style={{fontSize:9,color:"#78909C",textAlign:"center"}}>{m.month}</div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:16,marginTop:12,justifyContent:"center"}}>
              {[["#E53935","Ruptures / Fights"],["#F48FB1","Sophia's Reactions"]].map(([c,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:12,height:12,background:c,borderRadius:2}}/>
                  <span style={{fontSize:11,color:"#546E7A"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{background:"#fff",borderRadius:10,padding:16,border:"1px solid #E0E0E0"}}>
            <h3 style={{margin:"0 0 14px",fontSize:12,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase",color:"#546E7A"}}>Average Gap Between Incidents — by Phase</h3>
            {[
              ["Beginning",     "Aug 2025",             null,  "No ruptures — the relationship was just beginning"],
              ["Early",         "Sep 2025",             "10.5","Roughly every 10 days"],
              ["Building",      "Oct – Nov 2025",       "6.8", "Tightening — roughly every week"],
              ["Fall",          "Dec 2025",             "10.5","A brief plateau before the new year"],
              ["Escalation",    "Feb – Mar 2026",       "5.2", "Accelerating — roughly every 5 days"],
              ["Breaking Point","Mar 30 – Apr 4, 2026", "1.5", "Critical — nearly every day"],
            ].map(([phase,period,gap,note])=>(
              <div key={phase} style={{display:"flex",gap:10,marginBottom:10,padding:"10px 12px",background:"#FAFAFA",borderRadius:8,borderLeft:`3px solid ${PHASE_COLORS[phase]}`}}>
                <div style={{width:114,flexShrink:0}}>
                  <div style={{fontSize:12,fontWeight:"bold",color:PHASE_COLORS[phase]}}>{phase}</div>
                  <div style={{fontSize:10,color:"#90A4AE",marginTop:1}}>{period}</div>
                </div>
                <div style={{width:54,flexShrink:0,textAlign:"center",alignSelf:"center"}}>
                  {gap?<><div style={{fontSize:19,fontWeight:"bold",color:PHASE_COLORS[phase],fontFamily:"monospace",lineHeight:1}}>{gap}</div><div style={{fontSize:9,color:"#90A4AE"}}>days avg</div></>:<div style={{fontSize:12,color:"#B0BEC5"}}>—</div>}
                </div>
                <div style={{fontSize:12,color:"#546E7A",alignSelf:"center",lineHeight:1.5}}>{note}</div>
              </div>
            ))}
          </div>
        </div>}

      </div>
      <div style={{textAlign:"center",padding:"20px 16px 28px",fontSize:10,color:"#B0BEC5",letterSpacing:1}}>
        Tap any event to expand details · Filter by type using the buttons above
      </div>
    </div>
  );
}
