import{r,j as e,B as b,a as M,$ as D,b as I,_ as q,c as G,G as J,u as K}from"./index-DtTvySUr.js";import{C as X,a as U,b as W}from"./card-lRbzEql3.js";const z="/assets/correct-Br7iQm8_.mp3",H="/assets/wrong-C8Bahlaa.mp3",Y=({setCount:s,count:a,handleProgress:o,setIsFinish:n,finish:u,setScore:i,currentQ:t,handleNext:x,arr:l})=>{var v;const[f,g]=r.useState(""),[B,j]=r.useState(""),[N,c]=r.useState(!1),[p,m]=r.useState(!1),[S,k]=r.useState(!1);let $=(t==null?void 0:t.answerKey)||"";const y=d=>{g(d.target.value)},P=()=>{new Audio(z).play(),j("Correct! 👍")},h=()=>{j("Wrong! 😥"),new Audio(H).play()},A=()=>{$===f?(P(),i(d=>d+1)):h(),m(!0)};return r.useEffect(()=>{c(f!=="")},[f]),e.jsxs(e.Fragment,{children:[e.jsx("h1",{className:"font-bold tracking-normal text-[23px] text-2xl py-4 text-justify ",children:t==null?void 0:t.question}),(t==null?void 0:t.options)!=""?e.jsx("div",{className:" space-y-3",children:(v=t==null?void 0:t.options)==null?void 0:v.map((d,E)=>e.jsx("div",{children:t.questionType===1||t.questionType===0?e.jsx(b,{disabled:p,className:` cursor-pointer text-md w-full hover:bg-mute-foreground  ${p?`pointer-events-none  ${d.key===$?" bg-green-600  dark:bg-green-600 dark:text-white ":" bg-destructive "}`:`${f===d.key?" bg-muted-foreground   dark:bg-primary/90 ":" bg-muted text-accent-foreground dark:bg-primary/40 dark:text-white dark:hover:text-accent "}`} `,onClick:()=>{g(d.key),c(!1)},children:d.value}):""},E))}):e.jsx("div",{children:(t==null?void 0:t.questionType)===2?e.jsxs("div",{className:"border-[1px",children:[e.jsx("input",{onChange:y,value:f,className:"w-[100%] border-[2.5px] dark:bg-[#ffffff01] dark:text-[#Fff] dark:focus:outline-none  dark:border-[#1d69a4f5] dark:border-[1px] rounded-2xl h-11 px-4"}),S&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex px-5 py-2 text-[#32ac2e] font-semibold items-center text- gap-2",children:[e.jsx(M,{}),e.jsx("p",{children:(t==null?void 0:t.answerKey)||""})]})})]}):e.jsx("div",{className:" space-y-2",children:["true","false"].map((d,E)=>e.jsx("div",{children:e.jsx(b,{disabled:p,className:`choices cursor-pointer w-full hover:bg-mute-foreground   ${p?`pointer-events-none${d===$?" bg-green-600  dark:bg-green-600 dark:text-white ":" bg-destructive "}`:`${f===d?" bg-muted-foreground   dark:bg-primary/90 ":" bg-muted text-accent-foreground dark:bg-primary/40 dark:text-white dark:hover:text-accent "}`} `,onClick:()=>{g(d),c(!1)},children:d})},E))})}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(b,{disabled:!N,onClick:()=>{c(!1),m(!0),A(),k(!0)},className:`questionB mt-10 uppercase ${N?"button":"bg-[#0000007b] hover:transform-none"} `,children:"Check Answer"})," ",e.jsx(b,{disabled:!p,onClick:()=>{s(a+1),x(),g(""),c(!0),k(!1),o(),m(!1),l===0&&n(!0)},className:`questionB mt-10 uppercase ${p?"button":"bg-[#0000007b] hover:transform-none"} `,children:l===0?"Finish":"Next"})]})]})},R="Progress",C=100,[Z,ce]=D(R),[Q,ee]=Z(R),V=r.forwardRef((s,a)=>{const{__scopeProgress:o,value:n,max:u,getValueLabel:i=ae,...t}=s,x=_(u)?u:C,l=T(n,x)?n:null,f=w(l)?i(l,x):void 0;return r.createElement(Q,{scope:o,value:l,max:x},r.createElement(I.div,q({"aria-valuemax":x,"aria-valuemin":0,"aria-valuenow":w(l)?l:void 0,"aria-valuetext":f,role:"progressbar","data-state":F(l,x),"data-value":l??void 0,"data-max":x},t,{ref:a})))});V.propTypes={max(s,a,o){const n=s[a],u=String(n);return n&&!_(n)?new Error(re(u,o)):null},value(s,a,o){const n=s[a],u=String(n),i=_(s.max)?s.max:C;return n!=null&&!T(n,i)?new Error(ne(u,o)):null}};const se="ProgressIndicator",te=r.forwardRef((s,a)=>{var o;const{__scopeProgress:n,...u}=s,i=ee(se,n);return r.createElement(I.div,q({"data-state":F(i.value,i.max),"data-value":(o=i.value)!==null&&o!==void 0?o:void 0,"data-max":i.max},u,{ref:a}))});function ae(s,a){return`${Math.round(s/a*100)}%`}function F(s,a){return s==null?"indeterminate":s===a?"complete":"loading"}function w(s){return typeof s=="number"}function _(s){return w(s)&&!isNaN(s)&&s>0}function T(s,a){return w(s)&&!isNaN(s)&&s<=a&&s>=0}function re(s,a){return`Invalid prop \`max\` of value \`${s}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${C}\`.`}function ne(s,a){return`Invalid prop \`value\` of value \`${s}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${C} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`}const L=V,oe=te,O=r.forwardRef(({className:s,value:a,...o},n)=>e.jsx(L,{ref:n,className:G("relative h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",s),...o,children:e.jsx(oe,{className:"h-full w-full flex-1 bg-slate-900 transition-all dark:bg-slate-50",style:{transform:`translateX(-${100-(a||0)}%)`}})}));O.displayName=L.displayName;const ie=()=>{const{len:s,setLen:a,setInQportal:o}=r.useContext(J),n=JSON.parse(localStorage.getItem("subject")||"[]"),u=JSON.parse(localStorage.getItem("array")||"[]"),i=K(),[t,x]=r.useState(1),[l,f]=r.useState(1),[g,B]=r.useState(!1),[j,N]=r.useState(0);r.useState(!1);const[c,p]=r.useState(n),[m,S]=r.useState(u),[k,$]=r.useState([]),y=()=>{var v;let h=m.pop();const A=(v=c==null?void 0:c.questions)==null?void 0:v.find(d=>d.id===h);$(A)};r.useEffect(()=>{o(h=>!0),p(c),S(m),a(c.questions.length)},[]),r.useEffect(()=>{y()},[m,c]);function P(){x(t+100/s)}return e.jsx("div",{className:"min-h-[50vh] flex justify-center  ",children:e.jsxs(X,{className:"w-full lg:w-[50%] p-5",children:[e.jsxs(U,{className:"text-center my-2",children:[" ",c.subjectCode]}),g==!0?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"border-[1px flex flex-col items-center",children:[e.jsxs("h1",{className:" font-extrabold text-[30px] text-[#000] dark:text-[#e1e1e1]",children:[j,"/",s]}),e.jsx("h1",{className:"font-grot border-[1px py-3 text-2xl dark:text-[#ffff]",children:"score"}),e.jsxs("div",{className:"flex w-full justify-center  border-[1px gap-10",children:[e.jsx(b,{className:"questionB w-28",onClick:()=>{window.location.reload()},children:"Try Again"}),e.jsx(b,{onClick:()=>{o(h=>!h),i("/shared")},className:"questionB w-24",children:"Back"})]})]})}):e.jsxs(W,{children:[e.jsxs("div",{className:" flex gap-2 items-center text-start  w-full px-2 border-[#000] dark:text-[#ffff]",children:[e.jsx("h1",{className:"text-[17px] font-bold",children:"Question:"}),e.jsxs("h2",{className:"text-[19px] font-bold",children:[l,"/",s]}),e.jsx(O,{value:t,className:"w-[10%]"})]}),e.jsx("div",{className:"px-5 w-full  flex-col mb-2 ",children:e.jsx("div",{className:"mb-8 border-[1px px-4",children:e.jsx(Y,{handleNext:y,count:l,handleProgress:P,setCount:f,setIsFinish:B,setScore:N,finish:g,currentQ:k,arr:m.length})})})]})]})})};export{ie as default};
