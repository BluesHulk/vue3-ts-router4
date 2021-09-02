<template>
  <div class="organizes-container">
    <vab-query-form>
      <vab-query-form-top-panel :span="8">
        <el-button
          v-permission="'add'"
          icon="el-icon-plus"
          type="primary"
          @click="handleEdit"
        >
          录入
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <div class="infinite-list-wrapper scrollbar scrollbar-y scrollbar-light">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="rid"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="code" align="center" label="区域编码" />
        <el-table-column prop="name" align="center" label="区域名称" />
        <!--<el-table-column prop="type" align="center" label="区域类型" />-->
        <el-table-column prop="type" align="center" label="所属层级">
          <template slot-scope="scope">
            <span v-if="scope.row.grade == '1'">一级</span>
            <span v-if="scope.row.grade == '2'">二级</span>
            <span v-if="scope.row.grade == '3'">三级</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_person"
          align="center"
          label="创建人"
          width="120"
        />
        <el-table-column
          prop="create_time"
          align="center"
          width="180"
          label="创建时间"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.create_time">
              {{ scope.row.create_time | dateFormat('YYYY-MM-DD HH:mm:ss') }}
            </span>
            <span v-else>————</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="是否有效">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 'E'">有效</span>
            <span v-if="scope.row.status == 'N'">无效</span>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="remark"
          align="center"
          label="描述"
          width="120"
        />-->
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template #default="{ row }">
            <el-button
              v-permission="'edit'"
              type="text"
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-permission="'del'"
              type="text"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
            <el-button
              v-permission="'view'"
              type="text"
              @click="handleRoleView(row)"
            >
              查看
            </el-button>
            <!-- <el-button type="text" @click="handleRoleView(row)">同步</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <edit
      ref="edit"
      :table-data="tableData"
      @fetch-data="fetchData"
      @origize-click="dialogOrize"
    />
    <RoleView ref="roleView" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Edit from './components/UserManagementEdit.vue'
  import RoleView from './components/roleView.vue'
  import { getSaleAreaTreeByCoCode, getDeptDel } from '@/api/base'
  export default {
    name: 'Organizes',
    components: { Edit, RoleView },
    data() {
      return {
        hasChildren: true,
        redirect: undefined,
        timer: 0,
        nowTime: new Date(),
        tableData: [],
        layout: 'total, prev, pager, next, jumper',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          username: '',
        },
        total: 0,
        peopleSel: false,
        orgSel: false,
      }
    },
    computed: {},
    created() {
      this.initListTree()
    },
    methods: {
      addCofirm() {
        this.orgSel = false
      },
      resetForm() {},
      fetchData() {
        this.$nextTick(() => {
          this.initListTree()
        })
      },
      upgrade(array) {
        const fn = (arr, grade) => {
          for (let i = 0; i < arr.length; i++) {
            const it = arr[i]
            it.grade = grade + 1
            it.disabled = ''
            if (it.children && it.children.length === 0) delete it.children
            if (it.children) {
              fn(it.children, it.grade)
            }
          }
        }
        for (let i = 0; i < array.length; i++) {
          const td = array[i]
          td.grade = 1
          td.disabled = ''
          if (td.children && td.children.length === 0) delete td.children
          if (td.children && td.children.length) {
            fn(td.children, td.grade)
          }
        }
        return array
      },
      async initListTree() {
        const res = await getSaleAreaTreeByCoCode()
        const { data, code } = res
        if (code === 200) {
          // this.tableData = res.data
          const respon = this.upgrade(data)
          this.tableData = respon
        }
      },
      handleEdit(row) {
        if (row.rid) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      handleRoleView(row) {
        if (row.rid) {
          this.$refs['roleView'].showEdit(row)
        } else {
          this.$refs['roleView'].showEdit()
        }
      },
      handleDelete(row) {
        if (row.rid) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await getDeptDel({ rid: row.rid })
            this.$baseMessage(msg, 'success', false, 'vab-hey-message-success')
            await this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const rid = this.selectRows.map((item) => item.rid).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await getDeptDel({ rid })
              this.$baseMessage(
                msg,
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            })
          } else {
            this.$baseMessage(
              '未选中任何行',
              'error',
              false,
              'vab-hey-message-error'
            )
          }
        }
      },
      dialogOrize() {
        this.orgSel = true
      },
    },
  }
</script>

<style lang="scss" scoped></style>
