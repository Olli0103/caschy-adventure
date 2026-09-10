// Shared player route: only public engine/UI commands, never direct puzzle flags.
export const route=[
 ['start'],['act','take','usb'],['move','archive'],['act','use','forum'],['choose','kaschi'],['act','take','firefox'],['combine','usb','firefox'],
 ['use','portable','migration'],['choose','b2'],['choose','wp'],['choose','4'],
 ['act','use','c64'],['choose','c'],['choose','a'],['choose','p'],
 ['move','workshop'],['act','talk','andre'],['choose','help'],['act','use','career'],['choose','steel'],['choose','army'],['choose','it'],['choose','pc'],['choose','saturn'],['combine','coil','cable'],['use','pack','ghost'],['act','take','pencil'],['use','pencil','drawing'],['choose','own'],['use','sausage','license'],
 ['move','lab'],['act','talk','felix'],['choose','help'],['use','firmware','bridge'],['choose','thread'],['choose','matter'],['choose','offline'],['act','take','sensor'],['act','talk','olli'],['choose','help'],['combine','watch','sensor'],['use','diagnostic','olli'],
 ['move','quay'],['act','talk','benny'],['choose','help'],['act','take','tracker'],['act','use','ticket'],['choose','2008'],['choose','power'],['choose','nnb'],['choose','self'],['combine','battery','tracker'],['use','powered','benny'],
 ['move','server'],['use','key','lock'],['code','15161718'],['use','origin','slots'],['use','voice','slots'],['use','clarity','slots'],['use','compass','slots'],['use','publish','gate'],['act','use','headline'],['choose','clear']
];
export function event([type,a,b]){if(type==='act')return {type,verb:a,target:b};if(type==='use')return {type:'act',verb:'use',item:a,target:b};if(type==='move')return {type,room:a};if(type==='choose')return {type,id:a};if(type==='code')return {type:'choose',value:a};if(type==='combine')return {type,a,b};return {type};}
