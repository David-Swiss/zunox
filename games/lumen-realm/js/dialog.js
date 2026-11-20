export function openDialog(s,npc){s.dialog=npc;s.mode="dialog";s.status=npc.name+" – "+npc.role}
export function closeDialog(s){s.dialog=null;if(s.mode==="dialog")s.mode="playing"}
