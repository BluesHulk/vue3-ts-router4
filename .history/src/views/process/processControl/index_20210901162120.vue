<template>
  <div class="main">
    <el-row>
      <el-col>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog">
          选择
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tablelists"
          row-key="rid"
          max-height="670"
          border
          default-expand-all
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column align="center" label="序号" fixed width="55">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="业务名称" />
          <el-table-column prop="code" label="业务编码" />
          <el-table-column label="业务类型">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ getTypeList(scope.row.code) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <!--<el-button type="text" @click="editDialog(scope.row)">
                  编辑
                </el-button>-->
                <el-button type="text" @click="processDialog(scope.row)">
                  流程配置
                </el-button>
                <el-button type="text" @click="delDialog(scope.row.rid)">
                  删除
                </el-button>
                <!--<el-button type="text" @click="viewDialog(scope.row)">
                  查看
                </el-button>-->
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
    <Dialog ref="dialog" :dialog-form-edit="dialogFormEdit" />
    <ViewDialog ref="viewdialog" />
    <ProcessDialog ref="processdialog" />
  </div>
</template>

<script>
  import {
    getBusinessTypeList,
    editBusinessType,
    addBusinessType,
    delBusinessType,
    getProcessList,
    editProcess,
    addProcess,
    delProcess,
  } from '@/api/process'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  import Dialog from './components/dialog.vue'
  import ViewDialog from './components/viewdialog.vue'
  import ProcessDialog from './components/processdialog.vue'
  export default {
    components: { Dialog, ProcessDialog, ViewDialog },
    data() {
      return {
        updateAble: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        processDialogVisible: false,
        processType: '',
        typeList: {
          1: {
            code: 'PURCH',
            name: '采购',
          },
          2: {
            code: 'SELL',
            name: '销售',
          },
          3: {
            code: 'TRANSFER',
            name: '倒料',
          },
          4: {
            code: 'ONESWEIGH',
            name: '单次计量',
          },
        },
        tablelists: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [
            {
              name: '',
              value: '',
              mark: '',
            },
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
      getTypeList(val) {
        if (val) {
          return this.typeList[val].name
        }
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        // this.webPage.paramList = []
        getBusinessTypeList(this.webPage).then((res) => {
          if (res.status == '0') {
            this.tablelists = res.data.list
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
      openDialog() {
        this.dialogFormEdit = 1
        this.$refs.dialog.dialogVisible = true
      },
      editDialog(val) {
        this.dialogFormEdit = 2
        val.type = Number(val.code)
        this.$refs.dialog.dialogForm = Object.assign({}, val)
        this.$refs.dialog.dialogVisible = true
      },
      viewDialog(val) {
        this.$refs.viewdialog.processType = val.code
        this.$refs.viewdialog.dialogVisible = true
        this.$refs.viewdialog.getDataList()
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delBusinessType({ rid }).then((res) => {
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
      processDialog(val) {
        this.$refs.processdialog.processType = val.code
        this.$refs.processdialog.processDialogVisible = true
        this.$refs.processdialog.getDataList()
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
