<template>
  <div class="main">
    <el-form ref="searchForm" :inline="true" :model="form">
      <el-form-item label="对账单号">
        <el-input
          v-model.trim="form.stmtNum.value"
          clearable
          placeholder="请输入对账单号"
        />
      </el-form-item>
      <el-form-item label="单据状态">
        <el-select
          v-model="form.status.value"
          clearable
          placeholder="请选择单据状态"
          style="width: 100%"
        >
          <el-option label="已对账" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-search" @click="search">
          查询
        </el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" icon="el-icon-refresh" @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog">
          新增
        </el-button>
        <el-button
          v-permission="'audit'"
          type="primary"
          icon="el-icon-check"
          @click="auditDialog(1)"
        >
          审核
        </el-button>
        <el-button
          v-permission="'cancel_audit'"
          type="primary"
          icon="el-icon-close"
          @click="auditDialog(2)"
        >
          弃审
        </el-button>
        <el-button
          v-permission="'cancel'"
          type="primary"
          icon="el-icon-close"
          @click="cancelDialog()"
        >
          撤销
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="table"
          :data="tablelists"
          row-key="id"
          border
          highlight-current-row
          max-height="600"
          :tree-props="{ children: 'children' }"
          @row-click="handleCurrentChange"
        >
          <el-table-column
            prop="stmtNum"
            label="对账单号"
            show-overflow-tooltip
          />
          <el-table-column prop="totalOutAmount" label="对账实发总量" />
          <el-table-column prop="totalReceivingAmount" label="对账实收总量" />
          <el-table-column prop="totalDeducted" label="对账扣吨总量" />
          <el-table-column prop="totalSignAmount" label="对账验收总量" />
          <el-table-column prop="stmtDate" label="对账日期">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ thirteenBitTimestampYMD(scope.row.stmtDate) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="单据状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status == 1 ? '已对账' : '未对账' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" label="审核状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.auditStatus == 1 ? '已审核' : '未审核' }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
          :page-size="webPage.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="total, prev, pager, next, jumper"
          :total="webPage.totalPage"
          @current-change="changePage"
          @size-change="handleSizeChange"
        />
      </el-col>
    </el-row>
    <el-dialog
      title="在线对账"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="90%"
      @close="closeDialogForm"
    >
      <el-form
        ref="updateForm"
        :inline="true"
        :model="statementForm"
        label-width="90px"
        style="width: 95%; margin: 0 auto"
        :rules="rules"
      >
        <el-row>
          <el-form-item label="对账类型" prop="stmtType">
            <el-select
              v-model="statementForm.stmtType"
              clearable
              placeholder="请选择对账类型"
              style="width: 100%"
              @change="stmtTypeChange"
            >
              <el-option
                v-for="item in stmtTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="往来单位类型" prop="comType" label-width="110px">
            <el-select
              v-model="statementForm.comType"
              clearable
              placeholder="请选择单位类型"
              style="width: 100%"
              @change="comTypeChange"
            >
              <el-option
                v-for="item in comTypeList[statementForm.stmtType]"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="往来单位" prop="bizCoName">
            <el-input v-model="statementForm.bizCoName" type="text" disabled />
            <el-button
              class="item-btn"
              icon="el-icon-search"
              @click="openChooseCom"
            >
              <div style="width: 100%; height: 100%"></div>
            </el-button>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="发货单位" prop="consignerName">
            <el-input
              v-model.trim="dialogForm.consignerName"
              clearable
              placeholder="请输入发货单位"
              :disabled="disableList.consignerNameAble"
            />
          </el-form-item>
          <el-form-item label="收货单位" prop="receiverName">
            <el-input
              v-model.trim="dialogForm.receiverName"
              clearable
              placeholder="请输入收货单位"
              :disabled="disableList.receiverNameAble"
            />
          </el-form-item>
          <el-form-item label="物料名称" prop="prodName">
            <el-input
              v-model.trim="dialogForm.prodName"
              clearable
              placeholder="请输入物料名称"
            />
          </el-form-item>
          <el-form-item label="经销商" prop="dealerName">
            <el-input
              v-model.trim="dialogForm.dealerName"
              clearable
              placeholder="请输入经销商"
              :disabled="disableList.dealerNameAble"
            />
          </el-form-item>
          <el-form-item label="订单号" prop="purchaseOrderCode">
            <el-input
              v-model.trim="dialogForm.purchaseOrderCode"
              clearable
              placeholder="请输入订单号"
            />
          </el-form-item>
          <el-form-item label="驾驶员" prop="driverName">
            <el-input
              v-model.trim="dialogForm.driverName"
              clearable
              placeholder="请输入驾驶员"
            />
          </el-form-item>
          <el-form-item label="车牌号" prop="truckId">
            <el-input
              v-model.trim="dialogForm.truckId"
              clearable
              placeholder="请输入车牌号"
            />
          </el-form-item>
          <el-form-item label="承运商" prop="carrierName">
            <el-input
              v-model.trim="dialogForm.carrierName"
              clearable
              placeholder="请输入承运商"
              :disabled="disableList.carrierNameAble"
            />
          </el-form-item>
          <el-form-item label="签收日期" prop="signTimes">
            <el-date-picker
              v-model="signTimes"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="signTimeChange"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchOrder"
            >
              查询
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="resetOrder"
            >
              重置
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row type="flex" justify="space-around">
        <el-col :span="23">
          <el-table
            :data="statementTableList"
            row-key="id"
            border
            highlight-current-row
            max-height="350"
            :tree-props="{ children: 'children' }"
            @selection-change="handleStatementSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              prop="agentOrderCode"
              label="订单号"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dpPlanCode"
              label="计划单号"
              show-overflow-tooltip
            />
            <el-table-column
              prop="dpOrderCode"
              label="派车单号"
              show-overflow-tooltip
            />
            <el-table-column
              prop="consignerName"
              label="发货单位"
              show-overflow-tooltip
            />
            <el-table-column
              prop="receiverName"
              label="收货单位"
              show-overflow-tooltip
            />
            <el-table-column
              prop="receiverAlias"
              label="收货地点"
              show-overflow-tooltip
            />
            <el-table-column
              prop="prodName"
              label="物料名称"
              show-overflow-tooltip
            />
            <el-table-column
              prop="truckId"
              label="车牌号"
              show-overflow-tooltip
            />
            <el-table-column
              prop="driverName"
              label="驾驶员"
              show-overflow-tooltip
            />
            <el-table-column
              prop="amount"
              label="预发数量"
              show-overflow-tooltip
            />
            <el-table-column
              prop="outAmount"
              label="实发数量"
              show-overflow-tooltip
            />
            <el-table-column
              prop="receivingAmount"
              label="实收数量"
              show-overflow-tooltip
            />
            <el-table-column
              prop="deducted"
              label="扣吨"
              show-overflow-tooltip
            />
            <el-table-column
              prop="checkAmount"
              label="验收数量"
              show-overflow-tooltip
            />
            <el-table-column
              prop="signTime"
              label="签收日期"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">
                  {{ thirteenBitTimestampYMD(scope.row.signTime) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="单据状态"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{ statusList[scope.row.status] }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="updateAble" @click="submitForm">
          生成对账单
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      ref="dialog"
      :visible="dialogComVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择单位"
      @close="comCannel"
    >
      <div>
        <el-row>
          <el-col>
            <el-table
              ref="multipleTable"
              :data="comTableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="rid"
              border
              highlight-current-row
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @row-click="chooseCurrentRow"
            >
              <el-table-column
                prop="coName"
                label="单位名称"
                show-overflow-tooltip
              />
              <el-table-column prop="coCode" label="单位编码" />
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="comPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="comPage.totalPage"
              @current-change="changeComPage"
              @size-change="handleComSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="comCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="comOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDporderStatementList,
    getDporderStatementAgentOrderList,
    addAgentDporderStatement,
    updateAuditStatus,
    revokeDporderStatement,
  } from '@/api/dporderStatement'
  import { getCompanyListBySendcons } from '@/api/company'
  import {
    thirteenBitTimestampYMD,
    thirteenBitTimestamp2YMD,
  } from '@/utils/index'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  export default {
    data() {
      var checkAll = (rule, value, cb) => {
        if (isAll(value)) {
          return cb()
        }
        cb(new Error('请输入合法的字符'))
      }
      return {
        statusList: [
          '',
          '未开始',
          '已接单',
          '已装货',
          '以卸货',
          '已签收',
          '已取消',
        ],
        updateAble: false,
        disableList: {
          dealerNameAble: false,
          carrierNameAble: false,
          consignerNameAble: false,
          receiverNameAble: false,
        },
        dialogComVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        businessType: '1', //业务类型
        bizCoList: [], //往来单位
        stmtTypeList: [
          {
            id: 1,
            name: '货款对账',
          },
          {
            id: 2,
            name: '运费对账',
          },
        ],
        comTypeList: {
          1: [
            {
              id: 2,
              name: '发货单位',
            },
            {
              id: 3,
              name: '收货单位',
            },
            {
              id: 8,
              name: '经销商',
            },
          ],
          2: [
            {
              id: 6,
              name: '承运商',
            },
          ],
        },
        comType: '',
        statementForm: {
          stmtType: '',
          bizCoName: '',
          bizCoCode: '',
          comType: '',
          dpOrderCodes: [],
        },
        statementTableChoose: [],
        statementTableList: [],
        signTimes: '',
        dialogForm: {
          // isActive: '',
          prodName: '',
          purchaseOrderCode: '',
          driverName: '',
          truckId: '',
          signTimeStart: '',
          signTimeEnd: '',
          dealerName: '',
          carrierName: '',
          consignerName: '',
          receiverName: '',
        },
        orderPage: {
          page: 1,
          pageSize: 10,
          param: {},
          sort: 'desc',
          sortFieldName: 'operateTime',
        },
        chooseIndex: '',
        tablelists: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: 'operateTime',
          paramList: [],
        },
        comTableData: [],
        comPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {
            type: 1,
          },
        },
        tempChoose: {
          coName: '',
          coCode: '',
        },
        form: {
          stmtNum: {
            value: '',
            mark: 'like',
          },
          status: {
            value: '',
            mark: '',
          },
        },
        rules: {
          stmtType: [{ required: true, message: '请输入对账类型' }],
          bizCoName: [{ required: true, message: '请选择往来单位名称' }],
          comType: [{ required: true, message: '请选择往来单位类型' }],
          memo: [
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
        },
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
      }),
    },
    mounted() {
      this.getDataList()
    },
    methods: {
      thirteenBitTimestampYMD,
      thirteenBitTimestamp2YMD,
      changeSelType() {
        this.statementTableList = []
      },
      auditDialog(val) {
        if (this.chooseIndex) {
          const msgstr = val == 1 ? '审核' : '弃审'
          updateAuditStatus({ auditStatus: val, rid: this.chooseIndex }).then(
            (res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: `${msgstr}成功!`,
                })
                this.getDataList()
                this.chooseIndex = ''
                this.$refs.table.setCurrentRow()
              } else {
                this.$message.error(res.message)
              }
            }
          )
        } else {
          this.$message.error('未选中')
        }
      },
      cancelDialog() {
        if (this.chooseIndex) {
          revokeDporderStatement({ rid: this.chooseIndex }).then((res) => {
            if (res.status == '0') {
              this.$message({
                type: 'success',
                message: `撤销成功!`,
              })
              this.getDataList()
              this.chooseIndex = ''
              this.$refs.table.setCurrentRow()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('未选中')
        }
      },
      stmtTypeChange() {
        this.statementForm.comType = ''
        this.statementForm.bizCoName = ''
        this.statementForm.bizCoCode = ''
      },
      comTypeChange(val) {
        this.statementForm.bizCoName = ''
        this.statementForm.bizCoCode = ''
      },
      openChooseCom() {
        if (this.statementForm.comType) {
          this.comPage.param.type = Math.floor(this.statementForm.comType / 2)
          this.getComDataList()
          this.dialogComVisible = true
        } else {
          this.$message({
            type: 'info',
            message: '请选择往来单位类型',
          })
        }
      },
      getComDataList() {
        this.comTableData = []
        getCompanyListBySendcons(this.comPage).then((res) => {
          this.comTableData = res.data.list
          if (res.data.entity) {
            this.comTableData.push(res.data.entity)
          }
          this.comPage.totalPage = res.data.page.totalNumber
        })
      },
      comCannel() {
        this.comPage.page = 1
        this.dialogComVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      comDisable() {
        this.disableList = this.$options.data().disableList
      },
      comOk() {
        if (this.tempChoose.coName || this.tempChoose.coCode) {
          this.comDisable()
          this.dialogForm.consignerName = ''
          this.dialogForm.receiverName = ''
          this.dialogForm.carrierName = ''
          this.dialogForm.dealerName = ''
          if (this.statementForm.comType == 2) {
            this.dialogForm.consignerName = this.tempChoose.coName
            this.disableList.consignerNameAble = true
          } else if (this.statementForm.comType == 3) {
            this.dialogForm.receiverName = this.tempChoose.coName
            this.disableList.receiverNameAble = true
          } else if (this.statementForm.comType == 6) {
            this.dialogForm.carrierName = this.tempChoose.coName
            this.disableList.carrierNameAble = true
          } else if (this.statementForm.comType == 8) {
            this.dialogForm.dealerName = this.tempChoose.coName
            this.disableList.dealerNameAble = true
          }
          this.comPage.page = 1
          this.statementForm.bizCoCode = this.tempChoose.coCode
          this.statementForm.bizCoName = this.tempChoose.coName
          this.dialogComVisible = false
          this.$refs.multipleTable.clearSelection()
          this.tempChoose = this.$options.data().tempChoose
        } else {
          this.$message({
            type: 'info',
            message: '请选择往来单位',
          })
        }
      },
      chooseCurrentRow(row) {
        this.tempChoose.coCode = row.coCode
        this.tempChoose.coName = row.coName
      },
      changeComPage(val) {
        this.comPage.page = val
        this.getComDataList()
      },
      handleComSizeChange(val) {
        this.comPage.pageSize = val
        this.getComDataList()
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.dialogFormEdit = 2
      },
      initDialog() {
        this.$refs['updateForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.statementForm = this.$options.data().statementForm
        this.statementTableList = []
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delWarehouse({ rid }).then((res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getDataList()
              } else {
                this.$message.error(res.message)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      closeDialogForm() {
        this.dialogFormVisible = false
        this.initDialog()
      },
      changePage(val) {
        this.webPage.page = val
        this.getDataList()
      },
      handleCurrentChange(val) {
        this.chooseIndex = val.rid
      },
      handleSizeChange(val) {
        this.webPage.pageSize = val
        this.getDataList()
      },
      signTimeChange(val) {
        val.forEach((item, index) => {
          // if (index === 0) {
          //   this.dialogForm.signTimeStart = thirteenBitTimestamp2YMD(
          //     new Date(item).getTime()
          //   )
          // } else {
          //   this.dialogForm.signTimeEnd = thirteenBitTimestamp2YMD(
          //     new Date(item).getTime()
          //   )
          // }
          this.dialogForm.signTimeStart =
            index === 0
              ? thirteenBitTimestamp2YMD(new Date(item).getTime())
              : this.dialogForm.signTimeStart
          this.dialogForm.signTimeEnd =
            index === 1
              ? thirteenBitTimestamp2YMD(new Date(item).getTime())
              : this.dialogForm.signTimeEnd
        })
      },
      handleStatementSelectionChange(val) {
        this.statementTableChoose = val
      },
      submitForm() {
        this.updateAble = true
        this.$refs['updateForm'].validate((valid) => {
          if (valid) {
            if (this.statementTableChoose.length > 0) {
              this.statementTableChoose.forEach((item) => {
                this.statementForm.dpOrderCodes.push(item.dpOrderCode)
              })
              addAgentDporderStatement(this.statementForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '对账成功!',
                  })
                  this.dialogFormVisible = false
                  this.initDialog()
                  this.webPage.page = 1
                  this.getDataList()
                  this.statementTableList = []
                } else {
                  this.$message.error(res.message)
                }
                this.updateAble = false
              })
            } else {
              this.updateAble = false
              this.$message.error('请选择对账数据')
            }
          } else {
            this.updateAble = false
            console.log('error submit!!')
            return false
          }
        })
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        this.webPage.paramList = []
        Object.keys(this.form).forEach((element) => {
          this.webPage.paramList.push({
            name: element,
            value: this.form[element].value || null,
            mark: this.form[element].mark,
          })
        })
        getDporderStatementList(this.webPage).then((res) => {
          if (res.status == '0') {
            this.tablelists = res.data.list || []
            this.webPage.totalPage = res.data.page.totalNumber
            setTimeout(() => {
              if (showProgressBar) VabProgress.done()
            }, 200)
          } else {
            this.$message.error(res.message)
            VabProgress.done()
          }
        })
      },
      search() {
        this.webPage.page = 1
        this.getDataList()
      },
      reset() {
        this.form.stmtNum.value = null
        this.form.status.value = null
      },
      searchOrder() {
        this.$refs['updateForm'].validate((valid) => {
          if (valid) {
            this.getDporderStatementOrderDataList()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getDporderStatementOrderDataList() {
        this.orderPage.param = this.dialogForm
        this.orderPage.param['stmtType'] = this.statementForm.stmtType
        getDporderStatementAgentOrderList(this.orderPage).then((res) => {
          if (res.status == 0) {
            this.statementTableList = res.data || []
          } else {
            this.$message.error(res.message)
          }
        })
      },
      resetOrder() {
        this.dialogForm = this.$options.data().dialogForm
        this.signTimes = ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .main {
    height: calc(100vh - 155px);
    padding: 20px;
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .item-btn {
    position: absolute;
    top: 2px;
    right: 1px;
    width: 40px;
    height: 30px;
    color: #fff;
    background: #188af3;
    border: none;
  }
</style>
