import{QUEST_DATA}from"../data/quests.js";
export const QUESTS=QUEST_DATA;
export const makeQuestState=()=>Object.fromEntries(QUESTS.map(q=>[q.id,{active:q.id!=="last-light",done:false,progress:0}]));
export function completeQuest(state,id){if(state[id]){state[id].done=true;state[id].active=false;state[id].progress=1}}
export function activateQuest(state,id){if(state[id]&&!state[id].done)state[id].active=true}
export function serializeQuests(state){return JSON.parse(JSON.stringify(state))}
export function restoreQuests(state,data){if(!data||typeof data!=="object")return;for(const id of Object.keys(state)){const v=data[id];if(v&&typeof v==="object"){state[id].done=Boolean(v.done);state[id].active=Boolean(v.active)&&!state[id].done;state[id].progress=state[id].done?1:Math.max(0,Math.min(1,Number(v.progress)||0))}}}
