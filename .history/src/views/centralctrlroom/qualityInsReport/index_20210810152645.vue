<template>
  <div class="main">
    <el-form ref="productSearchForm" :inline="true" :model="form">
      <el-form-item label="物料名称">
        <el-input
          v-model.trim="form.prodName.value"
          clearable
          placeholder="请输入物料名称"
        />
      </el-form-item>
      <el-form-item label="水泥品名">
        <el-input
          v-model.trim="form.variety.value"
          clearable
          placeholder="请输入水泥品名"
        />
      </el-form-item>
      <el-form-item label="水泥出厂编号">
        <el-input
          v-model.trim="form.informNum.value"
          clearable
          placeholder="请输入水泥出厂编号"
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
          default-expand-all
          highlight-current-row
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="reportNum"
            label="质检报告单编号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="informNum"
            label="水泥出厂编号"
            show-overflow-tooltip
          />
          <el-table-column
            prop="prodName"
            label="物料名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="variety"
            label="水泥品名"
            show-overflow-tooltip
          />
          <el-table-column prop="strength" label="强度等级" />
          <el-table-column
            prop="outFacDate"
            label="出厂日期"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestampYMD(new Date(scope.row.outFacDate)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="出厂数量" />
          <el-table-column
            prop="createPerson"
            label="创建人"
            show-overflow-tooltip
          />
          <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestampYMD(new Date(scope.row.createTime)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status == '1' ? '启用' : '禁用' }}
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
      width="840px"
      @close="closeDialogForm"
    >
      <div class="content">
        <el-form
          ref="updataForm"
          :model="dialogForm"
          label-width="130px"
          style="width: 680px; margin: 0 auto"
          :rules="rules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="出厂通知单编号" prop="informNum">
                <el-input v-model="dialogForm.informNum" type="text" />
                <el-button
                  class="item-btn"
                  icon="el-icon-search"
                  @click="openChooseOutFac"
                >
                  <div style="width: 100%; height: 100%"></div>
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="水泥品名" prop="variety">
                <el-input v-model="dialogForm.variety" type="text" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="物料名称" prop="prodName">
                <el-input v-model="dialogForm.prodName" type="text" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="强度等级" prop="strength">
                <el-input v-model="dialogForm.strength" type="text" disabled />
                <!-- <el-select
                  v-model="dialogForm.strength"
                  clearable
                  placeholder="请选择强度等级"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in belongCode.shuini_strength"
                    :key="item.rid"
                    :label="item.value"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="出厂日期" prop="outFacDate">
                <!-- <el-input v-model="dialogForm.outFacDate" type="text" /> -->
                <el-date-picker
                  v-model="dialogForm.outFacDate"
                  type="date"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出厂数量" prop="amount">
                <el-input v-model="dialogForm.amount" type="text" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="水泥编号" prop="prodBatchNum">
                <el-input
                  v-model="dialogForm.prodBatchNum"
                  type="text"
                  disabled
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="80um细度" prop="xd80um">
                <el-input v-model="report.xd80um" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="45um细度" prop="xd45um">
                <el-input v-model="report.xd45um" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="比表面积(m2/kg)" prop="bbmj">
                <el-input v-model="report.bbmj" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="初凝时间(分)" prop="cnsj">
                <el-input v-model="report.cnsj" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="终凝时间(分)" prop="znsj">
                <el-input v-model="report.znsj" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="安定性" prop="adx">
                <el-input v-model="report.adx" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="标准稠度用水量(%)" prop="bzcdysl">
                <el-input v-model="report.bzcdysl" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="流动度(mm)" prop="ldd">
                <el-input v-model="report.ldd" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="水灰比" prop="shb">
                <el-input v-model="report.shb" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="氧化镁" prop="yhm">
                <el-input v-model="report.yhm" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="三氧化硫(%)" prop="syhl">
                <el-input v-model="report.syhl" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="烧失量" prop="ssl">
                <el-input v-model="report.ssl" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="不溶物(%)" prop="brw">
                <el-input v-model="report.brw" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="碱含量(%)" prop="jhl">
                <el-input v-model="report.jhl" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="氯离子(%)" prop="llz">
                <el-input v-model="report.llz" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="CaO/SiO2" prop="caoSio2">
                <el-input v-model="report.caoSio2" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="C3S+C2S" prop="c3sc2s">
                <el-input v-model="report.c3sc2s" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="游离氧化钙" prop="ylyhg">
                <el-input v-model="report.ylyhg" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="助磨剂" prop="zmj">
                <el-input v-model="report.zmj" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="石膏名称" prop="sgmc">
                <el-input v-model="report.sgmc" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="石膏含量(%)" prop="sghl">
                <el-input v-model="report.sghl" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="混合材名称" prop="hhcmc">
                <el-input v-model="report.hhcmc" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="混合材含量(%)" prop="hhchl">
                <el-input v-model="report.hhchl" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="外加剂名称(%)" prop="wjjmc">
                <el-input v-model="report.wjjmc" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="外加剂含量(%)" prop="wjjhl">
                <el-input v-model="report.wjjhl" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗折三天1" prop="kz3t1">
                <el-input v-model="report.kz3t1" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗折三天2" prop="kz3t2">
                <el-input v-model="report.kz3t2" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗折三天3" prop="kz3t3">
                <el-input v-model="report.kz3t3" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗折三天均值" prop="kz3tJz">
                <el-input v-model="report.kz3tJz" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压三天1" prop="ky3t1">
                <el-input v-model="report.ky3t1" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压三天2" prop="ky3t2">
                <el-input v-model="report.ky3t2" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压三天3" prop="ky3t3">
                <el-input v-model="report.ky3t3" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压三天4" prop="ky3t4">
                <el-input v-model="report.ky3t4" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压三天5" prop="ky3t5">
                <el-input v-model="report.ky3t5" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压三天6" prop="ky3t6">
                <el-input v-model="report.ky3t6" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压三天均值" prop="ky3tJz">
                <el-input v-model="report.ky3tJz" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗折28天1" prop="kz28t1">
                <el-input v-model="report.kz28t1" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗折28天2" prop="kz28t2">
                <el-input v-model="report.kz28t2" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗折28天3" prop="kz28t3">
                <el-input v-model="report.kz28t3" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗折28天均值" prop="kz28tJz">
                <el-input v-model="report.kz28tJz" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压28天1" prop="ky28t1">
                <el-input v-model="report.ky28t1" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压28天2" prop="ky28t2">
                <el-input v-model="report.ky28t2" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压28天3" prop="ky28t3">
                <el-input v-model="report.ky28t3" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压28天4" prop="ky28t4">
                <el-input v-model="report.ky28t4" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压28天5" prop="ky28t5">
                <el-input v-model="report.ky28t5" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抗压28天6" prop="ky28t6">
                <el-input v-model="report.ky28t6" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="抗压28天均值" prop="ky28tJz">
                <el-input v-model="report.ky28tJz" type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="remark">
              <el-input v-model="dialogForm.remark" type="textarea" />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取 消</el-button>
        <el-button type="primary" :loading="updateAble" @click="submitForm">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      ref="dialog"
      :visible="dialogOutFacVisible"
      width="1000px"
      :close-on-click-modal="false"
      title="选择出厂通知单"
      @close="outFacCannel"
    >
      <div>
        <el-form ref="productSearchForm" :inline="true" :model="form">
          <el-form-item label="物料名称">
            <el-input
              v-model.trim="outFacForm.prodName.value"
              clearable
              placeholder="请输入物料名称"
            />
          </el-form-item>
          <el-form-item label="水泥编号">
            <el-input
              v-model.trim="outFacForm.prodBatchNum.value"
              clearable
              placeholder="请输入水泥品名"
            />
          </el-form-item>
          <el-form-item label="水泥出厂编号">
            <el-input
              v-model.trim="outFacForm.whName.value"
              clearable
              placeholder="请输入水泥出厂编号"
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="searchOutFacForm"
            >
              查询
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              icon="el-icon-refresh"
              @click="resetOutFacForm"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="outFacTable"
          :data="outFacTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="rid"
          border
          max-height="400px"
          highlight-current-row
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          @row-click="chooseOutFacCurrentRow"
        >
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
          <el-table-column
            prop="numOfYear"
            label="编号年份"
            show-overflow-tooltip
          />
          <el-table-column prop="issue" label="下达人" show-overflow-tooltip />
          <el-table-column
            prop="amount"
            label="出厂数量"
            show-overflow-tooltip
          />
          <el-table-column
            prop="surplusAmount"
            label="剩余数量"
            show-overflow-tooltip
          />
          <el-table-column
            prop="whName"
            label="存放地点"
            show-overflow-tooltip
          />
          <el-table-column
            prop="signTime"
            label="签发日期"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>
                {{ thirteenBitTimestampYMD(new Date(scope.row.signTime)) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="是否有效">
            <template slot-scope="scope">
              <span style="margin-left: 10px">
                {{ scope.row.status ? '已启用' : '未启用' }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col>
            <el-pagination
              :page-size="outFacPage.pageSize"
              :page-sizes="[10, 20, 30, 40, 50]"
              layout="total, prev, pager, next, jumper"
              :total="outFacPage.totalPage"
              @current-change="changeOutFacPage"
              @size-change="handleOutFacSizeChange"
            />
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer-peo">
        <el-button class="cancleDialog" @click="outFacCannel">取 消</el-button>
        <el-button class="confimDialog" type="primary" @click="outFacOk">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getQualityInsReportList,
    addQualityInsReport,
    editQualityInsReport,
    delQualityInsReport,
    getQualityInsReportDetail,
    openQualityInsReport,
    closeQualityInsReport,
  } from '@/api/qualityInsReport'
  import { getOutFacInformedList } from '@/api/outFacInformed'
  import { thirteenBitTimestampYMD, thirteenBitTimestamp } from '@/utils/index'
  import { getListByTidAndBelongCode } from '@/api/digtal'
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
        dialogOutFacVisible: false,
        dialogFormVisible: false,
        dialogFormEdit: 1,
        dialogForm: {
          prodName: '',
          prodPsn: '',
          informNum: '',
          variety: '',
          outFacDate: '',
          amount: '',
          prodBatchNum: '',
          coQualityInsReportContentDOS: [],
          rid: '',
        },
        report: {
          xd80um: '',
          xd45um: '',
          bbmj: '',
          cnsj: '',
          znsj: '',
          adx: '',
          bzcdysl: '',
          ldd: '',
          shb: '',
          yhm: '',
          syhl: '',
          ssl: '',
          brw: '',
          jhl: '',
          llz: '',
          caoSio2: '',
          c3sc2s: '',
          ylyhg: '',
          zmj: '',
          sgmc: '',
          sghl: '',
          hhcmc: '',
          hhchl: '',
          wjjmc: '',
          wjjhl: '',
          kz3t1: '',
          kz3t2: '',
          kz3t3: '',
          kz3tJz: '',
          ky3t1: '',
          ky3t2: '',
          ky3t3: '',
          ky3t4: '',
          ky3t5: '',
          ky3t6: '',
          ky3tJz: '',
          kz28t1: '',
          kz28t2: '',
          kz28t3: '',
          kz28tJz: '',
          ky28t1: '',
          ky28t2: '',
          ky28t3: '',
          ky28t4: '',
          ky28t5: '',
          ky28t6: '',
          ky28tJz: '',
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
        outFacTableData: [],
        outFacPage: {
          page: 1,
          totalPage: 0,
          pageSize: 10,
          sort: 'desc',
          sortFieldName: '',
          paramList: [],
        },
        outFacForm: {
          status: {
            value: 'E',
            mark: 'eq',
          },
          auditStatus: {
            value: '1',
            mark: 'eq',
          },
          prodName: {
            value: '',
            mark: 'like',
          },
          prodBatchNum: {
            value: '',
            mark: 'like',
          },
          whName: {
            value: '',
            mark: 'like',
          },
        },
        belongCode: {
          shuini_strength: [], //强度
        },
        form: {
          prodName: {
            value: '',
            mark: 'like',
          },
          variety: {
            value: '',
            mark: 'like',
          },
          informNum: {
            value: '',
            mark: 'like',
          },
        },
        tempChoose: {
          informNum: '',
          variety: '',
          prodName: '',
          psn: '',
          outFacDate: '',
          amount: '',
          prodBatchNum: '',
          strength: '',
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
      this.getDataType('shuini_strength', 'SHUINI_STRENGTH')
    },
    methods: {
      thirteenBitTimestampYMD,
      thirteenBitTimestamp,
      open() {
        if (this.chooseIndex) {
          openQualityInsReport({ rid: this.chooseIndex }).then((res) => {
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
          closeQualityInsReport({ rid: this.chooseIndex }).then((res) => {
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
      openChooseOutFac() {
        this.getOutFacDataList()
        this.dialogOutFacVisible = true
      },
      searchOutFacForm() {
        this.getOutFacDataList()
      },
      resetOutFacForm() {
        this.outFacForm = this.$options.data().outFacForm
      },
      getOutFacDataList() {
        this.outFacPage.paramList = []
        Object.keys(this.outFacForm).forEach((element) => {
          this.outFacPage.paramList.push({
            name: element,
            value: this.outFacForm[element].value || null,
            mark: this.outFacForm[element].mark,
          })
        })
        getOutFacInformedList(this.outFacPage).then((res) => {
          this.outFacTableData = res.data.list
          this.outFacTableData.forEach((item, index) => {
            item.status = item.status === 'E' ? true : false
          })
          this.outFacPage.totalPage = res.data.page.totalNumber
        })
      },
      outFacCannel() {
        this.dialogOutFacVisible = false
        this.$refs.outFacTable.clearSelection()
      },
      outFacOk() {
        if (this.tempChoose.flag) {
          this.dialogForm.informNum = this.tempChoose.informNum
          this.dialogForm.variety = this.tempChoose.variety
          this.dialogForm.prodName = this.tempChoose.prodName
          this.dialogForm.prodPsn = this.tempChoose.psn
          this.dialogForm.outFacDate = this.tempChoose.outFacDate
          this.dialogForm.amount = this.tempChoose.amount
          this.dialogForm.prodBatchNum = this.tempChoose.prodBatchNum
          this.dialogForm.strength = this.tempChoose.strength
          this.dialogOutFacVisible = false
          this.$refs.outFacTable.clearSelection()
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
      chooseOutFacCurrentRow(row) {
        this.tempChoose.informNum = row.informNum
        this.tempChoose.variety = row.variety
        this.tempChoose.prodName = row.pname
        this.tempChoose.psn = row.psn
        this.tempChoose.outFacDate = row.signTime
        this.tempChoose.amount = row.amount
        this.tempChoose.prodBatchNum = row.prodBatchNum
        this.tempChoose.strength = row.strength
        this.tempChoose.flag = true
      },
      openDialog() {
        this.dialogFormVisible = true
        this.dialogFormEdit = 1
      },
      editDialog(rid) {
        getQualityInsReportDetail({ rid }).then((res) => {
          if (res.status == 0) {
            this.dialogForm = Object.assign({}, res.data)
            if (res.data.coQualityInsReportContentDOS.length > 0) {
              res.data.coQualityInsReportContentDOS.forEach((item, index) => {
                this.report[item.contKey] = item.contValue
              })
            }
            this.dialogFormVisible = true
            this.dialogFormEdit = 2
          }
        })
      },
      initDialog() {
        this.$refs['updataForm'].resetFields()
        this.dialogForm = this.$options.data().dialogForm
        this.report = this.$options.data().report
      },
      delDialog(rid) {
        this.$confirm('你确定要删除当前项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            delQualityInsReport({ rid }).then((res) => {
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
      changeOutFacPage(val) {
        this.outFacPage.page = val
        this.getOutFacDataList()
      },
      handleOutFacSizeChange(val) {
        this.outFacPage.pageSize = val
        this.getOutFacDataList()
      },
      submitForm() {
        this.updateAble = true
        this.dialogForm.coQualityInsReportContentDOS = []
        Object.keys(this.report).forEach((element) => {
          this.dialogForm.coQualityInsReportContentDOS.push({
            contKey: element,
            contValue: this.report[element],
          })
        })
        this.$refs['updataForm'].validate((valid) => {
          if (valid) {
            if (this.dialogFormEdit === 1) {
              this.dialogForm.rid = null
              addQualityInsReport(this.dialogForm).then((res) => {
                if (res.status == '0') {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!',
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
              editQualityInsReport(this.dialogForm).then((res) => {
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
        getQualityInsReportList(this.webPage).then((res) => {
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
        this.form.prodName.value = null
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
  .content {
    width: 100%;
    max-height: 500px;
    overflow-y: scroll;
    .el-form .el-row {
      margin-bottom: 0;
    }
  }
</style>
