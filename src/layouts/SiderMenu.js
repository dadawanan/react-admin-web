import React, { PureComponent } from 'react';
import { Layout } from 'antd'
import className from 'classnames'
import Link from 'umi/link'
import styles from './SiderMenu.less'
import MenuBase from './SiderMenuBase';
import logo from '../assets/react.svg'
const { Sider } = Layout;


class SiderMenu extends PureComponent {
    constructor(props) {
        super(props)
    }
    
    openMenu=({item, key, keyPath })=>{
       console.log(item,key,keyPath)
    }

    render() {
        const { collapsed, onCollapse,theme,menuData} = this.props;
        return (
            <Sider className={className(styles.sider, styles.fixSiderbar,{[styles.light]:theme==='light'})}
                width={268} collapsible trigger={null}
                theme={theme}
                defaultCollapsed={collapsed}
                collapsed={collapsed}
                breakpoint="lg" onCollapse={()=>onCollapse} >
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>Management Sys</h1>
                    </Link>
                </div>
                <MenuBase {...this.props} theme={theme} mode="inline" menuData={menuData} >
                  
                </MenuBase>
            </Sider>
        )
    }
}

export default SiderMenu;