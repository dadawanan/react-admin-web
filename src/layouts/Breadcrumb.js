import React, { PureComponent } from 'react'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/link'
import { FormattedMessage } from 'umi/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            navActiveKey === '/home' ? null : <Breadcrumb style={{ padding: "9px 15px", background: '#fff' }}>
                <Breadcrumb.Item key='home'>
                    <Link to="/home"><FontAwesomeIcon icon="home" /> <FormattedMessage id="menu.home" /></Link>
                </Breadcrumb.Item>
                {this.getBreadcrumbItem()}
            </Breadcrumb>
        )
    }

}
export default BreadcrumbWrapper;