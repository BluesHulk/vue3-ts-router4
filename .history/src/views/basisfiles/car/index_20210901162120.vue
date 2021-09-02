<template>
  <div class="main">
    <el-form ref="companySearchForm" :inline="true" :model="form">
      <el-form-item label="车牌号">
        <el-input
          v-model.trim="form.licensePlate"
          clearable
          autocomplete="off"
          placeholder="请输入车牌号"
        />
      </el-form-item>
      <el-form-item label="司机">
        <el-input
          v-model.trim="form.driverName"
          clearable
          autocomplete="off"
          placeholder="请输入司机"
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
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            align="center"
            type="index"
            width="55"
            label="序号"
          />
          <el-table-column
            prop="licensePlate"
            label="车牌号"
            width="100px"
            show-overflow-tooltip
          />
          <el-table-column
            prop="axleType"
            label="车轴类型"
            width="80px"
            show-overflow-tooltip
          />
          <el-table-column
            prop="vehicleType"
            label="车辆类型"
            width="150px"
            show-overflow-tooltip
          />
          <el-table-column
            prop="vehicleLicense"
            label="行驶证号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="vehicleLicenseIndate"
            label="行驶证有效期"
            width="130px"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.row.vehicleLicenseIndate
                    ? thirteenBitTimestampYMD(
                        new Date(scope.row.vehicleLicenseIndate)
                      )
                    : ''
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="deadweight" label="标准载重" />
          <el-table-column prop="curbWeight" label="空车皮重" />
          <el-table-column
            prop="coName"
            label="所属承运商"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.ownerType == 'P' ? '个人' : scope.row.coName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="driverName" label="司机" />
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
                {{ scope.row.status == 'E' ? '有效' : '无效' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
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
                  @click="delDialog(scope.row.licensePlate)"
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
          <el-form-item label="车牌号" prop="licensePlate">
            <el-input
              v-model="dialogForm.licensePlate"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="车轴类型" prop="axleType">
            <el-select
              v-model="dialogForm.axleType"
              placeholder="请选择车轴类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in belongCode.axleType"
                :key="item.rid"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="车辆类型" prop="vehicleType">
            <el-select
              v-model="dialogForm.vehicleType"
              placeholder="请选择车辆类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in belongCode.vehicleType"
                :key="item.rid"
                :label="item.value"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="标准载重" prop="deadweight">
            <el-input
              v-model="dialogForm.deadweight"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="空车皮重" prop="curbWeight">
            <el-input
              v-model="dialogForm.curbWeight"
              type="number"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="默认司机" prop="driverName">
            <el-input v-model="dialogForm.driverName" type="text" disabled />
            <el-button
              class="item-btn"
              icon="el-icon-search"
              @click="openChooseDriver"
            />
          </el-form-item>
          <el-form-item label="所属人类型" prop="ownerType">
            <el-radio v-model="dialogForm.ownerType" label="C">单位</el-radio>
            <el-radio v-model="dialogForm.ownerType" label="P">个人</el-radio>
          </el-form-item>
          <el-form-item
            v-if="dialogForm.ownerType == 'C'"
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
              <el-option label="有效" value="E" />
              <el-option label="无效" value="N" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="证件管理" prop="certManager">
            <el-select
              v-model="editTab.certManager"
              placeholder="请选择类型"
              style="width: 80%"
            >
              <el-option label="行驶证" value="1" />
              <el-option label="运营证" value="2" />
            </el-select>
            <el-button
              type="primary"
              @click="addTab(editTab.editableTabsValue)"
            >
              添 加
            </el-button>
          </el-form-item> -->
          <el-form-item label-width="65px">
            <el-tabs v-model="editTab.editableTabsValue" type="card">
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.id"
                :label="editableTabsList[item.id].label"
                :name="editableTabsList[item.id].name"
              >
                <el-row>
                  <el-col :span="12">
                    {{ editableTabsList[item.id].label + '号' }}
                    <el-input
                      v-model="editableTabsList[item.id].value"
                      type="text"
                      autocomplete="off"
                      style="width: 70%"
                    />
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
          <el-table-column prop="coName" label="单位名称" />
          <el-table-column prop="customCoCode" label="单位编码" />
        </el-table>
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
      :visible="dialogDriverVisible"
      width="780px"
      :close-on-click-modal="false"
      title="选择司机"
      @close="driverCannel"
    >
      <div>
        <el-table
          ref="driverTable"
          :data="driverTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          highlight-current-row
          default-expand-all
          max-height="500px"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseDriverCurrentRow"
        >
          <el-table-column prop="fullName" label="司机姓名" />
          <el-table-column
            prop="idNumber"
            label="身份证"
            show-overflow-tooltip=""
          />
          <el-table-column prop="loginName" label="手机号" />
          <el-table-column prop="createTime" label="创建时间" width="180px">
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestamp(new Date(scope.row.createTime)) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="driverPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="driverPage.totalPage"
              @size-change="handleDriverSizeChange"
              @current-change="changeDriverPage"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="driverCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="driverOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getTruckList,
    addTruckAndCert,
    editTruckAndCert,
    getTruckCertsList,
    delCoTruck,
  } from '@/api/car'
  import { getDriverList } from '@/api/driver'
  import { upLoadImgPath, showImgPath } from '@/api/file'
  import { getCompanyListBySendcons } from '@/api/company'
  import { getListByTidAndBelongCode } from '@/api/digtal'
  import { thirteenBitTimestampYMD, thirteenBitTimestamp } from '@/utils/index'
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
        upLoadImgPath,
        showImgPath,
        hasChildren: true,
        dialogComVisible: false,
        dialogDriverVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1, //新增修改
        dialogForm: {
          licensePlate: '',
          axleType: '',
          deadweight: '',
          carrierCode: '',
          curbWeight: '',
          driverRid: '',
          driverIdNumber: '',
          driverName: '',
          ownerType: 'C',
          coCode: '',
          coName: '',
          status: 'E',
          certList: [],
          rid: '',
        }, //新增修改提交字段
        chooseIndex: '',
        currentPage1: 1,
        tablelists: [],
        driverTableData: [],
        driverPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: {},
        },
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
        tempChoose: {
          carrierCode: '',
          coName: '',
          coCode: '',
          driverRid: '',
          driverName: '',
          driverIdNumber: '',
        },
        belongCode: {
          axleType: [], //车轴类型集合
          vehicleType: [], //车辆类型集合
        },
        webPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          param: [],
        }, //查询的分页字段
        form: {
          driverName: '',
          licensePlate: '',
          coCode: '',
        },
        rules: {
          licensePlate: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
          ],
          licenseNo: [
            { required: true, message: '请输入营业执照编号', trigger: 'blur' },
            { min: 1, max: 20, message: '请输入1-20个字符', trigger: 'blur' },
          ],
          contacts: [
            { min: 3, max: 5, message: '请输入3-5个字符', trigger: 'blur' },
          ],
          mobile: [{ validator: checkPhone, trigger: 'blur' }],
          coType: [{ required: true, message: '请选择类型' }],
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
        ],
        editableTabsList: {
          1: {
            label: '行驶证',
            name: '1',
            value: '',
            time: '',
            img: '',
          },
          2: {
            label: '运营证',
            name: '2',
            value: '',
            time: '',
            img: '',
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
      this.getDataType('axleType', 'TRUCK_AXLE_TYPE')
      this.getDataType('vehicleType', 'TRUCK_VEHICLE_TYPE')
    },
    methods: {
      thirteenBitTimestampYMD,
      thirteenBitTimestamp,
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(record) {
        getTruckCertsList({ licensePlate: record.row.licensePlate }).then(
          (res) => {
            res.data.forEach((item, index) => {
              this.editableTabsList[item.certType].value = item.certNum
              this.editableTabsList[item.certType].time = item.endDate
              this.editableTabsList[item.certType].img = item.certImg
              if (item.certImg) {
                this.imgUrl[item.certType] = this.showImgPath + item.certImg
              }
            })
          }
        )
        this.dialogForm = Object.assign({}, record.row)
        this.dialogFormVisible = true
        this.dialogFormEdit = 2
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
      getComDataList() {
        getCompanyListBySendcons(this.comPage).then((res) => {
          this.comTableData = res.data.list
          this.comPage.totalPage = res.data.page.totalNumber
        })
      },
      openChooseCom() {
        this.getComDataList()
        this.dialogComVisible = true
      },
      comCannel() {
        this.dialogComVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      comOk() {
        this.dialogForm.carrierCode = this.tempChoose.carrierCode
        this.dialogForm.coName = this.tempChoose.coName
        this.dialogComVisible = false
        this.$refs.multipleTable.clearSelection()
      },
      chooseCurrentRow(row) {
        this.tempChoose.carrierCode = row.coCode
        this.tempChoose.coName = row.coName
      },
      getDriverDataList() {
        this.driverPage.param['coCode'] = this.lhCoCode
        getDriverList(this.driverPage).then((res) => {
          this.driverTableData = res.data.list
          this.driverPage.totalPage = res.data.page.totalNumber
        })
      },
      openChooseDriver() {
        this.getDriverDataList()
        this.dialogDriverVisible = true
      },
      driverCannel() {
        this.dialogDriverVisible = false
        this.$refs.driverTable.clearSelection()
      },
      driverOk() {
        this.dialogForm.driverRid = this.tempChoose.driverRid
        this.dialogForm.driverName = this.tempChoose.driverName
        this.dialogForm.driverIdNumber = this.tempChoose.driverIdNumber
        this.dialogDriverVisible = false
        this.$refs.driverTable.clearSelection()
      },
      chooseDriverCurrentRow(row) {
        this.tempChoose.driverRid = row.rid
        this.tempChoose.driverName = row.fullName
        this.tempChoose.driverIdNumber = row.driverIdNumber
      },
      initDialog() {
        this.$refs['updataForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.editableTabsList = this.$options.data().editableTabsList
        this.imgUrl = this.$options.data().imgUrl
        this.editTab.editableTabsValue = '1'
      },
      delDialog(licensePlate) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delCoTruck({ licensePlate, coCode: this.lhCoCode }).then((res) => {
              if (res.code == '200') {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getDataList()
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
      changeComPage(val) {
        this.comPage.page = val
        this.getComDataList()
      },
      handleComSizeChange(val) {
        this.catePage.pageSize = val
        this.getComDataList()
      },
      changeDriverPage(val) {
        this.driverPage.page = val
        this.getDriverDataList()
      },
      handleDriverSizeChange(val) {
        this.driverPage.pageSize = val
        this.getDriverDataList()
      },
      submitForm() {
        this.dialogForm.certList = []
        Object.keys(this.editableTabsList).forEach((val) => {
          this.dialogForm.certList.push({
            certImg: this.editableTabsList[val].img,
            certType: this.editableTabsList[val].name,
            certNum: this.editableTabsList[val].value,
            endDate: this.editableTabsList[val].time,
            permanent: 'Y',
          })
        })
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addTruckAndCert(this.dialogForm).then((res) => {
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
              editTruckAndCert(this.dialogForm).then((res) => {
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
      handlePictureCardPreview() {},
      handleRemove() {},
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
        getTruckList(this.webPage).then((res) => {
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
        this.form.licensePlate = null
        this.form.driverName = null
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
  .content {
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
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
</style>
