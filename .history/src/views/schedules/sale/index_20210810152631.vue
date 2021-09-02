<template>
  <div class="sales-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          class="from-user"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item>
            <el-select v-model="value" placeholder="请选择审核状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.account"
              clearable
              placeholder="请输入合同编号"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.account"
              clearable
              placeholder="请输入订单号"
            />
          </el-form-item>
          <el-form-item>
            <el-select v-model="value" placeholder="请选择分配计划类型">
              <el-option
                v-for="item in playType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
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
          icon="el-icon-edit"
          type="primary"
          @click="handleButton('edit')"
        >
          编辑
        </el-button>
        <el-button
          icon="el-icon-delete"
          type="primary"
          @click="handleButton('del')"
        >
          删除
        </el-button>
        <el-button
          icon="el-icon-view"
          type="primary"
          @click="handleButton('view')"
        >
          查看
        </el-button>
        <el-button
          icon="el-icon-check"
          type="primary"
          @click="handleButton('check')"
        >
          审核
        </el-button>
        <el-button
          icon="el-icon-close"
          type="primary"
          @click="handleButton('abandon')"
        >
          弃审
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
      <el-table-column align="center" show-overflow-tooltip type="selection" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="审核状态"
        prop="name"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="分配计划单号"
        prop="code"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单号"
        prop="description"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="合同编号"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="客户名称"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="开票客户"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="物料名称"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据日期"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="计划分配量"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单剩余量"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据开始日期"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="单据有效期"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="订单状态"
        prop="status"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="操作" show-overflow-tooltip>
        <template #default="{ row }">
          <el-button type="text" @click="handlePermis(row)">生效</el-button>
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
      @fetch-data="fetchData"
      @origize-click="dialogOrize"
      @role-click="dialogRole"
    />
  </div>
</template>

<script>
  import { userQuery } from '@/api/user'
  import { rolePageList } from '@/api/role'
  import Edit from './components/UserManagementEdit.vue'
  export default {
    name: 'Sales',
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
        options: [
          {
            value: '1',
            label: '审核',
          },
          {
            value: '2',
            label: '保存',
          },
        ],
        playType: [
          {
            value: '1',
            label: '销售',
          },
          {
            value: '2',
            label: '采购',
          },
        ],
        value: '',
        value1: '',
        list: [],
        listLoading: true,
        layout: 'total, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      toggleSelection() {},
      addCofirm() {},
      dialogOrize() {},
      dialogRole() {},
      selectRow(val) {
        if (this.selectRows.length > 0) {
          if (this.selectRows.length === 1) {
            this.passReset = true
            if (val === 'del') {
              const ids = this.selectRows.map((item) => item.rid).join()
              this.$baseConfirm('你确定要删除选中项吗', null, async () => {
                // const { msg } = await doDelete({ ids })
                this.$baseMessage(
                  'aaa',
                  'success',
                  false,
                  'vab-hey-message-success'
                )
                await this.fetchData()
              })
            } else if (val === 'view') {
              this.$router.push({
                path: '/schedules/detail',
                query: this.selectRows[0],
              })
            } else if (val === 'check') {
            } else if (val === 'abandon') {
            } else if (val === 'edit') {
              this.$refs['edit'].showEdit(this.selectRows[0])
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
      queryData() {},
      resetForm() {},
      handleEdit(row) {
        this.$refs['edit'].showEdit()
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
      async fetchData() {
        this.queryForm.sort = 'desc'
        this.queryForm.sortFieldName = 'operateTime'
        this.listLoading = true
        const res = await rolePageList(this.queryForm)
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
