import React, { PureComponent } from 'react'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/link'
import {FormattedMessage} from 'umi/locale'



class BreadcrumbWrapper extends PureComponent {

    getBreadcrumbItem = () => {
        const { breadcrumbList } = this.props;
        return (
            breadcrumbList.map((item, index) => {
                return (
                    <Breadcrumb.Item key={item.path}>
                        {item.children || index == breadcrumbList.length - 1 ? <span>{item.name}</span> : <Link to={item.path}>{item.name}</Link>}
                    </Breadcrumb.Item>
                )
            })
        )
    }

    render() {
        const { navActiveKey } = this.props;
        return (
            navActiveKey === '/home' ? null : <Breadcrumb style={{ padding: "10px 15px", background: '#fff' }}>
                <Breadcrumb.Item key='home'>
                    <Link to="/home"><Icon type="home"></Icon> <FormattedMessage id="menu.home" /></Link>
                </Breadcrumb.Item>
                {this.getBreadcrumbItem()}
            </Breadcrumb>
        )
    }

}
export default BreadcrumbWrapper;