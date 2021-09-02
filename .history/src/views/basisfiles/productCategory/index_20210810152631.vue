<template>
  <div class="main">
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
          row-key="rid"
          max-height="670"
          border
          default-expand-all
          highlight-current-row
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="cateCode" label="分类编码" />
          <el-table-column prop="cateName" label="分类名称" />
          <el-table-column prop="status" label="是否有效">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status == 'E' ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="cateDesc" label="描述" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button
                  v-permission="'edit'"
                  type="text"
                  @click="editDialog(scope.row.rid)"
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
        ref="updataForm"
        :model="dialogForm"
        label-width="130px"
        style="width: 500px; margin: 0 auto"
        :rules="rules"
      >
        <el-form-item label="分类名称" prop="cateName">
          <el-input
            v-model="dialogForm.cateName"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="分类编码" prop="cateCode">
          <el-input
            v-model="dialogForm.cateCode"
            type="text"
            :disabled="cateCodedisable"
          />
        </el-form-item>
        <el-form-item label="上级物料" prop="parentRid">
          <el-input v-model="dialogForm.parentName" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            :disabled="openCatedisable"
            @click="openChooseCate"
          />
        </el-form-item>
        <el-form-item label="是否有效" prop="status">
          <el-select
            v-model="dialogForm.status"
            placeholder="请选择是否有效"
            style="width: 100%"
          >
            <el-option label="是" value="E" />
            <el-option label="否" value="N" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="cateDesc">
          <el-input v-model="dialogForm.cateDesc" type="text" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取 消</el-button>
        <el-button type="primary" :loading="updateAble" @click="submitForm">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      ref="dialog"
      :visible="dialogCateVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择分类"
      @close="cateCannel"
    >
      <div>
        <el-table
          ref="multipleTable"
          :data="cateTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          highlight-current-row
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseCurrentRow"
        >
          <el-table-column prop="cateName" label="分类名称" />
          <el-table-column prop="cateCode" label="分类编码" />
        </el-table>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="catePage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="catePage.totalPage"
              @current-change="changeCatePage"
              @size-change="handleCateSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="cateCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="cateOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProductCategoryList,
    addProductCategory,
    editProductCategory,
    delProductCategory,
    getProductCategoryDetail,
  } from '@/api/basisfiles'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  import { isAll } from '@/utils/validate'
  export default {
    data() {
      var checkAll = (rule, value, cb) => {
        if (isAll(value)) {
          return cb()
        }
        cb(new Error('请输入合法的字符'))
      }
      return {
        updateAble: false,
        cateCodedisable: false,
        openCatedisable: false,
        hasChildren: true,
        dialogCateVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        dialogForm: {
          cateName: '',
          cateCode: '',
          parentName: '',
          status: '',
          cateDesc: '',
          parentRid: '',
          rid: '',
        },
        chooseIndex: '',
        chooseCateIndex: '',
        currentPage1: 1,
        tablelists: [],
        cateTableData: [],
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
        catePage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [
            {
              value: 'E',
              name: 'status',
            },
          ],
        },
        tempChoose: {
          cateName: '',
          parentRid: '',
          flag: false,
        },
        rules: {
          cateName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          cateCode: [
            { required: true, message: '请输入分类编码', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          status: [{ required: true, message: '请选择状态' }],
          cateDesc: [
            { min: 1, max: 200, message: '长度为1-200个字符', trigger: 'blur' },
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
      getCateDataList() {
        getProductCategoryList(this.catePage).then((res) => {
          this.cateTableData = res.data.list
          if (this.dialogFormEdit == 2) {
            this.cateTableData = this.filterCateDate(
              this.cateTableData,
              this.dialogForm.cateCode
            )
          }
          // this.cateTableData = checkChildren(this.cateTableData)
          this.catePage.totalPage = res.data.page.totalNumber
        })
      },
      filterCateDate(list, code) {
        if (list && list.length > 0) {
          list.forEach((item, index) => {
            if (list[index].children)
              this.filterCateDate(list[index].children, code)
            if (code == item.cateCode) {
              delete list[index]
            }
          })
        }
        return list
      },
      checkChildren(list) {
        if (list && list.length > 0) {
          list.forEach((item, index) => {
            if (item.children && item.children.length < 1) {
              delete list[index].children
            } else this.checkChildren(item.children)
          })
        }
        return list
      },
      openChooseCate() {
        this.getCateDataList()
        this.dialogCateVisible = true
      },
      chooseCurrentRow(row) {
        this.tempChoose.parentRid = row.rid
        this.tempChoose.cateName = row.cateName
        this.tempChoose.flag = true
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(rid) {
        getProductCategoryDetail({ rid }).then((res) => {
          this.dialogForm = Object.assign({}, res.data)
          this.dialogFormVisible = true
          this.cateCodedisable = true
          this.openCatedisable = true
          this.dialogFormEdit = 2
        })
      },
      cateCannel() {
        this.dialogCateVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      cateOk() {
        if (this.tempChoose.flag) {
          this.dialogForm.parentRid = this.tempChoose.parentRid
          this.dialogForm.parentName = this.tempChoose.cateName
          this.dialogCateVisible = false
          this.$refs.multipleTable.clearSelection()
          // this.tempChoose = this.$options.data().tempChoose
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      initDialog() {
        this.$refs['updataForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delProductCategory({ rid }).then((res) => {
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
        this.cateCodedisable = false
        this.openCatedisable = false
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
      changeCatePage(val) {
        this.catePage.page = val
        this.getCateDataList()
      },
      handleCateSizeChange(val) {
        this.catePage.pageSize = val
        this.getCateDataList()
      },
      submitForm() {
        this.updateAble = true
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addProductCategory(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '新增成功!',
                  })
                  this.webPage.page = 1
                  this.getDataList()
                  this.dialogFormVisible = false
                  this.initDialog()
                } else {
                  this.$message.error(res.message)
                }
                this.updateAble = false
              })
            } else {
              editProductCategory(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '修改成功!',
                  })
                  this.getDataList()
                  this.dialogFormVisible = false
                  this.initDialog()
                } else {
                  this.$message.error(res.message)
                }
                this.updateAble = false
              })
            }
            this.cateCodedisable = false
            this.openCatedisable = false
          } else {
            console.log('error submit!!')
            this.updateAble = false
            return false
          }
        })
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        // this.webPage.paramList = []
        getProductCategoryList(this.webPage).then((res) => {
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
      search() {
        this.webPage.page = 1
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
