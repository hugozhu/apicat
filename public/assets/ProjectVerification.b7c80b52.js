import{j as _,f as m}from"./element-plus.85f938a9.js";import{b as d,a9 as p,aa as f,_ as h}from"./index.a22b0d3c.js";import{aX as s,p as u,o as g,f as j,h as e,Z as i,X as k,ai as C}from"./vendor.b27f3889.js";import{_ as w}from"./img_join.8db8ddd5.js";const y={name:"ProjectVerification",inject:["showHeader"],data(){return{isLoading:!1,form:{project_id:this.$route.params.project_id||"",secret_key:""}}},methods:{onSubmitBtnClick(){this.isLoading=!0,p(this.form).then(t=>{s.set(s.KEYS.SECRET_PROJECT_TOKEN+this.form.project_id,t.data||"",!0),location.href=f(this.form.project_id)}).finally(()=>{this.isLoading=!1})}},setup(){u("showHeader")(!1)}},E={class:"ac-verification"},V={class:"ac-verification__main"},x=e("span",{class:"logo large"},[e("img",{src:h,alt:"ApiCat"}),e("span",{class:"logo-text logo-apicat mt-0"},"ApiCat")],-1),B=C("\u7EE7\u7EED\u8BBF\u95EE"),P=e("img",{src:w,class:"mt-5 w-full"},null,-1);function S(t,a,b,v,o,r){const c=_,n=m;return g(),j("main",E,[e("div",V,[x,i(c,{class:"my-7 w-1/2",modelValue:o.form.secret_key,"onUpdate:modelValue":a[0]||(a[0]=l=>o.form.secret_key=l),placeholder:"\u8BBF\u95EE\u5BC6\u7801",maxlength:"6",clearable:""},null,8,["modelValue"]),i(n,{loading:o.isLoading,type:"primary",onClick:r.onSubmitBtnClick},{default:k(()=>[B]),_:1},8,["loading","onClick"]),P])])}var K=d(y,[["render",S]]);export{K as default};
