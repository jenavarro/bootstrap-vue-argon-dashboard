<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Light table</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :stripe="true"
                  :data="tableData">
            <el-table-column label="id"
                             min-width="110px"
                             prop="id">
            </el-table-column>
            <el-table-column label="avatar"
                             min-width="110px" 
                             prop="avatar_url">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.avatar_url">
                        </a>
                    </b-media>
                </template>
            </el-table-column>
            <el-table-column label="User Name"
                             prop="username"
                             min-width="340px">
            </el-table-column>

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
            </el-table-column>
        </el-table>
<!--
        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    -->
    </b-card>
</template>
<script>
  //import projects from '../projects'
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
        tableData: [ ]
      }
    }
    , created() {
      return this.getDataFromApi()
    },
    methods: {
      async getDataFromApi() {
        const { data, error } = await supabase
          .from('profiles')
          .select()
      this.tableData=data;
      }}
  }
</script>
