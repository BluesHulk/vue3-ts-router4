<template>
  <div class="main">
    <!-- <el-form ref="addressSearchForm" :inline="true" :model="form">
      <el-row>
        <el-col :span="22">
          <el-row>
            <el-col :span="4">
              <el-form-item label="">
                <el-input
                  v-model="form.coName"
                  clearable
                  autocomplete="off"
                  placeholder="请输入企业名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <el-input
                  v-model="form.coCode"
                  clearable
                  autocomplete="off"
                  placeholder="请输入企业名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="">
                <el-select
                  v-model="form.status"
                  clearable
                  placeholder="请选择状态"
                >
                  <el-option label="已验证" value="V" />
                  <el-option label="未验证" value="C" />
                  <el-option label="已注销" value="N" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="search">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form> -->
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
          max-height="600"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="coName"
            label="单位名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="alias"
            label="简称"
            width="150px"
            show-overflow-tooltip
          />
          <el-table-column prop="typeName" label="地址类型" width="100px" />
          <el-table-column
            prop="address"
            label="详细地址"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.regionName + scope.row.address }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
            width="120px"
            show-overflow-tooltip
          />
          <el-table-column
            prop="phone"
            label="联系电话"
            width="150px"
            show-overflow-tooltip
          />
          <el-table-column prop="status" label="状态" width="100px">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status == 'E' ? '正常' : '禁用' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
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
        ref="updataForm"
        :model="dialogForm"
        label-width="130px"
        style="width: 500px; margin: 0 auto"
        :rules="rules"
      >
        <el-form-item label="简称" prop="alias">
          <el-input v-model="dialogForm.alias" autocomplete="off" />
        </el-form-item>
        <el-form-item label="单位:" prop="coName">
          <el-input v-model="dialogForm.coName" type="text" disabled />
          <el-button
            class="item-btn"
            icon="el-icon-search"
            @click="openChooseCom"
          >
            <div style="width: 100%; height: 100%"></div>
          </el-button>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="dialogForm.contacts" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系手机号" prop="phone">
          <el-input v-model="dialogForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址类型" prop="typeCode">
          <el-select
            v-model="dialogForm.typeCode"
            placeholder="请选择地址类型"
            style="width: 100%"
            @change="typeCodeChange"
          >
            <el-option
              v-for="item in belongCode.typeCode"
              :key="item.rid"
              :label="item.value"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="regionid">
          <el-row>
            <el-col :span="18">
              <el-input
                v-model="dialogForm.regionName"
                placeholder="请选择地址"
                autocomplete="off"
                readonly
                clearable
              />
            </el-col>
            <el-col :span="5" :offset="1">
              <el-popover
                v-model="areaVisible"
                placement="bottom-end"
                width="400"
                trigger="manual"
              >
                <el-button
                  class="closeArea"
                  icon="el-icon-close"
                  circle
                  @click="areaVisible = !areaVisible"
                />
                <el-tabs v-model="activeName">
                  <el-tab-pane label="省份" name="province">
                    <el-button
                      v-for="item in add.province"
                      :key="item.regionid"
                      class="btnslist"
                      @click="changeProvince(item.regionid, item.name)"
                    >
                      {{ item.name }}
                    </el-button>
                  </el-tab-pane>
                  <el-tab-pane label="城市" name="city">
                    <el-button
                      v-for="item in add.city"
                      :key="item.regionid"
                      class="btnslist"
                      @click="changeCity(item.regionid, item.name)"
                    >
                      {{ item.name }}
                    </el-button>
                  </el-tab-pane>
                  <el-tab-pane label="区县" name="area">
                    <el-button
                      v-for="item in add.area"
                      :key="item.regionid"
                      class="btnslist"
                      @click="changeArea(item.regionid, item.name)"
                    >
                      {{ item.name }}
                    </el-button>
                  </el-tab-pane>
                </el-tabs>
                <el-button
                  slot="reference"
                  class="areabtn"
                  @click="areaVisible = !areaVisible"
                >
                  地区选择
                </el-button>
              </el-popover>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
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
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      ref="dialog"
      :visible="dialogComVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择单位"
      @close="comCannel"
    >
      <div>
        <el-row>
          <el-col>
            <el-table
              ref="multipleTable"
              :data="comTableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="rid"
              border
              highlight-current-row
              default-expand-all
              :tree-props="{ children: 'children' }"
              @row-click="chooseCurrentRow"
            >
              <el-table-column
                prop="coName"
                label="单位名称"
                show-overflow-tooltip
              />
              <el-table-column prop="customCoCode" label="单位编码" />
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="comPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="comPage.totalPage"
              @current-change="changeComPage"
              @size-change="handleComSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="comCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="comOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getSendconsAddrList,
    addSendconsAddr,
    editSendconsAddr,
    delSendconsAddr,
    getListRegion,
  } from '@/api/basisfiles'
  import { getCompanyListBySendcons } from '@/api/company'
  import { getListByTidAndBelongCode } from '@/api/digtal'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  import { isPhone, isAll } from '@/utils/validate'
  export default {
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
      return {
        hasChildren: true,
        areaVisible: false,
        dialogFormVisible: false,
        dialogComVisible: false,
        dialogFormEdit: 1,
        dialogForm: {
          alias: '',
          regionid: '',
          coName: '',
          coCode: '',
          contacts: '',
          phone: '',
          regionName: '',
          typeCode: '',
          typeName: '',
          address: '',
          status: '',
          rid: '',
        },
        chooseIndex: '',
        currentPage1: 1,
        tablelists: [],
        add: {
          province: [],
          city: [],
          area: [],
        },
        provinceName: '',
        cityName: '',
        areaName: '',
        belongCode: {
          typeCode: [], //地址类型集合
        },
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [],
        },
        comTableData: [],
        comPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {
            type: 1,
          },
        },
        tempChoose: {
          coName: '',
          coCode: '',
        },
        activeName: 'province',
        rules: {
          alias: [
            { required: true, message: '请输入简称', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur' },
          ],
          coName: [{ required: true, message: '请选择单位', trigger: 'blur' }],
          phone: [{ validator: checkPhone, trigger: 'blur' }],
          typeCode: [
            { min: 1, max: 30, message: '长度为1-30个字符', trigger: 'blur' },
          ],
          contacts: [
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          typeName: [
            { min: 1, max: 100, message: '长度为1-100个字符', trigger: 'blur' },
          ],
          regionid: [
            { required: true, message: '请选择地址', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
          status: [{ required: true, message: '请选择状态' }],
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
      this.getDataType('typeCode', 'SENDCONS_ADDR_TYPE')
      getListRegion({ layer: 1 }).then((res) => {
        this.add.province = res.data
      })
    },
    methods: {
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      changeProvince(val, name) {
        this.add.city = []
        this.add.area = []
        this.dialogForm.regionid = ''
        this.provinceName = name
        getListRegion({ layer: 2, regionId: val }).then((res) => {
          this.add.city = res.data
          this.activeName = 'city'
        })
        this.dialogForm.regionName = `${this.provinceName}`
      },
      changeCity(val, name) {
        this.add.area = []
        this.dialogForm.regionid = ''
        this.cityName = name
        getListRegion({ layer: 3, regionId: val }).then((res) => {
          this.add.area = res.data
          this.activeName = 'area'
        })
        this.dialogForm.regionName = `${this.provinceName}-${this.cityName}`
      },
      changeArea(val, name) {
        this.dialogForm.regionid = val
        this.areaName = name
        this.dialogForm.regionName = `${this.provinceName}-${this.cityName}-${this.areaName}`
        this.areaVisible = false
      },
      typeCodeChange(row) {
        const tCode = this.belongCode.typeCode.find((item) => item.code === row)
        this.dialogForm.typeCode = row
        this.dialogForm.typeName = tCode.value
      },
      editDialog(record) {
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.dialogFormEdit = 2
      },
      initDialog() {
        this.add.city = []
        this.add.area = []
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
            delSendconsAddr({ rid }).then((res) => {
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
      change(status) {
        const message =
          status === 'C' ? '取消验证' : status === 'V' ? '验证' : '激活'
        this.$confirm(`你确定要${message}当前企业吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '操作成功!',
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
          })
      },
      closeDialogForm() {
        this.dialogFormVisible = false
        this.areaVisible = false
        this.initDialog()
      },
      changePage(val) {
        this.webPage.page = val
        this.getDataList()
      },
      changeComPage(val) {
        this.comPage.page = val
        this.getComDataList()
      },
      handleCurrentChange(val) {
        this.chooseIndex = val.rid
      },
      openChooseCom() {
        this.getComDataList()
        this.dialogComVisible = true
      },
      getComDataList() {
        getCompanyListBySendcons(this.comPage).then((res) => {
          if (res.status == 0) {
            this.comTableData = res.data.list
            if (res.data.entity) {
              this.comTableData.push(res.data.entity)
            }
            this.comPage.totalPage = res.data.page.totalNumber
          }
        })
      },
      comCannel() {
        this.dialogComVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      comOk() {
        this.dialogForm.coCode = this.tempChoose.coCode
        this.dialogForm.coName = this.tempChoose.coName
        this.dialogComVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      chooseCurrentRow(row) {
        this.tempChoose.coCode = row.coCode
        this.tempChoose.coName = row.coName
      },
      submitForm() {
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addSendconsAddr(this.dialogForm).then((res) => {
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
              editSendconsAddr(this.dialogForm).then((res) => {
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
            this.activeName = 'province'
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        getSendconsAddrList(this.webPage).then((res) => {
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
      handleSizeChange(val) {
        this.webPage.pageSize = val
        this.getDataList()
      },
      handleComSizeChange(val) {
        this.comPage.pageSize = val
        this.getComDataList()
      },
      search() {
        this.webPage.page = 1
        this.getDataList()
      },
      getDataType(val, code) {
        getListByTidAndBelongCode({
          code: code,
        }).then((res) => {
          console.log(res)
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
  .areabtn {
    width: 100%;
    color: #fff;
    background: #188af3;
  }
  .btnslist {
    width: 23%;
    margin-bottom: 5px;
    margin-left: 5px;
    overflow: hidden;
  }
  .closeArea {
    position: absolute;
    right: 20px;
    z-index: 2001;
  }
</style>
