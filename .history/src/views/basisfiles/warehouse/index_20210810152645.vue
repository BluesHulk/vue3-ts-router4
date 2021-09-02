<template>
  <div class="main">
    <el-form ref="searchForm" :inline="true" :model="form">
      <el-form-item label="仓库名称">
        <el-input
          v-model.trim="form.name.value"
          clearable
          placeholder="请输入仓库名称"
        />
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
        <el-button
          v-permission="'add'"
          type="primary"
          icon="el-icon-plus"
          @click="openDialog"
        >
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tablelists"
          row-key="id"
          border
          highlight-current-row
          max-height="600"
          :tree-props="{ children: 'children' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="code" label="仓库编码" />
          <el-table-column prop="name" label="仓库名称" />
          <el-table-column prop="type" label="仓库类型" />
          <el-table-column prop="principal" label="负责人" />
          <el-table-column prop="memo" label="描述" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button
                  v-permission="'edit'"
                  type="text"
                  @click="editDialog(scope)"
                >
                  编辑
                </el-button>
                <el-button
                  v-permission="'del'"
                  type="text"
                  @click="delDialog(scope.row.rid)"
                >
                  删除
                </el-button>
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
      :title="dialogFormEdit === 1 ? '新增' : '编辑'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="680px"
      @close="closeDialogForm"
    >
      <el-form
        ref="updateForm"
        :model="dialogForm"
        label-width="130px"
        style="width: 500px; margin: 0 auto"
        :rules="rules"
      >
        <el-form-item label="仓库编码" prop="code">
          <el-input
            v-model.trim="dialogForm.code"
            type="text"
            autocomplete="off"
            :disabled="codeAble"
          />
        </el-form-item>
        <el-form-item label="仓库名称" prop="name">
          <el-input
            v-model.trim="dialogForm.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="仓库类型" prop="type">
          <el-select
            v-model="dialogForm.type"
            placeholder="请选择状态"
            style="width: 100%"
          >
            <el-option
              v-for="item in belongCode.areahouseType"
              :key="item.rid"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input v-model.trim="dialogForm.principal" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述说明" prop="memo">
          <el-input
            v-model.trim="dialogForm.memo"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getWarehouseList,
    addWarehouse,
    editWarehouse,
    delWarehouse,
  } from '@/api/warehouse'
  import { getListByTidAndBelongCode } from '@/api/digtal'
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
        // hasChildren: ture,
        dialogFormVisible: false,
        codeAble: false,
        dialogFormEdit: 1,
        dialogForm: {
          code: '',
          name: '',
          type: '',
          principal: '',
          memo: '',
          rid: '',
        },
        chooseIndex: '',
        tablelists: [],
        belongCode: {
          areahouseType: [],
        },
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: 'operateTime',
          paramList: [],
        },
        form: {
          name: {
            value: '',
            mark: 'like',
          },
        },
        rules: {
          code: [
            { required: true, message: '请输入仓库编码' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入仓库名称' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择仓库类型' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          principal: [
            { required: true, message: '请输入负责人' },
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
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
      this.getDataType('areahouseType', 'AREAHOUSE_TYPE')
    },
    methods: {
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.codeAble = true
        this.dialogFormEdit = 2
      },
      initDialog() {
        this.$refs['updateForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.codeAble = false
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
      submitForm() {
        this.$refs['updateForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addWarehouse(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '新增成功!',
                  })
                  this.webPage.page = 1
                  this.getDataList()
                } else {
                  this.$message.error(res.message)
                }
              })
              this.dialogFormVisible = false
              this.initDialog()
            } else {
              editWarehouse(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!',
                  })
                  this.getDataList()
                } else {
                  this.$message.error(res.message)
                }
              })
              this.dialogFormVisible = false
              this.initDialog()
            }
          } else {
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
        getWarehouseList(this.webPage).then((res) => {
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
        this.form.name.value = null
        this.getDataList()
      },
      getDataType(val, code) {
        getListByTidAndBelongCode({
          code: code,
        }).then((res) => {
          this.belongCode[val] = res.data
        })
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
