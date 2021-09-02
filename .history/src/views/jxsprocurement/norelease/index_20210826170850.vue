<template>
  <div class="order-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
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
          <el-form-item label="派车单号:">
            <el-input
              v-model.trim="queryForm.dpOrderCode"
              clearable
              placeholder="请输入计划单号"
            />
          </el-form-item>
          <el-form-item label="发货单位:">
            <el-input
              v-model.trim="queryForm.consignerName"
              clearable
              placeholder="请输入发货单位"
            />
          </el-form-item>
          <el-form-item label="物料名称:">
            <el-input
              v-model.trim="queryForm.prodName"
              clearable
              placeholder="请输入物料名称"
            />
          </el-form-item>
          <el-form-item label="收货单位:">
            <el-input
              v-model.trim="queryForm.receiverName"
              clearable
              placeholder="请输入收货单位"
            />
          </el-form-item>
          <el-form-item label="司机姓名:">
            <el-input
              v-model.trim="queryForm.driverName"
              clearable
              placeholder="请输入司机姓名"
            />
          </el-form-item>
          <el-form-item label="车牌号:">
            <el-input
              v-model.trim="queryForm.truckId"
              clearable
              placeholder="请输入车牌号"
            />
          </el-form-item>
          <el-form-item label="单据状态:">
            <el-select v-model="tstatus" placeholder="请选择单据状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="派单日期:">
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
        <!-- <el-button
          v-permission="'open'"
          icon="el-icon-open"
          type="primary"
          @click="handleButton('open')"
        >
          开启
        </el-button>-->
        <el-button
          v-permission="'close'"
          icon="el-icon-turn-off"
          type="primary"
          @click="handleButton('close')"
        >
          取消
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
        fixed
        align="center"
        show-overflow-tooltip
        type="selection"
      />
      <el-table-column align="center" fixed label="序号" width="55">
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
        label="派车单号"
        prop="dpOrderCode"
        width="220px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="计划单号"
        prop="dpPlanCode"
        width="220px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="发货单位"
        width="220px"
        prop="consignerName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="收货单位"
        width="220px"
        prop="receiverName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="驾驶员"
        prop="driverName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="车牌号"
        width="100px"
        prop="truckId"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料"
        prop="prodName"
        width="150px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="预发量"
        prop="amount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="实发量"
        prop="outAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="派单日期"
        width="150px"
        prop="beginDate"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.beginDate">
            {{ scope.row.beginDate | dateFormat('YYYY-MM-DD') }}
          </span>
          <span v-else>——</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="计划有限期"
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
        label="单据状态"
        prop="switchStatus"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.switchStatus == '1'">开启</span>
          <span v-if="scope.row.switchStatus == '2'">关闭</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="派单状态"
        prop="status"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status == '1'">未开始</span>
          <span v-if="scope.row.status == '2'">已接单</span>
          <span v-if="scope.row.status == '3'">已装货</span>
          <span v-if="scope.row.status == '4'">已卸货</span>
          <span v-if="scope.row.status == '5'">已签收</span>
          <span v-if="scope.row.status == '6'">已取消</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="车辆状态"
        prop="truckStatus"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.truckStatus == '1'">未进厂</span>
          <span v-if="scope.row.truckStatus == '2'">已进厂</span>
          <span v-if="scope.row.truckStatus == '3'">一次过磅</span>
          <span v-if="scope.row.truckStatus == '4'">已装/卸货</span>
          <span v-if="scope.row.truckStatus == '5'">二次过磅</span>
          <span v-if="scope.row.truckStatus == '6'">已出厂</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="100px" align="center" label="操作">
        <template #default="{ row }">
          <el-button
            v-if="
              row.status == '1' &&
              row.auditStatus == '1' &&
              row.truckStatus == '1' &&
              row.switchStatus == '1'
            "
            v-permission="'take'"
            type="text"
            @click="receivingOrders(row)"
          >
            接单
          </el-button>
          <el-button
            v-if="
              row.switchStatus == '1' &&
              row.status == '2' &&
              row.auditStatus == '1' &&
              row.truckStatus == '1'
            "
            v-permission="'cancel'"
            type="text"
            @click="rebackOrders(row)"
          >
            撤单
          </el-button>
          <!-- 一次过磅 且开启状态 且-->
          <el-button
            v-if="
              row.switchStatus == '1' &&
              (row.status == '2' || row.status == '3') &&
              row.auditStatus == '1' &&
              row.truckStatus == '3'
            "
            v-permission="'sign'"
            type="text"
            @click="acceptSale(row, 'accept')"
          >
            验收
          </el-button>
          <el-button
            v-else
            v-permission="'sign'"
            disabled
            type="text"
            @click="acceptSale(row, 'accept')"
          >
            验收
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
      :prod-str="prodStr"
      :produp-code="produpCode"
      :order-item="orderItem"
      :is-add="isAdd"
      :prod-unit-name="prodUnitName"
      :prod-unit-code="prodUnitCode"
      :car-item="carItem"
      :drive-item="driveItem"
      @fetch-data="fetchData"
      @order-choose="dialogTapOrder"
      @role-click="dialogRole"
      @drive-choose="dialogDrive"
      @car-choose="dialogCar"
    />
    <!--订单列表-->
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="dialog-sel-order"
      :visible.sync="orderMent"
      width="820px"
      title="订单列表"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            class="from-user"
            :inline="true"
            :model="partQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="合同编号:">
              <el-input
                v-model.trim="partQueryForm.contractNum"
                clearable
                placeholder="请输入合同编号"
              />
            </el-form-item>
            <el-form-item label="计划单号:">
              <el-input
                v-model.trim="partQueryForm.dpPlanCode"
                clearable
                placeholder="请输入订单号"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryDataPartTicket"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetFormPartTicket"
              >
                重置
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-left-panel>
      </vab-query-form>
      <div class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light">
        <el-table
          v-loading="orderLoading"
          class="user-table"
          :data="orderList"
          border
          @selection-change="ordersetSelectRows"
        >
          <el-table-column
            align="center"
            show-overflow-tooltip
            type="selection"
          />
          <el-table-column align="center" label="序号" width="55">
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
            label="计划单号"
            prop="dpPlanCode"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="订单号"
            prop="agentOrderCode"
            show-overflow-tooltip
          />

          <el-table-column
            align="center"
            label="合同编号"
            prop="contractNum"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="客户名称"
            prop="consignerName"
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
            prop="executionAmount"
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
            label="单据状态"
            prop="switchStatus"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.switchStatus == '1'">开启</span>
              <span v-if="scope.row.switchStatus == '2'">关闭</span>
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
          :current-page="partQueryForm.page"
          :layout="layout"
          :page-size="partQueryForm.pageSize"
          :total="orderTotal"
          background
          @current-change="orderCurrentChange"
          @size-change="orderSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="canclePart">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirmOrder">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--车牌号选择-->
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-sel-order"
      :visible.sync="carSelect"
      width="820px"
      title="车牌号选择"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="carForm"
            class="from-user"
            :inline="true"
            :model="carForm"
            @submit.native.prevent
          >
            <el-form-item label="车牌号" prop="licensePlate">
              <el-input
                v-model.trim="carForm.licensePlate"
                clearable
                placeholder="请输入车牌号"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryDataPart"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetFormPart"
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
          v-loading="carLoading"
          :data="carList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="handleCar"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="licensePlate" label="车牌号" />
          <el-table-column prop="deadweight" label="标准载重" />
          <el-table-column prop="curbWeight" label="空车皮重" />
        </el-table>
        <el-pagination
          :current-page="carForm.page"
          :layout="layout"
          :page-size="carForm.pageSize"
          :total="carTotal"
          background
          @current-change="carHandleCurrentChange"
          @size-change="carHandleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="cancleCar">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirmCar">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--驾驶员选择-->
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-sel-order"
      :visible.sync="driveSelect"
      width="820px"
      title="司机选择"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="driveForm"
            class="from-user"
            :inline="true"
            :model="driveForm"
            @submit.native.prevent
          >
            <el-form-item label="司机" prop="fullName">
              <el-input
                v-model.trim="driveForm.fullName"
                clearable
                placeholder="请输入司机名称"
              />
            </el-form-item>
            <el-form-item label="身份证号" prop="licensePlate">
              <el-input
                v-model.trim="driveForm.licensePlate"
                clearable
                placeholder="请输入身份证号"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryDataPartDrive"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetFormPartDrive"
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
          v-loading="dLoading"
          :data="dList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="handleDriver"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="fullName" label="司机" />
          <el-table-column prop="loginName" label="手机号" />
          <el-table-column prop="idNumber" label="身份证号" />
        </el-table>
        <el-pagination
          :current-page="driveUnitForm.page"
          :layout="layout"
          :page-size="driveUnitForm.pageSize"
          :total="dTotal"
          background
          @current-change="driveHandleCurrentChange"
          @size-change="driveHandleSizeChange"
        />
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="cancleDrive">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="addCofirmDrive">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getCompanyList } from '@/api/company'
  import { getDriverList } from '@/api/driver'
  import { mapActions, mapGetters } from 'vuex'
  import {
    purchaseDpOrderAuditStatus,
    purchaseDpOrderswitchOrder,
    purchaseDbPlanList,
    purchaseDbPlanDetail,
    purchaseDpOrderdelete,
    purchaseDpOrderList,
    purchaseDpOrderDetail,
    purchaseDpOrderreceivingOrders,
    purchaseDpOrderreceivingRevoke,
  } from '@/api/jxs'
  import { getTruckList } from '@/api/car'
  import moment from 'moment' // 时间
  import Edit from './components/UserManagementEdit.vue'
  export default {
    name: 'SendOrder',
    components: { Edit },
    data() {
      return {
        carSelect: false,
        orderMent: false,
        driveSelect: false,
        initAdd: false,
        tableData1: [],
        orderList: [],
        carList: [],
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
        unitForm: {
          page: 1,
          pageSize: 10,
          // username: '',
        },
        driveUnitForm: {
          page: 1,
          pageSize: 10,
        },
        carForm: {
          page: 1,
          pageSize: 10,
        },
        driveForm: {
          page: 1,
          pageSize: 10,
        },
        orderQueryForm: {
          page: 1,
          pageSize: 10,
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
        orderLoading: true,
        carLoading: true,
        layout: 'total, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        auditStatus: '',
        partList: [],
        unitList: [],
        selfList: [],
        dList: [],
        unitLoading: false,
        dLoading: false,
        partMent: false,
        modleTotal: 0,
        orderTotal: 0,
        unitTotal: 0,
        carTotal: 0,
        driveTotal: 0,
        dTotal: 0,
        partselectRows: '',
        unitRows: '',
        carRows: '',
        orderRows: '',
        driveRows: '',
        multipleSelection: [],
        multipleUnit: [],
        multipleCar: [],
        multipleDrive: [],
        multipleSelectionorder: [],
        partStr: '',
        partupCode: '',
        prodStr: '',
        produpCode: '',
        prodUnitCode: '',
        prodUnitName: '',
        isAdd: false,
        orderItem: {},
        isUnit: '1', //1单位，2个人
        drival: '',
        carVal: '',
        carItem: {},
        driveItem: {},
      }
    },
    computed: {
      ...mapGetters({
        lhCoCode: 'user/lhCoCode',
      }),
    },
    created() {
      this.fetchData()
    },
    methods: {
      queryDataPartDrive() {
        this.fetchDrive(this.drival, this.isUnit)
      },
      resetFormPartDrive() {
        this.$refs['driveForm'].resetFields()
        this.fetchDrive(this.drival, this.isUnit)
      },
      queryDataPartTicket() {
        this.fetchOrderList()
      },
      resetFormPartTicket() {
        this.partQueryForm.dpPlanCode = ''
        this.partQueryForm.contractNum = ''
        this.fetchOrderList()
      },
      acceptSale(row) {
        purchaseDpOrderDetail({
          rid: row.rid,
        }).then((res) => {
          const { data, code } = res
          if (code === 200) {
            this.$refs['edit'].showEdit(data, 'accept')
          }
        })
      },
      receivingOrders(row) {
        this.$baseConfirm('确定接单吗', null, async () => {
          const { message, status } = await purchaseDpOrderreceivingOrders({
            rid: row.rid,
          })
          if (status == 0) {
            this.$baseMessage(
              '成功',
              'success',
              false,
              'vab-hey-message-success'
            )
            await this.fetchData()
          } else {
            this.$baseMessage(message, 'error', false, 'vab-hey-message-error')
          }
        })
      },
      rebackOrders(row) {
        this.$baseConfirm('确定撤销吗', null, async () => {
          const { message, status } = await purchaseDpOrderreceivingRevoke({
            rid: row.rid,
          })
          if (status == 0) {
            this.$baseMessage(
              '撤销成功',
              'success',
              false,
              'vab-hey-message-success'
            )
            await this.fetchData()
          } else {
            this.$baseMessage(message, 'error', false, 'vab-hey-message-error')
          }
        })
      },
      dialogCar(val, state) {
        this.carSelect = true
        this.carVal = val
        this.isUnit = state
        this.fetchCar(val, state)
      },
      dialogDrive(val, status) {
        this.driveSelect = true
        this.drival = val
        this.isUnit = status
        this.fetchDrive(val, status)
      },
      toggleSelection() {},
      addCofirm() {},
      addCofirmCar() {
        if (this.carRows.length > 1) {
          this.carSelect = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          this.multipleCar.map((val) => {
            this.carItem = val
            if (val.rid) {
              // this.carItem = val
            }
          })
          this.carSelect = false
        }
        this.$refs['carForm'].resetFields()
      },
      cancleCar() {
        this.carSelect = false
        this.$refs['carForm'].resetFields()
      },
      addCofirmDrive() {
        if (this.driveRows.length > 1) {
          this.driveSelect = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          this.multipleDrive.map((val) => {
            this.driveItem = val
            if (val.rid) {
              // this.driveItem = val
            }
          })
          this.driveSelect = false
        }
        this.$refs['driveForm'].resetFields()
      },
      cancleDrive() {
        this.driveSelect = false
        this.$refs['driveForm'].resetFields()
      },
      canclePart() {
        this.orderMent = false
      },

      addCofirmOrder() {
        if (this.orderRows.length > 1) {
          this.orderMent = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          this.multipleSelectionorder.map((val) => {
            this.orderItem = val
            if (val.rid) {
              //采购计划详情
              purchaseDbPlanDetail({ rid: val.rid }).then((res) => {
                const { code, data } = res
                if (code === 200) {
                  this.orderItem = data
                }
              })
            }
          })
          this.orderMent = false
        }
      },

      dialogTapOrder() {
        this.orderMent = true
        this.fetchOrderList()
      },
      dialogRole() {},
      checkStatus(selectRows, status, falg) {
        // console.log(selectRows, status, falg)
        //审核弃审
        const auditStatus = selectRows.map((item) => item.auditStatus).join() //'1'">已审核'2'">未审核
        const state = selectRows.map((item) => item.status).join() //'1'">未开始'2'">已接单'3'">已装货'4'">已卸货'5'">已签收'6'">已取消
        const truckStatus = selectRows.map((item) => item.truckStatus).join() //车辆状态'1'">未进厂 '2'">已进厂'3'">一次过磅'4'">已装/卸货5'">二次过磅 '6'">已出厂
        const switchStatus = selectRows.map((item) => item.switchStatus).join() //1开启，2关闭

        const rid = selectRows.map((item) => item.rid).join()
        // debugger
        if (auditStatus === status && falg) {
          this.$baseMessage(
            '订单已处于已审核状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else if (
          status === '1' &&
          switchStatus === '1' &&
          state === '1' &&
          truckStatus === '1'
        ) {
          //处于未审核状态
          purchaseDpOrderAuditStatus({
            auditStatus: status,
            rid,
          }).then(async (res) => {
            const { message, code } = res
            if (code === 200) {
              this.$baseMessage(
                message,
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            }
          })
        }
        if (
          status === '2' &&
          switchStatus === '1' &&
          truckStatus === '1' &&
          state === '1'
        ) {
          //处于未审核状态
          purchaseDpOrderAuditStatus({
            auditStatus: status,
            rid,
          }).then(async (res) => {
            const { message, code } = res
            if (code === 200) {
              this.$baseMessage(
                message,
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            }
          })
        } else if (
          status === '2' &&
          switchStatus === '1' &&
          truckStatus !== '1' &&
          state !== '1'
        ) {
          this.$baseMessage(
            '车辆状态已进场状态不可弃审',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      openStatus(selectRows, state, falg) {
        //开启关闭
        const iIopen = selectRows.map((item) => item.switchStatus).join()
        const rid = selectRows.map((item) => item.rid).join()
        console.log(iIopen, selectRows, state, falg)

        if (iIopen === state && falg) {
          this.$baseMessage(
            '订单已处于开启状态',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          purchaseDpOrderswitchOrder({
            rid,
            switchStatus: state,
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
      async selectRow(val) {
        if (this.selectRows.length > 0) {
          if (this.selectRows.length === 1) {
            this.passReset = true
            if (val === 'del') {
              const auditStatus = this.selectRows
                .map((item) => item.auditStatus)
                .join()
              if (auditStatus === '1') {
                this.$baseMessage(
                  '已审核状态不可删除',
                  'error',
                  false,
                  'vab-hey-message-error'
                )
              } else {
                this.$baseConfirm('你确定要删除选中项吗', null, async () => {
                  const { message, status } = await purchaseDpOrderdelete({
                    rid: this.selectRows[0].rid,
                  })
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
              purchaseDpOrderDetail({
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
              if (
                this.selectRows[0].status == '1' &&
                this.selectRows[0].switchStatus == '1' &&
                this.selectRows[0].auditStatus == '2'
              ) {
                purchaseDpOrderDetail({
                  rid: this.selectRows[0].rid,
                }).then((res) => {
                  const { data, code } = res
                  if (code === 200) {
                    this.auditStatus = this.selectRows[0].auditStatus
                    this.$refs['edit'].showEdit(data)
                  }
                })
              } else {
                if (this.selectRows[0].auditStatus == '1') {
                  this.$baseMessage(
                    '已审核状态，不可编辑！',
                    'error',
                    false,
                    'vab-hey-message-error'
                  )
                } else {
                  if (
                    this.selectRows[0].status == '2' &&
                    this.selectRows[0].switchStatus == '1'
                  ) {
                    this.$baseMessage(
                      '此单非未开始状态，不可编辑！',
                      'error',
                      false,
                      'vab-hey-message-error'
                    )
                  }
                  if (this.selectRows[0].switchStatus == '2') {
                    this.$baseMessage(
                      '单据关闭状态，不可编辑！',
                      'error',
                      false,
                      'vab-hey-message-error'
                    )
                  }
                }
              }
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
      handlePermis(val) {
        purchaseDbPlanDetail({
          rid: val.rid,
        }).then((res) => {
          const { data, code } = res
          if (code === 200) {
            this.auditStatus = val.auditStatus
            this.$refs['edit'].showEdit(data, 'send')
          }
        })
      },
      queryData() {
        this.queryForm.page = 1
        this.fetchData()
      },
      queryDataPart() {
        this.fetchCar(this.carVal, this.isUnit)
      },
      resetFormPart() {
        this.$refs['carForm'].resetFields()
        this.fetchCar(this.carVal, this.isUnit)
      },
      resetForm() {
        this.tstatus = ''
        this.status = ''
        this.value1 = ''
        // this.$refs['queryForm'].resetFields()
        this.queryForm = {
          page: 1,
          pageSize: 10,
        }
        this.fetchData()
      },
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
      orderCurrentChange(val) {
        this.orderQueryForm.page = val
        this.fetchOrderList()
      },
      orderSizeChange(val) {
        this.orderQueryForm.pageSize = val
      },

      carHandleSizeChange(val) {
        this.carForm.pageSize = val
      },
      carHandleCurrentChange(val) {
        this.carForm.page = val
        this.fetchCar(this.carVal, this.isUnit)
      },
      driveHandleSizeChange(val) {
        this.driveUnitForm.pageSize = val
      },
      driveHandleCurrentChange(val) {
        this.driveUnitForm.page = val
        this.fetchDrive(this.drival, this.isUnit)
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      ordersetSelectRows(val) {
        this.orderRows = val
        this.multipleSelectionorder = val
      },
      handlePart(val) {
        this.partselectRows = val

        this.multipleSelection = val
        // this.peopleSel = true
      },
      handleProd(val) {
        this.unitRows = val
        this.multipleUnit = val
      },
      handleCar(val) {
        this.carRows = val
        this.multipleCar = val
      },
      handleDriver(val) {
        this.driveRows = val
        this.multipleDrive = val
      },
      resolveList(list) {
        list.map((val) => {
          const amount = [],
            amountUnitName = [],
            executedAmount = [],
            surplusAmount = [],
            prodName = [],
            executionAmount = []
          if (val && val.goodsList) {
            val.goodsList.map((item) => {
              amount.push(item.amount)
              amountUnitName.push(item.amountUnitName)
              executedAmount.push(item.executedAmount)
              surplusAmount.push(item.surplusAmount)
              prodName.push(item.prodName)
              executionAmount.push(item.executionAmount)
            })
            val.amount = amount.join(',')
            // val.amountUnitName = amountUnitName.join(',')
            val.executedAmount = executedAmount.join(',')
            val.surplusAmount = surplusAmount.join(',')
            val.prodName = prodName.join(',')
            val.executionAmount = executionAmount.join(',')
          }
        })
      },
      async fetchCar(val, state) {
        //state === 1时 为单位，2为个人
        this.carForm.sort = 'desc'
        this.carForm.sortFieldName = 'operateTime'
        // this.carForm.param = {
        //   ownerType: state === '1' ? 'C' : 'P',
        //   coCode: val,
        // }
        if (state == '1' || state == '公司') {
          this.carForm.param = {
            transportCoCode: val,
            licensePlate: this.carForm.licensePlate,
          }
        } else {
          this.carForm.param = {
            ownerType: 'P',
            coCode: this.lhCoCode,
            licensePlate: this.carForm.licensePlate,
          }
        }

        this.carLoading = true
        const res = await getTruckList(this.carForm)
        if (res.code === 200) {
          const { list, page } = res.data
          this.carList = list
          this.carTotal = page.totalNumber
          this.carLoading = false
        }
      },
      async fetchOrderList() {
        //采购计划订单列表
        this.orderQueryForm.sort = 'desc'
        this.orderQueryForm.sortFieldName = 'operateTime'
        this.orderQueryForm.param = {
          auditStatus: '1',
          dpPlanCode: this.partQueryForm.dpPlanCode,
          contractNum: this.partQueryForm.contractNum,
          stopFlag: 1,
          surplusAmountGt: 0,
        }
        this.orderLoading = true
        const res = await purchaseDbPlanList(this.orderQueryForm)
        if (res.code === 200) {
          const { list, page } = res.data
          this.orderList = list
          this.resolveList(this.orderList)
          this.orderTotal = page.totalNumber
          this.orderLoading = false
        }
      },
      async fetchPart() {
        this.partQueryForm.sort = 'desc'
        this.partQueryForm.sortFieldName = 'operateTime'
        this.partLoading = true
        const res = await getCompanyList(this.partQueryForm)
        if (res.code === 200) {
          const { list, page } = res.data
          this.partList = list
          this.modleTotal = page.totalNumber
          this.partLoading = false
        }
      },
      async fetchData() {
        const params = {
          sort: 'desc',
          sortFieldName: 'operateTime',
          page: this.queryForm.page,
          pageSize: this.queryForm.pageSize,
          param: {
            auditStatus: this.status, //审核状态
            dpOrderCode: this.queryForm.dpOrderCode, //派车单号
            consignerName: this.queryForm.consignerName, //发货单位
            prodName: this.queryForm.prodName, //物料名称
            receiverName: this.queryForm.receiverName, //收货单位
            switchStatus: this.queryForm.tstatus, //单据状态
            driverName: this.queryForm.driverName, //	司机姓名
            truckId: this.queryForm.driverName, //	车牌号
            createTimeStart: this.value1
              ? moment(this.value1[0]).format('YYYY-MM-DD')
              : '',
            createTimeEnd: this.value1
              ? moment(this.value1[1]).format('YYYY-MM-DD')
              : '',
          },
        }
        this.listLoading = true

        const res = await purchaseDpOrderList(params)
        if (res.code === 200) {
          const { list, page } = res.data
          this.list = list
          this.resolveList(this.list)
          this.total = page.totalNumber
          this.listLoading = false
        }
      },
      async fetchDrive(val, status) {
        // driverType=1 , coCode = 承运单位编码（公司）/ 司机的登录名loginName
        this.driveUnitForm.sort = 'desc'
        this.driveUnitForm.sortFieldName = 'operateTime'
        if (status == '2' || status == '个人') {
          this.driveUnitForm.param = {
            driverType: '2',
            coCode: this.lhCoCode,
            fullName: this.driveForm.fullName,
            licensePlate: this.driveForm.licensePlate,
          }
        } else {
          this.driveUnitForm.param = {
            transportCoCode: val,
            fullName: this.driveForm.fullName,
            licensePlate: this.driveForm.licensePlate,
          }
        }
        // this.driveUnitForm.param = { transportCoCode: val }

        const res = await getDriverList(this.driveUnitForm)
        if (res.code === 200) {
          const { list, page } = res.data
          this.dList = list
          this.dTotal = page.totalNumber
          this.dLoading = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
