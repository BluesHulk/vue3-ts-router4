<template>
  <div class="order-management-container">
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
          <el-form-item label="计划单号:">
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
          <el-form-item label="计划状态:">
            <el-select v-model="tstatus" placeholder="请选择订单计划">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="计划日期:">
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
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
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
          v-permission="'release'"
          icon="el-icon-refresh"
          type="primary"
          @click="handleButton('release')"
        >
          释放
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-table
      v-loading="listLoading"
      class="sale-table-list"
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
        label="计划单号"
        width="200px"
        prop="dpPlanCode"
        show-overflow-tooltip
      />
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
        label="客户名称"
        width="100px"
        prop="receiverName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        width="100px"
        label="开票客户"
        prop="invoiceEntity"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料名称"
        width="100px"
        prop="prodName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据日期"
        width="150px"
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
        label="计划总量"
        prop="amount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="计划执行量"
        prop="executedAmount"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="计划剩余量"
        prop="surplusAmount"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        width="150px"
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
        prop="stopFlag"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.stopFlag == '1'">
            <span v-if="scope.row.switchStatus == '1'">开启</span>
            <span v-if="scope.row.switchStatus == '2'">关闭</span>
          </span>
          <span v-if="scope.row.stopFlag == '2'">已释放</span>
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
            v-if="
              row.auditStatus == '1' &&
              row.switchStatus == '1' &&
              row.surplusAmount > 0 &&
              row.stopFlag != '2'
            "
            v-permission="'send'"
            type="text"
            @click="handlePermis(row)"
          >
            派单
          </el-button>
          <el-button v-else v-permission="'send'" disabled type="text">
            派单
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
      :category="category"
      :sale-item="saleItem"
      :is-add="isAdd"
      :prod-unit-name="prodUnitName"
      :prod-unit-code="prodUnitCode"
      :car-item="carItem"
      :drive-item="driveItem"
      @fetch-data="fetchData"
      @order-choose="dialogTapOrder"
      @role-click="dialogRole"
      @unit-click="dialogUnit"
      @drive-choose="dialogDrive"
      @car-choose="dialogCar"
    />
    <!--订单列表-->
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="dialog-sel-sale"
      :visible.sync="orderMent"
      width="800px"
      title="订单列表"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="partQueryFormTicket"
            class="from-user"
            :inline="true"
            :model="partQueryForm"
            @submit.native.prevent
          >
            <el-form-item label="合同编号:" prop="contractNum">
              <el-input
                v-model.trim="partQueryForm.contractNum"
                clearable
                placeholder="请输入合同编号"
              />
            </el-form-item>
            <el-form-item label="订单号:" prop="orderNum">
              <el-input
                v-model.trim="partQueryForm.orderNum"
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
          class="sale-table"
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
            label="订单号"
            width="220px"
            prop="orderNum"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="合同编号"
            width="150px"
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
              <span v-if="scope.row.orderType == '2'">授信订单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="客户名称"
            width="150px"
            prop="receiverName"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="开票客户"
            width="150px"
            prop="invoiceEntity"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="物料名称"
            width="150px"
            prop="prodName"
            show-overflow-tooltip
          />
          <el-table-column
            align="center"
            label="单据日期"
            width="150px"
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
            width="150px"
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
    <!--承运单位-->
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="dialog-sel-order"
      :visible.sync="prodMent"
      width="820px"
      title="承运单位"
      @close="close"
    >
      <vab-query-form>
        <vab-query-form-left-panel :span="24">
          <el-form
            ref="partQueryForm"
            class="from-user"
            :inline="true"
            :model="partQueryForm"
            @submit.native.prevent
          >
            <el-form-item :label="isUnit === '1' ? '单位名称' : '个人名称'">
              <el-input
                v-model.trim="partQueryForm.contractNum"
                clearable
                :placeholder="
                  isUnit === '1' ? '请输入单位名称' : '请输入个人名称'
                "
              />
            </el-form-item>
            <el-form-item :label="isUnit === '1' ? '单位编码' : '手机号'">
              <el-input
                v-model.trim="partQueryForm.customCoCode"
                clearable
                :placeholder="
                  isUnit === '1' ? '请输入单位编码' : '请输入个人编码'
                "
              />
            </el-form-item>

            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="queryDataPartcarry"
              >
                查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="resetFormPartcarry"
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
          v-loading="unitLoading"
          :data="isUnit === '1' ? unitList : selfList"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          default-expand-all
          @selection-change="handleProd"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            :prop="isUnit === '1' ? 'coName' : 'fullName'"
            :label="isUnit === '1' ? '单位名称' : '个人名称'"
          />
          <el-table-column
            :prop="isUnit === '1' ? 'customCoCode' : 'loginName'"
            :label="isUnit === '1' ? '单位编码' : '手机号'"
          />
        </el-table>
        <el-pagination
          :current-page="unitForm.page"
          :layout="layout"
          :page-size="unitForm.pageSize"
          :total="unitTotal"
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
    <!--车牌号选择-->
    <el-dialog
      :close-on-click-modal="false"
      class="dialog-sel-order"
      :visible.sync="carSelect"
      width="820px"
      title="车牌号选择"
      @close="close"
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
      :destroy-on-close="true"
      width="820px"
      title="司机选择"
      @close="close"
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

  import {
    querySaleOrderDpPlanList,
    querySaleOrderList,
    salesPlanupdateDelFlag,
    getOrderInfoByRid,
    getPlanInfoByRid,
    salePlanpdateSwitchStatus,
    salesPlanupdateAuditStatus,
    salesDpPlanupdateStopFlag,
  } from '@/api/sale'
  import { getProductList } from '@/api/basisfiles'
  import { getTruckList } from '@/api/car'
  import moment from 'moment' // 时间
  import { getCompanyListBySendcons } from '@/api/company'
  import { mapActions, mapGetters } from 'vuex'
  import Edit from './components/UserManagementEdit.vue'
  export default {
    name: 'Order',
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
        prodMent: false,
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
        category: {},
        isAdd: false,
        saleItem: {},
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
      close() {
        // this.$refs['partQueryFormTicket'].resetFields()
        // this.$refs['partQueryForm'].resetFields()
        // this.$refs['carForm'].resetFields()
        // this.$refs['driveForm'].resetFields()
      },
      dialogCar(val, state) {
        this.carSelect = true
        this.carVal = val
        this.fetchCar(val, state)
      },
      dialogDrive(val, state) {
        this.driveSelect = true
        this.drival = val

        this.fetchDrive(val, state)
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
        // this.close()
        this.$refs['carForm'].resetFields()
      },
      cancleCar() {
        this.carSelect = false
        // this.close()
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
        // this.close()
        this.$refs['driveForm'].resetFields()
      },
      cancleDrive() {
        // this.close()
        this.$refs['driveForm'].resetFields()
        this.driveSelect = false
      },
      canclePart() {
        // this.close()
        this.$refs['partQueryFormTicket'].resetFields()
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
            // this.saleItem = val
            if (val.rid) {
              getOrderInfoByRid({ rid: val.rid }).then((res) => {
                const { code, data } = res
                if (code === 200) {
                  this.saleItem = data
                }
              })
            }
          })
          this.orderMent = false
        }
        // this.close()
        this.$refs['partQueryFormTicket'].resetFields()
      },
      cancleProd() {
        // this.close()
        this.$refs['partQueryForm'].resetFields()
        this.prodMent = false
      },
      addCofirmProd() {
        if (this.unitRows.length > 1) {
          this.prodMent = true
          this.$baseMessage(
            '只能选中一行',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          this.multipleUnit.map((val) => {
            this.category = val
          })

          this.prodMent = false
        }
        // this.close()
        this.$refs['partQueryForm'].resetFields()
      },
      dialogTapOrder() {
        this.orderMent = true
        this.fetchOrderList()
      },
      dialogUnit(val) {
        this.isUnit = val
        this.prodMent = true
        this.fetchUnit(val)
      },
      dialogRole() {},
      checkStatus(selectRows, status, falg) {
        //审核弃审
        const auditStatus = selectRows.map((item) => item.auditStatus).join()
        const rid = selectRows.map((item) => item.rid).join()
        const stopFlag = selectRows.map((item) => item.stopFlag).join()
        if (stopFlag == '2') {
          this.$baseMessage(
            '订单处于释放状态不可操作',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
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
            salesPlanupdateAuditStatus({
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
        }
      },
      openStatus(selectRows, state, falg) {
        //开启关闭
        const iIopen = selectRows.map((item) => item.switchStatus).join()
        const rid = selectRows.map((item) => item.rid).join()
        const stopFlag = selectRows.map((item) => item.stopFlag).join()
        if (stopFlag == '2') {
          this.$baseMessage(
            '订单处于释放状态不可操作',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          if (iIopen === state && falg) {
            this.$baseMessage(
              '订单已处于开启状态',
              'error',
              false,
              'vab-hey-message-error'
            )
          } else {
            salePlanpdateSwitchStatus({
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
        }
      },
      releaseOrder(selectRows) {
        const iIopen = selectRows.map((item) => item.switchStatus).join()
        const stopFlag = selectRows.map((item) => item.stopFlag).join()
        const rid = selectRows.map((item) => item.rid).join()
        if (iIopen == 1) {
          this.$baseMessage(
            '只能在单据状态关闭时进行释放',
            'error',
            false,
            'vab-hey-message-error'
          )
        } else {
          if (stopFlag == 2) {
            this.$baseMessage(
              '单据状态已释放无需再释放',
              'error',
              false,
              'vab-hey-message-error'
            )
          } else {
            salesDpPlanupdateStopFlag({
              rid: rid,
              stopFlag: 2,
              stopRemark: '',
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
                  const { message, status } = await salesPlanupdateDelFlag({
                    rid: this.selectRows[0].rid,
                  })
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
            } else if (val == 'view') {
              getPlanInfoByRid({
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
            } else if (val === 'release') {
              this.releaseOrder(this.selectRows)
            } else if (val === 'edit') {
              if (
                this.selectRows[0].switchStatus == '1' &&
                this.selectRows[0].auditStatus == '2' &&
                this.selectRows[0].stopFlag == '1'
              ) {
                getPlanInfoByRid({
                  rid: this.selectRows[0].rid,
                }).then((res) => {
                  const { data, code } = res
                  if (code === 200) {
                    this.$refs['edit'].showEdit(data)
                  }
                })
              } else if (this.selectRows[0].switchStatus == '2') {
                this.$baseMessage(
                  '未开启状态，不可编辑！',
                  'error',
                  false,
                  'vab-hey-message-error'
                )
              } else if (this.selectRows[0].auditStatus == '1') {
                this.$baseMessage(
                  '已审核状态，不可编辑！',
                  'error',
                  false,
                  'vab-hey-message-error'
                )
              } else if (this.selectRows[0].stopFlag == '2') {
                this.$baseMessage(
                  '已释放状态，不可编辑！',
                  'error',
                  false,
                  'vab-hey-message-error'
                )
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
        getPlanInfoByRid({
          rid: val.rid,
        }).then((res) => {
          const { data, code } = res
          if (code === 200) {
            this.auditStatus = val.auditStatus
            this.$refs['edit'].showEdit(data, 'send')
          }
        })
        // this.$refs['edit'].showEdit(val, 'send')
      },
      queryData() {
        this.queryForm.page = 1
        this.fetchData()
      },
      queryDataPartDrive() {
        this.fetchDrive(this.drival, this.isUnit)
      },
      resetFormPartDrive() {
        this.$refs['driveForm'].resetFields()
        this.fetchDrive(this.drival, this.isUnit)
      },
      queryDataPart() {
        this.fetchCar(this.carVal, this.isUnit)
      },
      resetFormPart() {
        this.$refs['carForm'].resetFields()
        this.fetchCar(this.carVal, this.isUnit)
      },
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
      pordHandleSizeChange(val) {
        this.unitForm.pageSize = val
      },
      pordHandleCurrentChange(val) {
        this.unitForm.page = val
        this.fetchUnit(this.isUnit)
      },
      carHandleSizeChange(val) {
        this.carForm.pageSize = val
      },
      carHandleCurrentChange(val) {
        this.carForm.page = val
        this.fetchCar(this.carVal, this.isUnit)
      },
      driveHandleSizeChange(val) {
        this.driveForm.pageSize = val
      },
      driveHandleCurrentChange(val) {
        this.driveForm.page = val
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
      queryDataPartTicket() {
        this.fetchOrderList()
      },
      resetFormPartTicket() {
        // partQueryFormTicket
        this.$refs['partQueryFormTicket'].resetFields()
        this.fetchOrderList()
      },
      queryDataPartcarry() {
        this.fetchUnit(this.isUnit)
      },
      resetFormPartcarry() {
        this.partQueryForm.customCoCode = ''
        this.partQueryForm.contractNum = ''
        this.fetchUnit(this.isUnit)
      },
      async fetchCar(val, state) {
        //state === 1时 为单位，2为个人
        this.carForm.sort = 'desc'
        this.carForm.sortFieldName = 'operateTime'

        if (state == '1' || state == '公司') {
          this.carForm.param = {
            transportCoCode: val,
            status: 'A',
            licensePlate: this.carForm.licensePlate,
          }
        } else {
          this.carForm.param = {
            ownerType: 'P',
            status: 'A',
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
      async fetchUnit(val) {
        //获取物料分类
        this.unitForm.sort = 'desc'
        this.unitForm.sortFieldName = 'operateTime'
        this.unitLoading = true
        // getDriverList
        if (val === '1') {
          //承运为公司时
          this.unitForm.param = {
            type: 3,
            customCoCode: this.partQueryForm.customCoCode,
            coName: this.partQueryForm.contractNum,
          }
          delete this.unitForm.paramList
          const res = await getCompanyListBySendcons(this.unitForm)
          if (res.code === 200 && res.status == 0) {
            const { list, page } = res.data
            this.unitList = list
            this.unitTotal = page.totalNumber
            this.unitLoading = false
          } else {
            this.$baseMessage(
              res.message,
              'error',
              false,
              'vab-hey-message-error'
            )
          }
        } else {
          //承运为个人时
          this.unitForm.param = {
            driverType: '2',
            status: 'A',
            coCode: this.lhCoCode,
            fullName: this.partQueryForm.contractNum,
            loginName: this.partQueryForm.customCoCode,
          }

          const res = await getDriverList(this.unitForm)
          if (res.code === 200 && res.status == 0) {
            const { list, page } = res.data
            this.selfList = list
            this.unitTotal = page.totalNumber
            this.unitLoading = false
          } else {
            this.$baseMessage(
              res.message,
              'error',
              false,
              'vab-hey-message-error'
            )
          }
        }
      },
      async fetchOrderList() {
        //订单列表
        this.orderQueryForm.sort = 'desc'
        this.orderQueryForm.sortFieldName = 'operateTime'
        this.orderQueryForm.paramList = [
          {
            mark: '',
            name: 'auditStatus',
            value: '1',
          },
          {
            mark: 'like',
            name: 'contractNum',
            value: this.partQueryForm.contractNum
              ? this.partQueryForm.contractNum
              : null,
          },
          {
            mark: 'like',
            name: 'switchStatus',
            value: 1,
          },
          {
            mark: 'like',
            name: 'notNegative',
            value: 1,
          },
          {
            mark: 'like',
            name: 'orderNum',
            value: this.partQueryForm.orderNum
              ? this.partQueryForm.orderNum
              : null,
          },
        ]
        this.orderLoading = true
        const res = await querySaleOrderList(this.orderQueryForm)
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
        const param = {}
        param.sort = 'desc'
        param.sortFieldName = 'operateTime'
        param.page = this.queryForm.page
        param.pageSize = this.queryForm.pageSize
        this.listLoading = true
        param.paramList = [
          {
            mark: 'like',
            name: 'auditStatus',
            value: this.status ? this.status : null,
          },
          {
            mark: 'like',
            name: 'contractNum',
            value: this.queryForm.contractNum
              ? this.queryForm.contractNum
              : null,
          },
          {
            mark: 'like',
            name: 'consignerName',
            value: this.queryForm.consignerName
              ? this.queryForm.consignerName
              : null,
          },
          {
            mark: 'like',
            name: 'dpPlanCode',
            value: this.queryForm.orderNum ? this.queryForm.orderNum : null,
          },
          {
            mark: 'like',
            name: 'prodName',
            value: this.queryForm.prodName ? this.queryForm.prodName : null,
          },
          {
            mark: 'like',
            name: 'switchStatus',
            value: this.tstatus ? this.tstatus : null,
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
        ]

        // const res = await rolePageList(this.queryForm)
        const res = await querySaleOrderDpPlanList(param)
        if (res.code === 200) {
          const { list, page } = res.data
          this.list = list
          this.resolveList(this.list)
          this.total = page.totalNumber
          this.listLoading = false
        }
      },
      async fetchDrive(val, state) {
        // driverType=1 , coCode = 承运单位编码（公司）/ 司机的登录名loginName
        this.driveUnitForm.sort = 'desc'
        this.driveUnitForm.sortFieldName = 'operateTime'
        if (state == '2') {
          this.driveUnitForm.param = {
            driverType: '2',
            coCode: this.lhCoCode,
            status: 'A',
            fullName: this.driveForm.fullName,
            licensePlate: this.driveForm.licensePlate,
          }
        } else {
          this.driveUnitForm.param = {
            transportCoCode: val,
            status: 'A',
            fullName: this.driveForm.fullName,
            licensePlate: this.driveForm.licensePlate,
          }
        }
        // this.driveUnitForm.param = { driverType: '1', coCode: val }
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
