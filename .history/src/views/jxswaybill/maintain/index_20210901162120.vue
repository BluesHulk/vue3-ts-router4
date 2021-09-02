<template>
  <div class="order-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="searchForm"
          class="from-user"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item label="派车单号:">
            <el-input
              v-model.trim="queryForm.dpOrderCode"
              clearable
              placeholder="请输入派车单号"
            />
          </el-form-item>
          <el-form-item label="车牌号:">
            <el-input
              v-model.trim="queryForm.truckId"
              clearable
              placeholder="请输入车牌号"
            />
          </el-form-item>
          <el-form-item label="司机姓名:">
            <el-input
              v-model.trim="queryForm.driverName"
              clearable
              placeholder="请输入司机姓名"
            />
          </el-form-item>
          <el-form-item label="物料名称:">
            <el-input
              v-model.trim="queryForm.prodName"
              clearable
              placeholder="请输入物料名称"
            />
          </el-form-item>
          <!--<el-form-item label="发货单位:">
            <el-input
              v-model.trim="queryForm.consignerName"
              clearable
              placeholder="请输入发货单位"
            />
          </el-form-item> -->
          <el-form-item label="收货单位:">
            <el-input
              v-model.trim="queryForm.receiverName"
              clearable
              placeholder="请输入收货单位"
            />
          </el-form-item>
          <el-form-item label="是否签收:">
            <el-select v-model="status" placeholder="请选择">
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
        <el-button
          icon="el-icon-view"
          type="primary"
          @click="handleButton('view')"
        >
          查看
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
        label="订单号"
        width="220px"
        prop="orderNum"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        label="发货单位"
        width="200px"
        prop="consignerName"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="收货单位"
        width="200px"
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
        prop="truckId"
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
        label="单据日期"
        prop="beginDate"
        width="150px"
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
        label="计划有效期"
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
        label="是否签收"
        prop="signStatus"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.signStatus == '1'">已签收</span>
          <span v-if="scope.row.signStatus == '2'">未签收</span>
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
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-button v-if="row.status != '5'" type="text" @click="yhOrder(row)">
            运货单
          </el-button>
          <el-button v-else disabled type="text" @click="yhOrder(row)">
            运货单
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
    <edit ref="edit" @fetch-data="initfetchData" />
  </div>
</template>

<script>
  import moment from 'moment' // 时间
  import { queryByLoad } from '@/api/jxswaybill.js'
  import { purchaseDpOrderDetail } from '@/api/jxs'
  import Edit from './components/UserManagementEdit.vue'
  export default {
    name: 'Maintain',
    components: { Edit },
    data() {
      return {
        list: [],
        total: 0,
        status: '',
        listLoading: false,
        queryForm: {
          pageSize: 10,
          page: 1,
        },
        options: [
          {
            value: '1',
            label: '已签收',
          },
          {
            value: '2',
            label: '未签收',
          },
        ],
        selectRows: '',
        value1: '',
        layout: 'total, prev, pager, next, jumper',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      yhOrder(row) {
        purchaseDpOrderDetail({
          rid: row.rid,
        }).then((res) => {
          const { data, code } = res
          if (code === 200) {
            const temp = Object.assign(...data.goodsList)
            delete data.goodsList
            const res = Object.assign(temp, data)
            console.log(res)
            this.$refs['edit'].showEdit(res, 'add')
          }
        })
      },
      queryData() {
        this.fetchData()
      },
      resetForm() {
        this.status = ''
        this.value1 = ''
        this.queryForm = {
          page: 1,
          pageSize: 10,
        }
        this.fetchData()
      },
      handleButton() {
        if (this.selectRows.length > 0) {
          const rid = this.selectRows.map((item) => item.rid).join()

          if (this.selectRows.length === 1) {
            purchaseDpOrderDetail({
              rid: rid,
            }).then((res) => {
              const { data, code } = res
              if (code === 200) {
                const temp = Object.assign(...data.goodsList)
                delete data.goodsList
                const res = Object.assign(temp, data)
                this.$refs['edit'].showEdit(res, 'view')
              }
            })
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        this.fetchData()
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      initfetchData() {
        this.fetchData()
      },
      async fetchData() {
        const params = {}
        params.sort = 'desc'
        params.sortFieldName = 'operateTime'
        params.pageSize = this.queryForm.pageSize
        params.page = this.queryForm.page
        this.listLoading = true
        params.param = {
          dpOrderCode: this.queryForm.dpOrderCode,
          truckId: this.queryForm.truckId,
          driverName: this.queryForm.driverName,
          prodName: this.queryForm.prodName,
          receiverName: this.queryForm.receiverName,
          isSign: this.status,
          beginDate: this.value1
            ? moment(this.value1[0]).format('YYYY-MM-DD')
            : '',
          endDate: this.value1
            ? moment(this.value1[1]).format('YYYY-MM-DD')
            : '',
        }
        const res = await queryByLoad(params)
        if (res.code === 200) {
          const { list, page } = res.data
          this.list = list
          this.total = page.totalNumber
          this.listLoading = false
        }
      },
    },
  }
</script>
<style lang="scss" scoped></style>
