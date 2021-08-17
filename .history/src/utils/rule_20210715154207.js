import { isPhone } from '@/utils/validate'
// 手机号验证
const validatePhone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
}
export const rules_user = {
  account: [{ required: true, trigger: 'blur', message: '请输入用户账号' }],
  username: [{ required: true, trigger: 'blur', message: '请输入用户名称' }],
  origize: [{ required: true, trigger: 'blur', message: '请选择组织机构' }],
  roles: [{ required: true, trigger: 'blur', message: '请选择角色' }],
  email: [
    { required: false, trigger: 'blur', message: '请输入邮箱' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  limit: [{ required: true, trigger: 'blur', message: '请选择开发权限' }],
  sex: [{ required: true, trigger: 'blur', message: '请选择性别' }],
}
export const order_user = {
  consignerName: [{ required: true, trigger: 'blur', message: '请选择单位' }],
  invoiceNum: [
    { required: false, trigger: 'blur', message: '请输入开票客户编码' },
  ],
  customerType: [
    { required: true, trigger: 'blur', message: '请选择客户类型' },
  ],
  custType: [{ required: true, trigger: 'blur', message: '请选择客户类型' }],
  consignerAddress: [
    { required: true, trigger: 'blur', message: '请选择发货地址' },
  ],
  consignerContacts: [
    { required: true, trigger: 'blur', message: '请输入发货联系人' },
  ],
  consignerTel: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入联系电话',
      validator: validatePhone,
    },
  ],
  prodName: [{ required: true, trigger: 'blur', message: '请选择物料' }],
  cateName: [{ required: false, trigger: 'blur', message: '请输入物料分类' }],
  amount: [{ required: true, trigger: 'blur', message: '请输入订单总量' }],
  executedAmount: [
    { required: true, trigger: 'blur', message: '请输入订单执行量' },
  ],
  planAmount: [{ required: true, trigger: 'blur', message: '请输入预发量' }],
  surplusAmount: [
    { required: false, trigger: 'blur', message: '请输入剩余量' },
  ],
  receiverName: [
    { required: true, trigger: 'blur', message: '请选择收货单位' },
  ],
  receiverAddress: [
    { required: true, trigger: 'blur', message: '请选择收获地址' },
  ],
  receiverContacts: [
    { required: false, trigger: 'blur', message: '请选择收货联系人' },
  ],
  receiverTel: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入联系电话',
      validator: validatePhone,
    },
  ],
}
export const procu_play = {
  dpPlanCode: [{ required: false, trigger: '', message: '请选择计划单号' }],
  check_status_value: [
    { required: true, trigger: '', message: '请选择验收地点' },
  ],
  deducted: [{ required: true, trigger: '', message: '请输入扣吨' }],
}
export const procu_play_sale = {
  dpPlanCode: [{ required: false, trigger: '', message: '请选择计划单号' }],
  check_status_value: [
    { required: true, trigger: '', message: '请选择验收地点' },
  ],
  deducted: [{ required: true, trigger: '', message: '请输入扣吨' }],
}
export const sale_play = {
  dpPlanCode: [{ required: true, trigger: '', message: '请选择计划单号' }],
  salesOrderCode: [{ required: true, trigger: '', message: '请选择订单号' }],
  carrierUnit: [{ required: false, trigger: '', message: '请选择承运单位' }],
  wTime: [{ required: false, trigger: '', message: '订单有效日期' }],
  itTime: [{ required: false, trigger: '', message: '订单开始日期' }],
  consignerName: [{ required: false, trigger: '', message: '请选择单位' }],
  invoiceNum: [{ required: false, trigger: '', message: '请输入开票客户编码' }],
  consignerAddress: [
    { required: false, trigger: '', message: '请选择发货地址' },
  ],
  consignerContacts: [
    { required: false, trigger: '', message: '请输入发货联系人' },
  ],
  consignerTel: [
    {
      required: false,
      trigger: '',
      message: '请输入联系电话',
    },
  ],
  prodName: [{ required: false, trigger: '', message: '请选择物料' }],
  cateName: [{ required: false, trigger: '', message: '请输入物料分类' }],
  amount: [{ required: false, trigger: '', message: '请输入订单总量' }],
  executedAmount: [
    { required: true, trigger: '', message: '请输入订单执行量' },
  ],
  planAmount: [{ required: true, trigger: '', message: '请输入预发量' }],
  surplusAmount: [{ required: false, trigger: '', message: '请输入剩余量' }],
  receiverName: [{ required: false, trigger: '', message: '请选择收货单位' }],
  receiverAddress: [
    { required: false, trigger: '', message: '请选择收获地址' },
  ],
  receiverContacts: [
    { required: false, trigger: '', message: '请选择收货联系人' },
  ],
  receiverTel: [
    {
      required: false,
      trigger: '',
      message: '请输入联系电话',
    },
  ],
  check_status_value: [
    { required: true, trigger: '', message: '请选择验收地点' },
  ],
  discount: [{ required: true, trigger: '', message: '请输入扣除吨数' }],
  playAmount: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入派车计划总量',
    },
  ],
}
