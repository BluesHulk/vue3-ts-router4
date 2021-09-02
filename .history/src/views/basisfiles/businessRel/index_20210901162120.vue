<template>
  <div class="main">
    <el-form ref="businessSearchForm" :inline="true" :model="form">
      <el-form-item label="客商名称">
        <el-input
          v-model="form.relCoName"
          clearable
          autocomplete="off"
          placeholder="请输入客商名称"
        />
      </el-form-item>
      <el-form-item label="客商编码">
        <el-input
          v-model="form.customCoCode"
          clearable
          autocomplete="off"
          placeholder="请输入客商编码"
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
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="customCoCode" label="客商编码" />
          <el-table-column prop="relCoName" label="客商名称" />
          <el-table-column prop="type" label="单位类别">
            <template slot-scope="scope">
              <span>
                {{ typeList.find((val) => val.id == scope.row.type).name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createPerson" label="创建人" />
          <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestamp(new Date(scope.row.createTime)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="是否有效">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status == 'E' ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
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
        <el-form-item label="企业名称" prop="coName">
          <el-input v-model="dialogForm.coName" :disabled="nameAble" />
        </el-form-item>
        <el-form-item label="客户自定义编码" prop="customCoCode">
          <el-input
            v-model="dialogForm.customCoCode"
            autocomplete="off"
            :disabled="codeAble"
          />
        </el-form-item>
        <el-form-item label="营业执照编号" prop="licenseNo">
          <el-input
            v-model="dialogForm.licenseNo"
            autocomplete="off"
            :disabled="licenseNoAble"
          />
        </el-form-item>
        <el-form-item label="所属区域" prop="areaName">
          <el-input v-model="dialogForm.areaName" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            @click="openChooseArea"
          >
            <div style="width: 100%; height: 100%"></div>
          </el-button>
        </el-form-item>
        <!-- <el-form-item label="区域编码" prop="areaCode">
          <el-input v-model="dialogForm.areaCode" autocomplete="off" disabled />
        </el-form-item> -->
        <el-form-item label="业务关系" prop="type">
          <el-select
            v-model="dialogForm.type"
            placeholder="请选择业务关系"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
            <!-- <el-option label="客户" value="1" />
            <el-option label="供应商" value="2" />
            <el-option label="承运商" value="3" />
            <el-option label="经销商" value="4" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="dialogForm.contacts" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="dialogForm.contactPhone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="dialogForm.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="dialogForm.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="dialogForm.status"
            placeholder="请选择状态"
            style="width: 100%"
          >
            <el-option label="正常" value="E" />
            <el-option label="禁用" value="N" />
          </el-select>
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
      :visible="dialogAreaVisible"
      :close-on-click-modal="false"
      width="680px"
      title="选择区域"
      @close="areaCannel"
    >
      <div>
        <el-table
          ref="multipleTable"
          :data="areaTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          highlight-current-row
          max-height="400"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseCurrentRow"
        >
          <el-table-column prop="name" label="区域名称" />
          <el-table-column prop="code" label="区域编码" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="areaCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="areaOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!--detail ref="detail" /-->
  </div>
</template>

<script>
  import {
    getBusinessRelList,
    addBusinessRel,
    editBusinessRel,
    delBusinessRel,
    getSaleAreaList,
    getBusinessRelDetail,
  } from '@/api/basisfiles'
  import { thirteenBitTimestamp } from '@/utils/index'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  import { isPhone, isAll, isTel } from '@/utils/validate'
  // import detail from './components/detail.vue'
  export default {
    // components: { detail },
    data() {
      var checkPhone = (rule, value, cb) => {
        if (!value) {
          return cb()
        }
        if (isPhone(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }
      var checkAll = (rule, value, cb) => {
        if (isAll(value)) {
          return cb()
        }
        cb(new Error('请输入合法的字符'))
      }
      var checkTel = (rule, value, cb) => {
        if (!value) {
          return cb()
        }
        if (isTel(value)) {
          return cb()
        }
        cb(new Error('请输入合法的电话'))
      }
      return {
        updateAble: false,
        licenseNoAble: false,
        codeAble: false,
        nameAble: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        dialogAreaVisible: false,
        chooseAreaIndex: '',
        areaTableData: [],
        queryForm: {
          cateName: '',
          cateRid: '',
        },
        dialogForm: {
          address: '',
          areaCode: '',
          areaName: '',
          coName: '',
          licenseNo: '',
          mobile: '',
          contactPhone: '',
          contacts: '',
          customCoCode: '',
          rid: '',
          status: '',
          type: 1,
        },
        chooseIndex: '',
        currentPage1: 1,
        tablelists: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {},
        },
        typeList: [
          {
            name: '客户',
            id: 1,
          },
          {
            name: '供应商',
            id: 2,
          },
          {
            name: '承运商',
            id: 3,
          },
          {
            name: '经销商',
            id: 4,
          },
        ],
        // form: {
        //   relCoName: {
        //     value: '',
        //     mark: 'like',
        //   },
        //   relCoCode: {
        //     value: '',
        //     mark: 'like',
        //   },
        // },
        form: {
          relCoName: '',
          customCoCode: '',
        },
        tempChoose: {
          name: '',
          code: '',
          rid: '',
        },
        rules: {
          address: [
            { min: 1, max: 200, message: '长度为1-200个字符', trigger: 'blur' },
          ],
          areaCode: [
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          areaName: [
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          coName: [
            { required: true, message: '请输入企业名称' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          licenseNo: [
            { required: true, message: '请输入营业执照编号' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          mobile: [{ validator: checkPhone, trigger: 'blur' }],
          contactPhone: [{ validator: checkTel, trigger: 'blur' }],
          contacts: [
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          customCoCode: [
            { required: true, message: '请输入客户自定义编码' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          status: [{ required: true, message: '请选择状态' }],
          type: [{ required: true, message: '请选择业务关系' }],
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
      thirteenBitTimestamp,
      openChooseArea() {
        getSaleAreaList().then((res) => {
          this.areaTableData = res.data
        })
        this.dialogAreaVisible = true
      },
      chooseCurrentRow(row) {
        this.tempChoose.name = row.name
        this.tempChoose.code = row.code
        this.tempChoose.rid = row.rid
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      // openDialog1() {
      //   if (this.chooseIndex) {
      //     getBusinessRelDetail({ rid: this.chooseIndex }).then((res) => {
      //       this.$refs.detail.dialogForm = Object.assign({}, res.data)
      //       this.$set(
      //         this.$refs.detail.dialogForm,
      //         'coName',
      //         res.data.relCoName
      //       )
      //       this.$refs.detail.dialogFormVisible = true
      //     })
      //   } else {
      //     this.$baseMessage(
      //       '未选中任何行',
      //       'error',
      //       false,
      //       'vab-hey-message-error'
      //     )
      //   }
      //   this.chooseIndex = ''
      // },
      editDialog(rid) {
        getBusinessRelDetail({ rid }).then((res) => {
          this.dialogForm = Object.assign({}, res.data)
          this.$set(this.dialogForm, 'coName', res.data.relCoName)
          if (res.data.relCoStatus != 'C') {
            this.nameAble = true
          }
          this.dialogFormVisible = true
          this.licenseNoAble = true
          this.codeAble = true
          this.dialogFormEdit = 2
        })
      },
      initDialog() {
        this.$refs['updataForm'].resetFields()
        this.licenseNoAble = false
        this.codeAble = false
        this.nameAble = false
        this.dialogForm = this.$options.data().dialogForm
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delBusinessRel({ rid }).then((res) => {
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
        this.updateAble = true
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addBusinessRel(this.dialogForm).then((res) => {
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
              delete this.dialogForm.cid
              editBusinessRel(this.dialogForm).then((res) => {
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
            this.updateAble = false
            console.log('error submit!!')
            return false
          }
        })
      },
      areaCannel() {
        this.dialogAreaVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      areaOk() {
        this.dialogForm.areaName = this.tempChoose.name
        this.dialogForm.areaCode = this.tempChoose.code
        this.dialogAreaVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        // this.webPage.paramList = []
        // Object.keys(this.form).forEach((element) => {
        //   this.webPage.paramList.push({
        //     name: element,
        //     value: this.form[element].value || null,
        //     mark: this.form[element].mark,
        //   })
        // })
        this.webPage.param = {}
        Object.keys(this.form).forEach((element) => {
          if (this.form[element]) {
            this.webPage.param[element] = this.form[element]
          }
        })
        getBusinessRelList(this.webPage).then((res) => {
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
      reset() {
        this.form.relCoName = null
        this.form.customCoCode = null
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
