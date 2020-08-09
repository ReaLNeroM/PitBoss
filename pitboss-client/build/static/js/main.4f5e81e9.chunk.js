(this["webpackJsonppitboss-client"]=this["webpackJsonppitboss-client"]||[]).push([[0],{30:function(e,t,a){e.exports=a(47)},35:function(e,t,a){},44:function(e,t,a){},45:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(13),l=a.n(r),m=(a(35),a(25)),i=a(26),d=a(29),s=a(28),c=a(15),u=a(16),f=a(14),b=function(e){var t=e.title,a=e.description;return o.a.createElement(c.a,{bg:"light",expand:"lg"},o.a.createElement(c.a.Brand,{to:"all-requests"},t),o.a.createElement(c.a.Toggle,{"aria-controls":"basic-navbar-nav"}),o.a.createElement(c.a.Collapse,{id:"basic-navbar-nav"},o.a.createElement(u.a,{className:"mr-auto"},o.a.createElement(u.a.Link,{as:f.b,to:"all-requests"},"Deliver!"),o.a.createElement(u.a.Link,{as:f.b,to:"ask-for-delivery"},"Ask for delivery!"),o.a.createElement(u.a.Link,{as:f.b,to:"my-deliveries"},"My deliveries"))),o.a.createElement("div",{className:"navbar-text"},a))},v={None:"N/A",Pit:"Pit",Starbucks:"Starbucks",GrabNGo:"Grab N' Go"},h=function(e){var t=e.onFullNameChange,a=e.fullName,n=e.onDormAndRoomChange,r=e.dormAndRoom,l=e.onFoodStationChange,m=e.foodStation,i=e.onOrderNumberChange,d=e.orderNumber;return o.a.createElement("form",null,o.a.createElement("div",{className:"form-row"},o.a.createElement("div",{className:"form-group col-md-6"},o.a.createElement("label",{htmlFor:"fullName"},"Full Name"),o.a.createElement("input",{type:"text",className:"form-control",onChange:t,id:"fullName",name:"fullName",placeholder:"Name Surname",value:a})),o.a.createElement("div",{className:"form-group col-md-6"},o.a.createElement("label",{htmlFor:"dormAndRoom"},"Dorm + Room #"),o.a.createElement("input",{type:"text",className:"form-control",onChange:n,id:"dormAndRoom",name:"dormAndRoom",placeholder:"Anderson 101",value:r}))),o.a.createElement("div",{className:"form-row"},o.a.createElement("div",{className:"form-group col-md-6"},o.a.createElement("label",{htmlFor:"foodStation"},"GrubHub Station"),o.a.createElement("select",{className:"form-control",onChange:l,id:"foodStation",name:"foodStation",value:m},o.a.createElement("option",{disabled:!0,value:v.None}," -- select an option -- "),o.a.createElement("option",{value:v.Pit},"Pit"),o.a.createElement("option",{value:v.Starbucks},"Starbucks"),o.a.createElement("option",{value:v.GrabNGo},"Grab N' Go"))),o.a.createElement("div",{className:"form-group col-md-6"},o.a.createElement("label",{htmlFor:"orderNumber"},"Order Number(s)"),o.a.createElement("input",{type:"text",className:"form-control",onChange:i,id:"orderNumber",name:"orderNumber",placeholder:"#22, #23",value:d}))),o.a.createElement("button",{type:"submit",id:"submitButton",className:"btn btn-primary"},"Send pick-up request"))},N=function(e){return o.a.createElement("div",null)};a(44);var g=function(e){var t=e.requests,a=e.haveRequestsLoaded,n=t.map((function(e){return o.a.createElement("li",{className:"list-group-item d-flex justify-content-between align-items-center mb-2"},e.location,o.a.createElement("div",{className:"d-flex align-items-center float-right"},o.a.createElement("div",{style:{marginRight:"1rem"}},(e.time,"15 minutes ago")),o.a.createElement("button",{className:"float-right btn btn-dark"},"Deliver!")))}));return o.a.createElement("div",{id:"requests"},o.a.createElement("div",{id:"load-requests",style:a?{display:"none"}:{}},o.a.createElement("img",{src:"loading.gif",alt:""})),o.a.createElement("ul",{id:"requests-list",className:"list-group",style:a?{}:{display:"none"}},n))},E=(a(45),a(46),a(3)),p=function(e){Object(d.a)(a,e);var t=Object(s.a)(a);function a(){var e;return Object(m.a)(this,a),(e=t.call(this)).state={requests:[],haveRequestsLoaded:!1,fullName:"",dormAndRoom:"",foodStation:v.None,orderNumber:""},e}return Object(i.a)(a,[{key:"fullNameChanged",value:function(e){this.setState({fullName:e.target.value})}},{key:"dormAndRoomChanged",value:function(e){this.setState({dormAndRoom:e.target.value})}},{key:"foodStationChanged",value:function(e){this.setState({foodStation:e.target.value})}},{key:"orderNumberChanged",value:function(e){this.setState({orderNumber:e.target.value})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"App",className:"container"},o.a.createElement(f.a,null,o.a.createElement("div",{id:"navBar"},o.a.createElement(b,{title:"PitBoss",description:"Help out and deliver food for students in quarantine! (UR only)"})),o.a.createElement(E.a,{path:"/",render:function(){return o.a.createElement("div",{id:"deliveryForm"},o.a.createElement(h,{id:"deliveryForm",onFullNameChange:e.fullNameChanged.bind(e),fullName:e.state.fullName,onDormAndRoomChange:e.dormAndRoomChanged.bind(e),dormAndRoom:e.state.dormAndRoom,onFoodStationChange:e.foodStationChanged.bind(e),foodStation:e.state.foodStation,onOrderNumberChange:e.orderNumberChanged.bind(e),orderNumber:e.state.orderNumber}))},exact:!0}),o.a.createElement(E.a,{path:"/all-requests",render:function(){return o.a.createElement(g,{requests:e.state.requests,haveRequestsLoaded:e.state.haveRequestsLoaded})},exact:!0}),o.a.createElement(E.a,{path:"/ask-for-delivery",render:function(){return o.a.createElement("div",{id:"deliveryForm"},o.a.createElement(h,{onFullNameChange:e.fullNameChanged.bind(e),fullName:e.state.fullName,onDormAndRoomChange:e.dormAndRoomChanged.bind(e),dormAndRoom:e.state.dormAndRoom,onFoodStationChange:e.foodStationChanged.bind(e),foodStation:e.state.foodStation,onOrderNumberChange:e.orderNumberChanged.bind(e),orderNumber:e.state.orderNumber}))},exact:!0}),o.a.createElement(E.a,{path:"/my-deliveries",render:N,exact:!0})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[30,1,2]]]);
//# sourceMappingURL=main.4f5e81e9.chunk.js.map