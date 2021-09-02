<template>
  <div class="saleticket-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          class="from-user"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item label="审核状态:">
            <el-select v-model="status" placeholder="请选择审核状态">
              <el-option
                v-for="item in ckType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号:">
            <el-input
              v-model.trim="queryForm.contractNum"
              clearable
              placeholder="请输入合同编号"
            />
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input
              v-model.trim="queryForm.orderNum"
              clearable
              placeholder="请输入订单号"
            />
          </el-form-item>
          <el-form-item label="物料名称:">
            <el-input
              v-model.trim="queryForm.prodName"
              clearable
              placeholder="请输入物料名称"
            />
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input
              v-model.trim="queryForm.consignerName"
              clearable
              placeholder="请输入客户名称"
            />
          </el-form-item>
          <el-form-item label="开票客户:">
            <el-input
              v-model.trim="queryForm.invoiceEntity"
              clearable
              placeholder="请输入开票客户"
            />
          </el-form-item>
          <el-form-item label="订单状态:">
            <el-select v-model="tstatus" placeholder="请选择订单状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="订单日期:">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" type="primary" @click="resetForm">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-top-panel :span="16">
        <el-button
          v-permission="'add'"
          icon="el-icon-plus"
          type="primary"
          @click="handleEdit"
        >
          录入
        </el-button>
        <el-button
          v-permission="'edit'"
          icon="el-icon-edit"
          type="primary"
          @click="handleButton('edit')"
        >
          编辑
        </el-button>
        <el-button
          v-permission="'fix'"
          icon="el-icon-edit"
          type="primary"
          @click="handleButton('fix')"
        >
          修订
        </el-button>
        <el-button
          v-permission="'del'"
          icon="el-icon-delete"
          type="primary"
          @click="handleButton('del')"
        >
          删除
        </el-button>
        <el-button
          v-permission="'view'"
          icon="el-icon-view"
          type="primary"
          @click="handleButton('view')"
        >
          查看
        </el-button>
        <el-button
          v-permission="'audit'"
          icon="el-icon-check"
          type="primary"
          @click="handleButton('check')"
        >
          审核
        </el-button>
        <el-button
          v-permission="'cancel_audit'"
          icon="el-icon-close"
          type="primary"
          @click="handleButton('abandon')"
        >
          弃审
        </el-button>
        <el-button
          v-permission="'open'"
          icon="el-icon-open"
          type="primary"
          @click="handleButton('open')"
        >
          开启
        </el-button>
        <el-button
          v-permission="'close'"
          icon="el-icon-turn-off"
          type="primary"
          @click="handleButton('close')"
        >
          关闭
        </el-button>
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="handleButton('cacute')"
        >
          计量
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      class="user-table"
      :data="list"
      border
      @selection-change="setSelectRows"
    >
      <el-table-column
        align="center"
        fixed
        show-overflow-tooltip
        type="selection"
      />
      <el-table-column align="center" label="序号" fixed width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="审核状态"
        prop="auditStatus"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus == '1'">已审核</span>
          <span v-if="scope.row.auditStatus == '2'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单号"
        width="200px"
        prop="orderNum"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="合同编号"
        width="100px"
        prop="contractNum"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单属性"
        prop="orderType"
        width="100px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == '1'">普通订单</span>
          <span v-if="scope.row.orderType == '2'" style="color: red">
            授信订单
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="客户名称"
        width="100px"
        prop="receiverName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="开票客户"
        prop="invoiceEntity"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="prodName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据日期"
        prop="createTime"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.createTime">
            {{ scope.row.createTime | dateFormat('YYYY-MM-DD') }}
          </span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单总量"
        prop="amount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单执行量"
        prop="executedAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单剩余量"
        prop="surplusAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据有限期"
        prop="endDate"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.endDate">
            {{ scope.row.endDate | dateFormat('YYYY-MM-DD') }}
          </span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单状态"
        prop="switchStatus"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.switchStatus == '1'">开启</span>
          <span v-if="scope.row.switchStatus == '2'">关闭</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-button
            v-if="row.switchStatus == 1 && row.auditStatus == 1"
            type="text"
            @click="handlePermis(row)"
          >
            派车计划
          </el-button>
          <!--<el-button v-else disabled type="text">派车计划</el-button>
         <el-button type="text" @click="handleDetail(row)">查看用户</el-button> -->
        </template>
      </el-table-column>
      <template #empty>
        <el-image
          :src="require('@/assets/empty_images/data_empty.png')"
          class="vab-data-empty"
        />
      </template>
    </el-table>
    <el-pagination
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-sel-order"
      :visible.sync="initAdd"
      width="680px"
      title="组织选择"
    >
      <div
        class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light"
      ></div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="toggleSelection">
          取 消
        </el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirm">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <edit
      ref="edit"
      :audit-status="auditStatus"
      :part-str="partStr"
      :partup-code="partupCode"
      :prod-str="prodStr"
      :produp-code="produpCode"
      :category="category"
      :jxsgory="jxsgory"
      :jxsup-code="jxsupCode"
      :jxs-str="jxsStr"
      :jxs-code="jxsCode"
      :is-add="isAdd"
      :prod-unit-name="prodUnitName"
      :prod-unit-code="prodUnitCode"
      @fetch-data="fetchData"
      @part-click="dialogPart"
      @role-click="dialogRole"
      @prod-click="dialogProd"
      @belong-click="jxsDialog"
    />
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="dialog-sel-order"
      :visible.sync="partMent"
      width="820px"
      title="单位名称"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="partName"
            class="from-user"
            :inline="true"
            :model="partQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="单位名称:" prop="coName">
              <el-input
                v-model.trim="partQueryForm.coName"
                clearable
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <el-form-item label="单位编码:" prop="customCoCode">
              <el-input
                v-model.trim="partQueryForm.customCoCode"
                clearable
                placeholder="请输入单位编码"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="searchPart"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetPart"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
      <div class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light">
        <el-table
          ref="multipleTable"
          v-loading="partLoading"
          :data="partList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="handlePart"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="coName" label="单位名称" />
          <el-table-column prop="customCoCode" label="单位编码" />
        </el-table>
        <el-pagination
          :current-page="partQueryForm.page"
          :layout="layout"
          :page-size="partQueryForm.pageSize"
          :total="modleTotal"
          background
          @current-change="partHandleCurrentChange"
          @size-change="partHandleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="canclePart">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirmPart">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-sel-order"
      :visible.sync="prodMent"
      width="820px"
      title="物料选择"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="pordQueryForm"
            class="from-user"
            :inline="true"
            :model="pordQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="物料名称:" prop="pname">
              <el-input
                v-model.trim="pordQueryForm.pname"
                clearable
                placeholder="请输入物料名称"
              />
            </el-form-item>
            <el-form-item label="物料编码:" prop="psn">
              <el-input
                v-model.trim="pordQueryForm.psn"
                clearable
                placeholder="请输入物料编码"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="pordDataPart"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetPord"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
      <div class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light">
        <el-table
          ref="multipleTable"
          v-loading="pordLoading"
          :data="prodList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="handleProd"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="pname" label="物料名称" />
          <el-table-column prop="psn" label="物料编码" />
          <el-table-column prop="specification" label="物料规格" />
          <el-table-column prop="cateName" label="分类名称" />
          <el-table-column prop="mainUnitName" label="计量单位" />
          <el-table-column prop="strength" label="强度等级" />
        </el-table>
        <el-pagination
          :current-page="pordQueryForm.page"
          :layout="layout"
          :page-size="pordQueryForm.pageSize"
          :total="modleTotalpro"
          background
          @current-change="pordHandleCurrentChange"
          @size-change="pordHandleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="cancleProd">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirmProd">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="dialog-sel-order"
      :visible.sync="jxsMent"
      width="820px"
      title="经销商名称"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="jxsForm"
            class="from-user"
            :inline="true"
            :model="jxsQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="单位名称:" prop="coName">
              <el-input
                v-model.trim="jxsQueryForm.coName"
                clearable
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <el-form-item label="单位编码:" prop="customCoCode">
              <el-input
                v-model.trim="jxsQueryForm.customCoCode"
                clearable
                placeholder="请输入单位编码"
              />
            </el-form-item>

            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="jxsPart">
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetjxsPart"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
      <div class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light">
        <el-table
          ref="multipleTable"
          v-loading="jxsLoading"
          :data="jxsList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="jxshandlePart"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="coName" label="单位名称" />
          <el-table-column prop="customCoCode" label="单位编码" />
        </el-table>
        <el-pagination
          :current-page="jxsQueryForm.page"
          :layout="layout"
          :page-size="jxsQueryForm.pageSize"
          :total="jxsmodleTotal"
          background
          @current-change="jxsHandleCurrentChange"
          @size-change="jxsHandleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="cancleJxs">取 消</el-button>
        <el-button
          class="confimDialog"
          type="primary"
          @click="jxsaddCofirmPart"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getCompanyList, getCompanyListBySendcons } from '@/api/company'
  import {
    querySaleOrderList,
    updateSwitchStatus,
    updateAuditStatus,
    updateDelFlag,
    getOrderInfoByRid,
  } from '@/api/sale'
  import { getProductList } from '@/api/basisfiles'
  import Edit from './components/UserManagementEdit.vue'
  import moment from 'moment' // 时间
  export default {
    name: 'Saleticket',
    components: { Edit },
    data() {
      return {
        initAdd: false,
        tableData1: [],
        queryForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        partQueryForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        pordQueryForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        jxsQueryForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        options: [
          {
            value: '1',
            label: '开启',
          },
          {
            value: '2',
            label: '关闭',
          },
        ],
        ckType: [
          {
            value: '1',
            label: '审核',
          },
          {
            value: '2',
            label: '保存',
          },
        ],
        status: '',
        tstatus: '',
        value1: '',
        list: [],
        listLoading: true,
        partLoading: true,
        layout: 'total, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        auditStatus: '',
        partList: [],
        prodList: [],
        pordLoading: false,
        partMent: false,
        prodMent: false,
        modleTotal: 0,
        modleTotalpro: 0,
        partselectRows: '',
        prodselectRows: '',
        multipleSelection: [],
        multipleSelectionprod: [],
        partStr: '',
        partupCode: '',
        prodStr: '',
        produpCode: '',
        prodUnitCode: '',
        prodUnitName: '',
        category: {},
        jxsgory: {},
        isAdd: false,
        jxsStr: '',
        jxsCode: '',
        jxsupCode: '',
        jxsMent: false,
        jxsmultipleSelection: [],
        jsxselectRows: '',
        jxsList: [],
        jxsLoading: false,
        jxsmodleTotal: 0,
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handlePermis() {
        this.$router.push('/salement/saleplay')
      },
      jxsDialog() {
        this.jxsMent = true
        this.jxsfetchPart()
      },
      cancleJxs() {
        this.jxsMent = false
      },
      jxsaddCofirmPart() {
        if (this.jxsselectRows.length > 1) {
          this.jxsMent = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          const nameArr = []
          const codeId = []
          const customCoCodeId = []
          this.jxsmultipleSelection.map((val) => {
            nameArr.push(val.coName)
            codeId.push(val.coCode)
            customCoCodeId.push(val.customCoCode)
            this.jxsgory = {
              coName: val.coName,
              coCode: val.coCode,
              customCoCodeId: val.customCoCode,
            }
          })
          console.log(this.jxsmultipleSelection)
          this.jxsStr = _.join(nameArr, ',')
          this.jxsupCode = _.join(codeId, ',')
          this.jxsCode = _.join(customCoCodeId, ',')
          console.log(this.jxsStr, this.jxsupCode)
          this.jxsMent = false
        }
      },
      jxsHandleSizeChange(val) {
        this.partQueryForm.pageSize = val
      },
      jxsHandleCurrentChange(val) {
        this.partQueryForm.page = val
        this.fetchPart()
      },
      jxshandlePart(val) {
        this.jxsselectRows = val
        this.jxsmultipleSelection = val
      },
      async jxsfetchPart() {
        const params = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          param: {
            type: '4',
            customCoCode: this.jxsQueryForm.customCoCode,
            coName: this.jxsQueryForm.coName,
          },
        }

        this.partLoading = true
        const res = await getCompanyListBySendcons(params)
        if (res.code === 200) {
          const { list, page } = res.data
          this.jxsList = list
          this.jxsmodleTotal = page.totalNumber
          this.jxsLoading = false
        }
      },
      toggleSelection() {},
      addCofirm() {},
      canclePart() {
        this.partMent = false
      },
      cancleProd() {
        this.prodMent = false
      },
      addCofirmPart() {
        if (this.partselectRows.length > 1) {
          this.partMent = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          const nameArr = []
          const codeId = []
          this.multipleSelection.map((val) => {
            nameArr.push(val.coName)
            codeId.push(val.coCode)
          })
          this.partStr = _.join(nameArr, ',')
          this.partupCode = _.join(codeId, ',')
          this.partMent = false
        }
      },
      addCofirmProd() {
        if (this.prodselectRows.length > 1) {
          this.prodMent = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          const nameArr = []
          const codeId = []
          const mainUnitCode = []
          const mainUnitName = []
          this.multipleSelectionprod.map((val) => {
            nameArr.push(val.pname)
            codeId.push(val.pid)
            mainUnitCode.push(val.mainUnitCode)
            mainUnitName.push(val.mainUnitName)
            this.category = {
              cateName: val.cateName,
              cateRid: val.cateRid,
              variety: val.variety,
              pname: val.pname,
              psn: val.psn,
              mainUnitName: val.mainUnitName,
              mainUnitCode: val.mainUnitCode,
            }
          })
          this.prodStr = _.join(nameArr, ',')
          this.produpCode = _.join(codeId, ',')
          this.prodUnitCode = _.join(mainUnitCode, ',')
          this.prodUnitName = _.join(mainUnitName, ',')
          this.prodMent = false
        }
      },
      dialogPart() {
        this.partMent = true
        this.fetchPart()
      },
      dialogProd() {
        this.prodMent = true
        this.fetchProd()
      },
      dialogRole() {},
      checkStatus(selectRows, status, falg) {
        //审核弃审
        const auditStatus = selectRows.map((item) => item.auditStatus).join()
        const rid = selectRows.map((item) => item.rid).join()
        if (auditStatus === status && falg) {
          this.$baseMessage(
            '订单已处于已审核状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else if (auditStatus === status && !falg) {
          this.$baseMessage(
            '订单已处于弃审状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          updateAuditStatus({
            auditStatus: status,
            rid,
          }).then(async (res) => {
            const { message, code, status } = res
            if (code === 200 && status == 0) {
              this.$baseMessage(
                message,
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            } else {
              this.$baseMessage(
                message,
                'error',
                false,
                'vab-hey-message-error'
              )
            }
          })
        }
      },
      openStatus(selectRows, state, falg) {
        //开启关闭
        const iIopen = selectRows.map((item) => item.switchStatus).join()
        const rid = selectRows.map((item) => item.rid).join()
        if (iIopen === state && falg) {
          this.$baseMessage(
            '订单已处于开启状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          updateSwitchStatus({
            rid,
            switchStatus: state,
          }).then(async (res) => {
            const { message, code, status } = res
            if (code === 200 && status == 0) {
              this.$baseMessage(
                '状态更改成功',
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            } else {
              this.$baseMessage(
                message,
                'error',
                false,
                'vab-hey-message-error'
              )
            }
          })
        }
      },
      async selectRow(val) {
        if (this.selectRows.length > 0) {
          if (this.selectRows.length === 1) {
            this.passReset = true
            if (val === 'del') {
              const auditStatus = this.selectRows
                .map((item) => item.auditStatus)
                .join()
              const rid = this.selectRows.map((item) => item.rid).join()
              if (auditStatus === '1') {
                this.$baseMessage(
                  '已审核状态不可删除',
                  'error',
                  false,
                  'vab-hey-message-error'
                )
              } else {
                this.$baseConfirm('你确定要删除选中项吗', null, async () => {
                  const { message, status } = await updateDelFlag({ rid })
                  if (status == 0) {
                    this.$baseMessage(
                      '删除成功',
                      'success',
                      false,
                      'vab-hey-message-success'
                    )
                  } else {
                    this.$baseMessage(
                      message,
                      'error',
                      false,
                      'vab-hey-message-error'
                    )
                  }

                  await this.fetchData()
                })
              }
            } else if (val === 'view') {
              getOrderInfoByRid({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  this.$refs['edit'].showEdit(data, 'view')
                }
              })
            } else if (val === 'check') {
              this.checkStatus(this.selectRows, '1', true)
            } else if (val === 'abandon') {
              this.checkStatus(this.selectRows, '2', false)
            } else if (val === 'edit') {
              getOrderInfoByRid({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  const auditStatus = this.selectRows
                    .map((item) => item.auditStatus)
                    .join()
                  if (auditStatus == '1') {
                    this.$baseMessage(
                      '已审核状态不可编辑',
                      'error',
                      false,
                      'vab-hey-message-error'
                    )
                  } else {
                    // this.$refs['edit'].showEdit(this.selectRows[0])
                    this.$refs['edit'].showEdit(data, 'edit')
                  }
                }
              })
            } else if (val === 'fix') {
              getOrderInfoByRid({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  this.$refs['edit'].showEdit(data, 'fix')
                }
              })
            } else if (val === 'cacute') {
              getOrderInfoByRid({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  this.$refs['edit'].showEdit(data, 'cacute')
                }
              })
            } else if (val === 'open') {
              this.openStatus(this.selectRows, '1', true)
            } else if (val === 'close') {
              this.openStatus(this.selectRows, '2', false)
            }
          } else {
            this.$baseMessage(
              '只能选中一行操作',
              'error',
              false,
              'vab-hey-message-error'
            )
          }
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      handleButton(val) {
        this.selectRow(val)
      },
      queryData() {
        this.queryForm.page = 1
        this.fetchData()
      },
      searchPart() {
        this.fetchPart()
      },
      resetPart() {
        // this.partQueryForm.coName = ''
        // this.partQueryForm.customCoCode = ''
        this.$refs['partName'].resetFields()
        this.fetchPart()
      },
      jxsPart() {
        this.jxsfetchPart()
      },
      resetjxsPart() {
        // this.jxsQueryForm.coName = ''
        // this.jxsQueryForm.customCoCode = ''
        this.$refs['jxsForm'].resetFields()
        this.jxsfetchPart()
      },
      pordDataPart() {
        this.fetchProd()
      },
      resetPord() {
        // this.pordQueryForm.psn = ''
        // this.pordQueryForm.pname = ''
        this.$refs['pordQueryForm'].resetFields()
        this.fetchProd()
      },
      queryDataPart() {},
      resetForm() {
        this.status = ''
        this.tstatus = ''
        this.value1 = ''
        this.queryForm = {
          page: 1,
          pageSize: 10,
          // username: '',
        }
        this.fetchData()
      },
      resetFormPart() {},
      handleEdit(row) {
        this.partStr = ''
        this.partupCode = ''
        this.prodStr = ''
        this.produpCode = ''
        this.isAdd = true
        // this.$refs['edit'].resetFrom()
        this.$refs['edit'].showEdit()
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        this.fetchData()
      },
      partHandleSizeChange(val) {
        this.partQueryForm.pageSize = val
      },
      partHandleCurrentChange(val) {
        this.partQueryForm.page = val
        this.fetchPart()
      },
      pordHandleSizeChange(val) {
        this.pordQueryForm.pageSize = val
      },
      pordHandleCurrentChange(val) {
        this.pordQueryForm.page = val
        this.fetchProd()
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handlePart(val) {
        this.partselectRows = val

        this.multipleSelection = val
        // this.peopleSel = true
      },
      handleProd(val) {
        this.prodselectRows = val
        this.multipleSelectionprod = val
      },
      resolveList(list) {
        list.map((val) => {
          const amount = [],
            amountUnitName = [],
            executedAmount = [],
            surplusAmount = [],
            prodName = []
          if (val && val.goodsList) {
            val.goodsList.map((item) => {
              amount.push(item.amount)
              amountUnitName.push(item.amountUnitName)
              executedAmount.push(item.executedAmount)
              surplusAmount.push(item.surplusAmount)
              prodName.push(item.prodName)
            })
            val.amount = amount.join(',')
            // val.amountUnitName = amountUnitName.join(',')
            val.executedAmount = executedAmount.join(',')
            val.surplusAmount = surplusAmount.join(',')
            val.prodName = prodName.join(',')
          }
        })
      },
      async fetchProd() {
        //获取物料分类
        const params = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          paramList: [
            {
              mark: 'like',
              name: 'pname',
              value: this.pordQueryForm.pname,
            },
            {
              mark: 'like',
              name: 'psn',
              value: this.pordQueryForm.psn,
            },
            {
              mark: 'like',
              name: 'status',
              value: 'E',
            },
          ],
        }

        this.pordLoading = true
        const res = await getProductList(params)
        if (res.code === 200) {
          const { list, page } = res.data
          this.prodList = list
          this.modleTotalpro = page.totalNumber
          this.pordLoading = false
        }
      },
      async fetchPart() {
        const parmas = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          // paramList: [
          //   {
          //     mark: 'like',
          //     name: 'coCode',
          //     value: this.partQueryForm.coCode,
          //   },
          //   {
          //     mark: 'like',
          //     name: 'coName',
          //     value: this.partQueryForm.coName,
          //   },
          // ],
          param: {
            type: '1',
            customCoCode: this.partQueryForm.customCoCode,
            coName: this.partQueryForm.coName,
          },
        }
        this.partLoading = true
        const res = await getCompanyListBySendcons(parmas)
        if (res.code === 200) {
          const { list, page } = res.data
          this.partList = list
          this.modleTotal = page.totalNumber
          this.partLoading = false
        }
      },
      async fetchData() {
        const param = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          page: this.queryForm.page,
          pageSize: this.queryForm.pageSize,
          paramList: [
            {
              mark: 'like',
              name: 'auditStatus',
              value: this.status,
            },
            {
              mark: 'like',
              name: 'contractNum',
              value: this.queryForm.contractNum
                ? this.queryForm.contractNum
                : '',
            },
            {
              mark: 'like',
              name: 'receiverName',
              value: this.queryForm.consignerName
                ? this.queryForm.consignerName
                : '',
            },
            {
              mark: 'like',
              name: 'orderNum',
              value: this.queryForm.orderNum ? this.queryForm.orderNum : '',
            },
            {
              mark: 'like',
              name: 'prodName',
              value: this.queryForm.prodName ? this.queryForm.prodName : '',
            },
            {
              mark: 'like',
              name: 'switchStatus',
              value: this.tstatus ? this.tstatus : '',
            },
            {
              mark: 'like',
              name: 'invoiceEntity',
              value: this.queryForm.invoiceEntity
                ? this.queryForm.invoiceEntity
                : '',
            },
            {
              mark: 'like',
              name: 'createTime',
              value: this.createTime ? this.createTime : '',
            },
            {
              mark: 'like',
              name: 'startTime',
              value: this.value1
                ? moment(this.value1[0]).format('YYYY-MM-DD')
                : '',
            },
            {
              mark: 'like',
              name: 'endTime',
              value: this.value1
                ? moment(this.value1[1]).format('YYYY-MM-DD')
                : '',
            },
          ].filter((item) => {
            return item.value
          }),
        }

        this.listLoading = true
        // const res = await rolePageList(this.queryForm)
        const res = await querySaleOrderList(param)
        if (res.code === 200) {
          const { list, page } = res.data
          this.list = list
          this.resolveList(this.list)
          this.total = page.totalNumber
          this.listLoading = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
