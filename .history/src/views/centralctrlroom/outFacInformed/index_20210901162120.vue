<template>
  <div class="main">
    <el-form ref="querySearchForm" :inline="true" :model="form">
      <el-form-item label="物料名称">
        <el-input
          v-model.trim="form.pname.value"
          clearable
          placeholder="请输入物料名称"
        />
      </el-form-item>
      <el-form-item label="水泥品名">
        <el-select
          v-model="form.variety.value"
          clearable
          placeholder="请选择水泥品名"
          style="width: 100%"
        >
          <el-option
            v-for="item in belongCode.shuini_sort"
            :key="item.rid"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="水泥编号">
        <el-input
          v-model.trim="form.prodBatchNum.value"
          clearable
          placeholder="请输入水泥编号"
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
        <el-button
          v-permission="'audit'"
          type="primary"
          icon="el-icon-check"
          @click="openAuditStatus(1)"
        >
          审核
        </el-button>
        <el-button
          v-permission="'cancel_audit'"
          type="primary"
          icon="el-icon-close"
          @click="openAuditStatus(2)"
        >
          弃审
        </el-button>
        <el-button
          v-permission="'open'"
          type="primary"
          icon="el-icon-open"
          @click="open"
        >
          启用
        </el-button>
        <el-button
          v-permission="'close'"
          icon="el-icon-turn-off"
          type="primary"
          @click="close"
        >
          禁用
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
          lazy
          default-expand-all
          highlight-current-row
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="informNum"
            label="出厂通知单号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="variety"
            label="水泥品名"
            show-overflow-tooltip
          />
          <el-table-column
            prop="pname"
            label="物料名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="prodBatchNum"
            label="水泥编号"
            show-overflow-tooltip
          />
          <el-table-column prop="numOfYear" label="编号年份" />
          <el-table-column prop="issue" label="下达人" show-overflow-tooltip />
          <el-table-column prop="amount" label="出厂数量">
            <template slot-scope="scope">
              <span>
                {{ scope.row.amount + '吨' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="surplusAmount" label="剩余数量">
            <template slot-scope="scope">
              <span>
                {{ scope.row.surplusAmount + '吨' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="whName" label="存放地点" />
          <el-table-column prop="signTime" label="签发日期">
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestampYMD(new Date(scope.row.signTime)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="是否有效">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status ? '有效' : '无效' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="auditStatus" label="审核状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.auditStatus == 1 ? '审核' : '未审核' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button
                  v-permission="'edit'"
                  type="text"
                  @click="editDialog(scope.row)"
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
        <el-form-item label="物料名称" prop="pname">
          <el-input v-model="dialogForm.pname" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            @click="openChooseProduct"
          >
            <div style="width: 100%; height: 100%"></div>
          </el-button>
        </el-form-item>
        <el-form-item label="水泥品名" prop="variety">
          <el-input v-model="dialogForm.variety" type="text" disabled />
          <!-- <el-select
            v-model="dialogForm.variety"
            placeholder="请选择水泥品名"
            style="width: 100%"
          >
            <el-option
              v-for="item in belongCode.shuini_sort"
              :key="item.rid"
              :label="item.value"
              :value="item.value"
            />
          </el-select> -->
        </el-form-item>
        <el-form-item label="水泥编号" prop="prodBatchNum">
          <el-input
            v-model="dialogForm.prodBatchNum"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="存放地点" prop="whName">
          <el-input v-model="dialogForm.whName" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            @click="openChooseWare"
          >
            <div style="width: 100%; height: 100%"></div>
          </el-button>
        </el-form-item>
        <el-form-item label="下达人" prop="issue">
          <el-input v-model="dialogForm.issue" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号年份" prop="numOfYear">
          <el-input
            v-model="dialogForm.numOfYear"
            type="text"
            autocomplete="off"
            disabled
          />
        </el-form-item>
        <el-form-item label="出厂数量" prop="amount">
          <el-input
            v-model="dialogForm.amount"
            type="number"
            autocomplete="off"
          >
            <template slot="append">吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="签发日期" prop="signTime">
          <el-date-picker
            v-model="dialogForm.signTime"
            type="date"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="通知单状态" prop="status">
          <el-checkbox v-model="dialogForm.status">是否启用</el-checkbox>
        </el-form-item>
        <el-form-item label="备注" prop="cateDesc">
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
      :visible="dialogProductVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择物料名称"
      @close="productCannel"
    >
      <div>
        <el-table
          ref="productTable"
          :data="productTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          highlight-current-row
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseProductCurrentRow"
        >
          <el-table-column prop="pname" label="水泥名称" />
          <el-table-column prop="specification" label="物料规格" />
          <el-table-column prop="modelMaterial" label="型号材质" />
          <el-table-column prop="variety" label="水泥品名" />
          <el-table-column prop="cateName" label="所属分类" />
        </el-table>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="productPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="productPage.totalPage"
              @current-change="changeProductPage"
              @size-change="handleProductSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="productCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="productOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      ref="dialog"
      :visible="dialogWareVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择仓库区域"
      @close="wareCannel"
    >
      <div>
        <el-table
          ref="wareTable"
          :data="wareTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          highlight-current-row
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseWareCurrentRow"
        >
          <!-- <el-table-column prop="code" label="仓库编码" />
          <el-table-column prop="name" label="仓库名称" />
          <el-table-column prop="type" label="仓库类型" />
          <el-table-column prop="principal" label="负责人" /> -->
          <el-table-column prop="name" label="仓库名称" />
          <el-table-column prop="housecode" label="所属仓库" />
          <el-table-column prop="memo" label="描述" />
        </el-table>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="warePage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="warePage.totalPage"
              @current-change="changeWarePage"
              @size-change="handleWareSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="wareCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="wareOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getOutFacInformedList,
    addOutFacInformed,
    editOutFacInformed,
    delOutFacInformed,
    delOutFacInformedVaild,
    delOutFacInformedInVaild,
    closeOutFacInformed,
    openOutFacInformed,
  } from '@/api/outFacInformed'
  import { getProductList } from '@/api/basisfiles'
  import { getAreahouseList } from '@/api/areahouse'
  import { getListByTidAndBelongCode } from '@/api/digtal'
  import { thirteenBitTimestampYMD, thirteenBitTimestamp } from '@/utils/index'
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
        hasChildren: true,
        dialogProductVisible: false,
        dialogWareVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        dialogForm: {
          amount: '',
          informNum: '',
          issue: '',
          numOfYear: new Date().getFullYear(),
          pname: '',
          prodBatchNum: '',
          psn: '',
          remark: '',
          signTime: new Date(),
          variety: '',
          whCode: '',
          whName: '',
          status: false,
          strength: '',
          rid: '',
        },
        chooseIndex: '',
        chooseCateIndex: '',
        currentPage1: 1,
        tablelists: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [],
        },
        productTableData: [],
        productPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [
            {
              mark: 'like',
              name: 'status',
              value: 'E',
            },
          ],
        },
        wareTableData: [],
        warePage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [
            {
              mark: 'like',
              name: '',
              value: '',
            },
          ],
        },
        belongCode: {
          shuini_sort: [], //水泥品名
        },
        form: {
          pname: {
            value: '',
            mark: 'like',
          },
          variety: {
            value: '',
            mark: 'like',
          },
          prodBatchNum: {
            value: '',
            mark: 'like',
          },
        },
        tempChoose: {
          pname: '',
          psn: '',
          whCode: '',
          whName: '',
          variety: '',
          strength: '',
          pflag: false,
          wflag: false,
        },
        rules: {
          amount: [
            { required: true, message: '请输入出厂数量', trigger: 'blur' },
          ],
          prodBatchNum: [
            { required: true, message: '请输入水泥编号', trigger: 'blur' },
          ],
          // status: [{ required: true, message: '请选择状态' }],
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
      // this.dialogForm.numOfYear = new Date().getFullYear()
      this.getDataType('shuini_sort', 'SHUINI_SORT')
    },
    methods: {
      thirteenBitTimestampYMD,
      thirteenBitTimestamp,
      open() {
        if (this.chooseIndex) {
          openOutFacInformed({ rid: this.chooseIndex }).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: 'success',
                message: res.message,
              })
              this.getDataList()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      close() {
        if (this.chooseIndex) {
          closeOutFacInformed({ rid: this.chooseIndex }).then((res) => {
            if (res.status == 0) {
              this.$message({
                type: 'success',
                message: res.message,
              })
              this.getDataList()
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      openChooseProduct() {
        this.getProductsList()
        this.dialogProductVisible = true
      },
      openAuditStatus(val) {
        if (this.chooseIndex) {
          if (val == 1) {
            delOutFacInformedVaild({ rid: this.chooseIndex }).then((res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: '审核成功!',
                })
                this.getDataList()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            delOutFacInformedInVaild({ rid: this.chooseIndex }).then((res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: '弃审成功!',
                })
                this.getDataList()
              } else {
                this.$message.error(res.message)
              }
            })
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
      getProductsList() {
        getProductList(this.productPage).then((res) => {
          this.productTableData = res.data.list
          this.productPage.totalPage = res.data.page.totalNumber
        })
      },
      chooseProductCurrentRow(row) {
        this.tempChoose.pname = row.pname
        this.tempChoose.psn = row.psn
        this.tempChoose.variety = row.variety
        this.tempChoose.strength = row.strength
        this.tempChoose.pflag = true
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(row) {
        this.dialogForm = Object.assign({}, row)
        this.dialogFormEdit = 2
        this.dialogFormVisible = true
      },
      productCannel() {
        this.dialogProductVisible = false
        this.$refs.productTable.clearSelection()
      },
      productOk() {
        if (this.tempChoose.pflag) {
          this.dialogForm.pname = this.tempChoose.pname
          this.dialogForm.psn = this.tempChoose.psn
          this.dialogForm.variety = this.tempChoose.variety
          this.dialogForm.strength = this.tempChoose.strength
          this.dialogProductVisible = false
          this.$refs.productTable.clearSelection()
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
      openChooseWare() {
        this.getWareDataList()
        this.dialogWareVisible = true
      },
      getWareDataList() {
        getAreahouseList(this.warePage).then((res) => {
          this.wareTableData = res.data.list
          this.warePage.totalPage = res.data.page.totalNumber
        })
      },
      wareCannel() {
        this.dialogWareVisible = false
        this.$refs.wareTable.clearSelection()
      },
      wareOk() {
        if (this.tempChoose.wflag) {
          this.dialogForm.whName = this.tempChoose.whName
          this.dialogForm.whCode = this.tempChoose.whCode
          this.dialogWareVisible = false
          this.$refs.wareTable.clearSelection()
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      chooseWareCurrentRow(row) {
        this.tempChoose.whCode = row.code
        this.tempChoose.whName = row.name
        this.tempChoose.wflag = true
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
            delOutFacInformed({ rid }).then((res) => {
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
      handleSizeChange(val) {
        this.webPage.pageSize = val
        this.getDataList()
      },
      handleCurrentChange(val) {
        this.chooseIndex = val.rid
      },
      changeWarePage(val) {
        this.warePage.page = val
        this.getWareDataList()
      },
      handleWareSizeChange(val) {
        this.warePage.pageSize = val
        this.getWareDataList()
      },
      changeProductPage(val) {
        this.productPage.page = val
        this.getProductDataList()
      },
      handleProductSizeChange(val) {
        this.productPage.pageSize = val
        this.getProductDataList()
      },
      submitForm() {
        this.updateAble = true
        this.dialogForm.status = this.dialogForm.status ? 'E' : 'N'
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addOutFacInformed(this.dialogForm).then((res) => {
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
              editOutFacInformed(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!',
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
        this.webPage.paramList = []
        Object.keys(this.form).forEach((element) => {
          this.webPage.paramList.push({
            name: element,
            value: this.form[element].value || null,
            mark: this.form[element].mark,
          })
        })
        getOutFacInformedList(this.webPage).then((res) => {
          if (res.status == '0') {
            this.tablelists = res.data.list
            this.tablelists.forEach((item, index) => {
              item.status = item.status === 'E' ? true : false
            })
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
        this.form.pname.value = null
        this.form.variety.value = null
        this.form.prodBatchNum.value = null
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
