<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Tabla de Items</h3>
        </b-card-header>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :stripe="true"
                  :data="tableData">
            <el-table-column label="id"
                             min-width="110px"
                             prop="id">
            </el-table-column>
            <el-table-column label="Nombre"
                             prop="nombre"
                             min-width="340px">
            </el-table-column>
            <el-table-column label="Descripcion"
                             prop="descripcion"
                             min-width="340px">
            </el-table-column>
            <el-table-column label="Habilitado"
                             prop="habilitado"
                             min-width="60px"
                             >
            </el-table-column>
        </el-table>
        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination  @change="currentPageEvent" :per-page="20" :total="totalRows"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  import { Table, TableColumn} from 'element-ui'
  import { supabase } from '../../../supabase'


  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        tableData: [ ] ,
        totalRows:0
      }
    }
    , created() {
      return this.getDataFromApi(1)
    },
    methods: {
      async getDataFromApi(page) {
        if (this.totalRows==0) {
        let { count, error } = await supabase
          .from('items')
          .select('*', {count:'exact',head: true});
        this.totalRows = count
        }

       const { data, error2 } = await supabase
          .from('items')
          .select()
          .order('id')
          .range((page-1)*20,(page*20)-1)
          
        this.tableData=data; 
      }
      ,
        currentPageEvent (val) {
            this.getDataFromApi(val)
        }
    }
  }
</script>
