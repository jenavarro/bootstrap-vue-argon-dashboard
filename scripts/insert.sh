#!/bin/bash
for i in {200..10000}
do
    echo "i=$i"
    curl -X POST 'https://phogohsvtfvgatjrqsyy.supabase.co/rest/v1/items' \
    -H "apikey: $SUPABASE_SERVICE_KEY" \
    -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "{ \"nombre\": \"nombre $i\", \"descripcion\": \"descripcion $i\",\"habilitado\": false }"
done

