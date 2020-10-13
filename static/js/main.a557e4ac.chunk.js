(this["webpackJsonppitboss-client"]=this["webpackJsonppitboss-client"]||[]).push([[0],{40:function(e,t,a){e.exports=a(75)},45:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(19),s=a.n(o),i=(a(45),a(13)),l=a.n(i),c=a(20),u=a(7),d=a(8),m=a(14),h=a(10),g=a(9),p=a(27),f=a(18),v=a(5),b=a(23);var y=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={apiUrl:e.apiUrl,title:e.title,isLoggedIn:e.isLoggedIn,onLoginChange:e.onLoginChange,loginModalChange:e.loginModalChange.bind(Object(m.a)(r)),registerModalChange:e.registerModalChange.bind(Object(m.a)(r))},r}return Object(d.a)(a,[{key:"componentDidUpdate",value:function(e){var t=e.title,a=e.isLoggedIn,r=this.props,n=r.title,o=r.isLoggedIn;n===t&&o===a||this.setState({title:n,isLoggedIn:o})}},{key:"doLogout",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("".concat(this.state.apiUrl,"/auth/logout"),{method:"POST",credentials:"include"}).then((function(e){return e.json()})).then((function(e){return t.state.onLoginChange({isLoggedIn:!1,userId:null})}));case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.title,a=e.isLoggedIn,r=e.loginModalChange,o=e.registerModalChange,s=this.props.location,i=this.doLogout.bind(this),l=s.pathname.slice(1),c=function(e){return"all-requests"===e||""===e?"Deliver!":"ask-for-delivery"===e?"Request":"my-deliveries"===e?"My history":""}(l);return n.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark primary-color"},n.a.createElement(f.b,{as:f.b,className:"navbar-brand",to:"all-requests"},t),n.a.createElement("div",{className:"navbar-toggler","data-toggle":"collapse","aria-expanded":"false"},c),n.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#basicExampleNav","aria-controls":"basicExampleNav","aria-expanded":"false","aria-label":"Toggle navigation"},n.a.createElement("span",{className:"navbar-toggler-icon"})),n.a.createElement("div",{className:"collapse navbar-collapse",id:"basicExampleNav"},n.a.createElement("ul",{className:"navbar-nav mr-auto"},n.a.createElement("li",{className:"nav-item ".concat("all-requests"===l||""===l?"active":"")},n.a.createElement(b.a.Link,{className:"nav-link",as:f.b,href:"all-requests",to:"all-requests"},"Deliver!")),n.a.createElement("li",{className:"nav-item ".concat("ask-for-delivery"===l?"active":"")},n.a.createElement(b.a.Link,{className:"nav-link",as:f.b,href:"ask-for-delivery",to:"ask-for-delivery"},"Ask for delivery")),n.a.createElement("li",{className:"nav-item ".concat("my-deliveries"===l?"active":"")},n.a.createElement(b.a.Link,{className:"nav-link",as:f.b,href:"my-deliveries",to:"my-deliveries"},"My requests and deliveries"))),n.a.createElement("ul",{className:"navbar-nav mr-auto mr-sm-2"},n.a.createElement("li",{className:"nav-item dropdown"},n.a.createElement("div",{className:"nav-link dropdown-toggle waves-effect waves-light",id:"navbarDropdownMenuLink-4","data-toggle":"dropdown","aria-haspopup":"true",href:"#","aria-expanded":"true"},n.a.createElement("i",{className:"fas fa-user"}),a?"Profile":"Not logged in"),n.a.createElement("div",{className:"dropdown-menu dropdown-menu-right dropdown-info","aria-labelledby":"navbarDropdownMenuLink-4"},!1===a&&n.a.createElement("div",null,n.a.createElement("button",{value:!0,className:"dropdown-item waves-effect waves-light",onClick:o},"Register"),n.a.createElement("button",{value:!0,className:"dropdown-item waves-effect waves-light",onClick:r},"Login")),!0===a&&n.a.createElement("div",null,n.a.createElement("button",{id:"openMyProfile",className:"dropdown-item waves-effect waves-light"},"My profile"),n.a.createElement("button",{className:"dropdown-item waves-effect waves-light",onClick:i},"Logout")))))))}}]),a}(n.a.Component),E=Object(v.f)(y),N={None:"",Pit:"Pit",Starbucks:"Starbucks",GrabNGo:"Grab N' Go"};var w=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={error:null,foodStation:N.None},r}return Object(d.a)(a,[{key:"foodStationChanged",value:function(e){this.setState({foodStation:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props,r=a.apiUrl,n=a.userId,o=a.isLoggedIn,s=a.sendInfoNotification,i=new FormData(e.target),l={schemaVersion:"request.1",userId:n,foodStation:this.state.foodStation,orderNumber:i.get("orderNumber")},c=!0!==o?"You must be logged in":function(e){return""===e.schemaVersion.trim()?"Schema version is empty":""}(l);""===c?fetch("".concat(r,"/create-request"),{method:"POST",credentials:"include",body:JSON.stringify(l),headers:{"content-type":"application/json"}}).then((function(e){e.ok?e.json().catch((function(e){return t.setState({error:e})})).then((function(e){s("Request submitted!"),t.props.history.push("/all-requests")})):e.json().then((function(e){throw new Error("Error: ".concat(e.message))})).catch((function(e){return t.setState({error:e})}))})):this.setState({error:"Error: ".concat(c,".")})}},{key:"render",value:function(){var e=this.state,t=e.foodStation,a=e.error,r=this.foodStationChanged.bind(this),o=this.handleSubmit.bind(this);return n.a.createElement("form",{onSubmit:o},null!==a&&n.a.createElement("div",{className:"alert alert-danger",role:"alert"},a),n.a.createElement("div",{className:"form-row"},n.a.createElement("div",{className:"form-group col-md-6"},n.a.createElement("select",{className:"form-control",onChange:r,id:"foodStation",name:"foodStation",value:t,required:!0},n.a.createElement("option",{disabled:!0,value:N.None}," ","-- Select GrubHub Station --"," "),n.a.createElement("option",{value:N.Pit},"Pit"),n.a.createElement("option",{value:N.Starbucks},"Starbucks"),n.a.createElement("option",{value:N.GrabNGo},"Grab N' Go"))),n.a.createElement("div",{className:"form-group col-md-6"},n.a.createElement("input",{type:"text",className:"form-control",id:"orderNumber",name:"orderNumber",placeholder:"Order Number(s)",required:!0}))),n.a.createElement("button",{type:"submit",id:"submitButton",className:"btn btn-primary float-right"},"Send pick-up request"))}}]),a}(n.a.Component),S=Object(v.f)(w),k=a(11),q=a(22),C=a.n(q);function M(e){var t=new Date(Date.parse(e));return n.a.createElement(C.a,{date:t})}var I=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.requestModalShow,a=e.requestModalChange,r=e.requestModalInfo;return n.a.createElement(k.a,{show:t,onHide:function(){return a(!1)},centered:!0},n.a.createElement(k.a.Header,null,n.a.createElement("h5",{className:"modal-title",id:"requestModalLabel"},"Order")),n.a.createElement(k.a.Body,null,n.a.createElement("ul",{className:"list-group"},n.a.createElement("li",{className:"list-group-item"},"Food Station: ",r.request.foodStation),n.a.createElement("li",{className:"list-group-item"},"Order Number: ",r.request.orderNumber),n.a.createElement("li",{className:"list-group-item"},"Request created: ",M(r.request.created)),r.request.deliverer&&n.a.createElement("li",{className:"list-group-item"},"Deliverer found: ",M(r.request.timeDelivererFound)),n.a.createElement("li",{className:"list-group-item"},"Sender name: ",r.sender.fullName),n.a.createElement("li",{className:"list-group-item"},"Sender dorm: ",r.sender.dormAndRoom),n.a.createElement("li",{className:"list-group-item"},"Sender email: ",r.sender.email),n.a.createElement("li",{className:"list-group-item"},"Sender allergies: ",r.sender.hasAllergy?r.sender.allergies:"None"))),n.a.createElement(k.a.Footer,null,n.a.createElement("button",{onClick:a,type:"button",className:"btn btn-secondary",value:!1},"Close"),n.a.createElement("button",{type:"submit",id:"updateButton",className:"btn btn-primary",disabled:!0},"Delivered!")))}}]),a}(n.a.Component);a(70);function j(e){var t=new Date(Date.parse(e));return n.a.createElement(C.a,{date:t})}var O=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={error:null,myHistory:[],hasMyHistoryLoaded:!1,requestModalShow:!1,requestModalInfo:{request:{_id:"",schemaVersion:"request.1",requestId:"",sender:"",foodStation:"Starbucks",orderNumber:"12312",created:"2020-08-24T07:33:18.879Z",status:"FoundVolunteer",deliverer:"",timeDelivererFound:"2020-09-12T22:17:04.503Z"},sender:{_id:"",schemaVersion:"user.1",userId:"",fullName:"Vlad Maksimovski",dormAndRoom:"Gale 334",email:"vmaksimo@u.rochester.edu",hashedPassword:"",hasAllergy:!1,allergies:""}}},r.getDeliveries=r.getDeliveries.bind(Object(m.a)(r)),r.requestModalChange=r.requestModalChange.bind(Object(m.a)(r)),r.requestChange=r.requestChange.bind(Object(m.a)(r)),r}return Object(d.a)(a,[{key:"requestModalChange",value:function(e){if("boolean"===typeof e)this.setState({requestModalShow:e});else{if("string"!==typeof e.target.value)throw new Error("Could not change request modal value.");this.setState({requestModalShow:"true"===e.target.value})}}},{key:"requestChange",value:function(e){var t=parseInt(e.target.value);this.setState({requestModalInfo:this.state.myHistory[t],requestModalShow:!0})}},{key:"componentDidMount",value:function(){this.getDeliveries()}},{key:"getDeliveries",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props.apiUrl,fetch("".concat(t,"/my-history"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){if("message"in e)throw new Error(e.message);a.setState({myHistory:e.history,hasMyHistoryLoaded:!0})})).catch((function(e){return a.setState({error:e,myHistory:[],hasMyHistoryLoaded:!0})}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.error,r=t.myHistory,o=t.hasMyHistoryLoaded,s=t.requestModalShow,i=t.requestModalInfo,l=this.props.userId,c=r.map((function(t,a){return n.a.createElement("li",{key:t.request.requestId,className:"d-flex justify-content-between align-items-center list-group-item ".concat(a!==r.length-1?"mb-2":"")},n.a.createElement("div",null,n.a.createElement("b",null,t.request.sender===l?"Order at "+t.request.foodStation:"Delivery for "+t.request.foodStation),n.a.createElement("br",null),n.a.createElement("br",null),"Last updated ","Requested"===t.request.status?j(t.request.created):j(t.request.timeDelivererFound)),n.a.createElement("div",{className:"d-flex align-items-center"},n.a.createElement("button",{value:a,className:"btn btn-primary",onClick:e.requestChange},"View")))}));return n.a.createElement("div",null,n.a.createElement("div",{id:"load-my-history",style:o?{display:"none"}:{}},n.a.createElement("img",{src:"".concat("/PitBoss","/loading.gif"),alt:"Loading..."})),n.a.createElement("div",{id:"error-my-history",className:"alert alert-danger",style:null===a?{display:"none"}:{}},null!==a&&a.toString()),n.a.createElement(I,{requestModalShow:s,requestModalChange:this.requestModalChange,requestModalInfo:i}),n.a.createElement("ul",{className:"list-group"},c))}}]),a}(n.a.Component),L=(a(71),a(39)),D=a.n(L),x={prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"",seconds:"<1 min",minute:"1 min",minutes:"%d mins",hour:"1 hr",hours:"%d hrs",day:"1 day",days:"%d days",month:"1 mon",months:"%d mon",year:"1 yr",years:"%d yrs",wordSeparator:" "};var P=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={error:null,requests:[],haveRequestsLoaded:!1},r.getRequests=r.getRequests.bind(Object(m.a)(r)),r}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.getRequests()}},{key:"getRequests",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props.apiUrl,fetch("".concat(t,"/get-requests"),{credentials:"include"}).then((function(e){return e.json()})).then((function(e){return a.setState({requests:e,haveRequestsLoaded:!0})}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleDelivery",value:function(){var e=Object(c.a)(l.a.mark((function e(t){var a,r,n,o,s,i,c=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this.props,r=a.apiUrl,n=a.isLoggedIn,o=a.userId,s=a.sendInfoNotification,!0===n){e.next=4;break}return this.setState({error:"Error: Not logged in."}),e.abrupt("return");case 4:i={deliverer:o,requestId:t.target.value,status:"requested"},fetch("".concat(r,"/deliver-request"),{method:"POST",credentials:"include",body:JSON.stringify(i),headers:{"content-type":"application/json"}}).then((function(e){e.ok?e.json().catch((function(e){return c.setState({error:e})})).then((function(e){s("Delivery requested!"),c.props.history.push("/my-deliveries")})):e.json().then((function(e){throw new Error("Error: ".concat(e.message))})).catch((function(e){return c.setState({error:e})}))}));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.requests,a=e.haveRequestsLoaded,r=this.handleDelivery.bind(this),o=t.length,s=t.map((function(e,t){return n.a.createElement("li",{key:e.requestId,className:"d-flex justify-content-between list-group-item ".concat(t!==o-1?"mb-2":"")},n.a.createElement("div",null,e.foodStation,n.a.createElement("br",null),n.a.createElement("br",null),function(e){var t=D()(x),a=new Date(Date.parse(e));return n.a.createElement(C.a,{date:a,formatter:t})}(e.created)),n.a.createElement("div",{className:"d-flex align-items-center"},n.a.createElement("button",{value:e.requestId,onClick:r,className:"btn btn-dark"},"Deliver!")))}));return n.a.createElement("div",{id:"requests"},n.a.createElement("div",{id:"load-requests",style:a?{display:"none"}:{}},n.a.createElement("img",{src:"".concat("/PitBoss","/loading.gif"),alt:"Loading..."})),n.a.createElement("ul",{id:"requests-list",className:"list-group",style:a?{}:{display:"none"}},s))}}]),a}(n.a.Component),R=Object(v.f)(P);var U=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={hasAllergy:!1,error:null},r}return Object(d.a)(a,[{key:"allergyChanged",value:function(e){this.setState({hasAllergy:e.target.checked})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.state.hasAllergy,r=this.props,n=r.apiUrl,o=r.registerModalChange,s=r.onLoginChange,i=new FormData(e.target),l=i.get("fullName"),c=i.get("dormAndRoom"),u=i.get("email"),d=i.get("allergies");null===d&&(d="");var m=i.get("password"),h={schemaVersion:"user.1",fullName:l,dormAndRoom:c,email:u,password:m,hasAllergy:a,allergies:d},g=m!==i.get("password-repeat")?"Passwords do not match":function(e){return""===e.schemaVersion.trim()?"Schema version is empty":e.fullName.trim().includes(" ")?e.email.includes("@u.rochester.edu")?!e.password.length>6?"Please enter a secure password (6 characters or above)":"":"Please enter valid e-mail (must contain @u.rochester.edu)":"Please enter full name"}(h);""===g?fetch("".concat(n,"/auth/register"),{method:"POST",credentials:"include",body:JSON.stringify(h),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(a){200===e.status?(o(!1),t.setState({error:null}),console.log("Logged in as ".concat(a.userId)),s({isLoggedIn:!0,userId:a.userId})):t.setState({error:"".concat(e.status," Error: ").concat(a.message)})}))})):this.setState({error:"Error: ".concat(g,".")})}},{key:"render",value:function(){var e=this.state,t=e.hasAllergy,a=e.error,r=this.props,o=r.registerModalShow,s=r.registerModalChange,i=function(){return s(!1)},l=this.allergyChanged.bind(this),c=this.handleSubmit.bind(this);return n.a.createElement(k.a,{show:o,onHide:i,centered:!0},n.a.createElement(k.a.Header,null,n.a.createElement("h5",{className:"modal-title",id:"registerModalLabel"},"Register an account")),n.a.createElement("form",{onSubmit:c},n.a.createElement(k.a.Body,null,null!==a&&n.a.createElement("div",{className:"alert alert-danger",role:"alert"},a),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",className:"form-control",id:"fullName",name:"fullName",placeholder:"Full Name",required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",className:"form-control",id:"dormAndRoom",name:"dormAndRoom",placeholder:"Dorm and Room",required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"email",className:"form-control",id:"register-email",name:"email",placeholder:"email@u.rochester.edu",autoComplete:"username",required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",className:"form-control",id:"register-password",name:"password",placeholder:"Password",autoComplete:"new-password",required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",className:"form-control",id:"register-password-repeat",name:"password-repeat",placeholder:"Password (confirm)",autoComplete:"new-password",required:!0})),n.a.createElement("div",{className:"form-group form-check"},n.a.createElement("input",{type:"checkbox",defaultChecked:t,onChange:l,className:"form-check-input",id:"exampleCheck1"}),n.a.createElement("label",{className:"form-check-label",htmlFor:"exampleCheck1"},"Any allergies?")),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"text",className:"form-control",id:"allergies",name:"allergies",placeholder:"Allergies",disabled:t?"":"disabled",required:t?"required":""}))),n.a.createElement(k.a.Footer,null,n.a.createElement("button",{type:"button",onClick:i,className:"btn btn-secondary","data-dismiss":"modal"},"Close"),n.a.createElement("button",{type:"submit",id:"registerButton",className:"btn btn-primary"},"Register"))))}}]),a}(n.a.Component);var A=function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={error:null},r}return Object(d.a)(a,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=this.props,r=a.apiUrl,n=a.onLoginChange,o=this.props.loginModalChange.bind(this),s=new FormData(e.target),i={email:s.get("email"),password:s.get("password")},l=function(e){return e.email.includes("@u.rochester.edu")?!e.password.length>6?"Please enter a secure password (6 characters or above)":"":"Please enter valid e-mail (must contain @u.rochester.edu)"}(i);""===l?fetch("".concat(r,"/auth/login"),{method:"POST",credentials:"include",body:JSON.stringify(i),headers:{"content-type":"application/json"}}).then((function(e){return e.json().then((function(a){200===e.status?(o(!1),t.setState({error:null}),console.log("Logged in as ".concat(a.userId)),n({isLoggedIn:!0,userId:a.userId})):t.setState({error:"".concat(e.status," Error: ").concat(a.message)})}))})):this.setState({error:"Error: ".concat(l,".")})}},{key:"render",value:function(){var e=this.state.error,t=this.props,a=t.loginModalShow,r=t.loginModalChange,o=this.handleSubmit.bind(this);return n.a.createElement(k.a,{show:a,onHide:function(){return r(!1)},centered:!0},n.a.createElement(k.a.Header,null,n.a.createElement("h5",{className:"modal-title",id:"loginModalLabel"},"Login to your account")),n.a.createElement("form",{onSubmit:o},n.a.createElement(k.a.Body,null,null!==e&&n.a.createElement("div",{className:"alert alert-danger",role:"alert"},e),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"email",className:"form-control",id:"loginEmail",name:"email",placeholder:"email@u.rochester.edu",autoComplete:"username",required:!0})),n.a.createElement("div",{className:"form-group"},n.a.createElement("input",{type:"password",className:"form-control",id:"loginPassword",name:"password",placeholder:"Password",autoComplete:"current-password",required:!0}))),n.a.createElement(k.a.Footer,null,n.a.createElement("button",{onClick:r,type:"button",className:"btn btn-secondary",value:!1},"Close"),n.a.createElement("button",{type:"submit",id:"loginButton",className:"btn btn-primary"},"Login"))))}}]),a}(n.a.Component),H=(a(72),a(73),a(74),function(e){Object(h.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(u.a)(this,a),(r=t.call(this,e)).state={apiUrl:"https://pitboss-vlad.herokuapp.com",isLoggedIn:!1,userId:null,loginModalShow:!1,registerModalShow:!1},r.startSession=r.startSession.bind(Object(m.a)(r)),r}return Object(d.a)(a,[{key:"onLoginChange",value:function(e){!0===e.isLoggedIn?this.sendInfoNotification("Logged in!"):this.sendInfoNotification("Logged out."),this.setState({isLoggedIn:e.isLoggedIn,userId:e.userId})}},{key:"componentDidMount",value:function(){this.startSession()}},{key:"sendInfoNotification",value:function(e){p.NotificationManager.info(e)}},{key:"startSession",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.apiUrl,fetch("".concat(t,"/auth/start-session"),{method:"GET",credentials:"include"}).then((function(e){return e.json().then((function(t){if(!e.ok)throw new Error(t.message);a.setState({isLoggedIn:!0,userId:t.userId})}))})).catch((function(e){"Not logged in."!==e.message&&a.sendInfoNotification("".concat(e,". Try logging in again."))}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"loginModalChange",value:function(e){if("boolean"===typeof e)this.setState({loginModalShow:e});else{if("string"!==typeof e.target.value)throw new Error("Could not change login modal value.");this.setState({loginModalShow:"true"===e.target.value})}}},{key:"registerModalChange",value:function(e){if("boolean"===typeof e)this.setState({registerModalShow:e});else{if("string"!==typeof e.target.value)throw new Error("Could not change register modal value.");this.setState({registerModalShow:"true"===e.target.value})}}},{key:"render",value:function(){var e=this.state,t=e.isLoggedIn,a=e.userId,r=e.apiUrl,o=e.loginModalShow,s=e.registerModalShow,i=this.onLoginChange.bind(this),l=this.loginModalChange.bind(this),c=this.sendInfoNotification.bind(this),u=this.registerModalChange.bind(this);return n.a.createElement("div",{id:"App",className:"container"},n.a.createElement(f.a,{basename:"/PitBoss",hashType:"noslash"},n.a.createElement(p.NotificationContainer,null),n.a.createElement("div",{id:"navBar"},n.a.createElement(E,{apiUrl:r,title:"PitBoss",onLoginChange:i,isLoggedIn:t,loginModalChange:l,registerModalChange:u})),n.a.createElement(U,{apiUrl:r,onLoginChange:i,registerModalShow:s,registerModalChange:u}),n.a.createElement(A,{apiUrl:r,onLoginChange:i,loginModalShow:o,loginModalChange:l}),n.a.createElement(v.c,null,n.a.createElement(v.a,{exact:!0,path:"/"},n.a.createElement(R,{apiUrl:r,isLoggedIn:t,sendInfoNotification:c,userId:a})),n.a.createElement(v.a,{exact:!0,path:"/all-requests",render:function(){return n.a.createElement(R,{apiUrl:r,isLoggedIn:t,sendInfoNotification:c,userId:a})}}),n.a.createElement(v.a,{exact:!0,path:"/ask-for-delivery",render:function(){return n.a.createElement("div",{id:"deliveryForm"},n.a.createElement(S,{apiUrl:r,isLoggedIn:t,userId:a,sendInfoNotification:c}))}}),n.a.createElement(v.a,{exact:!0,path:"/my-deliveries",render:function(){return n.a.createElement("div",{id:"myHistoryPanel"},n.a.createElement(O,{apiUrl:r,userId:a}))}}),n.a.createElement(v.a,{render:function(){return n.a.createElement("div",{id:"error"},n.a.createElement("h4",{className:"alert alert-danger mb-0",role:"alert"},"404 error: Page not found."))}}))))}}]),a}(r.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[40,1,2]]]);
//# sourceMappingURL=main.a557e4ac.chunk.js.map