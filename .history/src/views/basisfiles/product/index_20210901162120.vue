<template>
  <div class="main">
    <el-form ref="productSearchForm" :inline="true" :model="form">
      <el-form-item label="物料名称">
        <el-input
          v-model.trim="form.pname.value"
          clearable
          placeholder="请输入物料名称"
        />
      </el-form-item>
      <el-form-item label="物料编码">
        <el-input
          v-model.trim="form.psn.value"
          clearable
          placeholder="请输入物料编码"
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
          :tree-props="{ children: 'children' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="psn" label="物料编码" />
          <el-table-column prop="pname" label="物料名称" />
          <el-table-column prop="specification" label="物料规格" />
          <el-table-column prop="modelMaterial" label="型号材质" />
          <el-table-column prop="cateName" label="所属分类" />
          <el-table-column prop="mainUnitName" label="计量单位" />
          <el-table-column prop="createPerson" label="创建人" />
          <el-table-column prop="createTime" label="创建时间" width="180px">
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
                  @click="editDialog(scope)"
                >
                  编辑
                </el-button>
                <el-button
                  v-permission="'del'"
                  type="text"
                  @click="delDialog(scope.row.pid)"
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
        ref="productForm"
        :model="dialogForm"
        label-width="130px"
        style="width: 500px; margin: 0 auto"
        :rules="rules"
      >
        <el-form-item label="所属分类:" prop="cateName">
          <el-input v-model="dialogForm.cateName" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            @click="openChooseCate"
          >
            <div style="width: 100%; height: 100%"></div>
          </el-button>
        </el-form-item>
        <el-form-item v-if="dialogFormEdit !== 1" label="物料名称" prop="pname">
          <el-input
            v-model.trim="dialogForm.pname"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item v-if="dialogFormEdit === 1" label="物料名称" prop="pname">
          <el-autocomplete
            v-model="dialogForm.pname"
            :fetch-suggestions="querySearch"
            placeholder=""
            style="width: 100%"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="name">{{ item.pname }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="物料编码" prop="psn">
          <el-input
            v-model.trim="dialogForm.psn"
            type="text"
            autocomplete="off"
            :disabled="psndisable"
          />
        </el-form-item>
        <el-form-item label="物料规格" prop="specification">
          <el-input
            v-model.trim="dialogForm.specification"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="型号材质" prop="modelMaterial">
          <el-input
            v-model.trim="dialogForm.modelMaterial"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="计量单位" prop="mainUnitName">
          <el-select
            v-model.trim="dialogForm.mainUnitName"
            placeholder="请选择计量单位"
            style="width: 100%"
            @change="unitChange"
          >
            <el-option
              v-for="item in productUnit"
              :key="item.rid"
              :label="item.unitName"
              :value="item.unitCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="水泥强度" prop="strength">
          <el-select
            v-model.trim="dialogForm.strength"
            clearable
            placeholder="请选择水泥强度"
            style="width: 100%"
            @change="strengthChange"
          >
            <el-option
              v-for="item in belongCode.shuini_strength"
              :key="item.rid"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="水泥品名" prop="variety">
          <el-select
            v-model.trim="dialogForm.variety"
            clearable
            placeholder="请选择水泥品名"
            style="width: 100%"
            @change="varietyChange"
          >
            <el-option
              v-for="item in belongCode.shuini_variety"
              :key="item.rid"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效" prop="status">
          <el-select
            v-model.trim="dialogForm.status"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="是" value="E" />
            <el-option label="否" value="N" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="pdesc">
          <el-input
            v-model.trim="dialogForm.pdesc"
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
    getProductList,
    addProduct,
    editProduct,
    delProduct,
    getProductUnitList,
    getProductListByPlatform,
  } from '@/api/basisfiles'
  import { getListByTidAndBelongCode } from '@/api/digtal'
  import { thirteenBitTimestamp } from '@/utils/index'
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
        psndisable: false,
        dialogFormVisible: false,
        dialogCateVisible: false,
        dialogFormEdit: 1,
        productUnit: [],
        selloading: false,
        option: [],
        dialogForm: {
          cateName: '',
          cateRid: '',
          pname: '',
          psn: '',
          specification: '',
          modelMaterial: '',
          mainUnitName: '',
          mainUnitCode: '',
          status: '',
          psource: 2, //1为平台端，2为企业端
          pdesc: '',
          pid: '',
        },
        belongCode: {
          shuini_variety: [], //品种
          shuini_strength: [], //强度
        },
        chooseIndex: '',
        currentPage1: 1,
        tablelists: [],
        cateTableData: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: 'operateTime',
          paramList: [],
        },
        catePage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: 'operateTime',
          paramList: [
            {
              value: 'E',
              name: 'status',
            },
          ],
        },
        form: {
          pname: {
            value: '',
            mark: 'like',
          },
          psn: {
            value: '',
            mark: 'like',
          },
        },
        tempChoose: {
          cateName: '',
          parentRid: '',
        },
        rules: {
          cateRid: [
            { required: true, message: '请输入分类id', trigger: 'blur' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          mainUnitCode: [
            { required: true, message: '请输入计量单位编码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          mainUnitName: [
            { required: true, message: '请输入计量单位名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度为1-20个字符', trigger: 'blur' },
          ],
          modelMaterial: [
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          pdesc: [
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          specification: [
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          cateName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          pname: [
            { required: true, message: '请输入物料名称', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          psn: [
            { required: true, message: '请输入物料编码', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          status: [{ required: true, message: '请选择状态' }],
        },
        productByPlatformList: [],
        c: [],
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
      }),
    },
    mounted() {
      this.getDataList()
      getProductUnitList().then((res) => {
        if (res.status == 0) {
          this.productUnit = res.data
        }
      })
      // shuini_variety
      // shuini_strength
      this.getDataType('shuini_variety', 'SHUINI_SORT')
      this.getDataType('shuini_strength', 'SHUINI_STRENGTH')
    },
    methods: {
      thirteenBitTimestamp,
      querySearch(queryString, cb) {
        delete this.dialogForm.platformPname
        delete this.dialogForm.platformPsn
        var results = queryString
          ? this.productByPlatformList.filter(this.createFilter(queryString))
          : this.c
        cb(results)
      },
      getProductListByPlatform() {
        getProductListByPlatform().then((res) => {
          this.productByPlatformList = res.data
        })
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (
            restaurant.pname.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1
          )
        }
      },
      handleSelect(item) {
        this.dialogForm.pname = item.pname
        this.dialogForm.platformPname = item.pname
        this.dialogForm.platformPsn = item.psn
      },
      getCateDataList() {
        getProductCategoryList(this.catePage).then((res) => {
          this.cateTableData = res.data.list
          this.catePage.totalPage = res.data.page.totalNumber
        })
      },
      openChooseCate() {
        this.getCateDataList()
        this.dialogCateVisible = true
      },
      chooseCurrentRow(row) {
        this.tempChoose.parentRid = row.rid
        this.tempChoose.cateName = row.cateName
      },
      unitChange(row) {
        const unit = this.productUnit.find((item) => item.unitCode === row)
        this.dialogForm.mainUnitCode = row
        this.dialogForm.mainUnitName = unit.unitName
      },
      strengthChange(row) {
        console.log(row)
      },
      varietyChange(row) {
        console.log(row)
      },
      openDialog() {
        getProductUnitList().then((res) => {
          this.productUnit = res.data
        })
        this.dialogFormVisible = true
        this.getProductListByPlatform()
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.psndisable = true
        this.dialogFormEdit = 2
      },
      cateCannel() {
        this.dialogCateVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      cateOk() {
        this.dialogForm.cateRid = this.tempChoose.parentRid
        this.dialogForm.cateName = this.tempChoose.cateName
        this.dialogCateVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      initDialog() {
        this.$refs['productForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
      },
      delDialog(pid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delProduct({ pid }).then((res) => {
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
        this.psndisable = false
        this.initDialog()
      },
      handleCurrentChange(val) {
        this.chooseIndex = val.rid
      },
      changePage(val) {
        this.webPage.page = val
        this.getDataList()
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
        this.$refs['productForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addProduct(this.dialogForm).then((res) => {
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
              editProduct(this.dialogForm).then((res) => {
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
            this.psndisable = false
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
        getProductList(this.webPage).then((res) => {
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
        this.form.pname.value = null
        this.form.psn.value = null
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
