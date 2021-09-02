<template>
  <div class="main">
    <el-form ref="querySearchForm" :inline="true" :model="form">
      <el-form-item label="驾驶员">
        <el-input
          v-model.trim="form.fullName"
          clearable
          autocomplete="off"
          placeholder="请输入驾驶员"
        />
      </el-form-item>
      <!-- <el-form-item label="车牌号">
        <el-input
          v-model.trim="form.defTruckNo"
          clearable
          autocomplete="off"
          placeholder="请输入车牌号"
        />
      </el-form-item> -->
      <el-form-item label="身份证号">
        <el-input
          v-model.trim="form.idNumber"
          clearable
          autocomplete="off"
          placeholder="请输入身份证号"
        />
      </el-form-item>
      <!-- <el-col :span="4">
              <el-form-item label="">
                <el-select
                  v-model.trim="form.status.value"
                  clearable
                  placeholder="请选择审核状态"
                >
                  <el-option label="已验证" value="V" />
                  <el-option label="未验证" value="C" />
                  <el-option label="已注销" value="N" />
                </el-select>
              </el-form-item>
            </el-col> -->
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
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tablelists"
          row-key="id"
          border
          highlight-current-row
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="fullName" label="驾驶员" />
          <!-- <el-table-column prop="defTruckNo" label="车牌号" /> -->
          <el-table-column
            prop="idNumber"
            label="身份证"
            show-overflow-tooltip
          />
          <el-table-column prop="loginName" label="手机号" />
          <el-table-column prop="driverLicense" label="驾驶证号" />
          <el-table-column prop="driverLicenseIndate" label="驾驶证有效期">
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestampYMD(new Date(scope.row.createTime)) }}
              </span>
            </template>
          </el-table-column>
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
                {{ scope.row.status == 'A' ? '有效' : '无效' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                <el-button type="text" @click="editDialog(scope)">
                  编辑
                </el-button>
                <el-button type="text" @click="delDialog(scope.row.idNumber)">
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
        />
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogFormEdit === 1 ? '新增' : '编辑'"
      :visible.sync="dialogFormVisible"
      width="980px"
      :close-on-click-modal="false"
      @close="closeDialogForm"
    >
      <div class="content">
        <el-form
          ref="updataForm"
          :model="dialogForm"
          label-width="130px"
          style="width: 800px; margin: 0 auto"
          :rules="rules"
        >
          <el-form-item label="司机姓名" prop="fullName">
            <el-input
              v-model="dialogForm.fullName"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <!-- <el-form-item label="默认车辆" prop="defTruckNo">
            <el-input v-model="dialogForm.defTruckNo" type="text" disabled />
            <el-button
              class="item-btn"
              icon="el-icon-search"
              @click="openChooseCar"
            >
              <div style="width: 100%; height: 100%"></div>
            </el-button>
          </el-form-item> -->
          <el-form-item label="手机号" prop="loginName">
            <el-input
              v-model.trim="dialogForm.loginName"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="司机类型" prop="driverType">
            <el-radio v-model="dialogForm.driverType" label="1">员工</el-radio>
            <el-radio v-model="dialogForm.driverType" label="2">
              个体户
            </el-radio>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.driverType == '1'"
            label="所属承运商"
            prop="coName"
          >
            <el-input v-model="dialogForm.coName" type="text" disabled />
            <el-button
              class="item-btn"
              icon="el-icon-search"
              @click="openChooseCom"
            >
              <div style="width: 100%; height: 100%"></div>
            </el-button>
          </el-form-item>
          <el-form-item label="是否有效" prop="status">
            <el-select
              v-model="dialogForm.status"
              placeholder="请选择是否有效"
              style="width: 100%"
            >
              <el-option label="有效" value="A" />
              <el-option label="无效" value="N" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="证件管理">
            <el-row>
              <el-col :span="18">
                <el-select
                  v-model="editTab.certManager"
                  placeholder="请选择证件"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in certSelList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="addTab(editTab.certManager)"
                >
                  添 加
                </el-button>
              </el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item label-width="65px">
            <el-tabs
              v-model="editTab.editableTabsValue"
              type="card"
              @tab-remove="removeTab"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.id"
                :label="editableTabsList[item.id].label"
                :name="editableTabsList[item.id].name"
              >
                <el-row style="margin-left: -65px">
                  <el-col :span="12">
                    <!-- <label v-if="item.id == 1" class="star"></label> -->
                    <!-- {{ editableTabsList[item.id].label + '号' }} -->
                    <el-form-item
                      :label="editableTabsList[item.id].label"
                      :prop="editableTabsList[item.id].propName"
                    >
                      <el-input
                        v-model="editableTabsList[item.id].value"
                        type="text"
                        autocomplete="off"
                        style="width: 70%"
                        @change="inputChange(item.id)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    有效期至
                    <el-date-picker
                      v-model="editableTabsList[item.id].time"
                      type="date"
                      placeholder="选择日期"
                    />
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-upload
                      class="avatar-uploader"
                      :action="upLoadImgPath"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :headers="{
                        lhtoken,
                        lhUserName,
                        lhSysCode,
                        lhCoCode,
                      }"
                    >
                      <img
                        v-if="imgUrl[item.id]"
                        :src="imgUrl[item.id]"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
        </el-form>
      </div>
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
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
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
    <el-dialog
      ref="dialog"
      :visible="dialogCarVisible"
      width="680px"
      :close-on-click-modal="false"
      title="选择车辆"
      @close="carCannel"
    >
      <div>
        <el-row>
          <el-col>
            <el-table
              ref="carTable"
              :data="carTableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="rid"
              border
              highlight-current-row
              default-expand-all
              max-height="500px"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @row-click="chooseCarCurrentRow"
            >
              <el-table-column prop="licensePlate" label="车牌号" />
              <el-table-column prop="axleType" label="车轴类型" />
              <el-table-column prop="deadweight" label="标准载重" />
              <el-table-column prop="curbWeight" label="空车皮重" />
              <el-table-column prop="createTime" label="创建时间" />
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="carPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="carPage.totalPage"
              @current-change="changeCarPage"
              @size-change="handleCarSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="carCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="carOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getDriverList,
    addDriverAndCert,
    editDriverAndCert,
    delCoDriver,
    getDriverCertsList,
  } from '@/api/driver'
  import { getTrucksList } from '@/api/car'
  import { getCompanyListBySendcons } from '@/api/company'
  import { upLoadImgPath, showImgPath } from '@/api/file'
  import { mapGetters } from 'vuex'
  import VabProgress from 'nprogress'
  import { isPhone, isAll } from '@/utils/validate'
  import { thirteenBitTimestampYMD, thirteenBitTimestamp } from '@/utils/index'
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
        upLoadImgPath,
        showImgPath,
        hasChildren: true,
        dialogComVisible: false,
        dialogCarVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1, //新增修改
        dialogForm: {
          fullName: '',
          defTruckNo: '',
          loginName: '',
          driverType: '1',
          idNumber: '',
          coName: '',
          coCode: '',
          status: 'A',
          certList: [],
          rid: '',
        }, //新增修改提交字段
        chooseIndex: '',
        currentPage1: 1,
        imageUrl: '',
        tablelists: [],
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {},
        }, //查询的分页字段
        comTableData: [],
        comPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {
            type: 3,
          },
        },
        carTableData: [],
        carPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {},
        },
        tempChoose: {
          coName: '',
          coCode: '',
          licensePlate: '',
        },
        form: {
          fullName: '',
          // defTruckNo: '',
          idNumber: '',
          coCode: '',
        },
        rules: {
          fullName: [
            { required: true, message: '请输入司机姓名', trigger: 'blur' },
          ],
          loginName: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          contacts: [
            { min: 3, max: 5, message: '请输入3-5个字符', trigger: 'blur' },
          ],
          mobile: [{ validator: checkPhone, trigger: 'blur' }],
          idNumber: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
          ],
        },
        editTab: {
          certManager: '',
          editableTabsValue: '1',
        },
        editableTabs: [
          {
            id: 1,
            show: false,
          },
          {
            id: 2,
            show: false,
          },
          {
            id: 3,
            show: false,
          },
        ],
        editableTabsList: {
          1: {
            label: '身份证',
            name: '1',
            value: '',
            time: '',
            propName: 'idNumber',
          },
          2: {
            label: '驾驶证',
            name: '2',
            value: '',
            time: '',
            img: '',
            propName: '',
          },
          3: {
            label: '从业资格证',
            name: '3',
            value: '',
            time: '',
            img: '',
            propName: '',
          },
        },
        imgUrl: ['', '', ''],
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
        lhtoken: 'user/token',
        lhUserName: 'user/lhUserName',
        lhSysCode: 'user/lhSysCode',
        lhCoCode: 'user/lhCoCode',
      }),
    },
    mounted() {
      this.getDataList()
    },
    methods: {
      thirteenBitTimestampYMD,
      thirteenBitTimestamp,
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        getDriverCertsList({ driverRid: record.row.rid }).then((res) => {
          res.data.forEach((item, index) => {
            this.editableTabsList[item.certType].value = item.certNum
            this.editableTabsList[item.certType].time = item.endDate
            this.editableTabsList[item.certType].img = item.certImg
            if (item.certImg) {
              this.imgUrl[item.certType] = this.showImgPath + item.certImg
            }
          })
        })
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.dialogFormEdit = 2
      },
      inputChange(val) {
        if (val == 1) {
          this.dialogForm.idNumber = this.editableTabsList[1].value
        }
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
      handleSelectionChange(val) {
        this.chooseSysCode = []
        val.forEach((item) => {
          this.chooseSysCode.push(item.code)
        })
      },
      initDialog() {
        this.$refs['updataForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.editableTabsList = this.$options.data().editableTabsList
        this.imgUrl = this.$options.data().imgUrl
        this.editTab.editableTabsValue = '1'
      },
      delDialog(idNumber) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delCoDriver({ idNumber, coCode: this.lhCoCode }).then((res) => {
              if (res.code == '200') {
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
      changeComPage(val) {
        this.comPage.page = val
        this.getComDataList()
      },
      handleComSizeChange(val) {
        this.comPage.pageSize = val
        this.getComDataList()
      },
      openChooseCom() {
        this.getComDataList()
        this.dialogComVisible = true
      },
      getComDataList() {
        getCompanyListBySendcons(this.comPage).then((res) => {
          this.comTableData = res.data.list
          this.comPage.totalPage = res.data.page.totalNumber
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
      changeCarPage(val) {
        this.carPage.page = val
        this.getCarDataList()
      },
      handleCarSizeChange(val) {
        this.carPage.pageSize = val
        this.getCarDataList()
      },
      openChooseCar() {
        this.getCarDataList()
        this.dialogCarVisible = true
      },
      getCarDataList() {
        getTrucksList({}).then((res) => {
          this.carTableData = res.data
          // this.carPage.totalPage = res.data.page.totalNumber
        })
      },
      carCannel() {
        this.dialogCarVisible = false
        this.$refs.carTable.clearSelection()
      },
      carOk() {
        this.dialogForm.defTruckNo = this.tempChoose.licensePlate
        this.dialogCarVisible = false
        this.$refs.carTable.clearSelection()
      },
      chooseCarCurrentRow(row) {
        this.tempChoose.licensePlate = row.licensePlate
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
      submitForm() {
        this.dialogForm.certList = []
        Object.keys(this.editableTabsList).forEach((val) => {
          // if (val == '1') {
          //   this.dialogForm.idNumber = this.editableTabsList[val].value
          // }
          this.dialogForm.certList.push({
            certImg: this.editableTabsList[val].img,
            certType: this.editableTabsList[val].name,
            certNum: this.editableTabsList[val].value,
            endDate: this.editableTabsList[val].time,
          })
        })
        if (this.dialogForm.idNumber) {
          this.$refs['updataForm'].validate((valid) => {
            if (valid) {
              if (this.dialogFormEdit === 1) {
                this.dialogForm.rid = null
                addDriverAndCert(this.dialogForm).then((res) => {
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
                editDriverAndCert(this.dialogForm).then((res) => {
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
        } else {
          this.$message.error('请填写身份证号')
        }
      },
      addTab(val) {
        this.editTab.editableTabs[val].show = true
        this.editTab.editableTabsValue = val
      },
      removeTab(targetName) {
        this.editTab.editableTabs[targetName].show = false
        let activeName = this.editTab.editableTabsValue
        if (activeName == targetName) {
          Object(this.editTab.editableTabs).keys((item) => {
            this.editTab.editableTabs[item].show
          })
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editTab.editableTabsValue = activeName
      },
      handleAvatarSuccess(res, file) {
        this.editableTabsList[this.editTab.editableTabsValue].img = res.data
        this.$set(
          this.imgUrl,
          this.editTab.editableTabsValue,
          this.showImgPath + res.data
        )
      },
      beforeAvatarUpload(file) {
        const isJPG = 'image/jpeg,image/png'.includes(file.type)

        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      getDataList() {
        const { showProgressBar } = this.theme
        if (showProgressBar) VabProgress.start()
        this.webPage.param = {}
        this.form.coCode = this.lhCoCode
        Object.keys(this.form).forEach((element) => {
          if (this.form[element]) {
            this.webPage.param[element] = this.form[element]
          }
        })
        getDriverList(this.webPage).then((res) => {
          if (res.status == '0') {
            this.tablelists = res.data.list
            this.tablelists.forEach((item, index) => {
              item.driverType = item.driverType.toString()
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
        this.form.fullName = null
        this.form.idNumber = null
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
  .content {
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
  }
  .star::before {
    margin-right: 4px;
    color: #ff4d4f;
    content: '*';
  }
  .avatar-uploader {
    position: relative;
    width: 178px;
    height: 178px;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    line-height: 178px;
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    display: block;
    width: 178px;
    height: 178px;
  }
  /deep/ .el-tabs__content {
    margin-left: -30px;
    padding-left: 30px;
  }
</style>
