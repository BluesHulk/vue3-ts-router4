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
          <el-form-item label="运单类型:">
            <el-select v-model="type" placeholder="请选择" @change="changeType">
              <el-option
                v-for="item in carrType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        v-if="type == '2'"
        align="center"
        label="订单号"
        width="220px"
        prop="orderNum"
        show-overflow-tooltip
      />
      <el-table-column
        v-if="type == '1'"
        align="center"
        width="220px"
        label="订单号"
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
        label="发货地点"
        width="200px"
        prop="consignerAlias"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="收货单位"
        prop="receiverName"
        width="200px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="收货地点"
        width="200px"
        prop="receiverAlias"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="prodName"
        width="100px"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="预发数量"
        prop="amount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="实发数量"
        prop="outAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="实收数量"
        prop="receivingAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="扣吨"
        prop="deducted"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="验收数量"
        prop="checkAmount"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="签收日期"
        prop="signTime"
        width="150px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.signTime != '' && scope.row.signTime != null">
            {{ scope.row.signTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}
          </span>
          <span v-else></span>
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
        fixed="right"
        label="操作"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-button
            v-if="row.signStatus == '2' && row.auditStatus == '1'"
            type="text"
            @click="yanShow(row)"
          >
            签收
          </el-button>
          <el-button v-else disabled type="text" @click="yanShow(row)">
            签收
          </el-button>
          <el-button
            v-if="row.signStatus == '1' && row.auditStatus == '1'"
            type="text"
            @click="cheXiao(row)"
          >
            撤销
          </el-button>
          <el-button v-else disabled type="text" @click="cheXiao(row)">
            撤销
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
    <edit ref="edit" :type="type" @fetch-data="initData" />
  </div>
</template>

<script>
  import moment from 'moment' // 时间
  import {
    queryByLoad,
    queryBySign,
    purchaseDpOrderSginrevokeSgin,
    CoSalesDpOrderControllerqueryBySign,
    CoSalesDpOrderdetail,
    CoSalesDpOrderSignrevokeSgin,
  } from '@/api/waybill.js'
  import { purchaseDpOrderDetail } from '@/api/purchase'
  import Edit from './components/UserManagementEdit.vue'
  export default {
    name: 'Maintain',
    components: { Edit },
    data() {
      return {
        list: [],
        total: 0,
        status: '',
        type: '1',
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
        carrType: [
          {
            value: '1',
            label: '销售',
          },
          {
            value: '2',
            label: '采购',
          },
        ],
        selectRows: '',
        value1: '',
        layout: 'total, prev, pager, next, jumper',
      }
    },
    created() {
      if (this.type === '2') {
        this.fetchData()
      } else {
        this.fetchDataSale()
      }
    },
    methods: {
      cheXiao(row) {
        this.$baseConfirm('你确定要撤销当前项吗', null, async () => {
          if (this.type == 2) {
            purchaseDpOrderSginrevokeSgin({
              rid: row.rid,
            }).then((res) => {
              const { data, code } = res
              console.log(res)
              if (code === 200) {
              }
            })
            await this.fetchData()
          } else {
            CoSalesDpOrderSignrevokeSgin({
              rid: row.rid,
            }).then((res) => {
              const { data, code } = res
              console.log(res)
              if (code === 200) {
              }
            })
            await this.fetchDataSale()
          }
        })
      },
      yanShow(row) {
        if (this.type == '2') {
          purchaseDpOrderDetail({
            rid: row.rid,
          }).then((res) => {
            const { data, code } = res
            if (code === 200) {
              const temp = Object.assign(...data.goodsList)
              delete data.goodsList
              const res = Object.assign(temp, data)
              this.$refs['edit'].showEdit(res, 'add')
            }
          })
        } else {
          CoSalesDpOrderdetail({
            rid: row.rid,
          }).then((res) => {
            const { data, code } = res
            if (code === 200) {
              const temp = Object.assign(...data.goodsList)
              delete data.goodsList
              const res = Object.assign(temp, data)
              this.$refs['edit'].showEdit(res, 'add')
            }
          })
        }
      },
      changeType(val) {
        this.type = val
        this.status = ''
        this.value1 = ''
        this.queryForm.pageSize = 10
        this.queryForm.page = 1
        if (val == '2') {
          this.fetchData()
        } else {
          this.fetchDataSale()
        }
      },
      queryData() {
        this.queryForm.pageSize = 10
        this.queryForm.page = 1
        if (this.type == '2') {
          this.fetchData()
        } else {
          this.fetchDataSale()
        }
      },
      resetForm() {
        this.status = ''
        this.value1 = ''
        this.queryForm = {
          page: 1,
          pageSize: 10,
        }
        if (this.type === '2') {
          this.fetchData()
        } else {
          this.fetchDataSale()
        }
      },
      handleButton() {
        if (this.selectRows.length > 0) {
          const rid = this.selectRows.map((item) => item.rid).join()

          if (this.selectRows.length === 1) {
            if (this.type === '2') {
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
              CoSalesDpOrderdetail({
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
      handleSizeChange(val) {
        this.queryForm.pageSize = val
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        if (this.type === '2') {
          this.fetchData()
        } else {
          this.fetchDataSale()
        }
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      initData() {
        if (this.type === '2') {
          this.fetchData()
        } else {
          this.fetchDataSale()
        }
      },
      async fetchDataSale() {
        const params = {
          pageSize: this.queryForm.pageSize,
          page: this.queryForm.page,
        }
        params.sort = 'desc'
        params.sortFieldName = 'operateTime'
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
        const res = await CoSalesDpOrderControllerqueryBySign(params)
        if (res.code === 200) {
          const { list, page } = res.data
          this.list = list
          this.total = page.totalNumber
          this.listLoading = false
        }
      },
      async fetchData() {
        const params = {
          pageSize: this.queryForm.pageSize,
          page: this.queryForm.page,
        }
        params.sort = 'desc'
        params.sortFieldName = 'operateTime'
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
        const res = await queryBySign(params)
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
