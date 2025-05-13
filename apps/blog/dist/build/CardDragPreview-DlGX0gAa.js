import{j as e,e as a,f as n,T as o,g as l,h as d,k as t}from"./strapi-Crm562h2.js";const x=({label:r,isSibling:s=!1})=>e.jsxs(h,{background:s?"neutral100":"primary100",display:"inline-flex",gap:3,hasRadius:!0,justifyContent:"space-between",$isSibling:s,"max-height":"3.2rem",maxWidth:"min-content",children:[e.jsxs(a,{gap:3,children:[e.jsx(c,{alignItems:"center",cursor:"all-scroll",padding:3,children:e.jsx(n,{})}),e.jsx(o,{textColor:s?void 0:"primary600",fontWeight:"bold",ellipsis:!0,maxWidth:"7.2rem",children:r})]}),e.jsxs(a,{children:[e.jsx(i,{alignItems:"center",children:e.jsx(l,{})}),e.jsx(i,{alignItems:"center",children:e.jsx(d,{})})]})]}),i=t(a)`
  height: ${({theme:r})=>r.spaces[7]};

  &:last-child {
    padding: 0 ${({theme:r})=>r.spaces[3]};
  }
`,c=t(i)`
  border-right: 1px solid ${({theme:r})=>r.colors.primary200};

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`,h=t(a)`
  border: 1px solid
    ${({theme:r,$isSibling:s})=>s?r.colors.neutral150:r.colors.primary200};

  svg {
    width: 1rem;
    height: 1rem;

    path {
      fill: ${({theme:r,$isSibling:s})=>s?void 0:r.colors.primary600};
    }
  }
`;export{x as C};
