<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Personas</h3>
        </b-card-header>

        <el-form label-width="120px" class="demo-ruleForm">
                        <el-form-item label="Buscar:" width="120px" >
                            <el-input v-model="form.textoabuscar" clearable placeholder="Nombre, Apellido, DNI o e-mail a buscar"></el-input>
                        </el-form-item>
        </el-form>
 




        <el-table class="table-responsive table" header-row-class-name="thead-light" :stripe="true" :data="tableData">
            <el-table-column label="id" min-width="110px" prop="id">
            </el-table-column>
            <!--
                <el-table-column label="avatar" min-width="110px" prop="avatar_url">
                    <template v-slot="{ row }">
                        <b-media no-body class="align-items-center">
                            <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Image placeholder" :src="row.avatar_url">
                            </a>
                        </b-media>
                    </template>
                </el-table-column>-->
            <el-table-column label="Apellido(s)" prop="apellidos" min-width="340px">
            </el-table-column>
            <el-table-column label="Nombre(s)" prop="nombres" min-width="340px">
            </el-table-column>
            <el-table-column label="Tipo Doc" prop="tipodoc" min-width="90px">
            </el-table-column>
            <el-table-column label="Nro. Doc." prop="doc" min-width="120px">
            </el-table-column>
            <el-table-column label="Fecha Nac." prop="fechanac" min-width="120px">
            </el-table-column>
            <!--
              <el-table-column label="Actualizado"
                               min-width="170px"
                               prop="updated_at">
                  <template v-slot="{row}">
                      <badge class="badge-dot mr-4" type="">
                          <i :class="`bg-${row.statusType}`"></i>
                          <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                      </badge>
                  </template>
              </el-table-column>
              <el-table-column label="Completion"
                               prop="completion"
                               min-width="240px">
                  <template v-slot="{row}">
                      <div class="d-flex align-items-center">
                          <span class="completion mr-2">{{row.completion}}%</span>
                          <div>
                              <base-progress :type="row.statusType" :value="row.completion"/>
                          </div>
                      </div>
                  </template>
              </el-table-column>-->
        </el-table>
        <!--
          <b-card-footer class="py-4 d-flex justify-content-end">
              <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
          </b-card-footer>
      -->
        <el-row>
            <el-col :span="12">
                <div class="grid-content ">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="Apellido(s)" prop="apellidos">
                            <el-input v-model="ruleForm.apellidos" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Nombre(s)" prop="nombres">
                            <el-input v-model="ruleForm.nombres" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Tipo Doc." prop="">
                            <el-select v-model="ruleForm.idtiposdoc" filterable placeholder="Tipo de Documento">

                                <el-option v-for="item in tiposdoc" :key="item.id" :value="item.id"
                                    :label="item.nombretipodoc">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Nro. Doc" prop="doc">
                            <el-input v-model.number="ruleForm.doc"  clearable  ></el-input>
                        </el-form-item>
                        <el-form-item label="Fecha Nac." required>
                            <el-col :span="11">
                                <el-form-item prop="fechanac">
                                    <el-date-picker type="date" placeholder="Fecha de Nacimiento:" v-model="ruleForm.fechanac"
                                        style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="Activity form" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">Guardar</el-button>
                            <el-button @click="resetForm('ruleForm')">Limpiar</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>

    </b-card>
</template>
<script>
import { Table, TableColumn, Form, FormItem, Row, Select, Option, Col, DatePicker, Button } from 'element-ui'
import { isNull } from 'util'
import { supabase } from '../../../supabase'


export default {
    name: 'light-table',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Row.name]: Row,
        [Select.name]: Select,
        [Option.name]: Option,
        [Col.name]: Col,
        [DatePicker.name]: DatePicker,
        [Button.name]: Button,
    },
    data() {
        return {
            tableData: []
            , tiposdoc: []
            , form:
            {
                textoabuscar: ""
                , buscargrupofamcompl: true
            }
            , ruleForm: {
                apellidos: '',
                nombres: '',
                idtiposdoc: 1,
                doc: 0 ,
                fechanac: '' ,
                email: ''
            }
            , rules: {
                apellidos: [
                    { type: 'string', required: true, message: 'Por favor introduzca un apellido', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Longitud entre 3 y 50 caracteres', trigger: 'blur' }
                ],
                nombres: [
                    { type: 'string', required: true, message: 'Por favor introduzca un nombre', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Longitud entre 3 y 50 caracteres', trigger: 'blur' }
                ],
                idtiposdoc: [
                    { required: true, message: 'Por favor seleccione un tipo de documento', trigger: 'change' }
                ],
                doc: [
                    { required: true, message: 'Por favor indique un numero de documento', trigger: 'blur' },
                    { type: 'number', min: 1000000, max: 999999999, message: 'Por favor verifique un numero de documento valido', trigger: 'blur' }
                ],
                fechanac: [
                    { type: 'date', required: true, message: 'Por favor indique fecha de nacimiento', trigger: 'blur'  },
                    { validator: this.validarFecha, trigger:'change' }
                ],
                email: [
                    { type: 'string', required: true, message: 'Por favor introduzca un email', trigger: 'blur' },
                    { min: 3, max: 50, message: 'Longitud entre 3 y 50 caracteres', trigger: 'blur' }
                ],
            }
        }
    }
    , created() {
        return this.getDataFromApi()
    },
    methods: {
        async getDataFromApi() {
            const { data, error } = await supabase
                .from('personas')
                .select(`
                    *,
                    tiposdoc (
                        nombretipodoc
                        ,id
                    )
                    `)
            this.tableData = data;

            if (this.tiposdoc === null || this.tiposdoc.length == 0) {
                const { data, error } = await supabase
                    .from('tiposdoc')
                    .select()
                this.tiposdoc = data;
            }
        },
        btnClickLimpiar() {
            this.form.textoabuscar = "";

        },
        async btnClickBusqueda() {
            await this.getDataFromApi()
        },
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
            if (valid) {
                const { error } = await supabase
                    .from('personas')
                    .insert([
                        {   apellidos: this.ruleForm.apellidos, 
                            nombres: this.ruleForm.nombres,
                            doc: this.ruleForm.doc,
                            fechanac: this.ruleForm.fechanac,
                            email: this.ruleForm.email,
                            tipodoc: this.ruleForm.idtiposdoc
                        },
                    ])
                    if (error === null) return;
                    if (error.code==23505) {
                        alert('Tipo y numero de documento ya guardado en la base de datos')
                    }
            } else { 
                return false;
            }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      validarFecha (rule, value,callback) 
                            {
                                let a = new Date().getTime()
                                let b = new Date(value).getTime()  
                                if (b>a) callback(new Error(`'La fecha de nacimiento no puede ser en el futuro'`))                     
                            }
    }
}
</script>

