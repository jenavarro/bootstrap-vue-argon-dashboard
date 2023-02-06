<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Page visits</h3>
        </b-col>
        <b-col class="text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </b-col>
      </b-row>
    </template>

    <el-table class="table-responsive table"
              :data="tableData"
              header-row-class-name="thead-light">
      <el-table-column label="Id"
                       min-width="50px"
                       prop="id">

      </el-table-column>
      <el-table-column label="Nombre"
                       min-width="90px"
                       prop="nombre">
      </el-table-column>
      <el-table-column label="Descripcion"
                       min-width="90px"
                       prop="descripcion">
      </el-table-column>

      <el-table-column label="Fecha y Hora Creacion"
                       min-width="90px"
                       prop="created_at">
      </el-table-column>
      <el-table-column label="Habilitado"
                       min-width="50px"
                       prop="habilitado">                       
        <template v-slot="{row}">
          {{row.bounceRate}}
        </template>
      </el-table-column>
    </el-table>
  </b-card>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  import { supabase } from '../../supabase'

  export default {
    name: 'page-visits-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
     data() {
      return {
        tableData: []
      }
    }
    , created() {
      this.getDataFromApi()
    },
    methods: {
      async getDataFromApi() {
        const { data, error } = await supabase
          .from('items')
          .select()
      this.tableData=data;
      }}
  }
</script>
<style>
</style>
