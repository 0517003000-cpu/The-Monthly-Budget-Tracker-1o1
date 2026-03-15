function num(v){
return parseInt(v.replace(/\./g,''))||0
}

function format(n){
return n.toLocaleString("id-ID")
}

function calculate(){

let eTotal=0
let nTotal=0
let sTotal=0

document.querySelectorAll(".essential").forEach(i=>{
eTotal+=num(i.value)
})

document.querySelectorAll(".non").forEach(i=>{
nTotal+=num(i.value)
})

document.querySelectorAll(".save").forEach(i=>{
sTotal+=num(i.value)
})

document.getElementById("essentialTotal").innerText=format(eTotal)
document.getElementById("nonTotal").innerText=format(nTotal)
document.getElementById("saveTotal").innerText=format(sTotal)

checkStatus()
saveMonth()

}

function status(total,budget){

if(total==0) return "No Spending"

let p=total/budget

if(p>1) return "Over Budget"
if(p>0.9) return "Budget Tight"

return "Under Budget"

}

function checkStatus(){

let eBudget=num(document.getElementById("essentialBudget").value)
let nBudget=num(document.getElementById("nonBudget").value)
let sBudget=num(document.getElementById("saveBudget").value)

let eTotal=num(document.getElementById("essentialTotal").innerText)
let nTotal=num(document.getElementById("nonTotal").innerText)
let sTotal=num(document.getElementById("saveTotal").innerText)

let e=status(eTotal,eBudget)
let n=status(nTotal,nBudget)
let s=status(sTotal,sBudget)

setStatus("essentialStatus",e)
setStatus("nonStatus",n)
setStatus("saveStatus",s)

generateAdvice(e,n,s,eBudget,nBudget,sBudget)

}

function setStatus(id,text){

let el=document.getElementById(id)

el.innerText=text

if(text=="Over Budget") el.style.color="red"
else if(text=="Budget Tight") el.style.color="orange"
else if(text=="Under Budget") el.style.color="green"
else el.style.color="gray"

}

function generateAdvice(e,n,s,eb,nb,sb){

let msg=document.getElementById("adviceMessage")

let over=[]

if(e=="Over Budget") over.push("Essential Expenses")
if(n=="Over Budget") over.push("Non Essential Expenses")
if(s=="Over Budget") over.push("Savings")

if(over.length==0){

if(e=="Budget Tight"||n=="Budget Tight"||s=="Budget Tight")
msg.innerHTML="⚠️ Your budget is getting tight. Avoid extra spending and keep some emergency money."

else
msg.innerHTML="✅ Your spending is healthy. Keep tracking and continue saving regularly."

return
}

if(over.length==1){

msg.innerHTML="⚠️ You are over budget in <b>"+over[0]+"</b>.<br><br>"+
"Suggestions:<br>"+
"• Reduce unnecessary purchases<br>"+
"• Review large bills<br>"+
"• Compare your spending with your income"

return
}

if(over.length==2){

msg.innerHTML="⚠️ You are over budget in <b>"+over.join(" and ")+"</b>.<br><br>"+
"Suggestions:<br>"+
"• Reduce lifestyle spending<br>"+
"• Cancel unused subscriptions<br>"+
"• Plan spending before buying"

return
}

msg.innerHTML="🚨 You are over budget in <b>ALL CATEGORIES</b>.<br><br>"+
"Financial Advice:<br>"+
"• Stop unnecessary spending immediately<br>"+
"• Focus on essential needs first<br>"+
"• Re-evaluate your budget allocation<br>"+
"• Build an emergency fund"

}

function newMonth(){

let m=prompt("Enter month name")

if(!m) return

localStorage.setItem("month_"+m,"")
updateMonths()

}

function updateMonths(){

let select=document.getElementById("monthSelect")

select.innerHTML=""

for(let i=0;i<localStorage.length;i++){

let k=localStorage.key(i)

if(k.startsWith("month_")){

let m=k.replace("month_","")

let op=document.createElement("option")

op.value=m
op.text=m

select.appendChild(op)

}

}

select.onchange=function(){
loadMonth(this.value)
}

}

function loadMonth(m){

let data=localStorage.getItem("month_"+m)

if(data) document.body.innerHTML=data

setup()

}

function saveMonth(){

let m=document.getElementById("monthSelect").value

if(!m) return

localStorage.setItem("month_"+m,document.body.innerHTML)

}

function setup(){

document.querySelectorAll("input").forEach(i=>{
i.addEventListener("input",calculate)
})

}

window.onload=function(){

setup()
updateMonths()

}
