#!/bin/bash
##echo  "\"apikey\": \"${VITE_SUPABASE_ANON_KEY}\""

 
#curl --request GET 
curl "${VITE_SUPABASE_URL}/rest/v1/items" \
-H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
-H "Authorization: Bearer ${VITE_SUPABASE_USER_SESSION}" 


#-H '"\"Content-Type\": \"application/json\""' 
#-d '{ "query":"{ items }"'