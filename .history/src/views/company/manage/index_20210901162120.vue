<template>
  <div class="main">
    <el-form ref="companySearchForm" :inline="true" :model="form">
      <el-form-item label="企业名称">
        <el-input
          v-model.trim="form.coName.value"
          clearable
          autocomplete="off"
          placeholder="请输入企业名称"
        />
      </el-form-item>
      <el-form-item label="企业编码">
        <el-input
          v-model.trim="form.coCode.value"
          clearable
          autocomplete="off"
          placeholder="请输入企业编码"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model.trim="form.status.value"
          clearable
          placeholder="请选择状态"
        >
          <el-option label="已验证" value="V" />
          <el-option label="未验证" value="C" />
          <el-option label="已注销" value="N" />
        </el-select>
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
        <el-button type="primary" icon="el-icon-plus" @click="openDialog">
          新增
        </el-button>
        <!--el-button type="primary" icon="el-icon-plus" @click="sysDialog">
          绑定系统
        </--el-button-->
        <el-button type="primary" icon="el-icon-plus" @click="sysDialog1">
          分配系统
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="menuDialog">
          分配菜单
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="dictDialog">
          分配数据字典
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          ref="table"
          :data="tablelists"
          row-key="rid"
          border
          max-height="600"
          highlight-current-row
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="changeList"
        >
          <el-table-column prop="coCode" label="企业编码" />
          <el-table-column
            prop="coName"
            label="企业名称"
            show-overflow-tooltip
          />
          <el-table-column prop="licenseNo" label="营业执照编号" />
          <el-table-column prop="contacts" label="联系人" />
          <el-table-column prop="mobile" label="联系电话" />
          <el-table-column prop="coType" label="类型" />
          <el-table-column prop="status" label="是否有计量系统">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.isCalculate == '1' ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" width="80" label="状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{
                  scope.row.status == 'V'
                    ? '已验证'
                    : scope.row.status == 'C'
                    ? '未验证'
                    : '已注销'
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button type="text" @click="editDialog(scope)">
                  编辑
                </el-button>
                <el-button type="text" @click="delDialog(scope.row.rid)">
                  删除
                </el-button>
                <el-button
                  v-if="scope.row.status === 'V'"
                  type="text"
                  @click="change(scope.row.rid, 'C', '取消验证')"
                >
                  取消验证
                </el-button>
                <el-button
                  v-if="scope.row.status === 'C'"
                  type="text"
                  @click="change(scope.row.rid, 'V', '验证')"
                >
                  验证
                </el-button>
                <el-button
                  v-if="scope.row.status === 'C'"
                  type="text"
                  @click="change(scope.row.rid, 'N', '注销')"
                >
                  注销
                </el-button>
                <el-button
                  v-if="scope.row.status === 'N'"
                  type="text"
                  @click="change(scope.row.rid, 'C', '激活')"
                >
                  激活
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
      width="680px"
      :close-on-click-modal="false"
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
          <el-input
            v-model.trim="dialogForm.coName"
            type="text"
            autocomplete="off"
            :disabled="disCoName"
          />
        </el-form-item>
        <el-form-item label="营业执照编号" prop="licenseNo">
          <el-input
            v-model.trim="dialogForm.licenseNo"
            autocomplete="off"
            :disabled="disLicenseNo"
          />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input
            v-model.trim="dialogForm.contacts"
            autocomplete="off"
            :disabled="disContacts"
          />
        </el-form-item>
        <el-form-item label="联系手机号" prop="mobile">
          <el-input
            v-model.trim="dialogForm.mobile"
            type="text"
            autocomplete="off"
            :disabled="disMobile"
          />
        </el-form-item>
        <el-form-item label="类型" prop="coType">
          <el-select
            v-model.trim="dialogForm.coType"
            placeholder="请选择类型"
            :disabled="disCoType"
            style="width: 100%"
          >
            <el-option
              v-for="item in belongCode.coType"
              :key="item.rid"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否有计量系统" prop="isCalculate">
          <el-select
            v-model.trim="dialogForm.isCalculate"
            placeholder="请选择是否有计量系统"
            style="width: 100%"
          >
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="绑定系统"
      :visible.sync="dialogSystemVisible"
      width="780px"
      :close-on-click-modal="false"
      @close="closeDialogSysForm"
    >
      <el-row :gutter="10">
        <el-col :span="6">
          <el-table
            ref="sysTable"
            :data="sysTableLists"
            row-key="rid"
            height="241"
            border
            highlight-current-row
            :tree-props="{ children: 'children1', hasChildren: 'hasChildren' }"
            @row-click="handleSysTableChange"
          >
            <el-table-column prop="name" label="平台名称" />
          </el-table>
        </el-col>
        <el-col :span="18">
          <el-table
            ref="sysChildsTable"
            :data="sysChildsTableLists"
            row-key="rid"
            height="241"
            border
            highlight-current-row
            :tree-props="{ children: 'children1', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="code" label="系统编码" />
            <el-table-column prop="name" label="系统名称" />
            <el-table-column prop="name" label="系统版本" />
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <span>
                  <el-button type="text" @click="addSysDialog(scope.row)">
                    添加
                  </el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-divider content-position="left">已选中系统</el-divider>
      <el-row :gutter="24">
        <el-col>
          <el-table
            :data="sysUpdataTableLists"
            row-key="rid"
            height="201"
            border
            highlight-current-row
            :tree-props="{ children: 'children1', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="code" label="系统编码" />
            <el-table-column prop="name" label="系统名称" />
            <el-table-column prop="name" label="系统版本" />
            <el-table-column label="操作" width="70">
              <template slot-scope="scope">
                <span>
                  <el-button type="text" @click="delSysDialog(scope.row)">
                    移除
                  </el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogSysForm">取 消</el-button>
        <el-button :loading="sysLoading" type="primary" @click="okSysForm">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <sysdialog ref="sysDialog" />
    <menudialog ref="menuDialog" />
    <dialogs
      ref="dialog"
      :dialog-system-visible="dictvisible"
      :co-code="chooseCoCode"
    />
  </div>
</template>

<script>
  import {
    getCompanyList,
    addCompany,
    editCompany,
    delCompany,
    updateCompanyStatus,
    getSystem,
    updateCompanySystem,
    getCompanySystem,
  } from '@/api/company'
  import { getListRegion } from '@/api/basisfiles'
  import { getListByTidAndBelongCode } from '@/api/digtal'
  import { mapGetters } from 'vuex'
  import sysdialog from './components/sysdialog.vue'
  import menudialog from './components/menudialog.vue'
  import dialogs from './components/dialogs.vue'
  import VabProgress from 'nprogress'
  import { isPhone, isAll } from '@/utils/validate'
  export default {
    components: { sysdialog, menudialog, dialogs },
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
        dialogFormVisible: false,
        areaVisible: false,
        dialogSystemVisible: false, //企业系统绑定
        dialogFormEdit: 1, //新增修改
        dialogForm: {
          coName: '',
          coType: '',
          contacts: '',
          licenseNo: '',
          regionid: '',
          regionName: '',
          address: '',
          mobile: '',
          isCalculate: '',
          rid: '',
        }, //新增修改提交字段
        changeListVal: {},
        dictvisible: false,
        disCoName: false,
        disLicenseNo: false,
        disContacts: false,
        disMobile: false,
        disCoType: false,
        chooseIndex: '',
        currentPage1: 1,
        tablelists: [],
        sysTableLists: [],
        sysChildsTableLists: [],
        sysUpdataTableLists: [],
        sysLoading: false,
        chooseCoCode: '', //选择绑定的企业
        chooseSysCode: [], //选择绑定的系统
        belongCode: {
          coType: [],
        },
        add: {
          province: [],
          city: [],
          area: [],
        },
        activeName: 'province',
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [],
        }, //查询的分页字段
        form: {
          coName: {
            value: '',
            mark: 'like',
          },
          coCode: {
            value: '',
            mark: 'like',
          },
          status: {
            value: '',
            mark: '',
          },
        },
        rules: {
          coName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 100, message: '请输入1-100个字符', trigger: 'blur' },
          ],
          licenseNo: [
            { required: true, message: '请输入营业执照编号', trigger: 'blur' },
            { min: 1, max: 20, message: '请输入1-20个字符', trigger: 'blur' },
          ],
          contacts: [
            { validator: checkAll, trigger: 'blur' },
            { min: 1, max: 50, message: '请输入1-50个字符', trigger: 'blur' },
          ],
          mobile: [{ validator: checkPhone, trigger: 'blur' }],
          coType: [{ required: true, message: '请选择类型' }],
        },
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
      }),
    },
    mounted() {
      this.getDataType('coType', 'CO_TYPE')
      this.getDataList()
      getListRegion({ layer: 1 }).then((res) => {
        this.add.province = res.data
      })
    },
    methods: {
      changeList(val) {
        this.changeListVal = val
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        if (record.row.status === 'V') {
          this.disCoName = true
          this.disLicenseNo = true
        } else if (record.row.status === 'N') {
          this.disCoName = true
          this.disLicenseNo = true
          this.disContacts = true
          this.disMobile = true
          this.disCoType = true
        }
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.dialogFormEdit = 2
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
      sysDialog1() {
        this.sysUpdataTableLists = []
        if (Object.keys(this.changeListVal).length > 0) {
          if (this.changeListVal.status !== 'V') {
            this.$baseMessage(
              '该企业没有通过验证',
              'error',
              false,
              'vab-hey-message-error'
            )
          } else {
            this.chooseCoCode = this.changeListVal.coCode
            getSystem({ coCode: this.chooseCoCode }).then((res) => {
              this.sysTableLists = this.checkChildren(res.data)
              this.sysTableLists.forEach((items) => {
                if (items.children.length > 0) {
                  items.children.forEach((item) => {
                    if (item.status == '1') {
                      this.$refs.sysDialog.sysUpdataTableLists.push(item)
                    }
                  })
                }
              })
              this.$refs.sysDialog.chooseCoCode = this.chooseCoCode
              this.$refs.sysDialog.sysTableLists = this.sysTableLists
            })
            this.$refs.sysDialog.dialogSystemVisible = true
          }
        } else {
          this.$message.closeAll()
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      menuDialog() {
        if (Object.keys(this.changeListVal).length > 0) {
          this.chooseCoCode = this.changeListVal.coCode
          getCompanySystem({ coCode: this.chooseCoCode }).then((res) => {
            this.$refs.menuDialog.permisData = res.data
            this.$refs.menuDialog.coCode = this.chooseCoCode
            this.$refs.menuDialog.loading = false
          })
          this.$refs.menuDialog.permis = true
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      dictDialog() {
        if (Object.keys(this.changeListVal).length > 0) {
          this.$refs.dialog.init()
          this.dictvisible = true
          this.chooseCoCode = this.changeListVal.coCode
        } else {
          this.$baseMessage(
            '未选中任何行',
            'error',
            false,
            'vab-hey-message-error'
          )
        }
      },
      sysDialog() {
        this.sysUpdataTableLists = []
        if (Object.keys(this.changeListVal).length > 0) {
          if (this.changeListVal.status !== 'V') {
            this.$baseMessage(
              '该企业没有通过验证',
              'error',
              false,
              'vab-hey-message-error'
            )
          } else {
            this.chooseCoCode = this.changeListVal.coCode
            getSystem({ coCode: this.chooseCoCode }).then((res) => {
              this.sysTableLists = this.checkChildren(res.data)
              this.sysTableLists.forEach((items) => {
                if (items.children.length > 0) {
                  items.children.forEach((item) => {
                    if (item.status == '1') {
                      this.sysUpdataTableLists.push(item)
                    }
                  })
                }
              })
            })
            this.dialogSystemVisible = true
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
      addSysDialog(val) {
        let flag = true
        this.sysUpdataTableLists.forEach((item) => {
          if (item.code == val.code) {
            flag = false
          }
        })
        if (flag) {
          this.sysUpdataTableLists.push(val)
        } else {
          this.$baseMessage('已存在', 'error', false, 'vab-hey-message-error')
        }
      },
      delSysDialog(val) {
        this.$confirm('你确定要移除当前系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.sysUpdataTableLists = this.sysUpdataTableLists.filter(
              (item) => item.code != val.code
            )
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消',
            })
          })
      },
      clearTable() {
        this.changeListVal = {}
        this.$refs.table.setCurrentRow()
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
      closeDialogSysForm() {
        this.dialogSystemVisible = false
        this.$refs.sysTable.setCurrentRow()
        this.sysChildsTableLists = []
        this.sysUpdataTableLists = []
      },
      okSysForm() {
        this.sysLoading = true
        let sysCodes = []
        if (this.sysUpdataTableLists.length > 0) {
          this.sysUpdataTableLists.forEach((item) => {
            sysCodes.push(item.code)
          })
        }
        updateCompanySystem({
          sysCodes,
          coCode: this.chooseCoCode,
        }).then((res) => {
          this.sysLoading = false
          if (res.status == '0') {
            this.$message({
              type: 'success',
              message: '绑定成功!',
            })
            this.getDataList()
            this.dialogSystemVisible = false
            this.$refs.sysTable.setCurrentRow()
            this.sysChildsTableLists = []
            this.sysUpdataTableLists = []
          } else {
            this.$message.error(res.message)
          }
        })
        this.clearTable()
      },
      handleSysTableChange(val) {
        this.sysChildsTableLists = val.children
        // this.$nextTick(() => {
        //   this.sysChildsTableLists.forEach((item) => {
        //     if (item.status == '1') {
        //       this.$refs.sysChildsTable.toggleRowSelection(item, true)
        //     }
        //   })
        // })
      },
      // handleSelectionChange(val) {
      //   this.chooseSysCode = []
      //   val.forEach((item) => {
      //     this.chooseSysCode.push(item.code)
      //   })
      // },
      initDialog() {
        this.add.city = []
        this.add.area = []
        this.activeName = 'province'
        this.$refs['updataForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.disCoName = false
        this.disLicenseNo = false
        this.disContacts = false
        this.disMobile = false
        this.disCoType = false
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delCompany({ rid }).then((res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getDataList()
              } else {
                this.$message.error(res.message)
              }
              this.clearTable()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
            this.clearTable()
          })
      },
      change(rid, status, message) {
        // const message =
        //   status === 'C' ? '取消验证' : status === 'V' ? '验证' : '激活'
        this.$confirm(`你确定要${message}当前企业吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            updateCompanyStatus({ rid, status }).then((res) => {
              if (res.status == '0') {
                this.$message({
                  type: 'success',
                  message: '操作成功!',
                })
                this.getDataList()
              } else {
                this.$message.error(res.message)
              }
              this.clearTable()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作',
            })
            this.clearTable()
          })
      },
      closeDialogForm() {
        this.dialogFormVisible = false
        this.areaVisible = false
        this.initDialog()
        this.clearTable()
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
      submitForm() {
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addCompany(this.dialogForm).then((res) => {
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
              editCompany(this.dialogForm).then((res) => {
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
          this.clearTable()
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
        getCompanyList(this.webPage).then((res) => {
          if (res.status == '0') {
            this.tablelists = res.data.list
            this.tablelists.forEach((item) => {
              item.isCalculate = item.isCalculate ? '1' : '0'
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
        this.form.coCode.value = null
        this.form.coName.value = null
        this.form.status.value = null
      },
      getDataType(val, code) {
        getListByTidAndBelongCode({
          code: code,
          type: 'PT_CONFIG',
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
