import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Input, Divider, InputNumber, Popconfirm, Form, Modal, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { connect } from 'dva'
import { formatTime } from '../../utils/utils'
import { regName } from '../../utils/validate'
import { existRole} from '../../services/role'

@Form.create()
class RoleForm extends PureComponent {

    //保存
    handleOk = () => {
        const { form, handleSave } = this.props;
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            handleSave(fieldsValue);
        })
    }

    //验证角色是否已存在 
    handleExistRole = async (rule, value, callback) => {
        const { editInfo, mode } = this.props;
        const params = { role_name: value };
        if (!mode) params.role_id = editInfo.role_id;
        let { code, data } = await existRole(params);
        if (!code && data.exist) {
            callback(formatMessage({ id: 'validation.name.existed' }))
        }
        callback()
    }

    render() {
        const { form: { getFieldDecorator }, handleModalVisible, modalVisible, mode, editInfo } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Modal
                destroyOnClose
                title={
                    mode ? <span><FontAwesomeIcon icon="plus"></FontAwesomeIcon> <FormattedMessage id="system.role.modal.add" /></span> :
                        <span><FontAwesomeIcon icon="edit"></FontAwesomeIcon> <FormattedMessage id="system.role.modal.edit" /></span>}
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={handleModalVisible}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
                        {getFieldDecorator('role_name', {
                            initialValue: !mode ? editInfo.role_name : '',
                            validateFirst: true,
                            rules: [
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
                                { pattern: regName, message: formatMessage({ id: 'validation.name' }) },
                                { validator: this.handleExistRole }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.sort' })}>
                        {getFieldDecorator('sort_no', {
                            initialValue: !mode ? editInfo.sort_no : '',
                        })(
                            <InputNumber min={0} step={1} style={{ width: '100%' }}></InputNumber>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.desc' })}>
                        {getFieldDecorator('role_desc', {
                            initialValue: !mode ? editInfo.role_desc : '',
                        })(
                            <Input.TextArea maxLength={50}></Input.TextArea>
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}


@connect(({ role, loading }) => ({
    data: role.data,
    loading: loading.effects['role/getList']
}))
class Role extends PureComponent {

    state = {
        sortedInfo: {},//排序信息
        filteredInfo: {},//筛选信息
        modalVisible: false,
        modalMode: true,//弹框模式 true-新增；false-编辑
        editInfo: {},
    }

    componentDidMount() {
        this.initRoleDropList();
    }

    initRoleDropList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/getRoleDropList',
        })
    }

    /**表格排序、筛选变化时触发 */
    handleChange = (sorter, filters) => {
        this.setState({
            sortedInfo: { ...sorter },
            filteredInfo: { ...filters }
        })
    }

    /**删除角色 */
    handleDelete = (role_id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'role/delete',
            payload: { role_id },
            callback: () => {
                message.success(formatMessage({ id: 'msg.deleted' }))
            }
        })
    }


    /**弹框状态 */
    handleModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })
    }

    /**打开弹框 model true-新增；false-编辑 */
    handleModalOpen = (mode) => {
        this.setState({
            modalMode: mode,
            modalVisible: !this.state.modalVisible
        })
    }

    /**修改角色 */
    handleUpdate = (fieldsValue) => {
        this.setState({
            editInfo: fieldsValue
        }, () => {
            this.handleModalOpen(false)
        })
    }

    /**保存(新增、编辑)角色 */
    handleSave = (fieldsValue) => {
        const { dispatch } = this.props;
        const { modalMode, editInfo } = this.state;

        dispatch({
            type: modalMode ? 'role/create' : 'role/update',
            payload: modalMode ? fieldsValue : Object.assign(fieldsValue, { role_id: editInfo.role_id }),
            callback: () => {
                this.setState({
                    modalVisible: false
                })
                message.success(modalMode ? formatMessage({ id: 'msg.created' }) : formatMessage({ id: 'msg.updated' }))
            }
        })
    }

    render() {
        const { data, loading } = this.props;
        const { sortedInfo } = this.state;
        const columns = [{
            title: formatMessage({ id: 'label.name' }),
            key: 'role_name',
            dataIndex: 'role_name',
            fixed: true,
            width: 200,
        }, {
            title: formatMessage({ id: 'label.desc' }),
            key: 'role_desc',
            dataIndex: 'role_desc',
            fixed: true,
            width: 120,
        }, {
            title: formatMessage({ id: 'label.sort' }),
            key: 'sort_no',
            dataIndex: 'sort_no',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'sort_no' && sortedInfo.order,
            width: 180,
        }, {
            title: formatMessage({ id: 'label.create-time' }),
            key: 'create_time',
            dataIndex: 'create_time',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
            render: (text) => (<span>{formatTime(text)}</span>)
        }, {
            title: formatMessage({ id: 'label.operation' }),
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <div>
                    {
                        !record.is_system ?
                            <span>
                                <a href="javascript:;" onClick={() => this.handleUpdate(record)}><FontAwesomeIcon icon="edit" /> <FormattedMessage id="label.edit" /></a>
                                <Divider type="vertical" />
                                <Popconfirm placement="topRight"
                                    icon={<FontAwesomeIcon icon="question-circle" className="danger" />}
                                    okText={formatMessage({ id: 'button.yes' })}
                                    cancelText={formatMessage({ id: 'button.no' })}
                                    title={formatMessage({ id: 'system.role.delete.prompt' })}
                                    onConfirm={() => this.handleDelete(record.role_id)}>
                                    <a href="javascript:;"><FontAwesomeIcon icon="times" /> <FormattedMessage id="label.delete" /></a>
                                </Popconfirm>
                            </span> : null
                    }
                </div>
            )
        }];
        const buttons = (
            <React.Fragment>
                <Button type="primary" onClick={() => this.handleModalOpen(true)} ><FontAwesomeIcon icon="plus" style={{ marginRight: '6px' }} /><FormattedMessage id="button.add" /></Button>
            </React.Fragment>
        )
        const userFormProps = {
            mode: this.state.modalMode,
            editInfo: this.state.editInfo,
            modalVisible: this.state.modalVisible,
            handleModalVisible: this.handleModalVisible,
            handleSave: this.handleSave,
        }
        return (
            <Fragment>
                <TablePage loading={loading} url="role/getList"
                    data={data} columns={columns} buttons={buttons} rowKey="role_id"
                    onChange={this.handleChange}
                >
                    <TablePage.QueryItem label={formatMessage({ id: 'system.role' })} name="role_name">
                        <Input placeholder={formatMessage({ id: "placeholder.input" })} />
                    </TablePage.QueryItem>
                </TablePage>
                <RoleForm {...userFormProps} ></RoleForm>
            </Fragment>
        )
    }
}

export default Role;