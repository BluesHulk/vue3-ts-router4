<template>
  <div class="order-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="order"
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
          v-permission="'view'"
          icon="el-icon-view"
          type="primary"
          @click="handleButton('view')"
        >
          查看
        </el-button>
        <!-- <el-button
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
          v-permission="'del'"
          icon="el-icon-delete"
          type="primary"
          @click="handleButton('del')"
        >
          删除
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
        </el-button>-->
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
        prop="orderNum"
        width="220px"
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
        prop="consignerName"
        width="150px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="开票客户"
        prop="invoiceEntity"
        width="150px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="prodName"
        width="150px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据日期"
        prop="createTime"
        width="150px"
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
        width="100px"
        prop="executedAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单剩余量"
        width="100px"
        prop="surplusAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据有限期"
        prop="endDate"
        width="150px"
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
        prop="status"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == '1'">开启</span>
          <span v-if="scope.row.status == '2'">关闭</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-button
            v-if="row.status == '1' && row.auditStatus == '1'"
            v-permission="'add'"
            type="text"
            @click="handlePermis(row)"
          >
            派车计划
          </el-button>
          <!--<el-button type="text" @click="handleDetail(row)">查看用户</el-button> -->
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
      :jxsup-code="jxsupCode"
      :jxs-str="jxsStr"
      :jxs-code="jxsCode"
      :prod-str="prodStr"
      :produp-code="produpCode"
      :category="category"
      :gory="gory"
      :is-add="isAdd"
      :prod-unit-name="prodUnitName"
      :prod-unit-code="prodUnitCode"
      @fetch-data="fetchData"
      @part-click="dialogPart"
      @role-click="dialogRole"
      @prod-click="dialogProd"
      @belong-click="jxsDialog"
    />
    <!--<Send ref="send" :audit-status="auditStatus" @unit-click="dialogUnit" />-->
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
            class="from-user"
            :inline="true"
            :model="partQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="单位名称:">
              <el-input
                v-model.trim="partQueryForm.coName"
                clearable
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <el-form-item label="单位编码:">
              <el-input
                v-model.trim="partQueryForm.coCode"
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
            class="from-user"
            :inline="true"
            :model="pordQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="物料名称:">
              <el-input
                v-model.trim="pordQueryForm.pname"
                clearable
                placeholder="请输入物料名称"
              />
            </el-form-item>
            <el-form-item label="物料编码:">
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
            class="from-user"
            :inline="true"
            :model="jxsQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="单位名称:">
              <el-input
                v-model.trim="jxsQueryForm.coName"
                clearable
                placeholder="请输入单位名称"
              />
            </el-form-item>
            <el-form-item label="单位编码:">
              <el-input
                v-model.trim="jxsQueryForm.coCode"
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
    purchaseOrderList,
    purchaseOrderdetail,
    purchaseOrderupdateAuditStatus,
    purchaseOrderupdateStatus,
    purchaseOrderdelete,
    // purchaseDbPlanDetail,
  } from '@/api/jxs'
  import { getDriverList } from '@/api/driver'
  import { getProductList } from '@/api/basisfiles'
  import Edit from './components/UserManagementEdit.vue'
  import moment from 'moment' // 时间
  // import Send from './components/send.vue'
  export default {
    name: 'Order',
    components: { Edit },
    data() {
      return {
        isUnit: '1', //1单位，2个人
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
        jxsQueryForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        pordQueryForm: {
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
        gory: {},
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
        // unitForm: {
        //   page: 1,
        //   pageSize: 10,
        //   // username: '',
        // },
        // unitList: [],
        // selfList: [],
        // unitLoading: false,
        // unitTotal: 0,
        // unitRows: '',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      dialogUnit(val) {
        this.isUnit = val
        this.prodMent = true
        this.fetchUnit(val)
      },
      handlePermis(val) {
        this.$router.push('/jxsprocurement/jxsplay')
        // purchaseOrderdetail({
        //   rid: Number(val.rid),
        // }).then((res) => {
        //   const { data, code } = res
        //   if (code === 200) {
        //     this.auditStatus = val.auditStatus
        //     this.$refs['send'].showEdit(data, 'send')
        //   }
        // })
      },
      pordDataPart() {
        this.fetchProd()
      },
      resetPord() {
        this.pordQueryForm.psn = ''
        this.pordQueryForm.pname = ''
        this.fetchProd()
      },
      jxsPart() {
        this.jxsfetchPart()
      },
      resetjxsPart() {
        this.jxsQueryForm.coName = ''
        this.jxsQueryForm.coCode = ''
        this.jxsfetchPart()
      },
      searchPart() {
        this.fetchPart()
      },
      resetPart() {
        this.partQueryForm.coName = ''
        this.partQueryForm.coCode = ''
        this.fetchPart()
      },
      jxsDialog() {
        this.jxsMent = true
        this.jxsfetchPart()
      },
      toggleSelection() {},
      addCofirm() {},
      canclePart() {
        this.partMent = false
      },
      cancleJxs() {
        this.jxsMent = false
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
            this.gory = {
              coName: val.coName,
              coCode: val.coCode,
              customCoCodeId: val.customCoCode,
            }
          })
          this.jxsStr = _.join(nameArr, ',')
          this.jxsupCode = _.join(codeId, ',')
          this.jxsCode = _.join(customCoCodeId, ',')
          this.jxsMent = false
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
        const state = selectRows.map((item) => item.status).join() //1开启 ，2关闭
        const rid = selectRows.map((item) => item.rid).join()
        if (auditStatus === status && falg) {
          this.$baseMessage(
            '订单已处于已审核状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          // debugger
          //开启 已审核状态 要取消
          if (state == 1 && auditStatus == 1 && status == 2) {
            this.$baseMessage(
              '订单处于开启状态,不可取消',
              'error',
              false,
              'vab-hey-message-error'
            )
          } else {
            purchaseOrderupdateAuditStatus({
              auditStatus: status,
              rid,
            }).then(async (res) => {
              const { message, code, status } = res
              if (code === 200 && status == 0) {
                this.$baseMessage(
                  '审核成功',
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
        }
      },
      openStatus(selectRows, state, falg) {
        //开启关闭
        const iIopen = selectRows.map((item) => item.status).join()
        const rid = selectRows.map((item) => item.rid).join()
        if (iIopen === state && falg) {
          this.$baseMessage(
            '订单已处于开启状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          purchaseOrderupdateStatus({
            rid,
            status: state,
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
                  const { message, status } = await purchaseOrderdelete({ rid })
                  if (status == 0) {
                    this.$baseMessage(
                      '删除成功',
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
            } else if (val === 'view') {
              // this.$router.push({
              //   path: '/procurement/order',
              //   query: this.selectRows[0],
              // })
              purchaseOrderdetail({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  this.auditStatus = this.selectRows[0].auditStatus
                  this.$refs['edit'].showEdit(data, 'view')
                }
              })
            } else if (val === 'check') {
              this.checkStatus(this.selectRows, '1', true)
            } else if (val === 'abandon') {
              this.checkStatus(this.selectRows, '2', false)
            } else if (val === 'edit') {
              purchaseOrderdetail({
                rid: this.selectRows[0].rid,
              }).then((res) => {
                const { data, code } = res
                if (code === 200) {
                  this.auditStatus = this.selectRows[0].auditStatus
                  const state = this.selectRows[0].status
                  if (this.auditStatus == '2' && state == '1') {
                    this.$refs['edit'].showEdit(data)
                  } else {
                    if (this.auditStatus == '1') {
                      this.$baseMessage(
                        '已审核状态不可编辑',
                        'error',
                        false,
                        'vab-hey-message-error'
                      )
                    }
                    if (state == '2') {
                      this.$baseMessage(
                        '关闭状态不可编辑',
                        'error',
                        false,
                        'vab-hey-message-error'
                      )
                    }
                    // this.auditStatus == '2'
                  }
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
      queryDataPart() {},
      resetForm() {
        // this.$refs.order
        this.tstatus = ''
        this.value1 = ''
        this.status = ''
        this.queryForm = {
          page: 1,
          pageSize: 10,
        }
        // this.$refs['order'].resetFields()
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
      jxsHandleSizeChange(val) {
        this.partQueryForm.pageSize = val
      },
      jxsHandleCurrentChange(val) {
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
      jxshandlePart(val) {
        this.jxsselectRows = val
        this.jxsmultipleSelection = val
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
      async jxsfetchPart() {
        const params = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          param: {
            type: '4',
            coCode: this.jxsQueryForm.coCode,
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
      async fetchPart() {
        //发、收货单位传1 ，承运单位传3，经销商传4
        const parmas = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          param: {
            type: '1',
            coCode: this.partQueryForm.coCode,
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
        this.listLoading = true
        const params = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          page: this.queryForm.page,
          pageSize: this.queryForm.pageSize,
          param: {
            auditStatus: this.status,
            contractNum: this.queryForm.contractNum
              ? this.queryForm.contractNum
              : '',
            consignerName: this.queryForm.consignerName
              ? this.queryForm.consignerName
              : '',
            orderNum: this.queryForm.orderNum ? this.queryForm.orderNum : '',
            prodName: this.queryForm.prodName ? this.queryForm.prodName : '',
            status: this.tstatus ? this.tstatus : '',
            createTimeStart: this.value1
              ? moment(this.value1[0]).format('YYYY-MM-DD')
              : '',
            createTimeEnd: this.value1
              ? moment(this.value1[1]).format('YYYY-MM-DD')
              : '',
          },
        }
        const res = await purchaseOrderList(params)
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
