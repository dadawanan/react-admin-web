(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{Yfch:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.regTitle=t.regCode=t.regName=t.regPassword=t.regNameEn=t.regNameCn=t.regAccount=t.regPhone=void 0;var s=/^1[34578]\d{9}$/;t.regPhone=s;var r=/^[a-zA-Z0-9@._]{1,50}$/;t.regAccount=r;var d=/^[\u4e00-\u9fa5a-zA-Z. ]{1,50}$/;t.regNameCn=d;var l=/^[a-zA-Z. ]{1,50}$/;t.regNameEn=l;var n=/^[^\s]{4,50}$/;t.regPassword=n;var i=/^[\u4e00-\u9fa5a-zA-Z0-9. ]{1,50}$/;t.regName=i;var o=/^[a-zA-Z_0-9]{1,50}$/;t.regCode=o;var u=/^[\u4e00-\u9fa5\S]{1,50}$/;t.regTitle=u},slW9:function(e,t,a){"use strict";var s=a("oWcC"),r=a("eVuz");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var d=s(a("kLXV"));a("Mwp2");var l=s(a("VXEj")),n=s(a("CAYl"));a("5NDa");var i=s(a("5rEg")),o=s(a("18bz"));a("miYZ");var u=s(a("tsqr")),c=s(a("UpVr"));a("y8nQ");var m,p,f,g,h=s(a("Vl3Y")),w=r(a("q1tI")),v=a("LLXN"),M=a("WXbf"),E=a("Yfch"),y=(m=(0,M.connect)(e=>{var t=e.app;return{currentUser:t.currentUser}}),p=h.default.create(),m(f=p((g=class extends w.PureComponent{constructor(){var e;e=super(...arguments),this.state={modalVisible:!1},this.handleOpenModal=(()=>{this.setState({modalVisible:!0})}),this.handleCloseModal=(()=>{this.props.form.resetFields(),this.setState({modalVisible:!1})}),this.handUpdatePwd=(t=>{t.preventDefault(),this.props.form.validateFields(function(){var t=(0,c.default)(o.default.mark(function t(a,s){var r,d,l;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:a||(r=e.props,d=r.currentUser,l=r.dispatch,s.user_name=d.user_name,l({type:"app/updatePassword",payload:s,callback:()=>{u.default.success((0,v.formatMessage)({id:"msg.updated"}))}}),e.handleCloseModal());case 1:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}())}),this.getPwdStrength=(()=>{var e=this.props.currentUser.password_strength;return 3==e?w.default.createElement("font",{className:"strong"}," ",w.default.createElement(v.FormattedMessage,{id:"setting.security.password.strength.strong"})):2==e?w.default.createElement("font",{className:"medium"}," ",w.default.createElement(v.FormattedMessage,{id:"setting.security.password.strength.medium"})):w.default.createElement("font",{className:"weak"}," ",w.default.createElement(v.FormattedMessage,{id:"setting.security.password.strength.weak"}))}),this.getList=(()=>{var e=[{title:(0,v.formatMessage)({id:"setting.security.password"},{}),description:w.default.createElement(w.Fragment,null,(0,v.formatMessage)({id:"setting.security.password-description"}),"\uff1a",this.getPwdStrength()),actions:[w.default.createElement("a",{onClick:this.handleOpenModal},w.default.createElement(v.FormattedMessage,{id:"label.update"}))]}];return e}),this.getModelContent=(()=>{var e=this.props.form.getFieldDecorator,t={labelCol:{span:7},wrapperCol:{span:13}};return w.default.createElement(h.default,{layout:"horizontal"},w.default.createElement(h.default.Item,(0,n.default)({},t,{label:(0,v.formatMessage)({id:"setting.security.password.old"})}),e("old_password",{rules:[{required:!0,message:(0,v.formatMessage)({id:"setting.security.validation.password.required"})},{pattern:E.regPassword,message:(0,v.formatMessage)({id:"setting.security.validation.password"})}]})(w.default.createElement(i.default,{type:"password",autoFocus:!0}))),w.default.createElement(h.default.Item,(0,n.default)({},t,{label:(0,v.formatMessage)({id:"setting.security.password.new"})}),e("new_password",{initialValue:"",rules:[{required:!0,message:(0,v.formatMessage)({id:"setting.security.validation.password.required"})},{pattern:E.regPassword,message:(0,v.formatMessage)({id:"setting.security.validation.password"})}]})(w.default.createElement(i.default,{type:"password"}))))})}render(){return w.default.createElement(w.Fragment,null,w.default.createElement("h2",null,w.default.createElement(v.FormattedMessage,{id:"menu.setting.security"})),w.default.createElement(l.default,{itemLayout:"horizontal",dataSource:this.getList(),renderItem:e=>w.default.createElement(l.default.Item,{actions:e.actions},w.default.createElement(l.default.Item.Meta,{title:e.title,description:e.description}))}),w.default.createElement(d.default,{title:(0,v.formatMessage)({id:"setting.security.password.update-title"}),visible:this.state.modalVisible,onCancel:this.handleCloseModal,onOk:this.handUpdatePwd},this.getModelContent()))}},f=g))||f)||f),b=y;t.default=b}}]);