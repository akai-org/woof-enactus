import{a as d,j as t,G as n,aZ as r,a_ as h,T as m,k as c,e as x}from"./strapi-Crm562h2.js";const g=({providers:e,displayAllProviders:a})=>{const{formatMessage:o}=d();return a?t.jsx(n.Root,{gap:4,children:e.map(i=>t.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:t.jsx(s,{provider:i})},i.uid))}):e.length>2&&!a?t.jsxs(n.Root,{gap:4,children:[e.slice(0,2).map(i=>t.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:t.jsx(s,{provider:i})},i.uid)),t.jsx(n.Item,{col:4,direction:"column",alignItems:"stretch",children:t.jsx(r,{label:o({id:"global.see-more"}),children:t.jsx(l,{as:h,to:"/auth/providers",children:t.jsx("span",{"aria-hidden":!0,children:"•••"})})})})]}):t.jsx(u,{justifyContent:"center",children:e.map(i=>t.jsx(s,{provider:i},i.uid))})},u=c(x)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:e})=>e.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:e})=>e.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:e})=>e.spaces[2]};
  }
`,s=({provider:e})=>t.jsx(r,{label:e.displayName,children:t.jsx(l,{href:`${window.strapi.backendURL}/admin/connect/${e.uid}`,children:e.icon?t.jsx("img",{src:e.icon,"aria-hidden":!0,alt:"",height:"32px"}):t.jsx(m,{children:e.displayName})})}),l=c.a`
  width: 13.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.8rem;
  border: 1px solid ${({theme:e})=>e.colors.neutral150};
  border-radius: ${({theme:e})=>e.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:e})=>e.colors.neutral600};
`;export{g as S};
